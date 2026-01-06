// Theme toggle functionality
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const html = document.documentElement;

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', currentTheme);

  // Update toggle button icons
  function updateToggleIcon(theme) {
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (theme === 'dark') {
        icon.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
      } else {
        icon.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }

    if (mobileThemeToggle) {
      const mobileIcon = mobileThemeToggle.querySelector('.theme-icon');
      mobileIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  updateToggleIcon(currentTheme);

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
  }

  // Desktop toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile toggle
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // Listen for system theme changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      updateToggleIcon(newTheme);
    }
  });
})();
