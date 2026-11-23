(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      toggle.setAttribute('aria-label', !open ? 'Close navigation menu' : 'Open navigation menu');
      toggle.textContent = !open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      toggle.textContent = '☰';
      nav.classList.remove('open');
    }));
  }
  document.querySelectorAll('[data-current-year]').forEach(node => node.textContent = String(new Date().getFullYear()));
})();
