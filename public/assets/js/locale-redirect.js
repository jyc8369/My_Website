(() => {
  const route = document.body.dataset.localeRoute || "/";
  let language = "";

  try {
    language = localStorage.getItem("jyc8369-language") || "";
  } catch {
    // Browser language detection remains available if storage is disabled.
  }

  if (!["en", "ko", "ja"].includes(language)) {
    const browserLanguage = navigator.language?.toLowerCase() || "";
    language = browserLanguage.startsWith("ko") ? "ko" : browserLanguage.startsWith("ja") ? "ja" : "en";
  }

  window.location.replace(`/${language}${route}`);
})();
