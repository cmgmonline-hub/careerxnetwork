// CareerX Network — small progressive-enhancement script.
// No frameworks, no build step: this is a static site by design.

document.getElementById('year').textContent = new Date().getFullYear();

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// --- Scroll reveal for sections ---
const revealTargets = document.querySelectorAll(
  '.mission__inner, .pillar-card, .timeline__node, .event-row, .join__card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

// --- Join form ---
// This is a static site with no backend, so submissions go straight to
// Web3Forms (see the hidden "access_key" field in index.html). Until you
// swap in your real access key, this shows a reminder instead of silently
// failing. Once a real key is set, submissions are sent via fetch so the
// visitor stays on the page and sees an inline success/error message.
const joinForm = document.getElementById('joinForm');
const joinNote = document.getElementById('joinNote');
const joinSubmitBtn = joinForm?.querySelector('button[type="submit"]');

joinForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const accessKey = joinForm.elements.namedItem('access_key');
  const name = joinForm.elements.namedItem('name');

  if (!accessKey || accessKey.value === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    joinNote.textContent = `Thanks${name?.value ? ', ' + name.value : ''} — this form isn't connected to an email service yet. Replace YOUR_WEB3FORMS_ACCESS_KEY in index.html with your real Web3Forms access key.`;
    joinForm.reset();
    return;
  }

  joinSubmitBtn.disabled = true;
  joinNote.textContent = 'Sending…';

  try {
    const response = await fetch(joinForm.action, {
      method: 'POST',
      body: new FormData(joinForm),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();

    if (response.ok && result.success) {
      joinNote.textContent = `Thanks${name?.value ? ', ' + name.value : ''} — we've got your info and will be in touch.`;
      joinForm.reset();
    } else {
      joinNote.textContent = 'Something went wrong sending that — please try again in a moment.';
    }
  } catch (err) {
    joinNote.textContent = 'Something went wrong sending that — please check your connection and try again.';
  } finally {
    joinSubmitBtn.disabled = false;
  }
});
