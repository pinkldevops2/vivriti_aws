/**
 * Updates a single panel's visibility and animation classes.
 * Logic is extracted to keep the event listener at a nesting depth of 1.
 */
const updatePanelState = (panel, targetId) => {
  const isTarget = panel.id === targetId;

  if (isTarget) {
    // Show Target Panel
    panel.classList.remove("hidden", "opacity-0", "-translate-y-2");
    panel.classList.add("opacity-100", "translate-y-0");
    return;
  }

  // Hide Non-Target Panel
  panel.classList.replace("opacity-100", "opacity-0");
  panel.classList.replace("translate-y-0", "-translate-y-2");
  
  // Use a timeout to wait for the transition before setting display: none
  setTimeout(() => panel.classList.add("hidden"), 300);
};

/**
 * Event Listener Orchestrator
 */
window.addEventListener("tab-change", (event) => {
  const { id } = event.detail;
  const panels = document.querySelectorAll(".borrowvcl-panel");

  panels.forEach((panel) => updatePanelState(panel, id));
});