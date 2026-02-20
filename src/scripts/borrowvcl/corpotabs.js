document.addEventListener("DOMContentLoaded", () => {

  /**
   * Helper: Resets all inactive siblings
   */
  const resetInactiveItems = (triggers, contents, activeIndex, callback) => {
    triggers.forEach((_, i) => {
      if (i !== activeIndex) {
        callback(triggers[i], contents[i], false);
      }
    });
  };

  /**
   * Main Setup: Flattened to 2 levels of nesting
   */
  const setupToggleUI = (triggerSelector, contentSelector, callback) => {
    const triggers = document.querySelectorAll(triggerSelector);
    const contents = document.querySelectorAll(contentSelector);

    triggers.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        resetInactiveItems(triggers, contents, index, callback);
        callback(btn, contents[index], true);
      });
    });
  };

  /* -------------------- LOGIC HANDLERS -------------------- */

  const handleAccordion = (btn, content, isActive) => {
    const icon = btn.querySelector(".icon");
    const action = isActive ? "toggle" : "remove";
    
    content.classList[action]("open");
    icon?.classList[action]("rotate-up");
  };

  const handleTabs = (btn, content, isActive) => {
    if (!isActive) {
      btn.classList.remove("active-tab");
      content.classList.add("hidden", "opacity-0");
      return;
    }

    btn.classList.add("active-tab");
    content.classList.remove("hidden");
    requestAnimationFrame(() => {
      content.classList.replace("opacity-0", "opacity-100");
    });
  };

  /* -------------------- EXECUTION -------------------- */

  setupToggleUI(".acc-btn", ".acc-content", handleAccordion);
  setupToggleUI(".corporatetab-btn", ".corporatetab-content", handleTabs);
});