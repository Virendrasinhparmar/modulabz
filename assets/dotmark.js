/* =========================================================
   Footer dot-matrix wordmark
   "MODULABZ" sampled into a grid of dots. Dots near the
   pointer are pushed out into a glowing brass/terracotta ring
   and spring back home. When idle, a soft orb wanders across
   the word so it stays alive on touch devices.
   ========================================================= */
(function () {
  const host = document.getElementById('footDots');
  if (!host) return;
  const canvas = host.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const WORD = 'MODULABZ';
  const BASE = [58, 55, 51];        // dim dot (warm charcoal)
  const HOT_A = [184, 145, 70];     // brass
  const HOT_B = [214, 120, 78];     // light terracotta
  const BUCKETS = 14;

  let W = 0, H = 0, dpr = 1, gap = 8, rad = 3, dots = [], visible = false, raf = 0;
  const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999, inside: false, last: 0, R: 80 };

  function build() {
    const rect = host.getBoundingClientRect();
    W = Math.max(280, Math.round(rect.width));
    const LINES = W < 640 ? ['MODU', 'LABZ'] : [WORD];
    gap = W < 640 ? Math.max(4, Math.round(W / 70)) : Math.max(5, Math.round(W / 150));
    rad = gap * 0.36;
    // height from the text's natural proportions
    const off = document.createElement('canvas');
    const octx = off.getContext('2d');
    let fs = 100;
    octx.font = `800 ${fs}px "Plus Jakarta Sans", "Inter", system-ui, sans-serif`;
    const mw = Math.max(...LINES.map((l) => octx.measureText(l).width));
    fs = Math.floor((fs * (W * 0.94)) / mw);
    const lineH = Math.round(fs * 0.86);
    H = lineH * LINES.length + gap * (LINES.length + 3);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    host.style.height = H + 'px';

    off.width = W; off.height = H;
    octx.fillStyle = '#000';
    octx.font = `800 ${fs}px "Plus Jakarta Sans", "Inter", system-ui, sans-serif`;
    octx.textBaseline = 'alphabetic';
    octx.letterSpacing = '0px';
    LINES.forEach((l, i) => {
      const tw = octx.measureText(l).width;
      octx.fillText(l, (W - tw) / 2, gap * 1.5 + lineH * (i + 1) + gap * i - fs * 0.02);
    });
    const data = octx.getImageData(0, 0, W, H).data;

    dots = [];
    for (let y = gap / 2; y < H; y += gap) {
      for (let x = gap / 2; x < W; x += gap) {
        const a = data[(Math.floor(y) * W + Math.floor(x)) * 4 + 3];
        if (a > 110) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, t: Math.random() * 6.28 });
      }
    }
    ptr.R = Math.max(54, W * (W < 640 ? 0.16 : 0.075));
    draw(0);
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function colorFor(k, mixB) {
    const hot = [lerp(HOT_A[0], HOT_B[0], mixB), lerp(HOT_A[1], HOT_B[1], mixB), lerp(HOT_A[2], HOT_B[2], mixB)];
    return `rgb(${Math.round(lerp(BASE[0], hot[0], k))},${Math.round(lerp(BASE[1], hot[1], k))},${Math.round(lerp(BASE[2], hot[2], k))})`;
  }

  function step(time) {
    // Idle wander (Lissajous) when no pointer is over the wordmark
    if (!ptr.inside && time - ptr.last > 1400) {
      const s = time / 1000;
      ptr.tx = W * (0.5 + 0.42 * Math.sin(s * 0.45));
      ptr.ty = H * (0.5 + 0.28 * Math.sin(s * 0.9 + 1.2));
    }
    ptr.x += (ptr.tx - ptr.x) * 0.18;
    ptr.y += (ptr.ty - ptr.y) * 0.18;

    const R = ptr.R, R2 = R * R, push = gap * 0.9;
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const dx = d.x - ptr.x, dy = d.y - ptr.y, dd = dx * dx + dy * dy;
      if (dd < R2 && dd > 0.01) {
        const dist = Math.sqrt(dd), f = (1 - dist / R) * push;
        d.vx += (dx / dist) * f * 0.35;
        d.vy += (dy / dist) * f * 0.35;
      }
      d.vx += (d.hx - d.x) * 0.075;
      d.vy += (d.hy - d.y) * 0.075;
      d.vx *= 0.8; d.vy *= 0.8;
      d.x += d.vx; d.y += d.vy;
    }
  }

  function draw(time) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const paths = Array.from({ length: BUCKETS }, () => []);
    const maxD = gap * 2.6;
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const disp = Math.hypot(d.x - d.hx, d.y - d.hy);
      const k = Math.min(1, disp / maxD);
      paths[Math.min(BUCKETS - 1, Math.round(k * (BUCKETS - 1)))].push(d);
    }
    const mixB = 0.5 + 0.5 * Math.sin((time || 0) / 1400);
    for (let b = 0; b < BUCKETS; b++) {
      const list = paths[b]; if (!list.length) continue;
      const k = b / (BUCKETS - 1);
      ctx.fillStyle = colorFor(k, mixB);
      ctx.beginPath();
      const r = rad * (1 + k * 0.35);
      for (const d of list) { ctx.moveTo(d.x + r, d.y); ctx.arc(d.x, d.y, r, 0, 6.2832); }
      ctx.fill();
    }
    // pointer core
    if (ptr.x > -100 && ptr.x < W + 100) {
      ctx.fillStyle = ptr.inside ? 'rgba(247,244,239,.95)' : 'rgba(247,244,239,.35)';
      ctx.beginPath(); ctx.arc(ptr.x, ptr.y, Math.max(5, gap * 0.9), 0, 6.2832); ctx.fill();
    }
  }

  function loop(t) {
    raf = 0;
    if (!visible) return;
    step(t); draw(t);
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!raf && !reduce) raf = requestAnimationFrame(loop); }

  host.__dm = { step, draw, ptr }; // inspection hook

  // Pointer (mouse + touch)
  const setPtr = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    ptr.tx = cx - r.left; ptr.ty = cy - r.top;
    ptr.inside = true; ptr.last = performance.now();
  };
  host.addEventListener('pointermove', (e) => setPtr(e.clientX, e.clientY));
  host.addEventListener('pointerdown', (e) => setPtr(e.clientX, e.clientY));
  host.addEventListener('pointerleave', () => { ptr.inside = false; ptr.last = performance.now(); });

  // Only animate when on screen
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) start(); }, { rootMargin: '100px' }).observe(host);
  } else { visible = true; start(); }

  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 200); });
  const go = () => { build(); start(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  window.addEventListener('load', build);
})();
