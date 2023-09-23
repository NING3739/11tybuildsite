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

  applyAutoModeStyles(); // 初始化根据系统模式应用样式

  autoButton.addEventListener("click", () => {
    setTheme("auto");
    applyAutoModeStyles(); // 点击 "auto" 按钮后重新应用样式，跟随系统模式
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
      applyAutoModeStyles(); // 监听系统模式变化并重新应用样式
    });
});
