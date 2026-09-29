// Desktop only: the page is fixed (no page scroll), so shrink the site's scale
// below its default 80% when the screen is too short to show the sidebar and any
// .fit-screen column (the home page content) in full.
(function () {
  const BASE = 0.8;
  const MIN = 0.55;
  const root = document.documentElement;

  // Height of an element's content, independent of how tall its (stretched) box is
  function contentHeight(el) {
    const last = el.lastElementChild;
    if (!last) return el.offsetHeight;
    const cs = getComputedStyle(el);
    const lastMargin = parseFloat(getComputedStyle(last).marginBottom) || 0;
    return last.offsetTop + last.offsetHeight + lastMargin + parseFloat(cs.paddingBottom) - el.offsetTop;
  }

  function fit() {
    if (window.innerWidth <= 900) {
      root.style.zoom = '';
      return;
    }
    const els = [document.querySelector('.sidebar-col'), ...document.querySelectorAll('.fit-screen')];
    const needed = Math.max(...els.filter(Boolean).map(contentHeight));
    const scale = Math.max(MIN, Math.min(BASE, window.innerHeight / needed));
    root.style.zoom = scale;
  }

  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  if (document.fonts) document.fonts.ready.then(fit);
})();
