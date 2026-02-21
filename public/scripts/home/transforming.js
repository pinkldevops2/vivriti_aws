import "slick-carousel";

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".flip-inner");
  let current = -1;
  let interval;

  const flipNext = () => {
    // Remove auto flip from all
    cards.forEach(card => card.classList.remove("auto-flipped"));

    // Move to next card
    current = (current + 1) % cards.length;

    // Skip if hovered (so hover always takes priority)
    const hovered = document.querySelector(".group:hover .flip-inner");
    if (hovered) return;

    // Flip next card automatically
    cards[current].classList.add("auto-flipped");
  };

  // Start flipping every 5 seconds
  interval = setInterval(flipNext, 3000);

  // Pause auto flipping while any card is hovered
  cards.forEach(card => {
    card.closest(".group").addEventListener("mouseenter", () => {
      clearInterval(interval);
    });
    card.closest(".group").addEventListener("mouseleave", () => {
      interval = setInterval(flipNext, 3000);
    });
  });
});


/* slick slider */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".driving-impact-slider");

  const start = () => {
    if (!window.$) {
      setTimeout(start, 50);
      return;
    }

    window.$(slider).slick({
      centerMode: true,
      centerPadding: "60px",
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: "40px"
          }
        }
      ]
    });

    // 👇 Set same height = tallest slide
    const equalizeHeight = () => {
      let maxHeight = 0;

      slider.querySelectorAll(".card-wrapper").forEach(card => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
      });

      slider.querySelectorAll(".card-wrapper").forEach(card => {
        card.style.height = maxHeight + "px";
      });
    };

    // Run once Slick finishes
    setTimeout(equalizeHeight, 300);
    window.addEventListener("resize", equalizeHeight);
  };

  start();
});