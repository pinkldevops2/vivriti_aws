document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion-item");

    // --- Open the first accordion by default ---
    if (accordions.length > 0) {
      const first = accordions[0];
      const firstContent = first.querySelector(".accordion-content");
      const firstIcon = first.querySelector("svg");
      firstContent.classList.remove("max-h-0");
      firstContent.classList.add("max-h-[1000px]");
      firstIcon.classList.add("rotate-180");
    }

    // --- Add toggle logic for each accordion ---
    accordions.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");
      const icon = header.querySelector("svg");

      header.addEventListener("click", () => {
        const isOpen = content.classList.contains("max-h-[1000px]");

        // Close all accordions
        accordions.forEach((i) => {
          i.querySelector(".accordion-content").classList.remove(
            "max-h-[1000px]"
          );
          i.querySelector(".accordion-content").classList.add("max-h-0");
          i.querySelector("svg").classList.remove("rotate-180");
        });

        // Open clicked one if it wasn't open already
        if (!isOpen) {
          content.classList.remove("max-h-0");
          content.classList.add("max-h-[1000px]");
          icon.classList.add("rotate-180");
        }
      });
    });
  });