document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".borrowvcl-btn");
  const panels = document.querySelectorAll(".borrowvcl-panel");

  // Initialize first tab as active safely
  if (buttons.length > 0) {
    buttons[0].classList.add("tabactive");
    buttons[0].setAttribute("aria-selected", "true");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;

      // Update active button state
      buttons.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle("tabactive", isActive);
        b.setAttribute("aria-selected", String(isActive));
      });

      // Handle panel transitions
      panels.forEach((panel) => {
        const isTarget = panel.id === targetId;

        if (isTarget) {
          panel.classList.remove("hidden");
          // Force reflow to ensure transition runs
          requestAnimationFrame(() => {
            panel.classList.add("opacity-100", "translate-y-0");
            panel.classList.remove("opacity-0", "-translate-y-2");
          });
        } else {
          // Hide non-target panels
          panel.classList.add("opacity-0", "-translate-y-2");
          panel.classList.remove("opacity-100", "translate-y-0");
          // Match timeout to CSS transition duration (400ms)
          setTimeout(() => panel.classList.add("hidden"), 400);
        }
      });
    });
  });
});