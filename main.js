/* ================================================
   PRANIT GOURAV SAHOO — PORTFOLIO JAVASCRIPT
   Premium animations, typing effect, cursor glow
   ================================================ */

// ── Cursor Glow ──────────────────────────────────
(function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let rafId;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function update() {
    cx = lerp(cx, mx, 0.1);
    cy = lerp(cy, my, 0.1);
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    rafId = requestAnimationFrame(update);
  }

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  // Hide on touch devices
  window.addEventListener('touchstart', () => {
    cancelAnimationFrame(rafId);
    glow.style.display = 'none';
  }, { once: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    glow.style.display = 'none';
    return;
  }
  update();
})();


// ── Particle Canvas ──────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const COUNT = 80;
  const CONNECT_DIST = 140;
  const MOUSE = { x: null, y: null };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
    };
  }

  function init() { resize(); particles = Array.from({ length: COUNT }, createParticle); }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST) {
          ctx.strokeStyle = `rgba(99,102,241,${(1 - d / CONNECT_DIST) * 0.2})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      if (MOUSE.x !== null) {
        const dx = particles[i].x - MOUSE.x;
        const dy = particles[i].y - MOUSE.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 200) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(MOUSE.x, MOUSE.y);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,102,241,${particles[i].alpha})`;
      ctx.fill();

      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      if (particles[i].x < 0 || particles[i].x > W) particles[i].vx *= -1;
      if (particles[i].y < 0 || particles[i].y > H) particles[i].vy *= -1;
    }
    requestAnimationFrame(draw);
  }

  const hero = document.getElementById('home');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      MOUSE.x = e.clientX - r.left;
      MOUSE.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { MOUSE.x = null; MOUSE.y = null; });
  }

  window.addEventListener('resize', () => {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  init(); draw();
})();


// ── Typing Effect ────────────────────────────────
(function initTyping() {
  const el = document.getElementById('typing-target');
  if (!el) return;

  const text = 'I transform raw, messy data into clear business intelligence — building pipelines, models, and insights that drive measurable outcomes.';
  const SPEED = 12;   // ms per char
  const START_DELAY = 650; // ms — after heading/subtitle appear

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text;
    return;
  }

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, i < 30 ? SPEED + 10 : SPEED);
    }
  }
  setTimeout(type, START_DELAY);
})();


// ── Navbar scroll effect ─────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ── Active nav link highlight ────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe === undefined
  ? null
  : (() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
  })();

// Simpler approach:
const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => secObserver.observe(s));


// ── Mobile hamburger ─────────────────────────────
const hamburger       = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinksContainer.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.forEach(l => l.addEventListener('click', () => navLinksContainer.classList.remove('open')));


// ── Skill-tag group entrance ─────────────────────
const skillGroups = document.querySelectorAll('.skill-group');
const sgObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.skill-tag');
      tags.forEach((tag, j) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.85)';
        tag.style.transition = `opacity 0.35s ease ${j * 0.06}s, transform 0.35s ease ${j * 0.06}s`;
        requestAnimationFrame(() => {
          tag.style.opacity = '1';
          tag.style.transform = 'scale(1)';
        });
      });
      sgObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
skillGroups.forEach(g => sgObs.observe(g));


// ── Project card entrance ─────────────────────────
const projectCards = document.querySelectorAll('.project-card');
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      cardObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

projectCards.forEach(card => {
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(36px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
  cardObs.observe(card);
});


// ── Education card entrance ──────────────────────
const eduCards = document.querySelectorAll('.edu-card');
const eduObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      eduObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

eduCards.forEach(card => {
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(28px)';
  card.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.4,0,0.2,1)';
  eduObs.observe(card);
});


// ── Stat card entrance ───────────────────────────
const statCards = document.querySelectorAll('.stat-card');
const statObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    statCards.forEach((c, i) => {
      setTimeout(() => {
        c.style.opacity   = '1';
        c.style.transform = 'translateY(0)';
      }, i * 90);
    });
    statObs.disconnect();
  }
}, { threshold: 0.3 });

statCards.forEach(c => {
  c.style.opacity   = '0';
  c.style.transform = 'translateY(20px)';
  c.style.transition= 'opacity 0.45s ease, transform 0.45s ease';
});
const aboutSec = document.getElementById('about');
if (aboutSec) statObs.observe(aboutSec);


// ── Generic fade-up for section labels/titles ────
const fadeTargets = document.querySelectorAll('.section-label, .section-title, .section-sub, .about-lead, .pillar, .resume-card');
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `.fade-visible { opacity:1 !important; transform:none !important; }`;
document.head.appendChild(fadeStyle);

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-visible');
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition= 'opacity 0.5s ease, transform 0.5s ease';
  fadeObs.observe(el);
});


// ── Ripple on buttons ────────────────────────────
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      left:${x}px; top:${y}px;
      border-radius:50%;
      background:rgba(255,255,255,0.18);
      transform:scale(0);
      animation:_ripple 0.55s ease-out forwards;
      pointer-events:none;
    `;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

const _rs = document.createElement('style');
_rs.textContent = `@keyframes _ripple { to { transform:scale(1); opacity:0; } }`;
document.head.appendChild(_rs);

// ── Project Details Toggle ────────────────────────
const seeMoreBtns = document.querySelectorAll('.btn-see-more');
seeMoreBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.project-card');
    const details = card.querySelector('.project-details');
    
    if (details.classList.contains('expanded')) {
      details.classList.remove('expanded');
      this.innerHTML = 'See More ➔';
    } else {
      details.classList.add('expanded');
      this.innerHTML = 'See Less ⬆';
    }
  });
});

console.log('%c⚡ Pranit Gourav Sahoo · Portfolio', 'color:#6366f1;font-weight:800;font-size:14px;');
