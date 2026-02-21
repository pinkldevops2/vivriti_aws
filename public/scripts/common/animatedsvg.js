document.addEventListener("DOMContentLoaded", function () {
  const lines = document.querySelectorAll(".dashedLine");

  lines.forEach((line, i) => {
    // reset dash so animation is consistent
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = 0;

    gsap.to(line, {
      strokeDashoffset: -100,
      duration: 10,
      ease: "none",
      repeat: -1,
      delay: i * 0.2
    });
  });
});