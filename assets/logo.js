/* =========================================================
   Modulabz Interiors logo — vector rebuild of the client's logo
   (brown hexagon, navy house/arch, brown centre bar, MODULABZ /
   INTERIORS + sofa). Navy parts use currentColor so the logo
   works on light and dark backgrounds.
   Usage: <span data-logo="h"></span> (horizontal) or data-logo="stack".
   Original artwork: assets/logo-original.png
   ========================================================= */
(function () {
  const BROWN = '#9C5F16';
  const GOLD = '#C9A36A';

  // Mark drawn in a 100×100 box
  const mark = (x, y, s) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="${BROWN}" stroke-width="6.2" stroke-linejoin="miter"/>
      <path d="M26.5 69 V32.5 L50 19.5 L73.5 32.5 V69" fill="none" stroke="currentColor" stroke-width="6.4" stroke-linejoin="miter"/>
      <path d="M50 35 V74" stroke="${BROWN}" stroke-width="5.4" stroke-linecap="round"/>
    </g>`;

  // Small sofa icon (≈ 18×12)
  const sofa = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})" fill="${GOLD}">
      <rect x="2" y="3" width="14" height="6" rx="2"/>
      <rect x="0" y="5" width="4" height="7" rx="1.5"/>
      <rect x="14" y="5" width="4" height="7" rx="1.5"/>
      <rect x="2" y="8" width="14" height="4" rx="1"/>
      <circle cx="17.5" cy="0.8" r="1.4"/>
    </g>`;

  const FONT = `font-family="Montserrat, 'Plus Jakarta Sans', system-ui, sans-serif"`;

  const horizontal = () => `
    <svg class="logo-svg logo-h" viewBox="0 0 300 72" role="img" aria-label="Modulabz Interiors">
      ${mark(0, 0, 0.72)}
      <text x="82" y="39" ${FONT} font-weight="800" font-size="26" fill="currentColor" textLength="200" lengthAdjust="spacing">MODULABZ</text>
      <text x="84" y="60" ${FONT} font-weight="600" font-size="11.5" fill="currentColor" textLength="132" lengthAdjust="spacing">INTERIORS</text>
      ${sofa(222, 49, 0.9)}
    </svg>`;

  const stacked = () => `
    <svg class="logo-svg logo-stack" viewBox="0 0 300 222" role="img" aria-label="Modulabz Interiors">
      ${mark(82, 0, 1.36)}
      <text x="150" y="174" text-anchor="middle" ${FONT} font-weight="800" font-size="33" fill="currentColor" textLength="266" lengthAdjust="spacing">MODULABZ</text>
      <text x="138" y="203" text-anchor="middle" ${FONT} font-weight="600" font-size="15" fill="currentColor" textLength="172" lengthAdjust="spacing">INTERIORS</text>
      ${sofa(232, 190, 1.15)}
    </svg>`;

  const fill = () => {
    document.querySelectorAll('[data-logo]').forEach((el) => {
      el.innerHTML = el.dataset.logo === 'stack' ? stacked() : horizontal();
    });
  };
  window.MODULABZ_LOGO = { horizontal, stacked, mark: () => `<svg viewBox="0 0 100 100">${mark(0, 0, 1)}</svg>` };
  fill();
  // Re-render once Montserrat has loaded so text metrics are exact
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fill);
})();
