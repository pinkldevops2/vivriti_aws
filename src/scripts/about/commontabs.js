document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  // Initialize: Set first tab as active and show first panel
  if (buttons.length > 0) buttons[0].classList.add("tabactive");
  if (panels.length > 0) {
    panels[0].classList.remove("hidden", "opacity-0", "-translate-y-2");
    panels[0].classList.add("opacity-100", "translate-y-0");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("tabactive")) return; // Do nothing if already active

      const targetId = btn.dataset.tab;

      // 1. Update active button state
      buttons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("tabactive", isActive);
        b.setAttribute("aria-selected", isActive);
      });

      // 2. Smooth transition panels
      panels.forEach((panel) => {
        const isTarget = panel.id === targetId;

        if (isTarget) {
          panel.classList.remove("hidden");
          // Use requestAnimationFrame to ensure the browser registers the state change
          requestAnimationFrame(() => {
            panel.classList.add("opacity-100", "translate-y-0");
            panel.classList.remove("opacity-0", "-translate-y-2");
          });
        } else {
          // Fade out
          panel.classList.add("opacity-0", "-translate-y-2");
          panel.classList.remove("opacity-100", "translate-y-0");

          // Hide after animation finishes
          const hidePanel = () => {
            panel.classList.add("hidden");
            panel.removeEventListener("transitionend", hidePanel);
          };
          panel.addEventListener("transitionend", hidePanel);
        }
      });
    });
  });
});