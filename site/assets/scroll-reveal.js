(() => {
  const targets = document.querySelectorAll(
    ".landing-copy > .eyebrow, .landing-copy > h1, .landing-copy > p, .curiosity-heading, .interest-editorial article, .home-story .section-heading, .home-story .featured-story, .directory-intro, .directory-links > a, .content-page > .featured-story, .content-page > .page-intro, .coming-soon, .blog-category, .entry-item, .project-card, .about-copy > *, .about-aside > *, .article-header, .article-body > *"
  );

  if (!targets.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  targets.forEach((target) => target.classList.add("scroll-reveal"));
  document.documentElement.classList.add("scroll-reveal-ready");

  const scrubTarget = document.querySelector(".home-page .landing-copy");
  let scrubFrame = 0;

  const clampProgress = (value) => Math.min(Math.max(value, 0), 1);
  const updateAnimations = () => {
    const viewportHeight = Math.max(window.innerHeight, 1);
    const revealStart = viewportHeight * 0.9;
    const revealEnd = viewportHeight * 0.58;
    const revealDistance = revealStart - revealEnd;

    targets.forEach((target) => {
      const top = target.getBoundingClientRect().top;
      const progress = clampProgress((revealStart - top) / revealDistance);
      target.style.setProperty("--reveal-progress", progress.toFixed(3));
    });

    if (scrubTarget) {
      const scrubRange = Math.max(viewportHeight * 0.72, 1);
      const scrubProgress = clampProgress(window.scrollY / scrubRange);
      scrubTarget.style.setProperty("--scroll-progress", scrubProgress.toFixed(3));
    }
    scrubFrame = 0;
  };

  const scheduleAnimations = () => {
    if (scrubFrame) return;
    scrubFrame = window.requestAnimationFrame(updateAnimations);
  };

  updateAnimations();
  window.addEventListener("scroll", scheduleAnimations, { passive: true });
  window.addEventListener("resize", scheduleAnimations, { passive: true });
})();


