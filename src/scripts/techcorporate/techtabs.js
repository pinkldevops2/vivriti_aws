document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".borrowvcl-btn");
  const panels = document.querySelectorAll(".borrowvcl-panel");

  if (buttons.length === 0) return;

  // 1. Independent UI Update Functions
  const updateButtonState = (activeBtn) => {
    buttons.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle("tabactive", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  };

  const showPanel = (panel) => {
    panel.classList.remove("hidden");
    // Use requestAnimationFrame to ensure the 'hidden' removal is processed
    requestAnimationFrame(() => {
      panel.classList.replace("opacity-0", "opacity-100");
      panel.classList.replace("-translate-y-2", "translate-y-0");
    });
  };

  const hidePanel = (panel) => {
    panel.classList.replace("opacity-100", "opacity-0");
    panel.classList.replace("translate-y-0", "-translate-y-2");
    // Wait for transition (400ms) then hide
    setTimeout(() => panel.classList.add("hidden"), 400);
  };

  // 2. Main Event Handler (Now only 2 levels deep)
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tab;
      
      updateButtonState(btn);

      panels.forEach((panel) => {
        if (panel.id === targetId) {
          showPanel(panel);
        } else {
          hidePanel(panel);
        }
      });
    });
  });

  // 3. Initialize first state
  updateButtonState(buttons[0]);
});