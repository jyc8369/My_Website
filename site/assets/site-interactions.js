(() => {
  const languageToggle = document.querySelector(".language-toggle");
  const languageMenu = document.querySelector("#language-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNavigation = document.querySelector("#primary-navigation");
  const themeToggle = document.querySelector(".theme-toggle");
  const header = document.querySelector(".site-header");
  const html = document.documentElement;
  if (document.body.dataset.page === "not-found") {
    let selectedLanguage = null;
    try { selectedLanguage = localStorage.getItem("jyc8369-language"); } catch {}
    if (selectedLanguage !== "ko" && selectedLanguage !== "en") selectedLanguage = navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
html.lang = selectedLanguage;
    document.title = selectedLanguage === "ko" ? "페이지를 찾을 수 없습니다 — jyc8369.dev" : "Page not found — jyc8369.dev";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = selectedLanguage === "ko" ? "요청하신 페이지를 찾을 수 없습니다." : "The page you requested could not be found.";
    document.querySelector(".wordmark")?.setAttribute("href", `/${selectedLanguage}/`);
    for (const key of ["home", "blog", "lab", "about"]) {
      document.querySelector(`[data-ui="nav-${key}"]`)?.setAttribute("href", `/${selectedLanguage}/${key === "home" ? "" : `${key}/`}`);
    }
    document.querySelectorAll("[data-locale-copy]").forEach((copy) => { copy.hidden = copy.dataset.localeCopy !== selectedLanguage; });
    document.querySelectorAll("[data-language='en']").forEach((option) => { option.href = "/en/"; });
    document.querySelectorAll("[data-language='ko']").forEach((option) => { option.href = "/ko/"; });
    const translations = selectedLanguage === "ko"
      ? { home: "홈", blog: "블로그", lab: "실험실", about: "소개", skip: "본문으로 건너뛰기", menu: "주요 메뉴 열기", language: "언어 선택", code: "KO", email: "이메일", contact: "연락처", title: "페이지를 찾을 수 없습니다 — jyc8369.dev", description: "요청하신 페이지를 찾을 수 없습니다." }
      : { home: "Home", blog: "Blog", lab: "Lab", about: "About", skip: "Skip to content", menu: "Open main navigation", language: "Choose language", code: "EN", email: "Email", contact: "Contact", title: "Page not found — jyc8369.dev", description: "The page you requested could not be found." };
    for (const [key, label] of Object.entries({ home: translations.home, blog: translations.blog, lab: translations.lab, about: translations.about })) {
      const link = document.querySelector(`[data-ui='nav-${key}']`);
      if (link) link.textContent = label;
    }
    document.querySelector(".skip-link")?.replaceChildren(document.createTextNode(translations.skip));
    document.querySelector(".language-toggle")?.setAttribute("aria-label", translations.language);
    document.querySelector("#language-menu")?.setAttribute("aria-label", translations.language);
    document.querySelector("[data-ui='language-code']")?.replaceChildren(document.createTextNode(translations.code));
    document.querySelector(".menu-toggle")?.setAttribute("aria-label", translations.menu);
    document.querySelector(".site-nav")?.setAttribute("aria-label", translations.language === "언어 선택" ? "주요 메뉴" : "Main navigation");
    document.querySelector(".footer-links")?.setAttribute("aria-label", translations.contact);
    document.querySelector("[data-ui='footer-email-label']")?.replaceChildren(document.createTextNode(translations.email));
  }
  const isKorean = html.lang.toLowerCase().startsWith("ko");

  const closeLanguageMenu = (restoreFocus = false) => {
    if (!languageToggle || !languageMenu) return;
    languageToggle.setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
    if (restoreFocus) languageToggle.focus();
  };

  if (languageToggle && languageMenu) {
    languageToggle.setAttribute("aria-expanded", "false");
    languageToggle.addEventListener("click", () => {
      const willOpen = languageToggle.getAttribute("aria-expanded") !== "true";
      languageToggle.setAttribute("aria-expanded", String(willOpen));
      languageMenu.hidden = !willOpen;
      if (willOpen) languageMenu.querySelector("[role='menuitem']")?.focus();
    });

    languageMenu.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-language]");
      if (!choice) return;
      try { localStorage.setItem("jyc8369-language", choice.dataset.language); } catch {}
    });

    document.addEventListener("click", (event) => {
      if (!languageMenu.contains(event.target) && !languageToggle.contains(event.target)) closeLanguageMenu();
    });

    languageMenu.addEventListener("keydown", (event) => {
      const items = [...languageMenu.querySelectorAll("[role='menuitem']")];
      const index = items.indexOf(document.activeElement);
      if (!items.length) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        items[(index + step + items.length) % items.length].focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeLanguageMenu(true);
      }
    });
  }

  const applyTheme = (theme, persist = false) => {
    const selected = theme === "light" ? "light" : "dark";
    html.dataset.theme = selected;
    if (themeToggle) {
      const next = selected === "dark" ? "light" : "dark";
      themeToggle.textContent = isKorean ? (selected === "dark" ? "다크" : "라이트") : (selected === "dark" ? "Dark" : "Light");
      themeToggle.setAttribute("aria-label", isKorean
        ? (next === "light" ? "라이트 테마로 전환" : "다크 테마로 전환")
        : `Switch to ${next} theme`);
      themeToggle.setAttribute("aria-pressed", String(selected === "light"));
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", selected === "light" ? "#fafafa" : "#090909");
    if (persist) {
      try { localStorage.setItem("jyc8369-theme", selected); } catch {}
    }
  };

  const storedTheme = (() => {
    try { return localStorage.getItem("jyc8369-theme"); } catch { return null; }
  })();
  applyTheme(storedTheme || html.dataset.theme || "dark");
  themeToggle?.addEventListener("click", () => {
    applyTheme(html.dataset.theme === "light" ? "dark" : "light", true);
  });

  const closeMobileMenu = (restoreFocus = false) => {
    if (!menuToggle || !primaryNavigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNavigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-label", isKorean ? "주요 메뉴 열기" : "Open main navigation");
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuToggle.focus();
  };

  const openMobileMenu = () => {
    if (!menuToggle || !primaryNavigation) return;
    closeLanguageMenu();
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", isKorean ? "주요 메뉴 닫기" : "Close main navigation");
    primaryNavigation.classList.add("is-open");
    document.body.classList.add("menu-open");
    primaryNavigation.querySelector("a")?.focus();
  };

  if (menuToggle && primaryNavigation) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", () => {
      if (menuToggle.getAttribute("aria-expanded") === "true") closeMobileMenu();
      else openMobileMenu();
    });
    primaryNavigation.addEventListener("click", (event) => {
      if (event.target === primaryNavigation || event.target.closest("a")) closeMobileMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMobileMenu();
    }, { passive: true });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (languageToggle?.getAttribute("aria-expanded") === "true") closeLanguageMenu(true);
      else if (menuToggle?.getAttribute("aria-expanded") === "true") closeMobileMenu(true);
      return;
    }

    if (event.key !== "Tab" || menuToggle?.getAttribute("aria-expanded") !== "true") return;
    const focusables = [...(primaryNavigation?.querySelectorAll("a") ?? []), languageToggle, themeToggle, menuToggle]
      .filter((element) => element?.getClientRects().length > 0 && !element.hasAttribute("disabled"));
    const first = focusables[0];
    const last = focusables.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  if (!header || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const currentYear = new Date().getFullYear();
  document.querySelectorAll(".footer-copyright").forEach((copyright) => {
    copyright.textContent = copyright.textContent.replace(/©\s*\d{4}/, `© ${currentYear}`);
  });
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
        if (header.contains(document.activeElement) || primaryNavigation?.classList.contains("is-open")) header.classList.remove("is-hidden");
        else if (delta > 0) header.classList.add("is-hidden");
        else if (delta < 0) header.classList.remove("is-hidden");
        lastDirectionChange = currentY;
      }
      scheduled = false;
    });
  }, { passive: true });
})();
