// Theme toggle functionality
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const navThemeToggle = document.getElementById('nav-theme-toggle');
  const html = document.documentElement;

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', currentTheme);

  // Update toggle button icons and text
  function updateToggleUI(theme) {
    // Update desktop fixed toggle
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      icon.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }

    // Update mobile nav toggle
    const navIcon = navThemeToggle.querySelector('.theme-icon');
    const navText = navThemeToggle.querySelector('.theme-text');
    if (theme === 'dark') {
      navIcon.textContent = '☀️';
      navText.textContent = 'Switch to Light Mode';
      navThemeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      navIcon.textContent = '🌙';
      navText.textContent = 'Switch to Dark Mode';
      navThemeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  updateToggleUI(currentTheme);

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleUI(newTheme);
  }

  // Add click handlers to both toggles
  themeToggle.addEventListener('click', toggleTheme);
  navThemeToggle.addEventListener('click', toggleTheme);

  // Listen for system theme changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      updateToggleUI(newTheme);
    }
  });
})();
