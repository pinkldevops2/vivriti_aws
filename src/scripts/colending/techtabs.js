/**
 * Updates the visual state and accessibility attributes of tab buttons.
 */
const updateButtonState = (buttons, activeBtn) => {
  buttons.forEach((btn) => {
    const isActive = btn === activeBtn;
    btn.classList.toggle("tabactive", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
};

/**
 * Manages the entry/exit transitions for tab panels.
 */
const handlePanelTransition = (panel, isTarget) => {
  if (isTarget) {
    panel.classList.remove("hidden");
    requestAnimationFrame(() => {
      panel.classList.replace("opacity-0", "opacity-100");
      panel.classList.replace("-translate-y-2", "translate-y-0");
    });
    return;
  }

  // Handle hiding non-target panels
  panel.classList.replace("opacity-100", "opacity-0");
  panel.classList.replace("translate-y-0", "-translate-y-2");
  setTimeout(() => panel.classList.add("hidden"), 400);
};

/**
 * Main Orchestrator
 */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".borrowvcl-btn");
  const panels = document.querySelectorAll(".borrowvcl-panel");

  if (buttons.length === 0) return;

  // Initial State
  updateButtonState(buttons, buttons[0]);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;

      updateButtonState(buttons, btn);
      panels.forEach((panel) => {
        handlePanelTransition(panel, panel.id === targetId);
      });
    });
  });
});