document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".flip-inner");
  const liItems = document.querySelectorAll(".banner_sub_grid li");

  const FLIP_INTERVAL = 5000;
  const DEFAULT_HEIGHT = 250;
  const HEIGHT_OFFSET = 40;

  // Guard clause (prevents runtime errors)
  if (!cards.length || !liItems.length) return;

  let current = 0;
  let intervalId = null;

  const clearAutoFlip = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const startAutoFlip = () => {
    clearAutoFlip();

    intervalId = setInterval(() => {
      current = (current + 1) % cards.length;
      flipCard(current);
    }, FLIP_INTERVAL);
  };

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

  // Initial state
  flipCard(current);
  startAutoFlip();

  // Hover handling
  liItems.forEach((li, i) => {
    li.addEventListener("mouseenter", () => {
      clearAutoFlip();
      flipCard(i);
    });

    li.addEventListener("mouseleave", startAutoFlip);
  });
});