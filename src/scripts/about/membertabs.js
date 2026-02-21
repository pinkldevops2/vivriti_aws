document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tabteam-btn");
  const panels = document.querySelectorAll(".tabteam-panel");

  const ANIMATION_DELAY = 400;

  // Guard clause (prevents null/undefined errors)
  if (!buttons.length || !panels.length) return;

  const showPanel = (targetId) => {
    panels.forEach((panel) => {
      const isTarget = panel.id === targetId;

      if (isTarget) {
        panel.classList.remove("hidden");

        requestAnimationFrame(() => {
          panel.classList.add("opacity-100", "translate-y-0");
          panel.classList.remove("opacity-0", "-translate-y-2");
        });
      } else {
        panel.classList.add("opacity-0", "-translate-y-2");
        panel.classList.remove("opacity-100", "translate-y-0");

        setTimeout(() => {
          panel.classList.add("hidden");
        }, ANIMATION_DELAY);
      }
    });
  };

  const setActiveButton = (activeBtn) => {
    buttons.forEach((btn) => {
      const isActive = btn === activeBtn;

      btn.setAttribute("aria-selected", String(isActive));
      btn.classList.toggle("tabactive", isActive);
    });
  };

  // Initialize first tab safely
  const firstButton = buttons[0];
  firstButton.classList.add("tabactive");
  firstButton.setAttribute("aria-selected", "true");

  if (firstButton.dataset.tab) {
    showPanel(firstButton.dataset.tab);
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      if (!target) return;

      setActiveButton(btn);
      showPanel(target);
    });
  });
});