document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Guard clause (Sonar: avoid unsafe execution)
  if (!tabButtons.length || !tabContents.length) return;

  const ACTIVE_BTN_CLASSES = ['active-tab', 'text-blue-600', 'border-blue-600', 'bg-white'];
  const HIDE_CLASSES = ['hidden', 'opacity-0', '-translate-y-4'];
  const SHOW_CLASSES = ['opacity-100', 'translate-y-0'];
  const ANIMATION_DELAY = 20;

  const resetButtons = () => {
    tabButtons.forEach((button) => {
      button.classList.remove(...ACTIVE_BTN_CLASSES);
    });
  };

  const hideAllContents = () => {
    tabContents.forEach((content) => {
      content.classList.add(...HIDE_CLASSES);
      content.classList.remove(...SHOW_CLASSES);
    });
  };

  const showContent = (content) => {
    if (!content) return;

    content.classList.remove('hidden');

    setTimeout(() => {
      content.classList.remove('opacity-0', '-translate-y-4');
      content.classList.add(...SHOW_CLASSES);
    }, ANIMATION_DELAY);
  };

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      resetButtons();
      hideAllContents();

      button.classList.add(...ACTIVE_BTN_CLASSES);

      const targetContent = tabContents[index];
      showContent(targetContent);
    });
  });
});