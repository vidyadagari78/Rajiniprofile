/**
 * RAJINI M M — VIBRANT & ANIMATED PORTFOLIO
 * Scroll reveals, dynamic text rotator, animated counter, interactive card glows, and theme switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle with LocalStorage
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('rajini_clean_theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      localStorage.setItem('rajini_clean_theme', isDark ? 'dark' : 'light');
    });
  }

  // 2. Dynamic Rotating Hero Role Text
  const dynamicRoleElem = document.getElementById('dynamicRole');
  if (dynamicRoleElem) {
    const roles = [
      { text: 'Graphic Designer', color: 'var(--color-coral)' },
      { text: 'AI Visual Creator', color: 'var(--color-purple)' },
      { text: 'WordPress & Shopify Builder', color: 'var(--color-blue)' },
      { text: 'Campaign Poster Artist', color: 'var(--color-amber)' }
    ];
    let roleIdx = 0;

    setInterval(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      dynamicRoleElem.classList.add('role-changing');
      
      setTimeout(() => {
        dynamicRoleElem.textContent = roles[roleIdx].text;
        if (dynamicRoleElem.parentElement) {
          dynamicRoleElem.parentElement.style.color = roles[roleIdx].color;
        }
        dynamicRoleElem.classList.remove('role-changing');
      }, 250);
    }, 3200);
  }

  // 3. Scroll Reveal Animations with IntersectionObserver
  const revealCards = document.querySelectorAll('.reveal-card');
  if (revealCards.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealCards.forEach((card, index) => {
      // Add subtle stagger delay to cards in grids
      card.style.transitionDelay = `${(index % 4) * 0.08}s`;
      observer.observe(card);
    });
  }

  // 4. Animated Number Counters
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const animateCounters = () => {
    if (animated) return;
    animated = true;

    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(ease * target);

        // Format single digit with leading zero if original target was single digit
        if (target < 10) {
          counter.textContent = String(currentVal).padStart(2, '0');
        } else {
          counter.textContent = currentVal;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          if (target < 10) {
            counter.textContent = String(target).padStart(2, '0');
          } else {
            counter.textContent = target;
          }
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          statsObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsRow);
  }

  // 5. Interactive 3D Subtle Tilt Effect on Project Cards (Desktop)
  if (window.innerWidth > 768) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 6. Contact Form Submission Handling
  const form = document.getElementById('simpleContactForm');
  const feedback = document.getElementById('formFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        feedback.style.color = '#EF4444';
        feedback.textContent = 'Please fill out all fields.';
        return;
      }

      feedback.style.color = '#10B981';
      feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Preparing email message...';

      const subject = encodeURIComponent(`Project Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Rajini,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nLooking forward to connecting!`
      );

      setTimeout(() => {
        const mailto = `mailto:rajinimm2002@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailto, '_blank');
        form.reset();
        feedback.innerHTML = '<i class="fa-solid fa-sparkles"></i> Message ready in your email app! You can also connect via WhatsApp (+91 9353596948).';
      }, 500);
    });
  }
});
