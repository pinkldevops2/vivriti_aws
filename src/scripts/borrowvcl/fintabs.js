document.addEventListener("DOMContentLoaded", () => {

  /**
   * Helper: Resets all inactive siblings.
   * Moving this here removes one level of nesting from the main setup.
   */
  const deactivateSiblings = (triggers, contents, activeIndex, onToggle) => {
    triggers.forEach((_, i) => {
      if (i !== activeIndex) {
        onToggle(triggers[i], contents[i], false);
      }
    });
  };

  /**
   * Main Setup: Orchestrates the click events
   */
  const setupExclusiveToggle = (triggers, contents, onToggle) => {
    triggers.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        deactivateSiblings(triggers, contents, index, onToggle);
        onToggle(btn, contents[index], true);
      });
    });
  };

  /* -------------------- HANDLERS (Level 1 Nesting) -------------------- */

  const handleAccordion = (btn, content, shouldActive) => {
    const icon = btn.querySelector(".icon");
    const method = shouldActive ? "toggle" : "remove";
    
    content.classList[method]("open");
    icon?.classList[method]("rotate-up");
  };

  const handleTabs = (btn, content, shouldActive) => {
    if (!shouldActive) {
      btn.classList.remove("active-tab");
      content.classList.add("hidden", "opacity-0", "-translate-y-4");
      content.classList.remove("opacity-100", "translate-y-0");
      return; // Early return prevents "else" nesting
    }

    btn.classList.add("active-tab");
    content.classList.remove("hidden");
    // Use requestAnimationFrame for cleaner UI threading
    requestAnimationFrame(() => {
      content.classList.remove("opacity-0", "-translate-y-4");
      content.classList.add("opacity-100", "translate-y-0");
    });
  };

  /* -------------------- INITIALIZATION -------------------- */

  const instAccordions = document.querySelectorAll(".inst-accordion");
  const accButtons = Array.from(instAccordions).map(acc => acc.querySelector(".inst-acc-btn"));
  const accContents = Array.from(instAccordions).map(acc => acc.querySelector(".inst-acc-content"));

  const instTabButtons = document.querySelectorAll(".inst-tab-btn");
  const instTabContents = document.querySelectorAll(".inst-tab-content");

  // Execute
  setupExclusiveToggle(accButtons, accContents, handleAccordion);
  setupExclusiveToggle(instTabButtons, instTabContents, handleTabs);

  // Default states
  if (accButtons[0]) accButtons[0].click();
  if (instTabButtons[0]) instTabButtons[0].click();
});