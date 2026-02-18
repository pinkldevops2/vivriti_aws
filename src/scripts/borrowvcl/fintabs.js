document.addEventListener("DOMContentLoaded", () => {

  /* -------------------- MOBILE ACCORDION -------------------- */
  const instAccordions = document.querySelectorAll(".inst-accordion");
  instAccordions.forEach((acc, index) => {
    const btn = acc.querySelector(".inst-acc-btn");
    const content = acc.querySelector(".inst-acc-content");
    const icon = btn.querySelector(".icon");

    // Open first by default
    if(index === 0) {
      content.classList.add("open");
      icon.classList.add("rotate-up");
    }

    btn.addEventListener("click", () => {

      // Close all others
      instAccordions.forEach((other, i) => {
        if (i !== index) {
          other.querySelector(".inst-acc-content").classList.remove("open");
          other.querySelector(".inst-acc-btn .icon").classList.remove("rotate-up");
        }
      });

      // Toggle current
      content.classList.toggle("open");
      icon.classList.toggle("rotate-up");
    });
  });

  /* -------------------- DESKTOP TABS -------------------- */
  const instTabButtons = document.querySelectorAll(".inst-tab-btn");
  const instTabContents = document.querySelectorAll(".inst-tab-content");

  // Make first tab active
  instTabButtons[0].classList.add("active-tab");
  instTabContents[0].classList.remove("hidden", "opacity-0", "-translate-y-4");
  instTabContents[0].classList.add("opacity-100", "translate-y-0");

  instTabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {

      instTabButtons.forEach(b => b.classList.remove("active-tab"));

      instTabContents.forEach(c => {
        c.classList.add("hidden", "opacity-0", "-translate-y-4");
        c.classList.remove("opacity-100", "translate-y-0");
      });

      btn.classList.add("active-tab");

      const active = instTabContents[index];
      active.classList.remove("hidden");
      setTimeout(() => {
        active.classList.remove("opacity-0", "-translate-y-4");
        active.classList.add("opacity-100", "translate-y-0");
      }, 20);
    });
  });

});