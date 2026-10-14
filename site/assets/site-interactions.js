(() => {
  const languageToggle = document.querySelector(".language-toggle");
  const languageMenu = document.querySelector("#language-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNavigation = document.querySelector("#primary-navigation");
  const header = document.querySelector(".site-header");

  const closeLanguageMenu = () => {
    if (!languageToggle || !languageMenu) return;
    languageToggle.setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
  };

  if (languageToggle && languageMenu) {
    languageMenu.hidden = true;
    languageToggle.setAttribute("aria-expanded", "false");

    languageToggle.addEventListener("click", () => {
      const expanded = languageToggle.getAttribute("aria-expanded") === "true";
      languageToggle.setAttribute("aria-expanded", String(!expanded));
      languageMenu.hidden = expanded;
    });

    languageMenu.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-language]");
      if (!choice) return;
      try {
        localStorage.setItem("jyc8369-language", choice.dataset.language);
      } catch {
        // Language navigation still works when storage is unavailable.
      }
    });

    document.addEventListener("click", (event) => {
      if (!languageMenu.contains(event.target) && !languageToggle.contains(event.target)) {
        closeLanguageMenu();
      }
    });
  }

  const closeMobileMenu = (restoreFocus = false) => {
    if (!menuToggle || !primaryNavigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNavigation.classList.remove("is-open");
    if (restoreFocus) menuToggle.focus();
  };

  if (menuToggle && primaryNavigation) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      primaryNavigation.classList.toggle("is-open", !expanded);
      if (!expanded) closeLanguageMenu();
    });

    primaryNavigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMobileMenu();
    });

    document.addEventListener("click", (event) => {
      if (!primaryNavigation.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMobileMenu();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const languageWasOpen = languageToggle?.getAttribute("aria-expanded") === "true";
    const mobileWasOpen = menuToggle?.getAttribute("aria-expanded") === "true";

    if (!languageWasOpen && !mobileWasOpen) return;

    closeLanguageMenu();
    closeMobileMenu();

    const focusTarget = languageWasOpen ? languageToggle : menuToggle;
    focusTarget?.focus();
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!header || reduceMotion) return;

  let previousY = window.scrollY;
  let lastDirectionChange = previousY;
  let scheduled = false;

  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      previousY = currentY;

      if (currentY < 80) {
        header.classList.remove("is-hidden");
        lastDirectionChange = currentY;
      } else if (Math.abs(currentY - lastDirectionChange) >= 18) {
        if (header.contains(document.activeElement) || primaryNavigation?.classList.contains("is-open")) {
          header.classList.remove("is-hidden");
        } else if (delta > 0) {
          header.classList.add("is-hidden");
        } else if (delta < 0) {
          header.classList.remove("is-hidden");
        }
        lastDirectionChange = currentY;
      }

      scheduled = false;
    });
  }, { passive: true });
})();
