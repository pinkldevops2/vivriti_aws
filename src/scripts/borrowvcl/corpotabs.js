document.addEventListener("DOMContentLoaded", () => {

  /* -------------------- MOBILE ACCORDION -------------------- */
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((acc, index) => {
    const btn = acc.querySelector(".acc-btn");
    const content = acc.querySelector(".acc-content");
    const icon = acc.querySelector(".icon");

    // Open first by default
    if(index === 0) {
      content.classList.add("open");
      icon.classList.add("rotate-up");
    }

    btn.addEventListener("click", () => {

      // Close all others
      accordions.forEach((other, i) => {
        if (i !== index) {
          other.querySelector(".acc-content").classList.remove("open");
          other.querySelector(".icon").classList.remove("rotate-up");
        }
      });

      // Toggle current
      content.classList.toggle("open");
      icon.classList.toggle("rotate-up");
    });
  });

  /* -------------------- DESKTOP TABS -------------------- */
  const corptabButtons = document.querySelectorAll(".corporatetab-btn");
  const corptabContents = document.querySelectorAll(".corporatetab-content");

  corptabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {

      corptabButtons.forEach(b => b.classList.remove("active-tab"));

      corptabContents.forEach(c => {
        c.classList.add("opacity-0", "-translate-y-4");
        c.classList.add("hidden");
      });

      btn.classList.add("active-tab");

      const activeContent = corptabContents[index];
      activeContent.classList.remove("hidden");

      setTimeout(() => {
        activeContent.classList.remove("opacity-0", "-translate-y-4");
        activeContent.classList.add("opacity-100", "translate-y-0");
      }, 20);
    });
  });

});