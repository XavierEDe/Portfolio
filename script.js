

// ======= THEME TOGGLE =======
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ======= NAVBAR SCROLL SHADOW =======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ======= HAMBURGER MENU =======
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileNav.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobileNav() {
  menuOpen = false;
  mobileNav.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ======= SCROLL-TRIGGERED REVEAL ANIMATIONS =======
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ======= ANIMATED COUNTERS =======
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    start = Math.round(eased * target);
    el.textContent = start + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats');
let countersDone = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersDone) {
    countersDone = true;
    document.querySelectorAll('.stat-count').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
    });
  }
}, { threshold: 0.3 });

statsObserver.observe(statsSection);

// ======= CV DOWNLOAD / UPLOAD =======
let cvBlob = null;
let cvFileName = 'DAVID_UDUAK_UDOH_Resume.pdf';

function handleCVDownload() {
  if (cvBlob) {
    const url = URL.createObjectURL(cvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cvFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else {
    const status = document.getElementById('cv-status');
    const input = document.getElementById('cv-input');
    status.textContent = '⬆ Select your CV PDF to enable downloads.';
    input.click();
  }
}

function handleCVUpload(event) {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    cvBlob = file;
    cvFileName = file.name;
    document.getElementById('cv-status').textContent =
      `✅ CV ready: "${file.name}" — Click "Download CV" to download.`;
  } else {
    document.getElementById('cv-status').textContent =
      '⚠ Please select a valid PDF file.';
  }
}

// ======= CONTACT FORM SUBMIT =======
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  const successEl = document.getElementById('formSuccess');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending — integrate Formspree / EmailJS here
  setTimeout(() => {
    successEl.style.display = 'flex';
    btn.textContent = 'Send Message ✈';
    btn.disabled = false;
    document.getElementById('formName').value = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formMessage').value = '';
    setTimeout(() => { successEl.style.display = 'none'; }, 5000);
  }, 1200);
}

// ======= SMOOTH SCROLL FOR NAV LINKS =======
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});