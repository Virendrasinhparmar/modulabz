/* =========================================================
   Modulabz Interiors — App (router, shell, utilities)
   Pages are registered in pages-*.js
   ========================================================= */
(function () {
  const ML = window.ML;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Formatting ---------- */
  const fmtL = (n) => (n >= 1e7 ? '₹' + (n / 1e7).toFixed(2) + ' Cr' : '₹' + (n / 1e5).toFixed(1) + ' L');
  const fmtLnum = (n) => (n >= 1e7 ? (n / 1e7).toFixed(2) : (n / 1e5).toFixed(1));
  const fmtINR = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Image with graceful fallback ---------- */
  const ph = (src, { cls = '', label = '', alt = '', style = '' } = {}) =>
    `<div class="ph ${cls}" style="${style}"><img src="${src}" alt="${esc(alt || label)}" loading="lazy" decoding="async" onerror="this.classList.add('err')">${label ? `<span class="ph-label">${label}</span>` : ''}</div>`;

  /* ---------- Toasts ---------- */
  function toast(msg, type = 'ok') {
    const icons = { ok: '✓', warn: '!', info: 'i' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="ic">${icons[type] || '✓'}</span><span>${msg}</span>`;
    $('#toasts').appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 3400);
  }

  async function copyText(text, okMsg = 'Copied to clipboard') {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (_) { toast('Copy failed — please select and copy manually', 'warn'); ta.remove(); return false; }
      ta.remove();
    }
    toast(okMsg);
    return true;
  }

  /* ---------- Shared state ---------- */
  const STATE = {
    est: null, // initialised in estimator module
    prefill: null, // BOQ → contact hand-off
  };

  /* ---------- Cleanup registry (intervals etc. per page) ---------- */
  let cleanups = [];
  const onLeave = (fn) => cleanups.push(fn);

  /* ---------- Page templates ---------- */
  const BANDS = {
    '02': [ML.IMG.bedroom3, 'Handed over · Ahmedabad'],
    '03': [ML.IMG.kitchen, 'Modular kitchen · Ahmedabad'],
    '04': [ML.IMG.living2, 'Handed over · Ahmedabad'],
    '05': [ML.IMG.blueprint, 'From drawing to locked BOQ', true],
    '06': [ML.IMG.dining, 'Your project starts here', true],
  };
  const pageHead = ({ idx, crumb, title, lead, aside = '' }) => {
    const band = BANDS[idx];
    return `
    <section class="page-head">
      <span class="pg-big" aria-hidden="true">${idx}</span>
      <div class="wrap">
        <div class="crumbs"><a href="#/">Home</a><span>/</span><span class="cur">${crumb}</span></div>
        <div class="row">
          <div>
            <div class="pg-no">Page ${idx} / 06</div>
            <h1 style="margin-top:14px">${title}</h1>
          </div>
          <div>${lead ? `<p class="lead" style="margin:0">${lead}</p>` : ''}${aside}</div>
        </div>
      </div>
    </section>
    ${band ? `<div class="head-band ${band[2] ? 'short' : ''}">${ph(band[0], { alt: band[1] })}<span class="cap">${band[1]}</span></div>` : ''}`;
  };

  const ctaBand = (title = 'Ready to see your home <em>engineered</em>?', idx = 'NEXT STEP') => `
    <section class="cta-band">
      <div class="grid-lines"></div>
      <div class="wrap" style="position:relative">
        <span class="index">${idx}</span>
        <h2>${title}</h2>
        <div class="btns">
          <a href="#/contact" class="btn btn-dark">Book Free Site Visit <span class="arr">→</span></a>
          <a href="#/estimator" class="btn btn-ghost">Calculate Instant BOQ</a>
        </div>
      </div>
    </section>`;

  function nextPrev(path) {
    const i = ML.ROUTES.findIndex((r) => r.path === path);
    const prev = ML.ROUTES[(i - 1 + ML.ROUTES.length) % ML.ROUTES.length];
    const next = ML.ROUTES[(i + 1) % ML.ROUTES.length];
    return `<nav class="next-page" aria-label="Page navigation">
      <a href="#${prev.path}"><span class="eyebrow">← Previous · ${prev.idx}</span><span class="t">${prev.label}</span></a>
      <a href="#${next.path}"><span class="eyebrow">Next · ${next.idx} →</span><span class="t">${next.label}</span></a>
    </nav>`;
  }

  /* ---------- Page extensions (inject extra sections into a page) ----------
     extend(path, { near: 'unique text', where: 'before'|'after'|'replace', html, init })
     The section enclosing 'near' is the insertion point. */
  const EXT = {};
  const extend = (path, ext) => { (EXT[path] = EXT[path] || []).push(ext); };
  function applyExtensions(path, page, query) {
    const list = EXT[path];
    if (!list) return page;
    let html = page.html;
    list.forEach((x) => {
      const i = x.near ? html.indexOf(x.near) : -1;
      if (i < 0) { html += x.html || ''; return; }
      const start = html.lastIndexOf('<section', i);
      const endTag = html.indexOf('</section>', i);
      const end = endTag + 10;
      if (x.where === 'after') html = html.slice(0, end) + x.html + html.slice(end);
      else if (x.where === 'replace') html = html.slice(0, start) + (x.html || '') + html.slice(end);
      else html = html.slice(0, start) + x.html + html.slice(start);
    });
    const baseInit = page.init;
    return { html, init(root, q) { baseInit && baseInit(root, q); list.forEach((x) => x.init && x.init(root, q)); } };
  }

  /* ---------- Router ---------- */
  const PAGES = {}; // path -> () => { html, init? }
  const register = (path, fn) => { PAGES[path] = fn; };

  function parseHash() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const [p, q = ''] = raw.split('?');
    const path = PAGES[p] ? p : '/';
    const query = Object.fromEntries(new URLSearchParams(q));
    return { path, query };
  }

  function go(path) {
    if (location.hash === '#' + path) render();
    else location.hash = path;
  }

  let first = true, busy = false, pending = false;
  async function render() {
    if (location.hash && !location.hash.startsWith('#/')) return; // in-page anchors
    if (busy) { pending = true; return; }
    busy = true;
    const M = window.MOTION;
    const { path, query } = parseHash();
    const r = ML.ROUTES.find((x) => x.path === path);
    cleanups.forEach((fn) => { try { fn(); } catch (_) {} });
    cleanups = [];
    closeDrawer();
    closeModal();

    const app = $('#app');
    if (!first) await M.cover(`<small>Page ${r.idx} / 06</small><span>${r.label}</span>`);
    M.kill();
    const page = applyExtensions(path, PAGES[path](query), query);
    app.innerHTML = `<div class="page" data-path="${path}">${page.html}${nextPrev(path)}</div>`;
    document.documentElement.classList.toggle('is-home', path === '/');
    M.scrollTop();
    const el = app.firstElementChild;
    M.enter(el, path, first, () => page.init && page.init(el, query));
    setActive(path);
    document.title = path === '/' ? 'Modulabz Interiors — Designing Spaces. Engineering Modern Living. | Ahmedabad' : `${r.title} — Modulabz Interiors, Ahmedabad`;
    if (!M.active) observeReveals(app);
    if (!first) { app.focus({ preventScroll: true }); M.reveal(); }
    first = false;
    busy = false;
    if (pending) { pending = false; render(); }
  }

  function setActive(path) {
    $$('[data-route]').forEach((a) => {
      const on = a.dataset.route === path;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  /* ---------- Reveal on scroll ---------- */
  let io;
  function observeReveals(root) {
    if (!('IntersectionObserver' in window)) { $$('.reveal', root).forEach((e) => e.classList.add('in')); return; }
    io && io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    $$('.reveal', root).forEach((e) => io.observe(e));
  }

  /* ---------- Shell: nav, drawer, footer ---------- */
  function buildShell() {
    $('#nav').innerHTML = ML.ROUTES.map((r) => `<a href="#${r.path}" data-route="${r.path}"><span class="i">${r.idx}</span>${r.label}</a>`).join('');
    $('#drawerNav').innerHTML = ML.ROUTES.map((r) => `<a href="#${r.path}" data-route="${r.path}"><span>${r.label}</span><span class="i">${r.idx}</span></a>`).join('');
    $('#footNav').innerHTML = ML.ROUTES.map((r) => `<li><a href="#${r.path}" data-route="${r.path}">${r.idx} · ${r.label}</a></li>`).join('');
    $('#yr').textContent = new Date().getFullYear();

    $('#burger').addEventListener('click', openDrawer);
    $$('#drawer [data-close]').forEach((b) => b.addEventListener('click', closeDrawer));
    $$('#modal [data-close]').forEach((b) => b.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeDrawer(); closeModal(); } });

    const toTop = $('#toTop');
    window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 900), { passive: true });
    toTop.addEventListener('click', () => window.MOTION.scrollTo(0));

    // Measure fixed chrome height → CSS var (used for page offset & sticky elements)
    const chrome = $('#chrome');
    const setChrome = () => document.documentElement.style.setProperty('--chrome', chrome.offsetHeight + 'px');
    setChrome();
    if ('ResizeObserver' in window) new ResizeObserver(setChrome).observe(chrome);
    else window.addEventListener('resize', setChrome);

    // Clicking the link for the current route re-renders (scroll to top)
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#/"]');
      if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); render(); }
    });
  }

  function openDrawer() { $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); $('#burger').setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; window.MOTION.stop(); }
  function closeDrawer() { const d = $('#drawer'); if (!d.classList.contains('open')) return; d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); $('#burger').setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; window.MOTION.start(); }

  function openModal(indexLabel, html) {
    $('#modalIndex').textContent = indexLabel;
    $('#modalBody').innerHTML = html;
    const m = $('#modal');
    m.classList.add('open'); m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.MOTION.stop();
    $('.sheet', m).scrollTop = 0;
    $('.close', m).focus();
  }
  function closeModal() { const m = $('#modal'); if (!m.classList.contains('open')) return; m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; window.MOTION.start(); }

  /* ---------- Export ---------- */
  window.APP = { $, $$, ph, extend, toast, copyText, STATE, register, go, onLeave, pageHead, ctaBand, fmtL, fmtLnum, fmtINR, esc, openModal, closeModal };

  document.addEventListener('DOMContentLoaded', () => {
    buildShell();
    window.addEventListener('hashchange', render);
    render();
  });
})();
