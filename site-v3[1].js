(() => {
  'use strict';
  const root = document.documentElement;
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('q3-navigation');
  const themeButton = document.querySelector('[data-theme-toggle]');

  // Use the visitor's system theme by default. A manual choice is saved locally.
  let storedTheme = null;
  try { storedTheme = localStorage.getItem('qovark-site-theme'); } catch (_) { /* Storage may be unavailable. */ }
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;
  const updateThemeControl = () => {
    if (!themeButton) return;
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : !window.matchMedia('(prefers-color-scheme: light)').matches;
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    themeButton.innerHTML = `<span aria-hidden="true">${isDark ? '☼' : '☾'}</span>`;
  };
  updateThemeControl();
  themeButton?.addEventListener('click', () => {
    const currentIsDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : !window.matchMedia('(prefers-color-scheme: light)').matches;
    const next = currentIsDark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('qovark-site-theme', next); } catch (_) { /* Theme still changes for this visit. */ }
    updateThemeControl();
  });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      menuButton.textContent = isOpen ? '☰' : '×';
      nav.classList.toggle('q3-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menuButton.textContent = '☰';
      nav.classList.remove('q3-open');
    }));
  }

  const guideOptions = {
    chat: { icon: '✦', title: 'Fast Chat', copy: 'Start with a direct conversation. Explore the question, develop the idea or draft what you need.', link: '/fast-chat.html', label: 'Explore Fast Chat', note: 'When you are ready, sign in to open the QOVARK workspace.' },
    analysis: { icon: '⌘', title: 'Deep Analysis', copy: 'Use a structured task when you need to combine supported source material, a task category and detailed instructions.', link: '/deep-analysis.html', label: 'Explore Deep Analysis', note: 'Supported files, limits and available services depend on your account and the active workspace.' },
    review: { icon: '◇', title: 'Expert Review', copy: 'Learn about the separate workflow for submitting eligible work for specialist feedback.', link: '/expert-review.html', label: 'Explore Expert Review', note: 'Service availability and eligibility apply. The guide does not submit a review request.' },
    organize: { icon: '▤', title: 'Files, Pages & Alerts', copy: 'Find out how workspace files, generated reports and activity updates are organized.', link: '/files-and-pages.html', label: 'Explore workspace tools', note: 'Sign in to view the resources and activity associated with your account.' }
  };
  const question = document.querySelector('[data-guide-question]');
  const result = document.querySelector('[data-guide-result]');
  const resultIcon = document.querySelector('[data-result-icon]');
  const resultTitle = document.querySelector('[data-result-title]');
  const resultCopy = document.querySelector('[data-result-copy]');
  const resultLink = document.querySelector('[data-result-link]');
  const resultNote = document.querySelector('[data-result-note]');
  const resetButton = document.querySelector('[data-guide-reset]');

  question?.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    const selected = guideOptions[button.dataset.choice];
    if (!selected || !result || !question) return;
    resultIcon.textContent = selected.icon;
    resultTitle.textContent = selected.title;
    resultCopy.textContent = selected.copy;
    resultLink.href = selected.link;
    resultLink.innerHTML = `${selected.label} <span aria-hidden="true">↗</span>`;
    resultNote.textContent = selected.note;
    question.hidden = true;
    result.hidden = false;
    result.querySelector('[data-guide-reset]')?.focus();
  }));
  resetButton?.addEventListener('click', () => {
    if (!result || !question) return;
    result.hidden = true;
    question.hidden = false;
    question.querySelector('[data-choice]')?.focus();
  });

  document.querySelectorAll('[data-current-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });
})();
