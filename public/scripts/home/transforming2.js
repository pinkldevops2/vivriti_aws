
if (typeof window !== "undefined") {
    const items = document.querySelectorAll(".banner_sub_grid_item");
    let current = 0;
    let interval;

    // Function to activate an item
    const activateItem = (index) => {
      items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
      current = index;
    };

    // Auto rotation function
    const startRotation = () => {
      interval = setInterval(() => {
        current = (current + 1) % items.length;
        activateItem(current);
      }, 5000); // 5 seconds
    };

    // Stop rotation when hovering, and immediately activate hovered item
    items.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        clearInterval(interval);
        activateItem(index);
      });
      item.addEventListener("mouseleave", () => {
        startRotation();
      });
    });

    // Initial activation and start rotation
    activateItem(0);
    startRotation();
  }