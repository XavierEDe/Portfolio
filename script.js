var html = document.documentElement;
var savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
document.getElementById('themeIcon').innerHTML = savedTheme === 'dark' ? '<svg width="15" height="15"><use href="#i-moon"/></svg>' : '<svg width="15" height="15"><use href="#i-sun"/></svg>';

document.getElementById('themeToggle').addEventListener('click', function () {
  var current = html.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  document.getElementById('themeIcon').innerHTML = next === 'dark' ? '<svg width="15" height="15"><use href="#i-moon"/></svg>' : '<svg width="15" height="15"><use href="#i-sun"/></svg>';
});

// ======= NAVBAR SCROLL SHADOW =======
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ======= HAMBURGER MENU =======
var menuOpen = false;

document.getElementById('hamburger').addEventListener('click', function () {
  menuOpen = !menuOpen;
  document.getElementById('mobileNav').classList.toggle('open', menuOpen);
  var spans = this.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobileNav() {
  menuOpen = false;
  document.getElementById('mobileNav').classList.remove('open');
  var spans = document.getElementById('hamburger').querySelectorAll('span');
  spans.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
}

// ======= SCROLL REVEAL =======
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

// ======= ANIMATED COUNTERS =======
function animateCounter(el, target, suffix) {
  var startTime = performance.now();
  var duration = 1800;
  function update(now) {
    var progress = Math.min((now - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

var countersDone = false;
new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && !countersDone) {
    countersDone = true;
    document.querySelectorAll('.stat-count').forEach(function (el) {
      animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix || '');
    });
  }
}, { threshold: 0.3 }).observe(document.getElementById('stats'));

// ======= CONTACT FORM =======
function handleFormSubmit(e) {
  e.preventDefault();
  var btn = e.target.querySelector('.form-btn');
  var successEl = document.getElementById('formSuccess');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(function () {
    successEl.style.display = 'flex';
    btn.textContent = 'Send Message';
    btn.disabled = false;
    document.getElementById('formName').value = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formMessage').value = '';
    setTimeout(function () { successEl.style.display = 'none'; }, 5000);
  }, 1200);
}

// ======= SMOOTH SCROLL =======
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ======= CERTIFICATE MODAL =======
// Called from cert cards: openCertModal(title, org, year, issuer, imgSrc)
function openCertModal(title, org, year, issuer, imgSrc) {
  document.getElementById('modalTitle').textContent  = title;
  document.getElementById('modalOrg').textContent    = org;
  document.getElementById('modalYear').textContent   = year;
  document.getElementById('modalIssuer').textContent = issuer;
  document.getElementById('modalRibbon').textContent = issuer;

  var imgEl   = document.getElementById('modalCertImg');
  var emojiEl = document.getElementById('modalEmoji');
  var badge   = document.getElementById('modalBadge');

  if (imgSrc) {
    imgEl.src              = imgSrc;
    imgEl.style.display    = 'block';
    emojiEl.style.display  = 'none';
    emojiEl.textContent    = '';
    badge.style.background = 'var(--bg-3)';
  } else {
    imgEl.style.display    = 'none';
    imgEl.src              = '';
    emojiEl.style.display  = 'flex';
    emojiEl.textContent    = '🏆';
    badge.style.background = 'linear-gradient(135deg,#0a2040,#003380)';
  }

  document.getElementById('certModalOverlay').classList.add('active');
  document.body.classList.add('modal-open');
}

function closeCertModal() {
  document.getElementById('certModalOverlay').classList.remove('active');
  document.body.classList.remove('modal-open');
}

// Backdrop click closes modal
document.getElementById('certModalOverlay').addEventListener('click', function (e) {
  if (e.target === this) closeCertModal();
});

document.getElementById('certModalCloseBtn').addEventListener('click', closeCertModal);
document.getElementById('certModalCloseBtn2').addEventListener('click', closeCertModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeCertModal();
});