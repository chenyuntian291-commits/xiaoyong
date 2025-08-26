// Mobile nav toggle
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.getElementById('nav-list');
  if (!toggle || !list) return;
  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
})();


