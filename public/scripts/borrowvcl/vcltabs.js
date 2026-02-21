document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".borrowvcl-btn");
  const panels = document.querySelectorAll(".borrowvcl-panel");

  if (!buttons.length || !panels.length) return;

  let isTransitioning = false;

  const ACTIVE_BTN_CLASS = "tabactive";
  const HIDDEN_CLASS = "hidden";
  const ENTER_CLASSES = ["opacity-100", "translate-y-0"];
  const EXIT_CLASSES = ["opacity-0", "-translate-y-2"];

  const getActivePanel = () =>
    document.querySelector(`.borrowvcl-panel:not(.${HIDDEN_CLASS})`);

  const setButtonState = (activeButton) => {
    buttons.forEach((button) => {
      const isActive = button === activeButton;
      button.classList.toggle(ACTIVE_BTN_CLASS, isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  };

  const showPanel = (panel) => {
    panel.classList.remove(HIDDEN_CLASS, ...EXIT_CLASSES);

    requestAnimationFrame(() => {
      panel.classList.add(...ENTER_CLASSES);
    });
  };

  const hidePanel = (panel, callback) => {
    panel.classList.remove(...ENTER_CLASSES);
    panel.classList.add(...EXIT_CLASSES);

    const handleTransitionEnd = () => {
      panel.classList.add(HIDDEN_CLASS);
      panel.removeEventListener("transitionend", handleTransitionEnd);
      callback?.();
    };

    panel.addEventListener("transitionend", handleTransitionEnd);
  };

  // Initialize first tab
  buttons[0].classList.add(ACTIVE_BTN_CLASS);
  panels[0].classList.remove(HIDDEN_CLASS, ...EXIT_CLASSES);
  panels[0].classList.add(...ENTER_CLASSES);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isTransitioning || button.classList.contains(ACTIVE_BTN_CLASS)) {
        return;
      }

      const targetId = button.dataset.tab;
      const newPanel = document.getElementById(targetId);
      const currentPanel = getActivePanel();

      if (!newPanel) return;

      isTransitioning = true;
      setButtonState(button);

      if (currentPanel) {
        hidePanel(currentPanel, () => {
          showPanel(newPanel);
          isTransitioning = false;
        });
      } else {
        showPanel(newPanel);
        isTransitioning = false;
      }
    });
  });
});