document.addEventListener("DOMContentLoaded", () => {
 document.querySelectorAll(".accordion-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const boxId = btn.dataset.box;

      const content = document.getElementById(targetId);
      const box = document.getElementById(boxId);

      const isOpen =
        content.style.maxHeight && content.style.maxHeight !== "0px";

      // Close all
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("accordion-active");
      });
      document
        .querySelectorAll(".accordion-item div[id^='item-']")
        .forEach((el) => {
          el.style.maxHeight = 0;
        });

      // Open clicked item
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        box.classList.add("accordion-active");
      }
    });
  });

  // LINK CLICK: Scroll + Go to Slider
  document.querySelectorAll(".accordion-item a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior

      // Scroll to the target section smoothly
      const targetSection = document.querySelector(".target-section");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Get slider index from data attribute
      const targetSlider = link.dataset.targetSlider;
      if (targetSlider) {
        // Convert slider id to index (assumes slider-1 = index 0)
        const index = parseInt(targetSlider.split("-")[1], 10) - 1;

        // Dispatch global event for Swiper to listen
        window.dispatchEvent(
          new CustomEvent("go-to-slide", { detail: index })
        );
      }
    });
  });

});