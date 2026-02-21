document.addEventListener("DOMContentLoaded", () => {
      const corptabButtons = document.querySelectorAll(".corporatetab-btn");
      const corptabContents = document.querySelectorAll(
        ".corporatetab-content"
      );

      corptabButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          // Reset all buttons
          corptabButtons.forEach((b) => b.classList.remove("active-tab"));

          // Hide all content
          corptabContents.forEach((c) => {
            c.classList.add("hidden", "opacity-0", "-translate-y-4");
            c.classList.remove("opacity-100", "translate-y-0");
          });

          // Activate clicked tab
          btn.classList.add("active-tab");

          // Show correct content
          const activeContent = corptabContents[index];
          activeContent.classList.remove("hidden");
          setTimeout(() => {
            activeContent.classList.remove("opacity-0", "-translate-y-4");
            activeContent.classList.add("opacity-100", "translate-y-0");
          }, 20);
        });
      });
    });