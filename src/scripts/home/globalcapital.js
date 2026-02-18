document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".content3");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    let currentIndex = 0;
    let autoSlideInterval;

    function updateTabs(index) {
      tabs.forEach((tab, i) => {
        if (i === index) {
          tab.classList.add("tab-active");
          tab.classList.remove("text-[#4B4B4B]");
        } else {
          tab.classList.remove("tab-active");
          tab.classList.add("text-[#4B4B4B]");
          tab.style.fontSize = "18px";
        }
      });

      contents.forEach((c, i) => {
        const imgWrap = c.querySelector(".image-wrapper");
        if (i === index) {
          c.classList.remove("hidden");
          requestAnimationFrame(() => {
            imgWrap.classList.add("fade-in");
          });
        } else {
          c.classList.add("hidden");
          imgWrap.classList.remove("fade-in");
        }
      });

      prev.disabled = index === 0;
      next.disabled = index === tabs.length - 1;
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => {
        currentIndex = i;
        updateTabs(currentIndex);
        restartAutoSlide();
      });
    });

    prev.addEventListener("click", () => {
      if (currentIndex > 0) currentIndex--;
      updateTabs(currentIndex);
      restartAutoSlide();
    });

    next.addEventListener("click", () => {
      if (currentIndex < tabs.length - 1) currentIndex++;
      updateTabs(currentIndex);
      restartAutoSlide();
    });

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabs.length;
        updateTabs(currentIndex);
      }, 5000);
    }

    function restartAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    updateTabs(0);
    startAutoSlide();
    });