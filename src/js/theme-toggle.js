document.addEventListener("DOMContentLoaded", function () {
  const autoButton = document.getElementById("auto");
  const lightButton = document.getElementById("light");
  const darkButton = document.getElementById("dark");
  const root = document.documentElement;

  // 创建一个link元素来加载global.css
  const globalLinkElement = document.createElement("link");
  globalLinkElement.setAttribute("rel", "stylesheet");
  globalLinkElement.setAttribute("type", "text/css");
  globalLinkElement.setAttribute("id", "global-link");
  globalLinkElement.setAttribute("href", "/css/global.css");
  document.head.appendChild(globalLinkElement);

  function setTheme(theme) {
    const themeLinkElement = document.getElementById("theme-link");

    // 根据主题模式设置link的href
    themeLinkElement.setAttribute(
      "href",
      theme === "light" ? "/css/light.css" : "/css/dark.css"
    );

    // 将主题选择保存到本地存储
    localStorage.setItem("theme", theme);
  }

  function applyStyles(
    backgroundImage,
    backgroundSize,
    autoButtonStyles,
    lightButtonStyles,
    darkButtonStyles
  ) {
    root.style.backgroundImage = backgroundImage;
    root.style.backgroundSize = backgroundSize;
    autoButton.style.backgroundColor = autoButtonStyles.backgroundColor;
    autoButton.style.color = autoButtonStyles.color;
    lightButton.style.backgroundColor = lightButtonStyles.backgroundColor;
    lightButton.style.color = lightButtonStyles.color;
    darkButton.style.backgroundColor = darkButtonStyles.backgroundColor;
    darkButton.style.color = darkButtonStyles.color;
  }

  function applyLightModeStyles() {
    applyStyles(
      "url('/assets/image/light.svg')",
      "4px 4px",
      { backgroundColor: "#d1dab3", color: "black" },
      { backgroundColor: "#d1dab3", color: "black" },
      { backgroundColor: "", color: "" }
    );
  }

  function applyDarkModeStyles() {
    applyStyles(
      "url('/assets/image/dark.svg')",
      "4px 4px",
      { backgroundColor: "black", color: "white" },
      { backgroundColor: "", color: "" },
      { backgroundColor: "black", color: "white" }
    );
  }

  function applyAutoModeStyles() {
    const systemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (systemDarkMode) {
      setTheme("dark");
      applyDarkModeStyles();
    } else {
      setTheme("light");
      applyLightModeStyles();
    }
  }

  // 从本地存储中获取之前保存的主题选择
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
    if (savedTheme === "light") {
      applyLightModeStyles();
    } else if (savedTheme === "dark") {
      applyDarkModeStyles();
    } else {
      applyAutoModeStyles();
    }
  } else {
    // 如果没有保存的主题选择，应用自动模式
    applyAutoModeStyles();
  }

  autoButton.addEventListener("click", () => {
    setTheme("auto");
    applyAutoModeStyles();
  });

  lightButton.addEventListener("click", () => {
    setTheme("light");
    applyLightModeStyles();
  });

  darkButton.addEventListener("click", () => {
    setTheme("dark");
    applyDarkModeStyles();
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      applyAutoModeStyles();
    });
});
