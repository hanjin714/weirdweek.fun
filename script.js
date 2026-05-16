// ============================================
// WeirdWeek.fun — 交互动效
// ============================================

// --- 1. Scroll Reveal (Intersection Observer) ---
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // 逐个延迟出现
      const el = entry.target;
      const siblings = Array.from(el.parentElement?.querySelectorAll('.reveal') || []);
      const index = siblings.indexOf(el);
      const delay = index * 80; // 每个元素延迟 80ms

      setTimeout(() => {
        el.classList.add('revealed');
      }, delay);

      observer.unobserve(el);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -30px 0px'
});

revealEls.forEach(el => observer.observe(el));

// --- 2. Hero Floating Emoji Particles ---
const particlesContainer = document.getElementById('heroParticles');
if (particlesContainer) {
  const emojis = ['🌀', '📦', '😂', '🪞', '🧦', '🍌', '⏰', '💤', '🌧️', '🤔', '✨', '💀'];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${0.8 + Math.random() * 1.8}rem;
      animation: float-up ${3 + Math.random() * 5}s ease-in-out ${Math.random() * 3}s infinite;
      opacity: ${0.15 + Math.random() * 0.25};
    `;
    particlesContainer.appendChild(particle);
  }
}

// --- 3. Card Tilt Effect (3D hover) ---
const cards = document.querySelectorAll('.product-card, .featured-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -6;
    const rotateY = (x - centerX) / centerX * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// --- 4. Counter Animation ---
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const start = performance.now();
      const isFloat = target % 1 !== 0;

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = prefix + (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// --- 5. Header shrink on scroll ---
const header = document.querySelector('.site-header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
  lastScrollY = scrollY;
});

// --- 6. "Back to top" scroll listener for ticker ---
const ticker = document.querySelector('.ticker-bar');
if (ticker && window.scrollY < 10) {
  ticker.style.opacity = '1';
}
