// Main JavaScript functionality
(function() {
  // Dynamic copyright year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    const startYear = 2025;
    copyrightYear.textContent = currentYear > startYear ? `${startYear}-${currentYear}` : currentYear;
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      }
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll-based header shadow
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 20) {
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Copy email to clipboard
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const valueElement = this.querySelector('.contact-value');
      const email = valueElement ? valueElement.textContent : this.textContent;

      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          if (valueElement) {
            const originalText = valueElement.textContent;
            valueElement.textContent = 'Copied!';
            valueElement.classList.add('copied');

            setTimeout(() => {
              valueElement.textContent = originalText;
              valueElement.classList.remove('copied');
            }, 2000);
          } else {
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.classList.add('copied');

            setTimeout(() => {
              this.textContent = originalText;
              this.classList.remove('copied');
            }, 2000);
          }
        });
      }
    });
  });

  // External link handling
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // Add pulsing animation to availability badge
  const badge = document.querySelector('.availability-badge');
  if (badge) {
    setInterval(() => {
      badge.style.animation = 'none';
      setTimeout(() => {
        badge.style.animation = 'pulse 2s ease-in-out infinite';
      }, 10);
    }, 5000);
  }

  // Back to top button functionality
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Fetch GitHub stars
  async function fetchGitHubStars() {
    try {
      const response = await fetch('https://api.github.com/repos/AnjanJ/rails_error_dashboard');
      const data = await response.json();
      const starsElement = document.getElementById('github-stars');
      if (starsElement && data.stargazers_count !== undefined) {
        starsElement.textContent = data.stargazers_count.toLocaleString();
      }
    } catch (error) {
      console.log('Could not fetch GitHub stars');
    }
  }

  // Fetch RubyGems downloads
  async function fetchRubyGemsDownloads() {
    try {
      const response = await fetch('https://rubygems.org/api/v1/gems/rails_error_dashboard.json');
      const data = await response.json();
      const downloadsElement = document.getElementById('rubygems-downloads');
      if (downloadsElement && data.downloads !== undefined) {
        downloadsElement.textContent = data.downloads.toLocaleString();
      }
    } catch (error) {
      console.log('Could not fetch RubyGems downloads');
    }
  }

  // Fetch metrics on page load
  if (document.getElementById('github-stars')) {
    fetchGitHubStars();
  }
  if (document.getElementById('rubygems-downloads')) {
    fetchRubyGemsDownloads();
  }
})();
