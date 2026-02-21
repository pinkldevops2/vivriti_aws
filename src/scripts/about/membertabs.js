document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tabteam-btn");
    const panels = document.querySelectorAll(".tabteam-panel");

    // Initialize first tab as active
    buttons[0].classList.add("tabactive");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;

        // Update active button
        buttons.forEach((b) => {
          const isActive = b === btn;
          b.setAttribute("aria-selected", isActive);
          b.classList.toggle("tabactive", isActive);
        });

        // Smooth transition panels
        panels.forEach((panel) => {
          if (panel.id === target) {
            panel.classList.remove("hidden");
            requestAnimationFrame(() => {
              panel.classList.add("opacity-100", "translate-y-0");
              panel.classList.remove("opacity-0", "-translate-y-2");
            });
          } else {
            panel.classList.add("opacity-0", "-translate-y-2");
            panel.classList.remove("opacity-100", "translate-y-0");
            setTimeout(() => panel.classList.add("hidden"), 400);
          }
        });
      });
    });
  });