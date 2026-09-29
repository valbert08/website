// Repeat the sidebar navigation at the bottom of the page.
// CSS only shows this copy on narrow screens, where the sidebar sits above the content.
(function () {
  const nav = document.querySelector('.sidebar-col');
  const shell = document.querySelector('.page-shell');
  if (!nav || !shell) return;
  const copy = nav.cloneNode(true);
  copy.classList.add('sidebar-col--bottom');
  copy.setAttribute('aria-label', 'Site navigation');
  shell.appendChild(copy);
})();
