document.addEventListener("DOMContentLoaded", () => {

  /**
   * Reusable Toggle Function
   * @param {string} triggerSelector - The buttons/headers to click
   * @param {string} contentSelector - The target content to show/hide
   * @param {Function} callback - Custom logic for adding/removing specific classes
   */
  const setupToggleUI = (triggerSelector, contentSelector, callback) => {
    const triggers = document.querySelectorAll(triggerSelector);
    const contents = document.querySelectorAll(contentSelector);

    triggers.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Handle closing/resetting others
        triggers.forEach((t, i) => {
          if (i !== index) callback(triggers[i], contents[i], false);
        });
        // Toggle current
        callback(btn, contents[index], true);
      });
    });
  };

  /* -------------------- REFACTORED IMPLEMENTATION -------------------- */

  // 1. Mobile Accordion
  setupToggleUI(".acc-btn", ".acc-content", (btn, content, isActive) => {
    const icon = btn.querySelector(".icon"); // specific to accordion
    if (isActive) {
      content.classList.toggle("open");
      icon?.classList.toggle("rotate-up");
    } else {
      content.classList.remove("open");
      icon?.classList.remove("rotate-up");
    }
  });

  // 2. Desktop Tabs
  setupToggleUI(".corporatetab-btn", ".corporatetab-content", (btn, content, isActive) => {
    if (isActive) {
      btn.classList.add("active-tab");
      content.classList.remove("hidden");
      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        content.classList.replace("opacity-0", "opacity-100");
      });
    } else {
      btn.classList.remove("active-tab");
      content.classList.add("hidden", "opacity-0");
    }
  });
});