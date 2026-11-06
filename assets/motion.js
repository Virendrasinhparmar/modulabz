/* =========================================================
   Modulabz — Motion engine
   GSAP + ScrollTrigger + Lenis smooth scroll.
   Degrades to a static site if the libraries fail to load or
   the visitor prefers reduced motion.
   ========================================================= */
(function () {
  const hasLibs = !!(window.gsap && window.ScrollTrigger);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const noop = () => Promise.resolve();

  const M = { active: hasLibs && !reduce, fine };

  /* ---------- Word splitter (keeps <em>, <br>) ---------- */
  M.split = function split(el) {
    if (!el) return [];
    if (el.dataset.splitDone) return $$('.wi', el);
    el.dataset.splitDone = '1';
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.className = 'wi'; i.textContent = p;
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR' && !n.classList.contains('w')) walk(n);
      });
    };
    walk(el);
    return $$('.wi', el);
  };

  /* ---------- Static fallback ---------- */
  if (!M.active) {
    document.documentElement.classList.add('html-noanim');
    const pl = $('#preloader'); pl && pl.remove();
    Object.assign(M, {
      ready: Promise.resolve(), cover: noop, reveal: noop, kill() {}, stop() {}, start() {},
      enter(el, path, first, init) { init && init(); },
      scrollTop() { window.scrollTo(0, 0); },
      scrollTo(t) { if (typeof t === 'number') window.scrollTo({ top: t, behavior: 'smooth' }); else t && t.scrollIntoView({ behavior: 'smooth' }); },
    });
    window.MOTION = M;
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion');
  gsap.defaults({ ease: 'expo.out', duration: 1 });

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({
      lerp: 0.09,
      smoothWheel: true,
      prevent: (node) => !!(node.closest && node.closest('.sheet, .drawer .panel, .boq, pre, .table-scroll, [data-lenis-prevent]')),
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  M.lenis = lenis;
  M.scrollTop = () => { if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); window.scrollTo(0, 0); };
  M.scrollTo = (t, opts = {}) => {
    if (lenis) lenis.scrollTo(t, { offset: typeof t === 'number' ? 0 : -110, duration: 1.4, ...opts });
    else if (typeof t === 'number') window.scrollTo({ top: t, behavior: 'smooth' });
    else t.scrollIntoView({ behavior: 'smooth' });
  };
  M.stop = () => lenis && lenis.stop();
  M.start = () => lenis && lenis.start();

  /* ---------- Scroll progress + auto-hiding chrome ---------- */
  const prog = $('#scrollProg');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    const root = document.documentElement;
    if (y > 160 && y > lastY + 3) root.classList.add('chrome-hidden');
    else if (y < lastY - 6 || y < 160) root.classList.remove('chrome-hidden');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Custom cursor + magnetic buttons ---------- */
  if (fine) {
    document.documentElement.classList.add('has-cursor');
    const dot = document.createElement('div'); dot.className = 'cur-dot';
    const ring = document.createElement('div'); ring.className = 'cur-ring';
    const tag = document.createElement('div'); tag.className = 'cur-tag';
    document.body.append(ring, dot, tag);
    gsap.set([dot, ring, tag], { x: -100, y: -100 });
    const xd = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' }), yd = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const xr = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' }), yr = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const xt = gsap.quickTo(tag, 'x', { duration: 0.5, ease: 'power3' }), yt = gsap.quickTo(tag, 'y', { duration: 0.5, ease: 'power3' });
    let mag = null;
    window.addEventListener('mousemove', (e) => {
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY); xt(e.clientX); yt(e.clientY);
      const b = e.target.closest && e.target.closest('.btn, .magnetic, .hz-go');
      if (b !== mag) { if (mag) gsap.to(mag, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, .4)' }); mag = b; }
      if (b) { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.38, duration: 0.5, ease: 'power3' }); }
    }, { passive: true });
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest && e.target.closest('a, button, label, select, input, textarea, [data-cursor]');
      const c = e.target.closest && e.target.closest('[data-cursor]');
      ring.classList.toggle('hover', !!t && !c);
      const inDots = e.target.closest && e.target.closest('.foot-dots');
      ring.classList.toggle('hide', !!c || !!inDots);
      dot.style.opacity = inDots ? '0' : '';
      if (c) { tag.textContent = c.dataset.cursor; tag.classList.add('on'); } else tag.classList.remove('on');
    });
    document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
    document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));
  }

  /* ---------- Preloader ---------- */
  M.ready = new Promise((resolve) => {
    const pl = $('#preloader');
    if (!pl) return resolve();
    M.stop();
    const count = $('.pl-count b', pl), bar = $('.pl-bar i', pl), letters = $$('.pl-word span', pl);
    const o = { v: 0 };
    gsap.set(letters, { yPercent: 105 });
    const tl = gsap.timeline({ onComplete: () => { pl.remove(); M.start(); } });
    tl.to(letters, { yPercent: 0, duration: 1.1, stagger: 0.06, ease: 'expo.out' }, 0.1)
      .to(o, { v: 100, duration: 1.7, ease: 'power2.inOut', onUpdate: () => { count.textContent = Math.round(o.v); bar.style.transform = `scaleX(${o.v / 100})`; } }, 0)
      .to(letters, { yPercent: -210, duration: 0.6, stagger: 0.035, ease: 'expo.in' }, 1.85)
      .to([$('.pl-top', pl), $('.pl-bottom', pl)], { opacity: 0, duration: 0.4 }, 1.9)
      .to(pl, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 2.25)
      .add(resolve, 2.65);
    // Safety: if animation frames are throttled (background tab), finish anyway
    setTimeout(() => { if (document.body.contains(pl)) tl.progress(1); }, 4500);
  });

  /* ---------- Page curtain ---------- */
  const cur = $('#curtain');
  M.cover = (html) => new Promise((res) => {
    $('.lbl', cur).innerHTML = html;
    gsap.set(cur, { visibility: 'visible' });
    let done = false; const fin = () => { if (!done) { done = true; res(); } };
    const tl = gsap.timeline({ onComplete: fin });
    setTimeout(() => { if (!done) tl.progress(1); }, 1400);
    tl
      .fromTo($('.c1', cur), { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })
      .fromTo($('.c2', cur), { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' }, 0.1)
      .fromTo($$('.lbl > *', cur), { yPercent: 120 }, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0.45);
  });
  M.reveal = () => new Promise((res) => {
    const tl = gsap.timeline({ onComplete: () => { gsap.set(cur, { visibility: 'hidden' }); res(); } });
    setTimeout(() => { if (tl.progress() < 1) tl.progress(1); }, 2000);
    tl
      .to($$('.lbl > *', cur), { yPercent: -120, duration: 0.45, ease: 'expo.in', stagger: 0.04 }, 0.15)
      .to($('.c2', cur), { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 0.45)
      .to($('.c1', cur), { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 0.55);
  });

  /* ---------- Per-page context ---------- */
  let ctx = null;
  M.kill = () => {
    if (ctx) { ctx.revert(); ctx = null; }
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };

  M.enter = (pageEl, path, first, init) => {
    const introDelay = first ? 0 : 0.75;
    M.first = first;
    ctx = gsap.context((self) => {
      M.ctx = self;
      init && init();
      generic(pageEl, first, introDelay);
    }, pageEl);
    // refresh after layout settles and images arrive
    setTimeout(() => ScrollTrigger.refresh(), 300);
    $$('img', pageEl).forEach((img) => { if (!img.complete) img.addEventListener('load', debouncedRefresh, { once: true }); });
    onScroll();
  };
  let rt;
  const debouncedRefresh = () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); };
  window.addEventListener('load', debouncedRefresh);

  /** Run fn after the preloader on first load, immediately otherwise (inside page context). */
  M.whenReady = (first, fn) => {
    if (!first) return fn();
    const c = M.ctx;
    M.ready.then(() => c && c.add(fn));
  };

  function generic(root, first, delay) {
    // Page-head title & lead
    const head = $('.page-head', root);
    if (head) {
      const words = M.split($('h1', head));
      gsap.set(words, { yPercent: 115 });
      M.whenReady(first, () => {
        gsap.to(words, { yPercent: 0, duration: 1.3, stagger: 0.05, delay: first ? 0.1 : delay });
        gsap.from($$('.crumbs, .pg-no, .lead', head), { y: 30, opacity: 0, duration: 1.2, stagger: 0.08, delay: (first ? 0.1 : delay) + 0.25 });
        gsap.from($('.pg-big', head), { yPercent: 30, opacity: 0, duration: 1.8, delay: (first ? 0 : delay) });
      });
      gsap.to($('.pg-big', head), { yPercent: -60, ease: 'none', scrollTrigger: { trigger: head, start: 'top top', end: 'bottom top', scrub: true } });
    }

    // Head band
    $$('.head-band', root).forEach((b) => {
      const ph = $('.ph', b), img = $('img', b);
      gsap.fromTo(ph, { clipPath: 'inset(0% 7% 0% 7% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: b, start: 'top 90%', end: 'top 20%', scrub: true } });
      gsap.fromTo(img, { scale: 1.35, yPercent: -6 }, { scale: 1.05, yPercent: 6, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Section headings
    $$('.sec-head h2, [data-split], .cta-band h2', root).forEach((h) => {
      const w = M.split(h);
      gsap.fromTo(w, { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.035, scrollTrigger: { trigger: h, start: 'top 88%' } });
    });

    // Images: clip reveal + parallax
    $$('.ph', root).forEach((ph) => {
      if (ph.closest('.hx, .ba, .bp, .hero-stage, .stack-card, .hz, .head-band, .modal, .no-motion, .proj-grid, .room-render, .zg, .s6-frame, .jr')) return;
      const img = $('img', ph);
      gsap.fromTo(ph, { clipPath: 'inset(16% 0% 16% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, scrollTrigger: { trigger: ph, start: 'top 92%' } });
      if (img) gsap.fromTo(img, { yPercent: -7, scale: 1.2 }, { yPercent: 7, scale: 1.2, ease: 'none', scrollTrigger: { trigger: ph, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Generic reveal blocks
    const reveals = $$('.reveal', root);
    gsap.set(reveals, { y: 50, opacity: 0 });
    ScrollTrigger.batch(reveals, {
      start: 'top 92%',
      onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1.3, stagger: 0.1, overwrite: true }),
    });

    // Staggered grids
    $$('.cap-grid, .grid-4, .grid-3, .pillar-grid, .guarantee, .studios, .timeline-h, .compare3, .stats, .opt-grid', root).forEach((g) => {
      if (g.closest('.est')) return;
      gsap.from(g.children, { y: 70, opacity: 0, duration: 1.2, stagger: 0.08, scrollTrigger: { trigger: g, start: 'top 88%' } });
    });

    // Index labels: draw their leading rule
    $$('.sec-head .index', root).forEach((ix) => {
      gsap.from(ix, { opacity: 0, x: -20, duration: 1, scrollTrigger: { trigger: ix, start: 'top 92%' } });
    });

    // CTA band: subtle parallax grid
    $$('.cta-band', root).forEach((b) => {
      gsap.fromTo($('.grid-lines', b), { yPercent: -20 }, { yPercent: 20, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    const fb = $('.footer .big > div');
    if (fb) { const w = M.split(fb); gsap.fromTo(w, { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.04, scrollTrigger: { trigger: fb, start: 'top 90%' } }); }
  }

  window.MOTION = M;
})();
