/**
 * Updates the visual and accessibility state of tab buttons.
 */
const updateButtonState = (buttons, activeBtn) => {
  buttons.forEach((btn) => {
    const isActive = btn === activeBtn;
    btn.classList.toggle("tabactive", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
};

/**
 * Manages the entry/exit transitions for a specific panel.
 */
const togglePanelVisibility = (panel, isTarget) => {
  if (isTarget) {
    panel.classList.remove("hidden");
    // Ensure the browser renders the 'hidden' removal before starting transition
    requestAnimationFrame(() => {
      panel.classList.add("opacity-100", "translate-y-0");
      panel.classList.remove("opacity-0", "-translate-y-2");
    });
    return;
  }

  // Hide logic
  panel.classList.add("opacity-0", "-translate-y-2");
  panel.classList.remove("opacity-100", "translate-y-0");
  setTimeout(() => panel.classList.add("hidden"), 400);
};

/**
 * Main event coordinator.
 */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".borrowvcl-btn");
  const panels = document.querySelectorAll(".borrowvcl-panel");

  if (buttons.length === 0) return;

  // Initialize first tab
  updateButtonState(buttons, buttons[0]);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;

      updateButtonState(buttons, btn);
      panels.forEach((panel) => {
        togglePanelVisibility(panel, panel.id === targetId);
      });
    });
  });
});