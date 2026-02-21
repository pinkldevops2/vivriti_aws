document.addEventListener("DOMContentLoaded", () => {
  const lines2 = document.querySelectorAll(".dashedLine2");

  lines2.forEach((line, i) => {
    gsap.to(line, {
      strokeDashoffset: -100,
      duration: 10,
      ease: "none",
      repeat: -1,
      delay: i * 0.2
    });
  });
});