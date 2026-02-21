document.addEventListener("DOMContentLoaded", () => {
const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let autoplayInterval;

// 🔹 Core navigation function
function activate(direction) {
  const items = document.querySelectorAll(".item");
  if (!items.length) return;

  // Remove existing active states
  items.forEach(el => el.classList.remove("active", "active-next"));

  if (direction === "next") {
    items[1].classList.add("active-next");
    requestAnimationFrame(() => {
      slider.append(items[0]);
      updateActive();
    });
  } else if (direction === "prev") {
    items[items.length - 1].classList.add("active-next");
    requestAnimationFrame(() => {
      slider.prepend(items[items.length - 1]);
      updateActive();
    });
  }
}

// 🔹 Update active slide after movement
function updateActive() {
  const items = document.querySelectorAll(".item");
  items.forEach(el => el.classList.remove("active"));
  if (items[1]) items[1].classList.add("active");
}

// 🔹 Manual click navigation
nextBtn.addEventListener("click", () => {
  activate("next");
  resetAutoplay();
});
prevBtn.addEventListener("click", () => {
  activate("prev");
  resetAutoplay();
});

// 🔹 Autoplay logic (every 5 seconds)
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    activate("next");
  }, 3000);
}

// 🔹 Reset autoplay timer when user interacts
function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// 🔹 Initialize
updateActive();
startAutoplay();
});