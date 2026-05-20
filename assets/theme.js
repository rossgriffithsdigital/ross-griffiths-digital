/* ── RGD Theme Toggle ─────────────────────────────────────────────────────
   Handles dark/light mode with a curtain wipe animation.
   Load as a synchronous <script> in <head> to prevent flash of wrong theme.
   ─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var THEME_KEY = 'rgd-theme';
  var html = document.documentElement;

  // ── Apply saved theme immediately (prevents flash on load) ─────────────
  var saved = localStorage.getItem(THEME_KEY);
  if (saved) html.setAttribute('data-theme', saved);

  // ── SVG icons ──────────────────────────────────────────────────────────
  var MOON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var SUN_SVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  // ── Inject shared styles ───────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    /* Curtain overlay */
    '#theme-curtain{',
      'position:fixed;inset:0;',
      'z-index:9997;',
      'background:#3ECFCF;',
      'pointer-events:none;',
      'transform:scaleY(0);',
      'transform-origin:top;',
      'will-change:transform;',
    '}',
    /* Toggle button — circular, 44px tap target */
    '#theme-toggle{',
      'width:44px;height:44px;',
      'border-radius:50%;',
      'border:1px solid var(--border,rgba(62,207,207,0.2));',
      'background:transparent;',
      'color:var(--text-secondary,var(--muted,currentColor));',
      'cursor:pointer;',
      'display:inline-flex;',
      'align-items:center;justify-content:center;',
      'flex-shrink:0;',
      'transition:border-color 0.2s,color 0.2s;',
      'padding:0;',
    '}',
    '#theme-toggle:hover{border-color:#3ECFCF;color:#3ECFCF;}',
    '#theme-toggle svg{pointer-events:none;display:block;}',
    /* Ensure nav sits above the curtain */
    'nav,#nav,#mainNav{z-index:9998!important;}',
    /* Readability baseline — minimum 16px body text on mobile */
    '@media(max-width:768px){',
      'p,li{font-size:1rem;line-height:1.65;}',
      '.footer-nav a,.footer-nav li a{font-size:0.9375rem;}',
    '}',
    /* Paragraph line-height baseline */
    'p{line-height:1.6;}',
    /* Footer nav — minimum 44px tap height on mobile */
    '@media(max-width:768px){',
      '.footer-nav a{min-height:44px;display:flex;align-items:center;}',
    '}',
  ].join('');
  document.head.appendChild(styleEl);

  // ── Init after DOM is ready ────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    // Create curtain div
    var curtain = document.createElement('div');
    curtain.id = 'theme-curtain';
    document.body.appendChild(curtain);

    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    var DUR  = 550;
    var EASE = 'cubic-bezier(0.76,0,0.24,1)';
    var busy = false;

    function isDark() {
      return html.getAttribute('data-theme') !== 'light';
    }

    function syncIcon() {
      btn.innerHTML = isDark() ? MOON_SVG : SUN_SVG;
      btn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    }
    syncIcon();

    btn.addEventListener('click', function () {
      if (busy) return;
      busy = true;
      var next = isDark() ? 'light' : 'dark';

      // Reset curtain position
      curtain.style.transition = 'none';
      curtain.style.transformOrigin = 'top';
      curtain.style.transform = 'scaleY(0)';
      void curtain.offsetHeight; // force reflow

      // Curtain falls
      curtain.style.transition = 'transform ' + DUR + 'ms ' + EASE;
      curtain.style.transform = 'scaleY(1)';

      setTimeout(function () {
        // Apply new theme while curtain covers the page
        html.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
        syncIcon();
        if (typeof window.recolorParticles === 'function') window.recolorParticles();

        // Switch origin so curtain rises from bottom up
        curtain.style.transition = 'none';
        curtain.style.transformOrigin = 'bottom';
        void curtain.offsetHeight; // force reflow

        curtain.style.transition = 'transform ' + DUR + 'ms ' + EASE;
        curtain.style.transform = 'scaleY(0)';

        setTimeout(function () { busy = false; }, DUR + 20);
      }, DUR + 20);
    });
  });
}());
