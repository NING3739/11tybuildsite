document.addEventListener("DOMContentLoaded", function () {
  const autoButton = document.getElementById("auto");
  const lightButton = document.getElementById("light");
  const darkButton = document.getElementById("dark");
  const root = document.documentElement;

  function applyLightModeStyles() {
    root.style.backgroundImage = "url('/assets/image/light.svg')";
    root.style.backgroundRepeat = "repeat";
    root.style.backgroundSize = "4px 4px";
    autoButton.style.backgroundColor = "#d1dab3";
    autoButton.style.color = "black";
    lightButton.style.backgroundColor = "#d1dab3";
    lightButton.style.color = "black";
    darkButton.style.backgroundColor = "";
    darkButton.style.color = "";
  }

  function applyDarkModeStyles() {
    root.style.backgroundImage = "url('/assets/image/dark.svg')";
    root.style.backgroundRepeat = "repeat";
    root.style.backgroundSize = "4px 4px";
    autoButton.style.backgroundColor = "black";
    autoButton.style.color = "white";
    lightButton.style.backgroundColor = "";
    lightButton.style.color = "";
    darkButton.style.backgroundColor = "black";
    darkButton.style.color = "white";
  }

  function applyAutoModeStyles() {
    const systemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (systemDarkMode) {
      applyDarkModeStyles();
    } else {
      applyLightModeStyles();
    }
  }

  applyAutoModeStyles(); // 初始化根据系统模式应用样式

  autoButton.addEventListener("click", () => {
    applyAutoModeStyles(); // 点击 "auto" 按钮后重新应用样式，跟随系统模式
  });

  lightButton.addEventListener("click", () => {
    applyLightModeStyles();
  });

  darkButton.addEventListener("click", () => {
    applyDarkModeStyles();
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      applyAutoModeStyles(); // 监听系统模式变化并重新应用样式
    });
});
