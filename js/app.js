function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  function handleElementVisibility(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleThreshold = .22; // Adjust this value to control when the fade effect starts
  
      // Calculate the percentage of the element that is visible
      const visiblePercentTop = (rect.top <= 0) ? 1 - (Math.abs(rect.top) / rect.height) : 1;
      const visiblePercentBottom = (rect.bottom >= windowHeight) ? (windowHeight - rect.top) / rect.height : 1;
      const visiblePercent = Math.min(visiblePercentTop, visiblePercentBottom);
  
      if (visiblePercent > visibleThreshold) {
          // Element is entering the viewport
          element.style.opacity = visiblePercent;
          element.classList.add('visible');
      } else {
          // Element is leaving the viewport
          element.style.opacity = 0;
          element.classList.remove('visible');
      }
  }
  function handleScroll() {
      const sections = document.querySelectorAll('.section');
      sections.forEach(handleElementVisibility);
      updateBackgroundColor();
  }
  
  function updateBackgroundColor() {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollPosition / maxScroll;
  
      if (!document.body.classList.contains('dark-mode')) {
          const r = Math.round(248 - (7 * scrollFraction));
          const g = Math.round(244 - (5 * scrollFraction));
          const b = Math.round(232 - (14 * scrollFraction));
          document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      } else {
          // Dark mode gradient
          const startColor = [26, 26, 26]; // #1a1a1a
          const endColor = [40, 40, 40];   // #282828
          const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * scrollFraction);
          const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * scrollFraction);
          const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * scrollFraction);
          document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
  }
  function animateContactItems() {
      const contactItems = document.querySelectorAll('#contact p');
      contactItems.forEach((item, index) => {
          setTimeout(() => {
              item.style.animation = 'popIn 0.5s forwards';
          }, index * 100);
      });
  }
  
  function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      updateBackgroundColor();
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  }
  
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('DOMContentLoaded', () => {
      handleScroll(); // Call this immediately
      window.addEventListener('scroll', handleScroll);
      const darkModeToggleDesktop = document.getElementById('checkbox');
      const darkModeToggleMobile = document.getElementById('checkbox-mobile');
      
      function syncToggles(changedToggle) {
          const otherToggle = changedToggle === darkModeToggleDesktop ? darkModeToggleMobile : darkModeToggleDesktop;
          otherToggle.checked = changedToggle.checked;
      }
  
      if (darkModeToggleDesktop) {
          darkModeToggleDesktop.addEventListener('change', (event) => {
              toggleDarkMode();
              syncToggles(event.target);
          });
      }
  
      if (darkModeToggleMobile) {
          darkModeToggleMobile.addEventListener('change', (event) => {
              toggleDarkMode();
              syncToggles(event.target);
          });
      }
  
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'true') {
          document.body.classList.add('dark-mode');
          updateBackgroundColor();
          if (darkModeToggleDesktop) darkModeToggleDesktop.checked = true;
          if (darkModeToggleMobile) darkModeToggleMobile.checked = true;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      animateContactItems();
                      observer.unobserve(entry.target);
                  }
              });
          });
          observer.observe(contactSection);
      }
  
      const firstSection = document.querySelector('.section');
      if (firstSection) {
          firstSection.classList.add('visible');
      }
      window.dispatchEvent(new Event('scroll'));
  });