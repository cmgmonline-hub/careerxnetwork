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
// This is a static site with no backend. The form currently confirms
// submission locally. To actually collect responses, wire the `action`
// of #joinForm to a form service (Formspree, Getform, a Google Form,
// or your own endpoint) — see README.md for notes.
const joinForm = document.getElementById('joinForm');
const joinNote = document.getElementById('joinNote');

joinForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = joinForm.elements.namedItem('name');
  joinNote.textContent = `Thanks${name?.value ? ', ' + name.value : ''} — this form isn't connected to anything yet. See README.md to wire it up to email or a form service.`;
  joinForm.reset();
});
