/**
 * 1. UI State Helpers (Pure Logic)
 */
const toggleButtonClasses = (buttons, activeBtn) => {
  buttons.forEach((btn) => {
    const isActive = btn === activeBtn;
    btn.classList.toggle("tabactive", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
};

const animatePanelIn = (panel) => {
  panel.classList.remove("hidden");
  requestAnimationFrame(() => {
    panel.classList.replace("opacity-0", "opacity-100");
    panel.classList.replace("-translate-y-2", "translate-y-0");
  });
};

const animatePanelOut = async (panel) => {
  if (!panel) return;
  panel.classList.replace("opacity-100", "opacity-0");
  panel.classList.replace("translate-y-0", "-translate-y-2");
  
  // Wait for CSS transition (match your CSS duration)
  await new Promise((resolve) => setTimeout(resolve, 400));
  panel.classList.add("hidden");
};

/**
 * 2. Main Coordinator Function
 */
let isTransitioning = false;

const handleTabChange = async (clickedBtn, buttons) => {
  if (clickedBtn.classList.contains("tabactive") || isTransitioning) return;

  isTransitioning = true;
  
  const targetId = clickedBtn.dataset.tab;
  const currentPanel = document.querySelector(".borrowvcl-panel:not(.hidden)");
  const newPanel = document.getElementById(targetId);

  toggleButtonClasses(buttons, clickedBtn);
  
  await animatePanelOut(currentPanel);
  animatePanelIn(newPanel);
  
  isTransitioning = false;
};

/**
 * 3. Initialization Logic
 */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".borrowvcl-btn");
  const firstPanel = document.querySelector(".borrowvcl-panel");

  if (buttons.length === 0) return;

  // Set initial state
  toggleButtonClasses(buttons, buttons[0]);
  if (firstPanel) animatePanelIn(firstPanel);

  // Bind Events
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => handleTabChange(btn, buttons));
  });
});