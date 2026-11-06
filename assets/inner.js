/* =========================================================
   Inner-page showpieces (injected via APP.extend)
   /about                  → pinned horizontal studio journey + word-lit manifesto
   /services               → "Scroll the Six" sticky media swap
   /services               → exploded shutter cross-section + BHK packages
   /portfolio              → zoom-into-the-grid
   /about (journey path)   → scroll-drawn 12-week journey
   /contact                → kinetic "Let's talk" band + quick actions
   ========================================================= */
(function () {
  const { $, $$, ph, extend, onLeave } = window.APP;
  const ML = window.ML;
  const M = () => window.MOTION;
  const gs = () => (M().active ? window.gsap : null);

  /* ======================= ABOUT ======================= */
  const JOURNEY = [
    { y: '2022', t: 'Founded in Ahmedabad', d: 'Two designers, one CAD desk and a carpentry partner network — and a promise to price every home on an itemised BOQ.', img: ML.IMG.blueprint },
    { y: '2023', t: 'The factory partnership', d: 'CNC panel cutting, PUR edge-banding and dry-fit QC. Site carpentry gives way to factory precision.', img: ML.IMG.kitchen2 },
    { y: '2024', t: '3D designs for every client', d: 'Photoreal 3D designs become standard — every client sees their home before a single sheet is cut.', img: ML.IMG.living4 },
    { y: '2025', t: 'Locked BOQ, in writing', d: 'The 10-year modular warranty and zero-substitution clause are formalised in every agreement.', img: ML.IMG.bedroom2 },
    { y: '2026', t: 'Palanpur, Baroda & Mumbai', d: 'Projects beyond Ahmedabad — homes in Palanpur and Baroda, and selected apartments and offices in Mumbai.', img: ML.IMG.office2 },
  ];

  extend('/about', {
    near: 'Studio Timeline',
    where: 'replace',
    html: `
    <section class="jr dark" id="jr">
      <div class="jr-pin">
        <div class="wrap jr-head">
          <span class="index">Studio Journey · 2022 → 2026</span>
          <h2 data-split>From a drafting table<br>to a <em>factory</em>.</h2>
        </div>
        <div class="jr-track" id="jrTrack">
          ${JOURNEY.map((j) => `
            <article class="jr-item">
              <span class="jr-y">${j.y}</span>
              <div class="jr-body">
                <div class="jr-img">${ph(j.img, { alt: j.t }).replace('loading="lazy"', 'loading="eager"')}</div>
                <h3>${j.t}</h3>
                <p>${j.d}</p>
              </div>
            </article>`).join('')}
        </div>
        <div class="wrap"><div class="jr-line"><i id="jrLine"></i></div></div>
      </div>
    </section>`,
    init(root) {
      const g = gs(); if (!g) return;
      const quote = $('.manifesto-quote', root);
      if (quote) {
        const w = M().split(quote);
        g.fromTo(w, { opacity: 0.14 }, { opacity: 1, stagger: 0.06, ease: 'none', scrollTrigger: { trigger: quote, start: 'top 80%', end: 'bottom 50%', scrub: true } });
      }
      const mm = g.matchMedia(); onLeave(() => mm.revert());
      mm.add('(min-width: 900px)', () => {
        const track = $('#jrTrack', root), pin = $('.jr-pin', root);
        const dist = () => track.scrollWidth - window.innerWidth + 40;
        const tw = g.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '#jr', start: 'top top', end: () => '+=' + dist(), pin: pin, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: (s) => { $('#jrLine', root).style.transform = `scaleX(${s.progress})`; } } });
        $$('.jr-item', root).forEach((it) => {
          g.fromTo($('.jr-y', it), { color: 'rgba(184,145,70,0)' }, { color: 'rgba(184,145,70,1)', ease: 'none', scrollTrigger: { trigger: it, containerAnimation: tw, start: 'left 70%', end: 'left 30%', scrub: true } });
          g.fromTo($('.jr-img img', it), { xPercent: -12, scale: 1.25 }, { xPercent: 12, scale: 1.25, ease: 'none', scrollTrigger: { trigger: it, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
        });
      });
      mm.add('(max-width: 899px)', () => {
        $$('.jr-item', root).forEach((it) => g.from(it, { y: 60, opacity: 0, duration: 1.1, scrollTrigger: { trigger: it, start: 'top 88%' } }));
      });
    },
  });

  /* ======================= SERVICES ======================= */
  extend('/services', {
    near: 'class="svc-tabs"',
    where: 'before',
    html: `
    <section class="s6" id="s6">
      <div class="wrap">
        <div class="sec-head">
          <div><span class="index">Scroll the Six</span><h2>Every capability.<br><em>One</em> standard.</h2></div>
          <p class="lead">Scroll through all six disciplines, then open any one for its full specification sheet — scope, brands, Ahmedabad price bands and timelines.</p>
        </div>
        <div class="s6-grid">
          <div class="s6-media">
            <div class="s6-frame">
              ${ML.SERVICES.map((s, i) => `<div class="s6-img" data-i="${i}">${ph(s.img, { alt: s.title })}</div>`).join('')}
              <div class="s6-count"><b id="s6n">01</b><span>/ 06</span></div>
              <div class="s6-tag" id="s6tag">${ML.SERVICES[0].short}</div>
            </div>
          </div>
          <div class="s6-list">
            ${ML.SERVICES.map((s, i) => `
              <article class="s6-item ${i === 0 ? 'on' : ''}" data-i="${i}">
                <div class="s6-img-m">${ph(s.img, { alt: s.title })}</div>
                <span class="index">${s.n} · Service</span>
                <h3>${s.title}</h3>
                <p>${s.tagline}</p>
                <div class="s6-meta"><div><small>Starting from</small><b class="num">${s.from}</b></div><div><small>Timeline</small><b class="num">${s.time}</b></div></div>
                <button class="btn btn-ghost btn-sm" data-open-svc="${i}">Open spec sheet <span class="arr">↓</span></button>
              </article>`).join('')}
          </div>
        </div>
      </div>
    </section>`,
    init(root) {
      root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-open-svc]'); if (!b) return;
        const tab = $(`.svc-tab[data-svc="${b.dataset.openSvc}"]`, root);
        tab && tab.click();
        M().scrollTo($('.svc-tabs', root));
      });
      const items = $$('.s6-item', root), imgs = $$('.s6-img', root);
      const setActive = (i) => {
        items.forEach((it, j) => it.classList.toggle('on', j === i));
        $('#s6n', root).textContent = String(i + 1).padStart(2, '0');
        $('#s6tag', root).textContent = ML.SERVICES[i].short;
      };
      const g = gs();
      if (!g) { imgs.forEach((im, i) => { if (i) im.style.display = 'none'; }); return; }
      imgs.forEach((im, i) => {
        if (i === 0) return;
        g.fromTo(im, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: items[i], start: 'top 85%', end: 'top 40%', scrub: true } });
        g.fromTo($('img', im), { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: items[i], start: 'top 85%', end: 'top 20%', scrub: true } });
      });
      items.forEach((it, i) => {
        window.ScrollTrigger.create({ trigger: it, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(i) });
      });
    },
  });

  /* ======================= SERVICES · BHK PACKAGES ======================= */
  extend('/services', {
    near: 'class="svc-tabs"',
    where: 'before',
    html: `
    <section class="bhk">
      <div class="wrap">
        <div class="sec-head">
          <div><span class="index">Interior Design Solutions</span><h2>Packages by <em>home size</em>.</h2></div>
          <p class="lead">From compact 2 BHK flats to villas — every package includes 2D layout, 3D design, modular furniture and complete execution, Vastu-friendly on request.</p>
        </div>
        <div class="bhk-grid">
          ${ML.BHK.map((b, i) => `
            <article class="bhk-card">
              <div class="bhk-img">${ph(b.img, { alt: b.t })}<span class="bhk-n">0${i + 1}</span></div>
              <div class="bhk-body">
                <h3>${b.t}</h3>
                <p>${b.d}</p>
                <div class="bhk-meta"><div><small>Budget</small><b class="num">${b.price}</b></div><div><small>Timeline</small><b class="num">${b.time}</b></div></div>
                <button class="btn btn-ghost btn-sm" data-bhk="${i}">Estimate my ${b.t.split(' Interior')[0]} <span class="arr">→</span></button>
              </div>
            </article>`).join('')}
        </div>
      </div>
    </section>`,
    init(root) {
      root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-bhk]'); if (!b) return;
        window.APP.STATE.estPreset = ML.BHK[+b.dataset.bhk].est;
        window.APP.go('/estimator');
      });
      const g = gs(); if (!g) return;
      g.from($('.bhk-card', root), { y: 80, opacity: 0, stagger: 0.08, duration: 1.2, scrollTrigger: { trigger: '.bhk-grid', start: 'top 85%' } });
    },
  });

  /* ======================= MODULAR LAB ======================= */
  const LAYERS = [
    { n: 'Anti-Fingerprint Acrylic', mm: 1.5, c: ['#F6F1E9', '#E4DCCF', '#CFC5B6'], t: 10, s: 'Super-matte face · UV stable at 45°C' },
    { n: 'PUR Hot-Melt Adhesive', mm: 0.2, c: ['#F0D48A', '#D9B866', '#BF9C4B'], t: 4, s: 'Moisture-cured · no delamination' },
    { n: 'HDHMR / BWP Core', mm: 18, c: ['#D2AC7E', '#B8915F', '#9C7A4C'], t: 52, s: 'IS:710 BWP in wet zones · HDHMR for CNC' },
    { n: 'Balancing Laminate', mm: 0.8, c: ['#9A948D', '#827C75', '#6D6862'], t: 6, s: 'Stops warping in monsoon humidity' },
  ];
  const slab = (y, t, c, striped) => {
    const A = [110, y + 70], B = [300, y], C = [490, y + 70], D = [300, y + 140];
    const p = (pts) => pts.map((q) => q.join(',')).join(' ');
    const stripes = striped ? Array.from({ length: 6 }, (_, k) => {
      const yy = (k + 1) * (t / 7);
      return `<polyline points="${A[0]},${A[1] + yy} ${D[0]},${D[1] + yy} ${C[0]},${C[1] + yy}" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="1"/>`;
    }).join('') : '';
    return `<polygon points="${p([A, D, [D[0], D[1] + t], [A[0], A[1] + t]])}" fill="${c[1]}"/>
            <polygon points="${p([D, C, [C[0], C[1] + t], [D[0], D[1] + t]])}" fill="${c[2]}"/>
            ${stripes}
            <polygon points="${p([A, B, C, D])}" fill="${c[0]}"/>`;
  };
  const shutterSVG = () => {
    let y = 160; const out = [];
    LAYERS.forEach((l, i) => { out.push(`<g class="ly-l" data-l="${i}">${slab(y, l.t, l.c, i === 2)}</g>`); y += l.t; });
    // edge band hugging the right face of the core
    const coreY = 160 + LAYERS[0].t + LAYERS[1].t;
    const edge = `<g class="ly-edge"><polygon points="490,${coreY + 70} 496,${coreY + 66} 496,${coreY + 66 + 52} 490,${coreY + 70 + 52}" fill="#9E5A3C"/><polygon points="300,${coreY + 140} 490,${coreY + 70} 490,${coreY + 122} 300,${coreY + 192}" fill="none" stroke="#9E5A3C" stroke-width="3"/></g>`;
    return `<svg viewBox="0 0 600 560" aria-hidden="true"><ellipse cx="300" cy="470" rx="230" ry="22" fill="#000" opacity=".35" style="filter:blur(8px)"/>${out.join('')}${edge}</svg>`;
  };

  extend('/services', {
    near: 'Price Guide',
    where: 'before',
    html: `
    <section class="ly dark" id="ly">
      <div class="wrap ly-inner">
        <div class="ly-copy">
          <span class="index">Inside a Modulabz Shutter</span>
          <h2>21.5 mm of <em>decisions</em>.</h2>
          <p class="lead" style="font-size:16px">Scroll to pull a kitchen shutter apart. Every layer is chosen for Ahmedabad’s 45°C summers and 85% monsoon humidity.</p>
          <ol class="ly-list">
            ${LAYERS.map((l, i) => `<li data-l="${i}"><span class="n">0${i + 1}</span><span class="t">${l.n}<small>${l.s}</small></span><span class="mm num">${l.mm} mm</span></li>`).join('')}
            <li data-l="4"><span class="n">05</span><span class="t">PUR Zero-Joint Edge Band<small>1 mm · seals the core against water</small></span><span class="mm num">1 mm</span></li>
          </ol>
          <div class="ly-total"><span>Total build-up</span><b class="num"><span id="lyTotal">0.0</span> mm</b></div>
        </div>
        <div class="ly-stage">${shutterSVG()}<div class="ly-hud">CROSS-SECTION · 1:1 · <span id="lyPct">000</span>%</div></div>
      </div>
    </section>`,
    init(root) {
      const g = gs(); const items = $$('.ly-list li', root);
      if (!g) { items.forEach((li) => li.classList.add('on')); $('#lyTotal', root).textContent = '21.5'; return; }
      const layers = $$('.ly-l', root), edge = $('.ly-edge', root);
      const total = { v: 0 };
      const tl = g.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: '#ly', start: 'top top', end: '+=220%', pin: true, scrub: 1, anticipatePin: 1,
          onUpdate: (s) => {
            const a = Math.floor(s.progress * 5.5);
            items.forEach((li, j) => li.classList.toggle('on', j < a));
            $('#lyPct', root).textContent = String(Math.round(s.progress * 100)).padStart(3, '0');
          },
        },
      });
      const offs = [-150, -80, 0, 90];
      layers.forEach((l, i) => tl.to(l, { y: offs[i], duration: 1 }, i * 0.25));
      tl.fromTo(edge, { x: 160, opacity: 0 }, { x: 40, opacity: 1, duration: 0.8 }, 1.2)
        .to(total, { v: 21.5, duration: 2, ease: 'none', onUpdate: () => { $('#lyTotal', root).textContent = total.v.toFixed(1); } }, 0)
        .to(layers, { y: 0, duration: 1, stagger: { each: 0.08, from: 'end' } }, 2.4)
        .to(edge, { x: 0, duration: 0.8 }, 2.6)
        .to({}, { duration: 0.4 });
    },
  });

  /* ======================= PORTFOLIO ======================= */
  extend('/portfolio', {
    near: 'The Before / After Lab',
    where: 'before',
    html: `
    <section class="zg" id="zg">
      <div class="zg-pin">
        <div class="zg-grid" id="zgGrid">
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => {
            const p = ML.PROJECTS[k === 4 ? 0 : (k < 4 ? k + 1 : k) % ML.PROJECTS.length];
            return `<div class="zg-tile ${k === 4 ? 'center' : ''}">${ph(p.img, { alt: p.title }).replace('loading="lazy"', 'loading="eager"')}${k !== 4 ? `<span class="zg-lbl">${p.loc}</span>` : ''}</div>`;
          }).join('')}
        </div>
        <div class="zg-shade"></div>
        <div class="zg-cap">
          <span class="index">Eight homes · one standard</span>
          <h2>Step <em>inside</em> the work.</h2>
          <p>The Travertine Residence · Ahmedabad · 2,850 sq.ft. · ₹42 L · 14 weeks</p>
        </div>
      </div>
    </section>`,
    init(root) {
      const g = gs(); if (!g) return;
      const grid = $('#zgGrid', root), center = $('.zg-tile.center', root);
      const scaleTo = () => {
        return Math.max(window.innerWidth / center.offsetWidth, window.innerHeight / center.offsetHeight) * 1.02;
      };
      g.set($$('.zg-cap > *', root), { y: 40, opacity: 0 });
      g.timeline({ scrollTrigger: { trigger: '#zg', start: 'top top', end: '+=170%', pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } })
        .fromTo(grid, { scale: 1 }, { scale: scaleTo, ease: 'power2.inOut', duration: 1 }, 0)
        .to($$('.zg-tile:not(.center)', root), { opacity: 0.3, duration: 0.6 }, 0.2)
        .to(center, { borderRadius: 0, duration: 0.5 }, 0.5)
        .to('.zg-shade', { opacity: 1, duration: 0.4 }, 0.7)
        .to($$('.zg-cap > *', root), { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 }, 0.8)
        .to({}, { duration: 0.3 });
      g.from($('.zg-tile .ph', root), { scale: 0.7, opacity: 0, stagger: { each: 0.05, from: 'center' }, duration: 1.2, delay: M().first ? 0 : 0.7 });
    },
  });

  /* ======================= PROCESS ======================= */
  const JN_POS = [[16, 14], [84, 33], [16, 52], [84, 71], [50, 92]];
  extend('/about', {
    near: 'Our Promise',
    where: 'before',
    html: `
    <section class="jn">
      <div class="wrap">
        <div class="sec-head">
          <div><span class="index">The Journey</span><h2>Twelve weeks,<br><em>drawn</em> in one line.</h2></div>
          <p class="lead">Scroll to follow a Modulabz project from the first site visit to the day you get your keys — every approval gate and payment milestone along the way.</p>
        </div>
        <div class="jn-body" id="jnBody">
          <svg class="jn-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
            <path class="jn-ghost" d="M500 0 C500 60 160 70 160 140 S840 260 840 330 S160 450 160 520 S840 640 840 710 S500 840 500 920"/>
            <path class="jn-path" id="jnPath" pathLength="1" d="M500 0 C500 60 160 70 160 140 S840 260 840 330 S160 450 160 520 S840 640 840 710 S500 840 500 920"/>
          </svg>
          <div class="jn-mline"><i id="jnM"></i></div>
          ${ML.STAGES.map((s, i) => {
            const [x, y] = JN_POS[i];
            return `<div class="jn-dot" style="left:${x}%;top:${y}%"><span>${s.n}</span></div>
              <article class="jn-card ${x < 50 ? 'r' : x > 50 ? 'l' : 'c'}" style="--x:${x}%;--y:${y}%">
                <span class="index plain">Stage ${s.n} · ${s.weeks}</span>
                <h3>${s.t}</h3>
                <p>${s.lead}</p>
                <div class="jn-pay">₹ ${s.pay}</div>
              </article>`;
          }).join('')}
        </div>
      </div>
    </section>`,
    init(root) {
      const g = gs(); if (!g) return;
      const path = $('#jnPath', root);
      g.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
      g.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '#jnBody', start: 'top 60%', end: 'bottom 70%', scrub: true } });
      g.fromTo('#jnM', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#jnBody', start: 'top 70%', end: 'bottom 70%', scrub: true } });
      $$('.jn-card', root).forEach((c) => {
        const dir = window.innerWidth < 900 ? 0 : c.classList.contains('l') ? 60 : c.classList.contains('r') ? -60 : 0;
        g.from(c, { x: dir, y: 40, opacity: 0, duration: 1.2, scrollTrigger: { trigger: c, start: 'top 72%' } });
      });
      $$('.jn-dot', root).forEach((d) => g.from(d, { scale: 0, duration: 0.8, ease: 'back.out(2.5)', scrollTrigger: { trigger: d, start: 'top 68%' } }));
    },
  });

  /* ======================= CONTACT ======================= */
  extend('/contact', {
    near: 'Where We Work',
    where: 'before',
    html: `
    <section class="talk">
      <div class="talk-marq" aria-hidden="true"><div class="track" id="talkTrack">${Array(6).fill('<span>Let’s talk</span><span>Let’s build</span>').join('')}</div></div>
      <div class="wrap talk-row">
        <button class="talk-card" data-talk="form"><span class="index plain">01 · Fastest</span><h3>Send the brief on WhatsApp</h3><p>Complete the three steps above — your formatted brief opens in WhatsApp.</p><span class="talk-go">↑</span></button>
        <a class="talk-card" href="https://www.instagram.com/modulabz_interiors/" target="_blank" rel="noopener"><span class="index plain">02 · Browse first</span><h3>See live site reels</h3><p>Follow ongoing projects and handovers on @modulabz_interiors.</p><span class="talk-go">↗</span></a>
        <button class="talk-card" data-talk="visit"><span class="index plain">03 · In person</span><h3>Meet us in Ahmedabad</h3><p>See material samples and discuss your plan with a designer — by appointment.</p><span class="talk-go">↓</span></button>
      </div>
    </section>`,
    init(root) {
      root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-talk]'); if (!b) return;
        M().scrollTo(b.dataset.talk === 'form' ? $('#brief', root) : $('.studios', root));
      });
      const g = gs(); if (!g) return;
      const tr = $('#talkTrack', root);
      g.to(tr, { xPercent: -50, ease: 'none', repeat: -1, duration: 30 });
      g.fromTo(tr.parentElement, { x: '8vw' }, { x: '-14vw', ease: 'none', scrollTrigger: { trigger: tr.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      g.from($$('.talk-card', root), { y: 80, opacity: 0, stagger: 0.1, duration: 1.2, scrollTrigger: { trigger: '.talk-row', start: 'top 85%' } });
      g.from($('.form-card', root), { y: 60, opacity: 0, duration: 1.3, delay: M().first ? 0.2 : 0.9 });
      g.from($('.brief-out', root), { y: 60, opacity: 0, duration: 1.3, delay: M().first ? 0.35 : 1.05 });
    },
  });

  /* ======================= ESTIMATOR ======================= */
  extend('/estimator', {
    init(root) {
      const g = gs(); if (!g) return;
      g.from($$('.step-card', root), { y: 70, opacity: 0, stagger: 0.1, duration: 1.2, delay: M().first ? 0.2 : 0.9 });
      g.from($('#boq', root), { x: 60, opacity: 0, duration: 1.3, delay: M().first ? 0.3 : 1 });
    },
  });
})();
