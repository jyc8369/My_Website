(() => {
  const route = document.body.dataset.localeRoute || "/";
  let language = "";

  try {
    language = localStorage.getItem("jyc8369-language") || "";
  } catch {
    // Browser language detection remains available if storage is disabled.
  }

  if (language !== "en" && language !== "ko") {
    language = navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
  }

  window.location.replace(`/${language}${route}`);
})();
