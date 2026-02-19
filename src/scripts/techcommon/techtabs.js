/**
 * Shows the target panel with a fade-in/slide-down effect.
 */
const showPanel = (panel) => {
  panel.classList.remove("hidden");
  // Use requestAnimationFrame to ensure 'hidden' is removed before animating
  requestAnimationFrame(() => {
    panel.classList.add("opacity-100", "translate-y-0");
    panel.classList.remove("opacity-0", "-translate-y-2");
  });
};

/**
 * Hides non-target panels with a fade-out/slide-up effect.
 */
const hidePanel = (panel) => {
  panel.classList.add("opacity-0", "-translate-y-2");
  panel.classList.remove("opacity-100", "translate-y-0");
  
  // Wait for the transition to finish before setting display: none
  setTimeout(() => {
    panel.classList.add("hidden");
  }, 300);
};

/**
 * Global listener for tab-change events.
 */
window.addEventListener("tab-change", (event) => {
  const targetId = event.detail.id;
  const panels = document.querySelectorAll(".borrowvcl-panel");

  panels.forEach((panel) => {
    const isTarget = panel.id === targetId;
    return isTarget ? showPanel(panel) : hidePanel(panel);
  });
});