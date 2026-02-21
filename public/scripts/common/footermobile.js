document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll('.footer-accordion');

  accordions.forEach((accordion) => {
    const header = accordion.querySelector('.accordion-header');
    const content = accordion.querySelector('.accordion-content');
    const icon = accordion.querySelector('.accordion-icon');

    header.addEventListener('click', () => {
      accordions.forEach((other) => {
        const otherContent = other.querySelector('.accordion-content');
        const otherIcon = other.querySelector('.accordion-icon');
        if (other !== accordion) {
          otherContent.style.maxHeight = '0';
          otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
      if (isOpen) {
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
   });