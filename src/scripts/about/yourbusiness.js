document.addEventListener('DOMContentLoaded', () => {
      const tabButtons = document.querySelectorAll('.tab-btn');
      const tabContents = document.querySelectorAll('.tab-content');

      tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          // Reset all buttons
          tabButtons.forEach(b => {
            b.classList.remove('active-tab', 'text-blue-600', 'border-blue-600', 'bg-white');
            //b.classList.add('text-gray-700', 'border-transparent');
          });

          // Hide all tab content
          tabContents.forEach(c => {
            c.classList.add('hidden', 'opacity-0', '-translate-y-4');
            c.classList.remove('opacity-100', 'translate-y-0');
          });

          // Activate clicked tab
          btn.classList.add('active-tab', 'text-blue-600', 'border-blue-600', 'bg-white');

          // Show related content
          const activeContent = tabContents[index];
          activeContent.classList.remove('hidden');
          setTimeout(() => {
            activeContent.classList.remove('opacity-0', '-translate-y-4');
            activeContent.classList.add('opacity-100', 'translate-y-0');
          }, 20);
        });
      });
    });