/* =========================================================
   PAGE 1 — HOME (scrollytelling)
   01 Hero window → full bleed
   02 Manifesto word-light
   03 Blueprint → Reality (pinned, 5 stages)
   04 Exploded kitchen cabinet assembles (pinned)
   05 Horizontal capabilities 01–06
   06 Material focus hotspots
   07 Stacking pillars
   08 Work list with cursor-follow preview
   09 Accountability seal + final CTA
   ========================================================= */
(function () {
  const { $, $$, ph, register, onLeave } = window.APP;
  const ML = window.ML;
  const ARROW = '<svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

  const BP_STEPS = [
    { t: '2D CAD &amp; Spatial Planning', d: 'Laser-measured, Vastu-zoned, every switch point and ceiling line placed before a single wall is touched.', tag: 'Weeks 1 – 2' },
    { t: '3D Photoreal Visualisation', d: 'Real material codes, mapped and lit at 2700K — you see it at golden hour before you sign anything.', tag: 'Weeks 2 – 3' },
    { t: 'Locked, Itemised BOQ', d: 'Brand, code and thickness on every line. The price freezes the moment you approve the 3D.', tag: 'Weeks 3 – 4' },
    { t: 'Factory &amp; Site, in Parallel', d: 'CNC cutting to ±0.5 mm in the factory while civil, POP and electrical run on site.', tag: 'Weeks 4 – 12' },
    { t: '100-Point Audit &amp; Handover', d: 'Every gap, hinge and switch checked and signed. Styled, cleaned, keys in your hand.', tag: 'Final week' },
  ];

  const CAB_PARTS = [
    { g: 'carcass', t: 'IS:710 BWP Marine Ply Carcass', s: '18 MM · BOILING-WATER PROOF' },
    { g: 'runners', t: 'Blum Tandembox Runners', s: '80,000 CYCLES · 65 KG' },
    { g: 'fronts', t: 'Anti-Fingerprint Acrylic Fronts', s: '1.5 MM · PUR ZERO-JOINT' },
    { g: 'handles', t: 'Brushed Brass Profile Handles', s: 'ALIGNED TO 900 MM DATUM' },
    { g: 'top', t: 'Quartz Countertop', s: '20 MM · STAIN-PROOF' },
    { g: 'led', t: '2700K Under-Counter LED', s: 'CRI 95+ · SENSOR' },
  ];

  /* Blueprint linework (viewBox 800 × 600) — every path draws itself */
  const bpLines = () => {
    const L = (d, cls = '') => `<path class="ln ${cls}" pathLength="1" d="${d}"/>`;
    return `
      <svg class="bp-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        ${L('M190 120 H610 V420 H190 Z')}
        ${L('M0 0 L190 120')}${L('M800 0 L610 120')}${L('M0 600 L190 420')}${L('M800 600 L610 420')}
        ${L('M190 140 H610', 'thin')}
        ${L('M250 160 H550 V300 H250 Z')}
        ${L('M300 330 H500 V380 H300 Z')}${Array.from({ length: 11 }, (_, i) => L(`M${310 + i * 18} 334 V376`, 'thin')).join('')}
        ${L('M200 470 H600 L660 560 H140 Z')}${L('M220 440 H580 V470 H220 Z')}
        ${L('M660 0 V170')}${L('M638 170 H682 L672 200 H648 Z')}
        ${L('M80 150 V480', 'thin')}${L('M70 150 H90')}${L('M70 480 H90')}
        ${L('M190 440 H610', 'thin')}
        <text x="96" y="320" transform="rotate(-90 96 320)">3050 FFL — SOFFIT</text>
        <text x="200" y="134">FALSE CEILING +2850 · COVE 2700K</text>
        <text x="258" y="152">TRAVERTINE · DRY-CLAD</text>
        <text x="308" y="398">CNC-FLUTED TEAK 1800</text>
        <text x="330" y="545">SOFA 3200 · BOUCLÉ</text>
        <text x="600" y="590">REV C · SCALE 1:50</text>
      </svg>`;
  };

  /* Exploded cabinet (viewBox 600 × 560) */
  const cabinetSVG = () => `
    <svg viewBox="0 0 600 560" aria-hidden="true">
      <defs>
        <linearGradient id="spill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC98A" stop-opacity=".75"/><stop offset="1" stop-color="#FFC98A" stop-opacity="0"/></linearGradient>
        <linearGradient id="acr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6F1E9"/><stop offset=".55" stop-color="#EAE3D8"/><stop offset="1" stop-color="#DDD4C5"/></linearGradient>
        <linearGradient id="qz" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F1ECE4"/><stop offset="1" stop-color="#DCD5CA"/></linearGradient>
        <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <ellipse cx="300" cy="528" rx="270" ry="16" fill="#000" opacity=".35" filter="url(#blur6)"/>
      <g data-part="carcass">
        <rect x="60" y="114" width="480" height="360" fill="#D7B38A"/>
        <rect x="72" y="126" width="456" height="336" fill="#B8915F"/>
        <rect x="296" y="126" width="8" height="336" fill="#D7B38A"/>
        <g opacity=".35" stroke="#8A6A45" stroke-width="1">${Array.from({ length: 5 }, (_, i) => `<line x1="60" y1="${118 + i * 2}" x2="540" y2="${118 + i * 2}"/>`).join('')}</g>
        <rect x="60" y="474" width="480" height="34" fill="#2A2724"/>
      </g>
      <g data-part="runners">
        ${[0, 1, 2].map((i) => `<rect x="82" y="${142 + i * 110}" width="204" height="88" rx="3" fill="#3A3733"/><rect x="82" y="${142 + i * 110}" width="204" height="9" fill="#8C8A86"/>`).join('')}
      </g>
      <g data-part="fronts">
        <g data-sub="left">${[0, 1, 2].map((i) => `<rect x="64" y="${118 + i * 118}" width="234" height="112" rx="2" fill="url(#acr)" stroke="#CFC6B8"/>`).join('')}</g>
        <g data-sub="right"><rect x="304" y="118" width="116" height="348" rx="2" fill="url(#acr)" stroke="#CFC6B8"/><rect x="424" y="118" width="116" height="348" rx="2" fill="url(#acr)" stroke="#CFC6B8"/></g>
      </g>
      <g data-part="handles">
        ${[0, 1, 2].map((i) => `<rect x="111" y="${122 + i * 118}" width="140" height="4" rx="2" fill="#B89146"/>`).join('')}
        <rect x="410" y="150" width="4" height="120" rx="2" fill="#B89146"/><rect x="430" y="150" width="4" height="120" rx="2" fill="#B89146"/>
      </g>
      <g data-part="led">
        <path d="M64 116 L536 116 L560 250 L40 250 Z" fill="url(#spill)" opacity=".55"/>
        <rect x="70" y="112" width="460" height="4" fill="#FFE3B8"/>
        <rect x="70" y="108" width="460" height="10" fill="#FFC98A" filter="url(#blur6)" opacity=".9"/>
      </g>
      <g data-part="top">
        <rect x="40" y="88" width="520" height="26" rx="2" fill="url(#qz)"/>
        <path d="M70 96 C140 92 180 104 260 98 S420 92 520 104" stroke="#C9C0B2" stroke-width="1" fill="none"/>
        <path d="M120 108 C200 104 300 110 380 104" stroke="#D4CCBF" stroke-width="1" fill="none"/>
      </g>
    </svg>`;

  register('/', () => {
    const hs = ML.HOTSPOTS;
    const marq = ['Residential', 'Modular Kitchens', 'Wardrobes', '3D Lab', 'Turnkey', 'Workplaces', 'Cafés'];
    const html = `
    <!-- 01 HERO -->
    <section class="hx" id="hx">
      <div class="hx-media" id="hxMedia">
        ${ph(ML.IMG.heroLiving, { alt: 'Luxury Ahmedabad living room — travertine, fluted teak and cove lighting' })}
        <div class="hx-shade"></div>
        <div class="hx-cap">
          <span class="index">The Modulabz Way</span>
          <div class="hx-cap-row">
            <p id="hxCapText">Every space has a story <em>waiting</em> to be told.</p>
            <div class="hx-cap-meta">The Travertine Residence<br>Ahmedabad · 2,850 sq.ft.<br>Handed over in 14 weeks</div>
          </div>
        </div>
      </div>
      <div class="hx-type">
        <div class="hx-top" id="hxTop">
          <div>
            <span class="index">Modular Engineering | 2D &amp; 3D Interior Design | Turnkey</span>
            <h1 class="hx-h1" id="hxH1"><span class="ln">Designing Spaces.</span><span class="ln"><em>Engineering</em> Modern Living.</span></h1>
          </div>
          <div class="hx-coords">Modulabz Interiors<br>Ahmedabad, Gujarat, India<br>Ahmedabad · Palanpur · Baroda · Mumbai</div>
        </div>
        <div class="hx-bottom" id="hxBottom">
          <p class="hx-sub">Thoughtful 2D &amp; 3D spatial planning, factory-crafted modular joinery, and meticulous turnkey execution for homes, villas and offices in Ahmedabad, Palanpur, Baroda and Mumbai.</p>
          <div></div>
          <div class="hx-ctas">
            <a href="#/contact" class="btn btn-primary">Start Your Project <span class="arr">→</span></a>
            <a href="#/estimator" class="btn btn-dark">Calculate Instant BOQ</a>
            <a href="#/portfolio" class="btn btn-ghost">Explore Featured Work</a>
          </div>
        </div>
      </div>
      <div class="hx-scroll"><span>SCROLL</span><i></i></div>
    </section>

    <!-- 02 MANIFESTO -->
    <section class="mf">
      <div class="wrap">
        <div class="mf-grid">
          <span class="index">Manifesto · Since 2022</span>
          <p class="mf-text" id="mfText">We don’t decorate rooms. We <em>engineer</em> them — drawn in 2D, proven in photoreal 3D, cut on CNC to half a millimetre, priced on a locked BOQ, and installed by a team that actually answers your WhatsApp.</p>
        </div>
        <div class="mf-foot">
          <span></span>
          <div><b class="num" data-count="120">0<sup>+</sup></b><span>Homes &amp; workplaces delivered</span></div>
          <div><b class="num" data-count="100">0<sup>%</sup></b><span>Locked BOQ — zero surprise invoices</span></div>
          <div><b class="num" data-count="10">0<sup>yr</sup></b><span>Modular warranty, in writing</span></div>
        </div>
      </div>
    </section>

    <div class="bigmarq" aria-hidden="true"><div class="track" id="bigMarq">${Array(4).fill(marq.map((t) => `<span>${t}</span>`).join('')).join('')}</div></div>

    <!-- 03 BLUEPRINT → REALITY -->
    <section class="bp" id="bp">
      <div class="wrap bp-inner">
        <div class="bp-left">
          <span class="index">From Blueprint to Reality</span>
          <h2 class="bp-title">Watch a home get <em>engineered</em>.</h2>
          <div class="bp-steps">
            ${BP_STEPS.map((s, i) => `<div class="bp-step ${i === 0 ? 'on' : ''}"><span class="n">STAGE 0${i + 1} / 05</span><h3>${s.t}</h3><p>${s.d}</p><span class="tag">${s.tag}</span></div>`).join('')}
          </div>
          <div class="bp-rail">${BP_STEPS.map(() => '<i><b></b></i>').join('')}</div>
        </div>
        <div class="bp-stage" id="bpStage">
          <div class="bp-render">${ph(ML.IMG.living2, { alt: '3D render becoming the finished room' })}</div>
          ${bpLines()}
          <div class="bp-scan"></div>
          <div class="bp-tags">
            <span style="left:12%;top:26%">CNC ±0.5 MM</span>
            <span style="left:56%;top:58%">PUR EDGE-BAND</span>
            <span style="left:20%;top:70%">BWP CARCASS ✓</span>
            <span style="left:62%;top:20%">2700K COVE ✓</span>
          </div>
          <div class="bp-boq">
            <div class="hd"><span>BOQ · REV C</span><span class="lock">● LOCKED</span></div>
            <div class="r"><span>Living &amp; Dining</span><span>₹4,80,000</span></div>
            <div class="r"><span>Modular Kitchen</span><span>₹3,80,000</span></div>
            <div class="r"><span>Wardrobes &amp; Storage</span><span>₹5,10,000</span></div>
            <div class="r"><span>Ceiling &amp; Electrical</span><span>₹2,90,000</span></div>
            <div class="r"><span>Finishes &amp; Decor</span><span>₹2,20,000</span></div>
            <div class="r t"><span>Total</span><span>₹18,80,000</span></div>
          </div>
          <div class="bp-stamp">
            <svg viewBox="0 0 140 140"><defs><path id="stc" d="M70,70 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0"/></defs>
              <circle cx="70" cy="70" r="66" fill="rgba(66,98,75,.92)"/><circle cx="70" cy="70" r="46" fill="none" stroke="#F7F4EF" stroke-opacity=".5"/>
              <text font-family="JetBrains Mono" font-size="9" letter-spacing="2.6" fill="#F7F4EF"><textPath href="#stc">HANDED OVER · 100-POINT AUDIT · </textPath></text>
              <text x="70" y="78" text-anchor="middle" font-family="Cormorant Garamond" font-size="30" fill="#F7F4EF">✓</text></svg>
          </div>
          <div class="bp-hud">MODULABZ · 3D LAB · <span id="bpPct">000</span>%</div>
        </div>
      </div>
    </section>

    <!-- 04 EXPLODED CABINET -->
    <section class="cab dark" id="cab">
      <div class="wrap cab-inner">
        <div>
          <span class="index">Anatomy of a Modulabz Kitchen</span>
          <h2>Six layers of <em>engineering</em> in every unit.</h2>
          <ol class="cab-list" id="cabList">
            ${CAB_PARTS.map((p, i) => `<li><span class="n">0${i + 1}</span><span class="t">${p.t}</span><span class="s">${p.s}</span></li>`).join('')}
          </ol>
        </div>
        <div class="cab-stage" id="cabStage">
          <div class="cab-glow"></div>
          ${cabinetSVG()}
          <div class="cab-hud">EXPLODED VIEW → ASSEMBLED</div>
        </div>
      </div>
    </section>

    <!-- 05 HORIZONTAL CAPABILITIES -->
    <section class="hz" id="hz">
      <div class="hz-track" id="hzTrack">
        <div class="hz-intro">
          <span class="index">Connected Capabilities · 01 — 06</span>
          <h2>Six disciplines.<br>One <em>accountable</em> studio.</h2>
          <p class="lead" style="font-size:16px">From a single modular kitchen to a 5,000 sq.ft. villa — every capability shares the same CAD pod, 3D lab, factory and site team.</p>
          <span class="hz-hint">Keep scrolling</span>
        </div>
        ${ML.SERVICES.map((s) => `
          <a class="hz-card" href="#/services?s=${s.id}" data-cursor="Explore">
            <div class="hz-img">${ph(s.img, { alt: s.title }).replace('loading="lazy"', 'loading="eager"')}<span class="hz-n">${s.n}</span><span class="hz-go">${ARROW}</span></div>
            <div class="hz-meta">
              <div><h3>${s.title}</h3><p>${s.tagline}</p></div>
              <div class="hz-price"><small>From</small><b class="num">${s.from}</b></div>
            </div>
          </a>`).join('')}
        <div class="hz-end">
          <span class="index">Not sure where to start?</span>
          <h3>Price your home in <em>60 seconds</em>.</h3>
          <a href="#/estimator" class="btn btn-primary">Build Your BOQ <span class="arr">→</span></a>
        </div>
      </div>
      <div class="hz-prog"><i id="hzProg"></i></div>
    </section>

    <!-- 06 MATERIAL FOCUS -->
    <section class="focus">
      <div class="wrap">
        <div class="sec-head">
          <div><span class="index">Material in Focus</span><h2>Touch the details. <em>Tap</em> the pins.</h2></div>
          <p class="lead">Every finish in a Modulabz home is specified by name, code and thickness. Explore three from the Travertine Residence.</p>
        </div>
        <div class="hero-stage" id="heroStage" style="margin-top:0">
          ${ph(ML.IMG.heroLiving, { alt: 'Living room material details' })}
          ${hs.map((h, i) => `<button class="hotspot ${i === 0 ? 'on' : ''}" style="left:${h.x}%;top:${h.y}%" data-hs="${i}" aria-label="Material ${h.n}: ${h.title}"><span class="core">${h.n}</span></button>`).join('')}
          <div class="hero-caption">Project · The Travertine Residence, Ahmedabad</div>
          <div class="spec-card" id="specCard" aria-live="polite"></div>
        </div>
      </div>
    </section>

    <!-- 07 STACKING PILLARS -->
    <section class="stack-sec dark">
      <div class="wrap">
        <div class="sec-head">
          <div><span class="index">Design in Detail</span><h2>Material · Light ·<br>Detail · <em>Form</em></h2></div>
          <p class="lead">Lasting luxury isn’t a budget line — it’s a hundred small engineering decisions made correctly. Four we never compromise on.</p>
        </div>
        <div class="stack">
          ${ML.PILLARS.map((p, i) => `
            <article class="stack-card" style="--i:${i}">
              <div class="sc-img">${ph(p.img, { alt: p.t })}</div>
              <div class="sc-copy">
                <span class="sc-big">${p.t}</span>
                <span class="index">Pillar ${p.n} · ${p.t}</span>
                <h3>${p.h}</h3>
                <p>${p.p}</p>
                <div class="mini-specs">${p.specs.map(([k, v]) => `<div><span>${k}</span><span>${v}</span></div>`).join('')}</div>
              </div>
            </article>`).join('')}
        </div>
      </div>
    </section>

    <!-- 08 SELECTED WORK -->
    <section class="section">
      <div class="wrap">
        <div class="sec-head">
          <div><span class="index">Selected Work</span><h2>Recently <em>handed over</em>.</h2></div>
          <div style="text-align:right"><a href="#/portfolio" class="link-arrow">All case studies ${ARROW}</a></div>
        </div>
        <div class="wl" id="wl">
          ${ML.PROJECTS.slice(0, 6).map((p, i) => `
            <a class="wl-row" href="#/portfolio?open=${p.id}" data-img="${p.img}" data-cursor="View">
              <span class="wl-i">0${i + 1}</span><span class="wl-t">${p.title}</span><span class="wl-c">${p.cat}</span><span class="wl-l">${p.loc}</span><span class="wl-v num">₹${p.cost}L</span><span class="wl-a">${ARROW}</span>
            </a>`).join('')}
        </div>
      </div>
      <div class="wl-float" id="wlFloat"><img alt="" src="${ML.PROJECTS[0].img}"></div>
    </section>

    <!-- 09 ACCOUNTABILITY -->
    <section class="section tight" style="padding-top:0">
      <div class="wrap">
        <div class="acc-banner reveal">
          <div class="seal">
            <svg viewBox="0 0 160 160" aria-hidden="true"><defs><path id="circ" d="M80,80 m-68,0 a68,68 0 1,1 136,0 a68,68 0 1,1 -136,0"/></defs><text font-family="JetBrains Mono, monospace" font-size="9.5" letter-spacing="3.2" fill="#42624B"><textPath href="#circ">LOCKED BOQ · NO SUBSTITUTIONS · WRITTEN WARRANTY · </textPath></text></svg>
            <div><b>10</b><small>Year<br>Warranty</small></div>
          </div>
          <div>
            <span class="index" style="color:var(--sage)">The Modulabz Accountability Promise</span>
            <h3 style="margin-top:12px">100% Locked BOQ &amp; a 10-Year Modular Warranty — <em>in writing</em>.</h3>
            <ul><li>Price locked at 3D sign-off</li><li>Zero unapproved substitutions</li><li>Brand invoices at dispatch</li><li>100-point handover audit</li></ul>
          </div>
          <a href="#/about" class="btn btn-dark">About Us <span class="arr">→</span></a>
        </div>
      </div>
    </section>

    <section class="final">
      <div class="final-orb"></div>
      <div class="wrap">
        <span class="index">Next Step · Free Site Visit</span>
        <h2 class="final-h" id="finalH">Let’s engineer<br><em>your</em> home.</h2>
        <div class="final-row">
          <p class="lead">A designer visits, measures and listens — free, in Ahmedabad, Palanpur, Baroda and Mumbai. You leave with a direction and a budget range.</p>
          <div class="btns">
            <a href="#/contact" class="btn btn-primary">Book Free Site Visit <span class="arr">→</span></a>
            <a href="#/estimator" class="btn btn-ghost">Calculate Instant BOQ</a>
          </div>
        </div>
      </div>
    </section>`;

    return {
      html,
      init(root) {
        const M = window.MOTION;
        const first = !!M.first;

        /* ---- Hotspots (works with or without motion) ---- */
        const card = $('#specCard', root);
        let cur = 0;
        const showSpec = (i) => {
          cur = i; const h = hs[i];
          card.innerHTML = `<div class="sc-in"><span class="index">Material ${h.n} / 03</span><h4>${h.title}</h4><p>${h.desc}</p>
            <dl>${h.specs.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
            <div class="spec-tabs">${hs.map((x, j) => `<button data-hs="${j}" class="${j === i ? 'on' : ''}">${x.n}</button>`).join('')}</div></div>`;
          $$('.hotspot', root).forEach((b, j) => b.classList.toggle('on', j === i));
        };
        showSpec(0);
        const auto = setInterval(() => showSpec((cur + 1) % hs.length), 5200);
        let stopped = false;
        root.addEventListener('click', (e) => { const b = e.target.closest('[data-hs]'); if (b) { if (!stopped) { clearInterval(auto); stopped = true; } showSpec(+b.dataset.hs); } });
        onLeave(() => clearInterval(auto));

        /* ---- Counters ---- */
        const counters = $$('[data-count]', root);
        const runCount = (el) => {
          const end = +el.dataset.count, sup = el.querySelector('sup').outerHTML, t0 = performance.now();
          const step = (t) => { const k = Math.min(1, (t - t0) / 1600); el.innerHTML = Math.round(end * (1 - Math.pow(1 - k, 3))) + sup; if (k < 1) requestAnimationFrame(step); };
          requestAnimationFrame(step);
        };
        const cio = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { cio.unobserve(en.target); runCount(en.target); } }), { threshold: 0.5 });
        counters.forEach((c) => cio.observe(c));
        onLeave(() => cio.disconnect());

        /* ---- Work list floating preview ---- */
        const wl = $('#wl', root), float = $('#wlFloat', root), fimg = $('img', float);
        if (M.active && M.fine) {
          const { gsap } = window;
          const fx = gsap.quickTo(float, 'x', { duration: 0.6, ease: 'power3' }), fy = gsap.quickTo(float, 'y', { duration: 0.6, ease: 'power3' });
          wl.addEventListener('mousemove', (e) => { fx(e.clientX); fy(e.clientY); });
          wl.addEventListener('mouseover', (e) => { const r = e.target.closest('.wl-row'); if (r && fimg.getAttribute('src') !== r.dataset.img) fimg.src = r.dataset.img; });
          wl.addEventListener('mouseenter', (e) => { gsap.set(float, { x: e.clientX, y: e.clientY }); gsap.to(float, { opacity: 1, scale: 1, duration: 0.5 }); });
          wl.addEventListener('mouseleave', () => gsap.to(float, { opacity: 0, scale: 0.6, duration: 0.4 }));
        }

        if (!M.active) {
          // Static fallback: show everything in its final state
          $('#hxMedia', root).style.clipPath = 'none';
          $('.hx-type', root).style.display = 'none';
          $$('.hx-shade, .hx-cap .index, .hx-cap-meta', root).forEach((e) => (e.style.opacity = 1));
          $('.bp-render', root).style.clipPath = 'none';
          return;
        }

        const { gsap, ScrollTrigger } = window;
        const mm = gsap.matchMedia();
        onLeave(() => mm.revert());

        /* ===== 01 HERO ===== */
        const media = $('#hxMedia', root), mImg = $('img', media), shade = $('.hx-shade', media);
        const h1w = M.split($('#hxH1', root));
        const capw = M.split($('#hxCapText', root));
        gsap.set(h1w, { yPercent: 115 });
        gsap.set(capw, { yPercent: 115 });
        gsap.set(mImg, { scale: 1.45 });
        // Window shape: fits the gap between headline and CTAs on phones/tablets
        const HX_START = () => {
          if (window.innerWidth >= 900) return 'inset(52% 31% 7% 31% round 14px)';
          const hx = $('#hx', root).getBoundingClientRect(), H = hx.height || window.innerHeight;
          const top = $('#hxTop', root).getBoundingClientRect().bottom - hx.top + 18;
          const bot = H - ($('#hxBottom', root).getBoundingClientRect().top - hx.top) + 18;
          const t = Math.min(60, Math.max(30, (top / H) * 100)), b = Math.min(40, Math.max(8, (bot / H) * 100));
          return 'inset(' + t.toFixed(1) + '% 5% ' + b.toFixed(1) + '% 5% round 12px)';
        };
        gsap.set(media, { yPercent: 40, opacity: 0, clipPath: HX_START() });
        gsap.set($$('.hx-top .index, .hx-coords, .hx-sub, .hx-ctas .btn', root), { y: 30, opacity: 0 });

        M.whenReady(first, () => {
          const d = first ? 0 : 0.7;
          gsap.timeline({ delay: d })
            .to(h1w, { yPercent: 0, duration: 1.4, stagger: 0.07 }, 0)
            .to(media, { yPercent: 0, opacity: 1, duration: 1.6, ease: 'expo.out' }, 0.25)
            .to(mImg, { scale: 1.28, duration: 2, ease: 'expo.out' }, 0.25)
            .to($$('.hx-top .index, .hx-coords, .hx-sub, .hx-ctas .btn', root), { y: 0, opacity: 1, duration: 1.1, stagger: 0.07 }, 0.6);
        });

        gsap.timeline({
          scrollTrigger: { trigger: '#hx', start: 'top top', end: '+=150%', pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
        })
          .fromTo(media, { clipPath: HX_START }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1, immediateRender: false }, 0)
          .to(mImg, { scale: 1, ease: 'none', duration: 1.2 }, 0)
          .to('#hxTop', { yPercent: -80, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0)
          .to('#hxBottom', { y: 120, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0)
          .to('.hx-scroll', { opacity: 0, duration: 0.2 }, 0)
          .to(shade, { opacity: 1, duration: 0.4 }, 0.6)
          .to('.hx-cap .index', { opacity: 1, duration: 0.2 }, 0.8)
          .to(capw, { yPercent: 0, stagger: 0.04, duration: 0.5, ease: 'power3.out' }, 0.8)
          .to('.hx-cap-meta', { opacity: 1, duration: 0.3 }, 1.0)
          .to({}, { duration: 0.35 });

        /* ===== 02 MANIFESTO word light ===== */
        const mw = M.split($('#mfText', root));
        gsap.fromTo(mw, { opacity: 0.12 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '#mfText', start: 'top 80%', end: 'bottom 45%', scrub: true } });

        /* ===== Big marquee — scroll-linked drift ===== */
        const mq = $('#bigMarq', root);
        gsap.to(mq, { xPercent: -50, ease: 'none', repeat: -1, duration: 40 });
        gsap.fromTo(mq.parentElement, { x: '6vw' }, { x: '-12vw', ease: 'none', scrollTrigger: { trigger: mq.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });

        /* ===== 03 BLUEPRINT → REALITY ===== */
        const stage = $('#bpStage', root), lines = $$('.bp-svg .ln', stage), labels = $$('.bp-svg text', stage);
        const render = $('.bp-render', stage), rImg = $('img', render), boq = $('.bp-boq', stage), scan = $('.bp-scan', stage), tags = $$('.bp-tags span', stage), stamp = $('.bp-stamp', stage);
        const steps = $$('.bp-step', root), rail = $$('.bp-rail b', root), pct = $('#bpPct', root);
        gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(render, { clipPath: 'inset(0% 100% 0% 0%)' });
        gsap.set(labels, { opacity: 0 });
        let curStep = 0;
        const bpTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '#bp', start: 'top top', end: '+=420%', pin: true, scrub: 1, anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress, i = Math.min(4, Math.floor(p * 5));
              if (i !== curStep) { steps[curStep].classList.remove('on'); steps[i].classList.add('on'); curStep = i; }
              rail.forEach((b, j) => { b.style.transform = `scaleX(${Math.max(0, Math.min(1, p * 5 - j))})`; });
              pct.textContent = String(Math.round(p * 100)).padStart(3, '0');
            },
          },
        });
        bpTl
          .to(lines, { strokeDashoffset: 0, stagger: 0.03, duration: 0.6 }, 0)
          .to(labels, { opacity: 1, stagger: 0.05, duration: 0.2 }, 0.5)
          .fromTo(render, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, immediateRender: false }, 1)
          .to(lines, { opacity: 0.25, duration: 0.6 }, 1.3)
          .to(labels, { opacity: 0, duration: 0.4 }, 1.4)
          .to(boq, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 2.1)
          .from($$('.r', boq), { opacity: 0, x: 20, stagger: 0.08, duration: 0.3 }, 2.2)
          .to(scan, { opacity: 1, duration: 0.1 }, 3)
          .fromTo(scan, { top: '0%' }, { top: '100%', duration: 0.9 }, 3)
          .to(tags, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.25, ease: 'back.out(2)' }, 3.05)
          .to(rImg, { filter: 'grayscale(0.45) contrast(1.08) brightness(1.04)', duration: 0.8 }, 3)
          .to(scan, { opacity: 0, duration: 0.1 }, 3.9)
          .to(boq, { opacity: 0, x: 40, duration: 0.4 }, 4)
          .to(tags, { opacity: 0, duration: 0.3 }, 4)
          .to(lines, { opacity: 0, duration: 0.4 }, 4)
          .to(rImg, { filter: 'grayscale(0) contrast(1) brightness(1)', duration: 0.6 }, 4)
          .to(stamp, { opacity: 1, scale: 1, rotate: -8, duration: 0.35, ease: 'back.out(2.5)' }, 4.4)
          .to({}, { duration: 0.3 });

        /* ===== 04 EXPLODED CABINET ===== */
        const P = (n) => $(`[data-part="${n}"]`, root);
        const cabItems = $$('#cabList li', root);
        const cabTl = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          scrollTrigger: {
            trigger: '#cab', start: 'top top', end: '+=260%', pin: true, scrub: 1, anticipatePin: 1,
            onUpdate: (self) => {
              const a = Math.min(CAB_PARTS.length - 1, Math.floor(self.progress * (CAB_PARTS.length + 0.4)));
              cabItems.forEach((li, j) => li.classList.toggle('on', j <= a));
            },
          },
        });
        cabTl
          .from(P('carcass'), { opacity: 0.15, scale: 0.88, transformOrigin: '50% 60%', duration: 1 }, 0)
          .from(P('runners'), { x: -320, opacity: 0, duration: 1 }, 0.9)
          .from($('[data-sub="left"]', root), { x: -420, opacity: 0, duration: 1 }, 1.8)
          .from($('[data-sub="right"]', root), { x: 420, opacity: 0, duration: 1 }, 1.8)
          .from(P('handles'), { y: -140, opacity: 0, duration: 0.9 }, 2.8)
          .from(P('top'), { y: -260, opacity: 0, duration: 1 }, 3.6)
          .from(P('led'), { opacity: 0, duration: 0.8, ease: 'none' }, 4.5)
          .to('.cab-glow', { opacity: 1, duration: 0.8, ease: 'none' }, 4.5)
          .to({}, { duration: 0.4 });

        /* ===== 05 HORIZONTAL ===== */
        mm.add('(min-width: 0px)', () => {
          const hz = $('#hz', root), track = $('#hzTrack', root);
          const dist = () => track.scrollWidth - window.innerWidth;
          const tween = gsap.to(track, {
            x: () => -dist(), ease: 'none',
            scrollTrigger: { trigger: hz, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
              onUpdate: (s) => { $('#hzProg', root).style.transform = `scaleX(${s.progress})`; } },
          });
          $$('.hz-card', root).forEach((c) => {
            const img = $('img', c);
            gsap.fromTo(img, { xPercent: -10 }, { xPercent: 10, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
            gsap.from($('.hz-n', c), { yPercent: 60, opacity: 0, duration: 1, scrollTrigger: { trigger: c, containerAnimation: tween, start: 'left 85%' } });
          });
        });

        /* ===== 06 FOCUS stage reveal ===== */
        const stageEl = $('#heroStage', root);
        gsap.fromTo($('.ph', stageEl), { clipPath: 'inset(12% 12% 12% 12% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 6px)', ease: 'none', scrollTrigger: { trigger: stageEl, start: 'top 90%', end: 'top 25%', scrub: true } });
        gsap.fromTo($('.ph img', stageEl), { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: stageEl, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.from($$('.hotspot', stageEl), { scale: 0, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(2)', scrollTrigger: { trigger: stageEl, start: 'top 45%' } });
        gsap.from('#specCard', { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: stageEl, start: 'top 40%' } });

        /* ===== 07 STACK ===== */
        const cards = $$('.stack-card', root);
        cards.forEach((c, i) => {
          gsap.fromTo($('.sc-img img', c), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'top top', scrub: true } });
          if (i === cards.length - 1) return;
          gsap.fromTo(c, { scale: 1, filter: 'brightness(1)' }, { scale: 0.9 + i * 0.015, filter: 'brightness(0.45)', ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 15%', scrub: true } });
        });

        /* ===== 08 WORK rows ===== */
        gsap.from($$('.wl-row', root), { y: 60, opacity: 0, stagger: 0.08, duration: 1.1, scrollTrigger: { trigger: '#wl', start: 'top 85%' } });

        /* ===== 09 FINAL ===== */
        const fw = M.split($('#finalH', root));
        gsap.fromTo(fw, { yPercent: 115 }, { yPercent: 0, stagger: 0.06, duration: 1.4, scrollTrigger: { trigger: '#finalH', start: 'top 85%' } });
        gsap.fromTo('#finalH', { scale: 0.9 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'center center', scrub: true } });
        gsap.fromTo('.final-orb', { yPercent: 30 }, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'bottom top', scrub: true } });

        ScrollTrigger.refresh();
      },
    };
  });
})();
