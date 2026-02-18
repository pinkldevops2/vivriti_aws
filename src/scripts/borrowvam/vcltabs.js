document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".borrowvcl-btn");
  const panels = document.querySelectorAll(".borrowvcl-panel");
  let isTransitioning = false; // Prevents clicking during animation

  // Helper to get currently active panel
  const getActivePanel = () => document.querySelector(".borrowvcl-panel:not(.hidden)");

  // Initialize: Set first tab as active and show first panel directly
  if (buttons.length > 0) buttons[0].classList.add("tabactive");
  if (panels.length > 0) {
    panels[0].classList.remove("hidden", "opacity-0", "-translate-y-2");
    panels[0].classList.add("opacity-100", "translate-y-0");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Do nothing if clicking active tab or if currently animating
      if (btn.classList.contains("tabactive") || isTransitioning) return;
      
      isTransitioning = true;
      const targetId = btn.dataset.tab;
      const newPanel = document.getElementById(targetId);
      const currentPanel = getActivePanel();

      // 1. Update active button state
      buttons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("tabactive", isActive);
        b.setAttribute("aria-selected", isActive);
      });

      // 2. Smooth transition panels (Sequential)
      if (currentPanel) {
        // A. Fade out current
        currentPanel.classList.add("opacity-0", "-translate-y-2");
        currentPanel.classList.remove("opacity-100", "translate-y-0");

        currentPanel.addEventListener("transitionend", function handler() {
          currentPanel.removeEventListener("transitionend", handler);
          currentPanel.classList.add("hidden");

          // B. Fade in new
          newPanel.classList.remove("hidden");
          requestAnimationFrame(() => {
            newPanel.classList.add("opacity-100", "translate-y-0");
            newPanel.classList.remove("opacity-0", "-translate-y-2");
          });
          
          isTransitioning = false;
        }, { once: true });
      } else {
        // Direct open if nothing was active
        newPanel.classList.remove("hidden");
        requestAnimationFrame(() => {
          newPanel.classList.add("opacity-100", "translate-y-0");
          newPanel.classList.remove("opacity-0", "-translate-y-2");
        });
        isTransitioning = false;
      }
    });
  });
});