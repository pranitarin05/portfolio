/* ==========================================
   PRANIT GOURAV SAHOO — PORTFOLIO SCRIPT
   SaulDesign PRD
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // --- Project Filtering ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.classList.remove('hidden');
          // Slight delay for animation reset
          setTimeout(() => {
            card.style.display = 'flex';
          }, 50);
        } else {
          card.classList.add('hidden');
          setTimeout(() => {
            card.style.display = 'none';
          }, 400); // Wait for transition to finish
        }
      });
    });
  });

  // --- Form Submission Prevention (for demo) ---
  const contactForm = document.querySelector('.contact-form-card form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sent Successfully! ✓';
      btn.style.background = '#10B981';
      btn.style.color = '#fff';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // --- See More Details Toggle ---
  const seeMoreBtns = document.querySelectorAll('.btn-see-more');
  seeMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      const details = card.querySelector('.project-details');
      
      if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        btn.innerHTML = 'See More →';
      } else {
        details.classList.add('expanded');
        btn.innerHTML = 'See Less ↑';
      }
    });
  });
});
