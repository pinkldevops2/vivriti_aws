document.addEventListener("DOMContentLoaded", init);

function init() {
  const buttons = [...document.querySelectorAll(".tab-btn")];
  const panels = [...document.querySelectorAll(".tab-panel")];

  if (!buttons.length || !panels.length) return;

  activateTab(buttons[0].dataset.tab, buttons, panels);

  buttons.forEach(btn =>
    btn.addEventListener("click", () =>
      activateTab(btn.dataset.tab, buttons, panels)
    )
  );
}

/* ---------- Core ---------- */

function activateTab(id, buttons, panels) {
  setActiveButton(id, buttons);
  panels.forEach(p => (p.id === id ? show(p) : hide(p)));
}

/* ---------- Helpers ---------- */

function setActiveButton(id, buttons) {
  buttons.forEach(btn => {
    const active = btn.dataset.tab === id;
    btn.classList.toggle("tabactive", active);
    btn.setAttribute("aria-selected", active);
  });
}

function show(panel) {
  panel.classList.remove("hidden");

  requestAnimationFrame(() => {
    panel.classList.remove("opacity-0", "-translate-y-2");
    panel.classList.add("opacity-100", "translate-y-0");
  });
}

function hide(panel) {
  panel.classList.add("opacity-0", "-translate-y-2");
  panel.classList.remove("opacity-100", "translate-y-0");

  // wait for animation to finish (match your CSS duration, e.g., 300ms)
  setTimeout(() => {
    panel.classList.add("hidden");
  }, 300);
}