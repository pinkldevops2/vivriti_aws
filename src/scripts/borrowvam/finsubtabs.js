document.addEventListener("DOMContentLoaded", () => {

  /**
   * Generic handler for UI components that require 
   * "Single Item Active" behavior (Tabs, Accordions, etc.)
   */
  const setupToggleUI = (triggers, contents, onToggle) => {
    triggers.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // 1. Reset all others
        triggers.forEach((_, i) => {
          if (i !== index) onToggle(triggers[i], contents[i], false);
        });
        // 2. Toggle current
        onToggle(btn, contents[index], true);
      });
    });
  };

  /* -------------------- MOBILE ACCORDION -------------------- */
  const instAccordions = document.querySelectorAll(".inst-accordion");
  const accButtons = Array.from(instAccordions).map(acc => acc.querySelector(".inst-acc-btn"));
  const accContents = Array.from(instAccordions).map(acc => acc.querySelector(".inst-acc-content"));

  setupToggleUI(accButtons, accContents, (btn, content, isActive) => {
    const icon = btn.querySelector(".icon");
    if (isActive) {
      content.classList.toggle("open");
      icon.classList.toggle("rotate-up");
    } else {
      content.classList.remove("open");
      icon.classList.remove("rotate-up");
    }
  });

  /* -------------------- DESKTOP TABS -------------------- */
  const instTabButtons = document.querySelectorAll(".inst-tab-btn");
  const instTabContents = document.querySelectorAll(".inst-tab-content");

  setupToggleUI(instTabButtons, instTabContents, (btn, content, isActive) => {
    if (isActive) {
      btn.classList.add("active-tab");
      content.classList.remove("hidden");
      setTimeout(() => {
        content.classList.remove("opacity-0", "-translate-y-4");
        content.classList.add("opacity-100", "translate-y-0");
      }, 20);
    } else {
      btn.classList.remove("active-tab");
      content.classList.add("hidden", "opacity-0", "-translate-y-4");
      content.classList.remove("opacity-100", "translate-y-0");
    }
  });

  // Handle Initial State: Trigger click on the first items
  if (accButtons[0]) accButtons[0].click();
  if (instTabButtons[0]) instTabButtons[0].click();
});