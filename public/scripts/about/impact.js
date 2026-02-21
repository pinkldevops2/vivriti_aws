document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".bars");

    function countUp(element, target, duration = 1000) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        if (element.textContent.includes("₹")) {
          element.textContent = "₹" + Math.floor(start).toLocaleString() + "+";
        } else {
          element.textContent = Math.floor(start) + "+";
        }
      }, 16);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.animationPlayState = "running";
            setTimeout(() => {
              bar.classList.add("show-text");
              const num = bar.querySelector("[data-target]");
              if (num) countUp(num, parseInt(num.dataset.target));
            }, 100);
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach((bar) => observer.observe(bar));
  });