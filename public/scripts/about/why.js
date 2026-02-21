document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".flip-inner");
  const liItems = document.querySelectorAll(".banner_sub_grid li");

  const INTERVAL_TIME = 5000;
  const DEFAULT_HEIGHT = 250;
  const HEIGHT_OFFSET = 40;

  if (!cards.length || !liItems.length) return; // safety guard

  let current = 0;
  let intervalId = null;

  const flipCard = (index) => {
    if (index < 0 || index >= cards.length) return;

    cards.forEach((card) => card.classList.remove("auto-flipped"));
    cards[index].classList.add("auto-flipped");

    liItems.forEach((li, i) => {
      const flipInner = li.querySelector(".flip-inner");
      if (!flipInner) return;

      li.style.maxHeight =
        i === index
          ? `${flipInner.scrollHeight - HEIGHT_OFFSET}px`
          : `${DEFAULT_HEIGHT}px`;
    });
  };

  const startInterval = () => {
    stopInterval(); // prevent duplicate timers

    intervalId = setInterval(() => {
      current = (current + 1) % cards.length;
      flipCard(current);
    }, INTERVAL_TIME);
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // Init
  flipCard(current);
  startInterval();

  // Hover behavior
  liItems.forEach((li, i) => {
    li.addEventListener("mouseenter", () => {
      stopInterval();
      flipCard(i);
    });

    li.addEventListener("mouseleave", startInterval);
  });
});