document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".flip-inner");
  const liItems = document.querySelectorAll(".banner_sub_grid li");
  let current = 0;
  let interval;

  // Flip card at given index and adjust height
  const flipCard = (index) => {
    cards.forEach(card => card.classList.remove("auto-flipped"));
    cards[index].classList.add("auto-flipped");

    liItems.forEach((li, i) => {
      const flipInner = li.querySelector(".flip-inner");
      if (i === index) {
        li.style.maxHeight = (flipInner.scrollHeight - 40) + "px"; 
      } else {
        li.style.maxHeight = "250px"; // default fallback
      }
    });
  };

  // Flip first card on page load
  flipCard(current);

  // Automatic flip every 5 seconds
  interval = setInterval(() => {
    current = (current + 1) % cards.length;
    flipCard(current);
  }, 5000);

  // Pause auto-flip on hover
  liItems.forEach((li, i) => {
    li.addEventListener("mouseenter", () => {
      clearInterval(interval);
      flipCard(i); // keep hovered card flipped
    });
    li.addEventListener("mouseleave", () => {
      interval = setInterval(() => {
        current = (current + 1) % cards.length;
        flipCard(current);
      }, 5000);
    });
  });
});