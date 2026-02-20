document.addEventListener("DOMContentLoaded", () => {

  /**
   * Helper to reset all items except the active one.
   * This removes one level of nesting from the main setup function.
   */
  const resetSiblings = (triggers, contents, activeIndex, onToggle) => {
    triggers.forEach((_, i) => {
      if (i !== activeIndex) {
        onToggle(triggers[i], contents[i], false);
      }
    });
  };

  /**
   * Generic handler with flattened logic
   */
  const setupToggleUI = (triggers, contents, onToggle) => {
    triggers.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Flattened: Reset logic moved to external function
        resetSiblings(triggers, contents, index, onToggle);
        
        // Toggle current
        onToggle(btn, contents[index], true);
      });
    });
  };

  /* -------------------- MOBILE ACCORDION -------------------- */
  const instAccordions = document.querySelectorAll(".inst-accordion");
  const accButtons = Array.from(instAccordions).map(acc => acc.querySelector(".inst-acc-btn"));
  const accContents = Array.from(instAccordions).map(acc => acc.querySelector(".inst-acc-content"));

  const handleAccordionToggle = (btn, content, isActive) => {
    const icon = btn.querySelector(".icon");
    const method = isActive ? "toggle" : "remove";
    
    content.classList[method]("open");
    icon?.classList[method]("rotate-up");
  };

  setupToggleUI(accButtons, accContents, handleAccordionToggle);

  /* -------------------- DESKTOP TABS -------------------- */
  const instTabButtons = document.querySelectorAll(".inst-tab-btn");
  const instTabContents = document.querySelectorAll(".inst-tab-content");

  const handleTabToggle = (btn, content, isActive) => {
    if (!isActive) {
      btn.classList.remove("active-tab");
      content.classList.add("hidden", "opacity-0", "-translate-y-4");
      content.classList.remove("opacity-100", "translate-y-0");
      return;
    }

    btn.classList.add("active-tab");
    content.classList.remove("hidden");
    // Use requestAnimationFrame for cleaner timing than setTimeout(20)
    requestAnimationFrame(() => {
      content.classList.remove("opacity-0", "-translate-y-4");
      content.classList.add("opacity-100", "translate-y-0");
    });
  };

  setupToggleUI(instTabButtons, instTabContents, handleTabToggle);

  // Initialize
  if (accButtons[0]) accButtons[0].click();
  if (instTabButtons[0]) instTabButtons[0].click();
});