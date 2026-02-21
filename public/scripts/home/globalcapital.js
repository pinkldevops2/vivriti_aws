document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content3");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  
  let currentIndex = 0;
  let autoSlideInterval;

  // 1. Helper to manage class states (Avoids nested if/else)
  const toggleState = (element, isActive, activeClass, inactiveClass = "") => {
    if (isActive) {
      element.classList.add(activeClass);
      if (inactiveClass) element.classList.remove(inactiveClass);
      return;
    }
    element.classList.remove(activeClass);
    if (inactiveClass) element.classList.add(inactiveClass);
  };

  function updateTabs(index) {
    // Single loop for tabs
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      toggleState(tab, isActive, "tab-active", "text-[#4B4B4B]");
      // Move font-size to CSS class if possible, but keeping it flat here:
      tab.style.fontSize = isActive ? "" : "18px"; 
    });

    // Single loop for contents
    contents.forEach((c, i) => {
      const isActive = i === index;
      const imgWrap = c.querySelector(".image-wrapper");

      c.classList.toggle("hidden", !isActive);
      
      if (isActive && imgWrap) {
        requestAnimationFrame(() => imgWrap.classList.add("fade-in"));
      } else if (imgWrap) {
        imgWrap.classList.remove("fade-in");
      }
    });

    // Button states
    prev.disabled = index === 0;
    next.disabled = index === tabs.length - 1;
  }

  /* -------------------- EVENT LISTENERS -------------------- */

  const handleInteraction = (newIndex) => {
    currentIndex = newIndex;
    updateTabs(currentIndex);
    restartAutoSlide();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => handleInteraction(i));
  });

  prev.addEventListener("click", () => {
    if (currentIndex > 0) handleInteraction(currentIndex - 1);
  });

  next.addEventListener("click", () => {
    if (currentIndex < tabs.length - 1) handleInteraction(currentIndex + 1);
  });

  /* -------------------- AUTO SLIDE -------------------- */

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

  // Init
  updateTabs(0);
  startAutoSlide();
});