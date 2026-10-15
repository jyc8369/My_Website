(() => {
  const targets = document.querySelectorAll([
    ".landing-copy > *",
    ".interest-editorial > article",
    ".directory-intro",
    ".directory-links > a",
    ".page-intro",
    ".coming-soon",
    ".about-copy > section",
    ".article-header",
    ".article-body > *",
  ].join(","));

  if (!targets.length || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  targets.forEach((target, index) => {
    target.classList.add("scroll-reveal");
    target.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
  });
  document.documentElement.classList.add("scroll-reveal-ready");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
      else entry.target.classList.remove("is-visible");
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });

  targets.forEach((target) => observer.observe(target));
})();
