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