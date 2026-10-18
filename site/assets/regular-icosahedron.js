(() => {
  const canvas = document.querySelector("#icosahedron-canvas");
  const stage = document.querySelector("[data-ui='icosahedron-stage']");
  const rotationButton = document.querySelector("[data-ui='icosahedron-auto-rotate']");
  const edgeToggle = document.querySelector("[data-ui='icosahedron-edges']");
  const zoomInput = document.querySelector("[data-ui='icosahedron-zoom']");
  const zoomOutput = document.querySelector("[data-ui='icosahedron-zoom-value']");
  const resetButton = document.querySelector("[data-ui='icosahedron-reset']");
  if (!canvas || !stage || !rotationButton || !edgeToggle || !zoomInput || !zoomOutput || !resetButton) return;

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;

  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ];
  const edges = [];
  const faces = [];
  const edgeLength = 2;
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const subtract = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const normalize = (v) => { const length = Math.hypot(...v); return v.map((part) => part / length); };

  for (let a = 0; a < vertices.length; a += 1) {
    for (let b = a + 1; b < vertices.length; b += 1) {
      if (Math.abs(distance(vertices[a], vertices[b]) - edgeLength) < 1e-8) edges.push([a, b]);
      for (let c = b + 1; c < vertices.length; c += 1) {
        if ([distance(vertices[a], vertices[b]), distance(vertices[b], vertices[c]), distance(vertices[c], vertices[a])].every((length) => Math.abs(length - edgeLength) < 1e-8)) {
          let indices = [a, b, c];
          let normal = normalize(cross(subtract(vertices[b], vertices[a]), subtract(vertices[c], vertices[a])));
          const center = indices.reduce((sum, index) => sum.map((value, axis) => value + vertices[index][axis] / 3), [0, 0, 0]);
          if (dot(normal, center) < 0) {
            indices = [a, c, b];
            normal = normal.map((value) => -value);
          }
          faces.push({ indices, normal });
        }
      }
    }
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let yaw = -0.42;
  let pitch = 0.24;
  let zoom = 1;
  // Respect reduced-motion by starting still, while keeping explicit opt-in available.
  let rotating = false;
  let drawingFrame = 0;
  let previousFrame = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  const setRotationState = () => {
    rotationButton.setAttribute("aria-pressed", String(rotating));
    rotationButton.disabled = false;
    rotationButton.removeAttribute("title");
  };

  const setZoom = (value) => {
    zoomInput.value = String(value);
    zoom = Number(value) / 100;
    zoomOutput.value = `${value}%`;
    zoomOutput.textContent = `${value}%`;
    draw();
  };

  const rotatePoint = ([x, y, z]) => {
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const cosX = Math.cos(pitch);
    const sinX = Math.sin(pitch);
    const rotatedX = x * cosY + z * sinY;
    const rotatedZ = -x * sinY + z * cosY;
    return [rotatedX, y * cosX - rotatedZ * sinX, y * sinX + rotatedZ * cosX];
  };

  function resize() {
    const bounds = stage.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    draw();
  }

  function draw() {
    if (!width || !height) return;
    const styles = getComputedStyle(document.documentElement);
    const background = styles.getPropertyValue("--surface-raised").trim() || "#111111";
    const foreground = styles.getPropertyValue("--foreground").trim() || "#f5f5f5";
    const textColor = foreground.toLowerCase() === "#171717" || foreground.toLowerCase() === "#252525";
    context.clearRect(0, 0, width, height);
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    const focalLength = 6.2;
    const cameraDistance = 6.2;
    const rotated = vertices.map(rotatePoint);
    const projectedUnit = rotated.map(([x, y, z]) => {
      const perspective = focalLength / (cameraDistance - z);
      return [x * perspective, y * perspective];
    });
    const extentX = Math.max(...projectedUnit.map(([x]) => Math.abs(x)));
    const extentY = Math.max(...projectedUnit.map(([, y]) => Math.abs(y)));
    const scale = Math.min(width * 0.43 / extentX, height * 0.43 / extentY) * zoom;
    const projected = rotated.map(([x, y, z]) => {
      const perspective = focalLength / (cameraDistance - z);
      return [width / 2 + x * scale * perspective, height / 2 - y * scale * perspective, z];
    });
    const sortedFaces = faces.map((face) => ({
      ...face,
      depth: face.indices.reduce((sum, index) => sum + rotated[index][2] / 3, 0),
      normal: rotatePoint(face.normal),
    })).sort((a, b) => a.depth - b.depth);
    const light = normalize([-0.45, 0.65, 1]);

    for (const face of sortedFaces) {
      context.beginPath();
      face.indices.forEach((index, pointIndex) => {
        const [x, y] = projected[index];
        if (pointIndex === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      const lighting = Math.max(0, dot(face.normal, light));
      const brightness = textColor ? Math.round(224 - lighting * 82) : Math.round(28 + lighting * 116);
      context.fillStyle = `rgb(${brightness} ${brightness} ${brightness})`;
      context.fill();
      if (edgeToggle.checked) {
        context.strokeStyle = textColor ? "rgba(25,25,25,.7)" : "rgba(245,245,245,.78)";
        context.lineWidth = 1;
        context.stroke();
      }
    }

    if (rotating && !dragging && document.visibilityState === "visible") {
      if (!previousFrame) previousFrame = performance.now();
      const now = performance.now();
      yaw += Math.min(now - previousFrame, 40) * 0.00016;
      previousFrame = now;
      drawingFrame = requestAnimationFrame(draw);
    } else {
      previousFrame = 0;
      drawingFrame = 0;
    }
  }

  rotationButton.addEventListener("click", () => {
    if (reduceMotion.matches) return;
    rotating = !rotating;
    setRotationState();
    if (rotating && !drawingFrame) draw();
    else if (!rotating && drawingFrame) cancelAnimationFrame(drawingFrame);
  });
  edgeToggle.addEventListener("change", draw);
  zoomInput.addEventListener("input", () => setZoom(zoomInput.value));
  resetButton.addEventListener("click", () => {
    yaw = -0.42;
    pitch = 0.24;
    setZoom(100);
    if (rotating && !drawingFrame) draw();
  });

  canvas.addEventListener("pointerdown", (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add("is-dragging");
    if (drawingFrame) cancelAnimationFrame(drawingFrame);
    drawingFrame = 0;
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    yaw += (event.clientX - lastX) * 0.008;
    pitch = Math.max(-1.45, Math.min(1.45, pitch - (event.clientY - lastY) * 0.008));
    lastX = event.clientX;
    lastY = event.clientY;
    draw();
  });
  const stopDragging = () => {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove("is-dragging");
    if (rotating) draw();
  };
  canvas.addEventListener("pointerup", stopDragging);
  canvas.addEventListener("pointercancel", stopDragging);
  canvas.addEventListener("lostpointercapture", stopDragging);
  stage.addEventListener("wheel", (event) => {
    event.preventDefault();
    const next = Math.max(70, Math.min(150, Number(zoomInput.value) + (event.deltaY < 0 ? 5 : -5)));
    setZoom(next);
  }, { passive: false });
  canvas.addEventListener("keydown", (event) => {
    const step = 0.12;
    if (event.key === "ArrowLeft") yaw -= step;
    else if (event.key === "ArrowRight") yaw += step;
    else if (event.key === "ArrowUp") pitch = Math.max(-1.45, pitch - step);
    else if (event.key === "ArrowDown") pitch = Math.min(1.45, pitch + step);
    else if (event.key === "+" || event.key === "=") setZoom(Math.min(150, Number(zoomInput.value) + 5));
    else if (event.key === "-") setZoom(Math.max(70, Number(zoomInput.value) - 5));
    else return;
    event.preventDefault();
    draw();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && drawingFrame) {
      cancelAnimationFrame(drawingFrame);
      drawingFrame = 0;
    } else if (document.visibilityState === "visible" && rotating) draw();
  });
  reduceMotion.addEventListener("change", () => {
    if (reduceMotion.matches) {
      rotating = false;
      if (drawingFrame) cancelAnimationFrame(drawingFrame);
      drawingFrame = 0;
    }
    setRotationState();
    draw();
  });
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  new ResizeObserver(resize).observe(stage);
  setRotationState();
  setZoom(100);
  resize();
})();
