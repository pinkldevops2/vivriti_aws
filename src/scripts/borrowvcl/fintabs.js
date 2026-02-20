document.addEventListener("DOMContentLoaded", () => {

  /**
   * Generic handler for UI components that require 
   * "Single Item Active" behavior (Tabs, Accordions, etc.)
   */
  const setupExclusiveToggle = (triggers, contents, onToggle) => {
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

  setupExclusiveToggle(accButtons, accContents, (btn, content, shouldBeActive) => {
    const icon = btn.querySelector(".icon");
    if (shouldBeActive) {
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

  setupExclusiveToggle(instTabButtons, instTabContents, (btn, content, shouldBeActive) => {
    if (shouldBeActive) {
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

  // Handle Initial State (Open first items)
  // This satisfies your requirement of having the first one open by default
  accButtons[0].click(); 
  instTabButtons[0].click();
});