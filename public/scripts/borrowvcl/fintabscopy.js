document.addEventListener("DOMContentLoaded", () => {
      const tabButtons = document.querySelectorAll(".tab-btn");
      const tabContents = document.querySelectorAll(".tab-content");

      // make first button active
      tabButtons[0].classList.add("active-tab");
      tabContents[0].classList.remove("hidden", "opacity-0", "-translate-y-4");
      tabContents[0].classList.add("opacity-100", "translate-y-0");

      tabButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          tabButtons.forEach((b) => b.classList.remove("active-tab"));

          tabContents.forEach((c) => {
            c.classList.add("hidden", "opacity-0", "-translate-y-4");
            c.classList.remove("opacity-100", "translate-y-0");
          });

          btn.classList.add("active-tab");

          const active = tabContents[index];
          active.classList.remove("hidden");
          setTimeout(() => {
            active.classList.remove("opacity-0", "-translate-y-4");
            active.classList.add("opacity-100", "translate-y-0");
          }, 20);
        });
      });
    });