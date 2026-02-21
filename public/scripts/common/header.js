document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");
  const btn = document.getElementById("menu-btn");

  function openMenu() {
    menu.classList.remove("-translate-x-full");
    menu.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
    btn.classList.add("active");
  }

  function closeMenu() {
    menu.classList.add("-translate-x-full");
    menu.classList.remove("translate-x-0");
    overlay.classList.add("hidden");
    btn.classList.remove("active");
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains("translate-x-0");
    isOpen ? closeMenu() : openMenu();
  }

  // Toggle on burger click
  btn.addEventListener("click", toggleMenu);

  // Close when clicking overlay
  overlay.addEventListener("click", closeMenu);

  // Close when clicking any link
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.toggleBorrow = function () {
  const submenu = document.getElementById("borrowSubmenu");
  const icon = document.getElementById("borrowIcon");
  const btn = document.getElementById("borrowBtn");

  const isOpen = !submenu.classList.contains("hidden");

  submenu.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
  btn.setAttribute("aria-expanded", String(!isOpen));
};

window.toggleTech = function () {
  const submenu = document.getElementById("techSubmenu");
  const icon = document.getElementById("techIcon");
  const btn = document.getElementById("techBtn");

  const isOpen = !submenu.classList.contains("hidden");

  submenu.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
  btn.setAttribute("aria-expanded", String(!isOpen));
};
});