// Hides the email address from the browser's bottom-left URL preview on hover.
// Browsers show it for any <a href>, so mailto links move their href to data-href and
// clicks are handled here instead. The HTML keeps the real href, so it works without JS.
(function () {
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.dataset.href = a.getAttribute('href');
    a.removeAttribute('href');
    a.setAttribute('role', 'link');
    a.tabIndex = 0;
  });

  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-href]');
    if (!a) return;
    e.preventDefault();
    window.location.href = a.dataset.href;
  });

  document.addEventListener('keydown', e => {
    const a = e.target.closest && e.target.closest('a[data-href]');
    if (a && e.key === 'Enter') window.location.href = a.dataset.href;
  });
})();
