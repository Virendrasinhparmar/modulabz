/* =========================================================
   Pages 5–8: Portfolio, Estimator, Process, Contact
   ========================================================= */
(function () {
  const { $, $$, ph, toast, copyText, register, go, onLeave, pageHead, ctaBand, STATE, fmtL, fmtLnum, fmtINR, esc, openModal, closeModal } = window.APP;
  const ML = window.ML;
  const EST = ML.EST;
  const ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  const IG = 'https://www.instagram.com/modulabz_interiors/';

  /* =======================================================
     PAGE 5 — PORTFOLIO
     ======================================================= */
  const tierOf = (cost) => (cost < 8 ? 'low' : cost < 20 ? 'mid' : 'high');

  function conceptSVG(scene) {
    const L = 'stroke="#9CC6E4" stroke-width="2" fill="none"';
    const T = 'font-family="JetBrains Mono" font-size="14" fill="#9CC6E4"';
    const room = `
      <defs><pattern id="bp" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#2C4252" stroke-width="1"/></pattern></defs>
      <rect width="1600" height="850" fill="#1D2A33"/><rect width="1600" height="850" fill="url(#bp)"/>
      <rect x="380" y="170" width="840" height="470" ${L}/>
      <line x1="0" y1="0" x2="380" y2="170" ${L}/><line x1="1600" y1="0" x2="1220" y2="170" ${L}/>
      <line x1="0" y1="850" x2="380" y2="640" ${L}/><line x1="1600" y1="850" x2="1220" y2="640" ${L}/>
      <line x1="380" y1="205" x2="1220" y2="205" stroke="#9CC6E4" stroke-width="1" stroke-dasharray="10 6"/>
      <text x="390" y="198" ${T}>FALSE CEILING +2850 · COVE 2700K</text>
      <line x1="300" y1="170" x2="300" y2="640" stroke="#9CC6E4" stroke-width="1"/><text x="230" y="410" ${T} transform="rotate(-90 230 410)">3050 FFL–SOFFIT</text>
      <line x1="380" y1="700" x2="1220" y2="700" stroke="#9CC6E4" stroke-width="1"/><text x="740" y="725" ${T}>4800 CLEAR</text>`;
    let furn = '';
    if (scene === 'kitchen') {
      furn = `
        <rect x="420" y="430" width="760" height="210" ${L}/>${Array.from({ length: 8 }, (_, i) => `<line x1="${420 + i * 95}" y1="430" x2="${420 + i * 95}" y2="640" stroke="#9CC6E4" stroke-width="1.4"/>`).join('')}
        <rect x="420" y="415" width="760" height="15" ${L}/>
        <rect x="420" y="215" width="760" height="140" ${L}/>${Array.from({ length: 8 }, (_, i) => `<line x1="${420 + i * 95}" y1="215" x2="${420 + i * 95}" y2="355" stroke="#9CC6E4" stroke-width="1.4"/>`).join('')}
        <path d="M560 690 L1040 690 L1110 800 L490 800Z" ${L}/><text x="640" y="765" ${T}>ISLAND · QUARTZ 20MM</text>
        <text x="430" y="408" ${T}>BWP CARCASS · ACRYLIC SHUTTERS · BLUM TANDEMBOX</text>`;
    } else if (scene === 'bedroom') {
      furn = `
        <rect x="430" y="230" width="300" height="410" ${L}/>${Array.from({ length: 3 }, (_, i) => `<line x1="${430 + (i + 1) * 75}" y1="230" x2="${430 + (i + 1) * 75}" y2="640" stroke="#9CC6E4" stroke-width="1.4"/>`).join('')}
        <text x="440" y="222" ${T}>WARDROBE · FLUTED GLASS</text>
        <rect x="800" y="380" width="380" height="130" ${L}/><text x="820" y="372" ${T}>HEADBOARD · VENEER</text>
        <path d="M760 510 L1220 510 L1330 760 L650 760Z" ${L}/><text x="860" y="650" ${T}>KING BED 1830 × 2135</text>`;
    } else {
      furn = `
        <rect x="450" y="250" width="700" height="250" ${L}/><text x="460" y="242" ${T}>TRAVERTINE CLADDING · DRY-CLAD</text>
        <rect x="560" y="470" width="480" height="90" ${L}/>${Array.from({ length: 16 }, (_, i) => `<line x1="${575 + i * 29}" y1="475" x2="${575 + i * 29}" y2="555" stroke="#9CC6E4" stroke-width="1"/>`).join('')}
        <text x="570" y="586" ${T}>CNC-FLUTED TEAK CONSOLE</text>
        <path d="M430 680 L1170 680 L1260 820 L340 820Z" ${L}/><rect x="460" y="640" width="680" height="40" ${L}/><text x="680" y="770" ${T}>SOFA 3200 · BOUCLÉ</text>
        <line x1="1300" y1="0" x2="1300" y2="250" ${L}/><path d="M1260 250 h80 l-15 50 h-50Z" ${L}/>`;
    }
    return `<svg viewBox="0 0 1600 850" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${room}${furn}
      <g transform="translate(1380 760)"><rect width="190" height="64" fill="none" stroke="#9CC6E4"/><text x="12" y="24" ${T}>MODULABZ · 3D LAB</text><text x="12" y="48" ${T}>REV C · SCALE 1:50</text></g></svg>`;
  }

  function caseStudyHTML(p) {
    const total = p.boq.reduce((a, b) => a + b[2], 0);
    return `
      ${ph(p.img, { cls: 'cover', alt: p.title })}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:22px"><span class="chip terra">${p.cat}</span><span class="chip">${p.type}</span><span class="chip sage">Handed over · 10-yr warranty</span></div>
      <h2 id="modalTitle" style="margin:14px 0 4px;font-size:clamp(34px,4vw,52px)">${p.title}</h2>
      <div class="cs-stats">
        <div><div class="k">Locality</div><div class="v" style="font-size:20px">${p.loc}</div></div>
        <div><div class="k">Carpet Area</div><div class="v">${p.area.toLocaleString('en-IN')} <small style="font-size:13px">sq.ft.</small></div></div>
        <div><div class="k">Investment</div><div class="v">₹${p.cost} L</div></div>
        <div><div class="k">Execution</div><div class="v">${p.weeks} <small style="font-size:13px">weeks</small></div></div>
      </div>
      <div class="grid-2" style="gap:28px">
        <div><span class="index">Client Brief</span><p style="margin-top:10px">${p.brief}</p></div>
        <div><span class="index">Spatial Challenge</span><p style="margin-top:10px">${p.challenge}</p></div>
      </div>
      <div style="margin-top:10px"><span class="index">The Modulabz Solution</span><p class="lead" style="margin-top:10px;font-size:17px">${p.solution}</p></div>
      <div style="margin-top:22px"><span class="index">Room-by-Room Material Schedule &amp; BOQ</span>
        <div class="table-scroll"><table class="boq-mini">
          <thead><tr><th>Zone</th><th>Material Schedule</th><th class="r">₹ Lakhs</th><th class="r">Share</th></tr></thead>
          <tbody>${p.boq.map(([z, m, v]) => `<tr><td><b>${z}</b></td><td class="muted">${m}</td><td class="r">${v.toFixed(1)}</td><td class="r">${Math.round((v / total) * 100)}%</td></tr>`).join('')}</tbody>
          <tfoot><tr><td colspan="2">Total Project Investment</td><td class="r">₹${total.toFixed(1)} L</td><td class="r">100%</td></tr></tfoot>
        </table></div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:28px;padding-top:22px;border-top:1px solid var(--limestone)">
        <a href="${IG}" target="_blank" rel="noopener" class="btn btn-ghost">View site reels on @modulabz_interiors ↗</a>
        <button class="btn btn-primary" data-similar>Estimate a Similar Project <span class="arr">→</span></button>
      </div>`;
  }

  function openCase(id) {
    const p = ML.PROJECTS.find((x) => x.id === id);
    if (!p) return;
    openModal(`Case Study · ${p.loc}`, caseStudyHTML(p));
    $('#modal [data-similar]').addEventListener('click', () => {
      const map = { Residential: p.area > 3500 ? 'villa' : p.area > 2200 ? '4bhk' : p.area > 1300 ? '3bhk' : '2bhk', 'Modular Kitchens': 'kw', Wardrobes: 'kw', Commercial: 'commercial', Retail: 'retail' };
      STATE.estPreset = { type: map[p.cat], model: p.cat === 'Modular Kitchens' || p.cat === 'Wardrobes' ? 'modular' : 'turnkey', area: p.area };
      closeModal();
      go('/estimator');
    });
  }

  register('/portfolio', () => {
    const cats = ['All', 'Residential', 'Modular Kitchens', 'Wardrobes', 'Commercial', 'Retail'];
    const tiers = [['all', 'All Budgets'], ['low', 'Under ₹8L'], ['mid', '₹8L – ₹20L'], ['high', '₹20L – ₹45L+']];
    const html = `
    ${pageHead({ idx: '04', crumb: 'Projects', title: 'Our <em>projects</em>.', lead: 'Every project with its details — city, carpet area, budget, timeline and the room-by-room work done. Filter by type or budget and open any project for the full story.' })}

    <section class="section tight">
      <div class="wrap">
        <div class="sec-head reveal" style="margin-bottom:28px"><div><span class="index">The Before / After Lab</span><h2>3D Concept <em>vs.</em> Completed Site</h2></div>
        <p class="lead">Drag the handle — or use your arrow keys — to compare the 3D lab’s architectural linework with the finished photograph.</p></div>
        <div class="ba reveal" id="ba" data-cursor="Drag">
          <div class="layer after">${ph(ML.BA_SCENES[0].img, { alt: 'Completed site photograph' })}</div>
          <div class="layer before" id="baBefore">${conceptSVG('living')}</div>
          <div class="handle" id="baHandle"><div class="knob">◀ ▶</div></div>
          <span class="lbl l">01 · 3D Concept</span><span class="lbl r">02 · Completed Site</span>
          <input type="range" min="0" max="100" value="50" id="baRange" aria-label="Compare concept and completed site">
        </div>
        <div class="ba-picker filter-group">
          <span class="lbl">Scene</span>
          ${ML.BA_SCENES.map((s, i) => `<button data-scene="${i}" class="${i === 0 ? 'on' : ''}">${s.label}</button>`).join('')}
        </div>
      </div>
    </section>

    <section class="section tight" style="padding-top:0">
      <div class="wrap">
        <div class="filters">
          <div class="filter-group" id="fCat"><span class="lbl">Category</span>${cats.map((c, i) => `<button data-cat="${c}" class="${i === 0 ? 'on' : ''}">${c}</button>`).join('')}</div>
          <div class="filter-group" id="fTier"><span class="lbl">Budget</span>${tiers.map(([k, l], i) => `<button data-tier="${k}" class="${i === 0 ? 'on' : ''}">${l}</button>`).join('')}</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px"><span class="eyebrow" id="pCount"></span><a href="${IG}" target="_blank" rel="noopener" class="link-arrow">Live reels on Instagram ↗</a></div>
        <div class="proj-grid" id="pGrid"></div>
      </div>
    </section>
    ${ctaBand('Want your home to be the <em>next</em> case study?')}`;

    return {
      html,
      init(root, q) {
        // Before/after
        const range = $('#baRange', root), before = $('#baBefore', root), handle = $('#baHandle', root);
        const setBA = (v) => { before.style.clipPath = `inset(0 ${100 - v}% 0 0)`; handle.style.left = v + '%'; };
        range.addEventListener('input', () => setBA(+range.value));
        setBA(50);
        $$('[data-scene]', root).forEach((b) => b.addEventListener('click', () => {
          const s = ML.BA_SCENES[+b.dataset.scene];
          $$('[data-scene]', root).forEach((x) => x.classList.toggle('on', x === b));
          $('#ba .layer.after', root).innerHTML = ph(s.img, { alt: s.label + ' completed' });
          before.innerHTML = conceptSVG(s.id);
          range.value = 50; setBA(50);
        }));

        // Filters
        let cat = 'All', tier = 'all';
        const grid = $('#pGrid', root);
        const draw = () => {
          const list = ML.PROJECTS.filter((p) => (cat === 'All' || p.cat === cat) && (tier === 'all' || tierOf(p.cost) === tier));
          $('#pCount', root).textContent = `${String(list.length).padStart(2, '0')} project${list.length === 1 ? '' : 's'} shown`;
          grid.innerHTML = list.length ? list.map((p, i) => `
            <button class="proj" data-cursor="Open" data-open="${p.id}" style="animation-delay:${i * 60}ms">
              ${ph(p.img, { alt: p.title }).replace(/<\/div>$/, `<span class="badge">${p.cat}</span><span class="open">${ARROW}</span></div>`)}
              <h3>${p.title}</h3>
              <dl class="proj-facts">
                <div><dt>City</dt><dd>${p.loc}</dd></div>
                <div><dt>Type</dt><dd>${p.type}</dd></div>
                <div><dt>Area</dt><dd class="num">${p.area.toLocaleString('en-IN')} sq.ft.</dd></div>
                <div><dt>Budget</dt><dd class="num">₹${p.cost} L</dd></div>
                <div><dt>Time</dt><dd class="num">${p.weeks} weeks</dd></div>
              </dl>
              <p class="proj-sum">${p.brief}</p>
              <span class="proj-more">View full project details →</span>
            </button>`).join('') : `<div class="empty"><h3>No projects in this combination — yet.</h3><p style="margin-top:10px">Try another budget tier, or <a href="#/contact" class="link-arrow">brief us on yours</a>.</p></div>`;
        };
        draw();
        $$('[data-cat]', root).forEach((b) => b.addEventListener('click', () => { cat = b.dataset.cat; $$('[data-cat]', root).forEach((x) => x.classList.toggle('on', x === b)); draw(); }));
        $$('[data-tier]', root).forEach((b) => b.addEventListener('click', () => { tier = b.dataset.tier; $$('[data-tier]', root).forEach((x) => x.classList.toggle('on', x === b)); draw(); }));
        grid.addEventListener('click', (e) => { const b = e.target.closest('[data-open]'); if (b) openCase(b.dataset.open); });
        if (q.open) setTimeout(() => openCase(q.open), 400);
      },
    };
  });

  /* =======================================================
     PAGE 6 — ESTIMATOR
     ======================================================= */
  const typeOf = (id) => EST.types.find((t) => t.id === id);
  const modelOf = (id) => EST.models.find((t) => t.id === id);
  const tierById = (id) => EST.tiers.find((t) => t.id === id);

  function freshEst(typeId = '3bhk') {
    const t = typeOf(typeId);
    return { type: typeId, area: t.area, rooms: { ...t.rooms }, model: 'turnkey', tier: 'premium', touched: [false, false, false, false] };
  }

  function roomLabels(T) {
    return T.commercial
      ? { kitchen: 'Pantry / Service Counter', living: 'Reception & Lounge', master: 'Cabins', guest: 'Meeting / Conference Rooms', pooja: 'Display Wall', foyer: 'Brand Wall / Entry', ceiling: 'False Ceiling' }
      : { kitchen: 'Kitchen', living: 'Living / Dining', master: 'Master Bedrooms', guest: 'Guest / Kids Rooms', pooja: 'Pooja Unit', foyer: 'Foyer', ceiling: 'False Ceiling' };
  }

  function calc(s) {
    const T = typeOf(s.type), tier = tierById(s.tier), B = EST.base, r = s.rooms, A = s.area;
    const m = tier.m * T.k;
    const RL = roomLabels(T);
    let lines;
    let wLo, wHi;
    if (s.model === 'design') {
      const fee = A * tier.design;
      lines = [
        { k: 'cad', label: '2D CAD & Spatial Planning', amt: fee * 0.3, items: [['Measured survey & as-built CAD', 0.25], ['Furniture layouts & Vastu zoning', 0.4], ['Electrical & ceiling plans', 0.35]] },
        { k: '3d', label: '3D Visualisation & 360° Walkthrough', amt: fee * 0.35, items: [['Photoreal renders — all rooms', 0.7], ['360° walkthrough', 0.3]] },
        { k: 'wd', label: 'Working Drawings & Details', amt: fee * 0.2, items: [['Joinery shop drawings', 0.6], ['Civil & section details', 0.4]] },
        { k: 'boq', label: 'Material Schedule & Tender BOQ', amt: fee * 0.1, items: [['Brand-specified material schedule', 0.5], ['Vendor-ready BOQ', 0.5]] },
        { k: 'site', label: 'Design Site Visits (×4)', amt: fee * 0.05, items: [['Milestone design audits', 1]] },
      ];
      wLo = 3 + (A > 2500 ? 1 : 0); wHi = wLo + 2;
    } else {
      const kitchen = r.kitchen ? B.kitchen * m * (A > 2500 ? 1.2 : 1) * (T.commercial ? 0.6 : 1) : 0;
      const wItems = [];
      if (r.master) wItems.push([`${RL.master} × ${r.master}`, r.master * B.masterWardrobe * m]);
      if (r.guest) wItems.push([`${RL.guest} × ${r.guest}`, r.guest * B.guestWardrobe * m]);
      if (r.living) wItems.push([`${RL.living} units`, B.livingUnits * m]);
      if (r.pooja) wItems.push([RL.pooja, B.pooja * m]);
      if (r.foyer) wItems.push([RL.foyer, B.foyer * m]);
      const wardrobes = wItems.reduce((a, b) => a + b[1], 0);
      const turnkey = s.model === 'turnkey';
      const ceiling = turnkey && r.ceiling ? A * 0.7 * B.ceilingPerSqft * m : 0;
      const civil = turnkey ? A * B.civilPerSqft * m : 0;
      const elec = turnkey ? A * B.electricalPerSqft * m : (kitchen + wardrobes) * 0.05;
      const fin = turnkey ? A * B.finishesPerSqft * m : 0;
      lines = [
        { k: 'kitchen', label: T.commercial ? 'Pantry & Service Counter' : 'Modular Kitchen', amt: kitchen, items: [['Carcass (IS:710 BWP ply)', 0.3], ['Shutters & finish', 0.28], ['Hardware & accessories', 0.24], ['Countertop & backsplash', 0.18]] },
        { k: 'ward', label: T.commercial ? 'Cabins, Storage & Joinery' : 'Wardrobes & Storage', amt: wardrobes, abs: wItems },
        { k: 'civil', label: 'Civil & POP False Ceiling', amt: ceiling + civil, abs: turnkey ? [['Civil changes & masonry', civil], ['POP / gypsum false ceiling', ceiling]] : [], na: !turnkey },
        { k: 'elec', label: 'Electrical & Architectural Lighting', amt: elec, items: turnkey ? [['Wiring & points', 0.45], ['Modular switches & plates', 0.2], ['Architectural lighting', 0.35]] : [['Profile & under-cabinet LED', 1]] },
        { k: 'fin', label: 'Wall Finishes & Decor', amt: fin, items: [['Paint & textures', 0.45], ['Wallpaper / panelling', 0.3], ['Soft furnishing & styling', 0.25]], na: !turnkey },
      ];
      if (turnkey) { const extra = { essential: 0, premium: 1, luxury: 3 }[s.tier]; wLo = Math.round(7 + A / 450 + extra); wHi = wLo + 3; }
      else { const units = r.kitchen + r.master + r.guest + r.living + r.pooja + r.foyer; wLo = 4 + Math.floor(units / 4); wHi = wLo + 2 + (s.tier === 'luxury' ? 1 : 0); }
    }
    lines.forEach((l) => { l.sub = l.abs ? l.abs.filter((x) => x[1] > 0) : (l.items || []).map(([n, f]) => [n, l.amt * f]); });
    const total = lines.reduce((a, l) => a + l.amt, 0);
    return { lines, total, low: total * 0.92, high: total * 1.1, perSqft: total / A, wLo, wHi, T, tier, model: modelOf(s.model) };
  }

  function roomsSummary(s) {
    const T = typeOf(s.type), RL = roomLabels(T), r = s.rooms, out = [];
    ['kitchen', 'living', 'pooja', 'foyer', 'ceiling'].forEach((k) => { if (r[k]) out.push(RL[k]); });
    if (r.master) out.push(`${r.master} × ${RL.master}`);
    if (r.guest) out.push(`${r.guest} × ${RL.guest}`);
    return out.join(', ') || '—';
  }

  function boqText(s, c) {
    const d = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    return [
      'MODULABZ INTERIORS — ESTIMATED BOQ',
      '──────────────────────────────',
      `Property   : ${c.T.t} · ${s.area.toLocaleString('en-IN')} sq.ft.`,
      `Rooms      : ${roomsSummary(s)}`,
      `Service    : ${c.model.t}`,
      `Finish Tier: ${c.tier.t}`,
      '',
      `ESTIMATED BUDGET : ${fmtL(c.low)} – ${fmtL(c.high)}  (midpoint ${fmtL(c.total)})`,
      `RATE             : ${fmtINR(c.perSqft)} / sq.ft.`,
      `DURATION         : ${c.wLo}–${c.wHi} weeks`,
      '',
      'LINE ITEMS',
      ...c.lines.map((l) => `• ${l.label}: ${l.amt ? fmtINR(l.amt) : 'Not in scope'}`),
      '',
      'MILESTONE PAYMENTS',
      ...EST.milestones.map((m) => `• ${m.p}% ${m.k}: ${fmtINR((c.total * m.p) / 100)}`),
      '',
      `Generated ${d} on modulabz interiors estimator. Indicative only — final pricing via locked BOQ after a free site visit.`,
      'Instagram: @modulabz_interiors',
    ].join('\n');
  }

  register('/estimator', () => {
    if (!STATE.est) STATE.est = freshEst();
    if (STATE.estPreset) {
      const p = STATE.estPreset; STATE.estPreset = null;
      STATE.est = freshEst(p.type);
      if (p.model) STATE.est.model = p.model;
      if (p.area) STATE.est.area = Math.min(5000, Math.max(400, Math.round(p.area / 50) * 50));
      STATE.est.touched = [true, !!p.area, !!p.model, false];
    }
    const html = `
    ${pageHead({ idx: '05', crumb: 'Cost Estimator', title: 'Your BOQ, <em>live</em>, in four steps.', lead: 'Configure your property, rooms, service model and finish tier — and watch an itemised, milestone-split Bill of Quantities build itself in real time.' })}
    <section class="section tight">
      <div class="wrap">
        <div class="est">
          <div>
            <div class="progress-steps" id="estProg">${[0, 1, 2, 3].map(() => '<div><span style="width:0"></span></div>').join('')}</div>
            <div class="est-steps" id="estSteps"></div>
            <div class="boq-table-wrap" id="boqTable"></div>
          </div>
          <aside class="boq" id="boq" aria-live="polite"></aside>
        </div>
      </div>
    </section>
    ${ctaBand('Turn this estimate into a <em>locked</em> BOQ.')}`;

    return {
      html,
      init(root) {
        const s = STATE.est;
        const stepsEl = $('#estSteps', root), boqEl = $('#boq', root), tableEl = $('#boqTable', root);
        let prevTotal = 0;
        const prevW = {};

        const opt = (group, id, t, sub, on) => `<button class="opt ${on ? 'on' : ''}" data-g="${group}" data-v="${id}" aria-pressed="${on}"><span class="t">${t}</span><span class="s">${sub}</span></button>`;

        const renderSteps = () => {
          const T = typeOf(s.type), RL = roomLabels(T);
          const pct = ((s.area - 400) / 4600) * 100;
          const counter = (k) => `<div class="room ${s.rooms[k] ? 'on' : ''}"><span class="nm">${RL[k]}</span><span class="ctr"><button data-dec="${k}" aria-label="Fewer ${RL[k]}">−</button><span class="num">${s.rooms[k]}</span><button data-inc="${k}" aria-label="More ${RL[k]}">+</button></span></div>`;
          const tog = (k) => (T.commercial && k === 'pooja' && !s.rooms[k] && false) ? '' : `<button class="room ${s.rooms[k] ? 'on' : ''}" data-tog="${k}" aria-pressed="${!!s.rooms[k]}"><span class="nm">${RL[k]}</span><span class="toggle ${s.rooms[k] ? 'on' : ''}"></span></button>`;
          stepsEl.innerHTML = `
            <div class="step-card"><div class="hd"><h3>Property Configuration</h3><span class="st">Step 01 / 04</span></div>
              <div class="opt-grid">${EST.types.map((t) => opt('type', t.id, t.t, t.s, s.type === t.id)).join('')}</div></div>
            <div class="step-card"><div class="hd"><h3>Carpet Area &amp; Rooms</h3><span class="st">Step 02 / 04</span></div>
              <div class="range-row"><span class="eyebrow">Carpet Area</span><span class="big" id="areaVal">${s.area.toLocaleString('en-IN')}<small>sq.ft.</small></span></div>
              <input type="range" class="slider" id="area" min="400" max="5000" step="50" value="${s.area}" style="--p:${pct}%" aria-label="Carpet area in square feet">
              <div class="range-scale"><span>400</span><span>1,500</span><span>2,500</span><span>3,500</span><span>5,000 sq.ft.</span></div>
              <div class="rooms">${tog('kitchen')}${tog('living')}${counter('master')}${counter('guest')}${tog('pooja')}${tog('foyer')}${tog('ceiling')}</div></div>
            <div class="step-card"><div class="hd"><h3>Service Model</h3><span class="st">Step 03 / 04</span></div>
              <div class="opt-grid wide">${EST.models.map((m) => opt('model', m.id, m.t, m.s, s.model === m.id)).join('')}</div></div>
            <div class="step-card"><div class="hd"><h3>Finish &amp; Hardware Tier</h3><span class="st">Step 04 / 04</span></div>
              <div class="opt-grid wide">${EST.tiers.map((t) => opt('tier', t.id, t.t, s.model === 'design' ? `Design fee ₹${t.design} / sq.ft.` : t.s, s.tier === t.id)).join('')}</div></div>`;
          $$('#estProg span', root).forEach((el, i) => { el.style.width = s.touched[i] ? '100%' : '0'; });
        };

        const renderBOQ = () => {
          const c = calc(s);
          const max = Math.max(...c.lines.map((l) => l.amt), 1);
          boqEl.innerHTML = `
            <div class="top">
              <span class="index">Live Estimate</span>
              <div class="total"><span id="totLo">${fmtLnum(c.low)}</span> – <span id="totHi">${fmtL(c.high).replace('₹', '')}</span></div>
              <div class="sub">₹ ${c.high >= 1e7 ? 'Crore' : 'Lakhs'} · midpoint ${fmtL(c.total)} · ${c.T.t} · ${c.model.t.split(' ').slice(0, 2).join(' ')} · ${c.tier.t.split(' ')[0]}</div>
            </div>
            <div class="kpis">
              <div><div class="k">Per sq.ft.</div><div class="v">${fmtINR(c.perSqft)}</div></div>
              <div><div class="k">Duration</div><div class="v">${c.wLo}–${c.wHi} wks</div></div>
              <div><div class="k">Area</div><div class="v">${s.area.toLocaleString('en-IN')}</div></div>
            </div>
            <div class="lines">
              ${c.lines.map((l) => `<div class="line"><div class="row"><span>${l.label}</span><span class="amt">${l.amt ? fmtINR(l.amt) : (l.na ? 'Not in scope' : '—')}</span></div><div class="track"><div class="fill" data-k="${l.k}" style="width:${prevW[l.k] || 0}%"></div></div></div>`).join('')}
            </div>
            <div class="milestones">
              <span class="index plain" style="font-size:10px">Milestone Payment Split</span>
              <div class="ms-bar">${EST.milestones.map((m) => `<div style="flex:${m.p};background:${m.c}">${m.p}%</div>`).join('')}</div>
              <div class="ms-list">${EST.milestones.map((m) => `<div><span><i style="background:${m.c}"></i>${m.p}% · ${m.k}</span><span class="amt">${fmtINR((c.total * m.p) / 100)}</span></div>`).join('')}</div>
            </div>
            <div class="actions">
              <button class="btn btn-primary" data-act="send">Send This BOQ to Consultation Form <span class="arr">→</span></button>
              <button class="btn btn-ghost" data-act="copy">Copy Full BOQ Estimate</button>
            </div>
            <p class="note">Indicative 2026 pricing. Excludes appliances, loose furniture, GST and civil structural work. Final pricing is locked in your itemised BOQ after a free site visit.</p>`;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            c.lines.forEach((l) => { const w = (l.amt / max) * 100; const el = boqEl.querySelector(`[data-k="${l.k}"]`); if (el) el.style.width = w + '%'; prevW[l.k] = w; });
          }));
          // number tween on the low figure
          const from = prevTotal || c.low, to = c.low, t0 = performance.now(), lo = $('#totLo', boqEl);
          const tick = (t) => { const k = Math.min(1, (t - t0) / 450); const v = from + (to - from) * (1 - Math.pow(1 - k, 3)); if (lo) lo.textContent = fmtLnum(v); if (k < 1) requestAnimationFrame(tick); };
          if (from !== to) requestAnimationFrame(tick);
          prevTotal = c.low;

          tableEl.innerHTML = `<div class="step-card"><div class="hd"><h3>Itemised BOQ Breakdown</h3><span class="st">Line-by-line</span></div>
            <div class="table-scroll"><table class="boq-mini">
              <thead><tr><th>Category / Item</th><th class="r">Estimate (₹)</th><th class="r">Share</th></tr></thead>
              <tbody>${c.lines.map((l) => `
                <tr style="background:var(--sandstone)"><td><b>${l.label}</b></td><td class="r"><b>${l.amt ? fmtINR(l.amt) : 'Not in scope'}</b></td><td class="r">${c.total ? Math.round((l.amt / c.total) * 100) : 0}%</td></tr>
                ${l.sub.map(([n, v]) => `<tr><td style="padding-left:26px" class="muted">— ${n}</td><td class="r">${fmtINR(v)}</td><td class="r muted">${c.total ? ((v / c.total) * 100).toFixed(1) : 0}%</td></tr>`).join('')}`).join('')}</tbody>
              <tfoot><tr><td>Estimated Total (midpoint)</td><td class="r">${fmtINR(c.total)}</td><td class="r">100%</td></tr></tfoot>
            </table></div></div>`;
        };

        const update = () => { renderSteps(); renderBOQ(); };
        update();

        stepsEl.addEventListener('click', (e) => {
          const o = e.target.closest('[data-g]');
          if (o) {
            const g = o.dataset.g, v = o.dataset.v;
            if (g === 'type') { const t = typeOf(v); s.type = v; s.area = t.area; s.rooms = { ...t.rooms }; s.touched[0] = true; }
            if (g === 'model') { s.model = v; s.touched[2] = true; }
            if (g === 'tier') { s.tier = v; s.touched[3] = true; }
            update(); return;
          }
          const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]'), tg = e.target.closest('[data-tog]');
          if (inc) { const k = inc.dataset.inc; s.rooms[k] = Math.min(6, s.rooms[k] + 1); }
          else if (dec) { const k = dec.dataset.dec; s.rooms[k] = Math.max(0, s.rooms[k] - 1); }
          else if (tg) { const k = tg.dataset.tog; s.rooms[k] = s.rooms[k] ? 0 : 1; }
          else return;
          s.touched[1] = true; update();
        });
        stepsEl.addEventListener('input', (e) => {
          if (e.target.id !== 'area') return;
          s.area = +e.target.value; s.touched[1] = true;
          e.target.style.setProperty('--p', ((s.area - 400) / 4600) * 100 + '%');
          $('#areaVal', root).innerHTML = `${s.area.toLocaleString('en-IN')}<small>sq.ft.</small>`;
          $$('#estProg span', root)[1].style.width = '100%';
          renderBOQ();
        });
        boqEl.addEventListener('click', (e) => {
          const b = e.target.closest('[data-act]'); if (!b) return;
          const c = calc(s), text = boqText(s, c);
          if (b.dataset.act === 'copy') copyText(text, 'Full BOQ estimate copied to clipboard');
          else {
            STATE.prefill = { property: c.T.t, area: s.area, budget: `${fmtL(c.low)} – ${fmtL(c.high)}`, model: c.model.t, tier: c.tier.t, rooms: roomsSummary(s), boq: text };
            toast('BOQ attached — complete your details to send', 'info');
            go('/contact');
          }
        });
      },
    };
  });

  /* =======================================================
     PAGE 8 — CONTACT
     ======================================================= */
  register('/contact', (q) => {
    const pre = STATE.prefill;
    const F = STATE.form || (STATE.form = { name: '', phone: '', email: '', hub: '', property: '', area: '', budget: '', timeline: '', styles: [], vastu: [], notes: '' });
    if (q.hub) F.hub = q.hub;
    if (pre) { F.property = pre.property; F.area = String(pre.area); F.budget = pre.budget; }
    if (STATE.palette && !F.styles.includes(STATE.palette)) F.styles.push(STATE.palette);

    const hubs = [...ML.HUBS.map((h) => h.name), 'Other city'];
    const budgets = ['Under ₹8 L', '₹8 L – ₹20 L', '₹20 L – ₹45 L', '₹45 L+', 'Not sure yet'];
    if (F.budget && !budgets.includes(F.budget)) budgets.unshift(F.budget);
    const styles = ['Warm Travertine & Teak', 'Cashmere Matte & Smoked Oak', 'Terracotta, Lime Plaster & Brass', 'Minimal Japandi', 'Classic Contemporary', 'Not sure — guide me'];
    const vastu = ['Full Vastu compliance', 'Kitchen in Agni corner', 'NE Mandir / Pooja', 'SW Master bedroom', 'No Vastu needed'];
    const sel = (name, opts, val, ph = 'Select…') => `<select name="${name}" id="f_${name}"><option value="">${ph}</option>${opts.map((o) => `<option ${o === val ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    const checks = (name, opts, vals) => `<div class="checks">${opts.map((o) => `<label><input type="checkbox" name="${name}" value="${esc(o)}" ${vals.includes(o) ? 'checked' : ''}><span>${o}</span></label>`).join('')}</div>`;

    const html = `
    ${pageHead({ idx: '06', crumb: 'Contact', title: 'Start your project with a <em>clear</em> brief.', lead: 'Three short steps generate a formatted consultation brief you can send instantly on WhatsApp or as an Instagram DM to @modulabz_interiors. Free site visit in Ahmedabad, Palanpur, Baroda and Mumbai.' })}

    <section class="section tight">
      <div class="wrap">
        ${pre ? `<div class="auto-banner">✓ <span>Your BOQ estimate (<b class="num">${pre.budget}</b> · ${pre.property} · ${pre.model}) has been attached to this brief.</span></div>` : ''}
        <div class="contact-grid">
          <form class="form-card" id="brief" novalidate>
            <div class="form-steps" role="tablist">
              <button type="button" data-fs="0" class="on"><span class="n">1</span><span class="lbl">Your Details</span></button>
              <button type="button" data-fs="1"><span class="n">2</span><span class="lbl">Property &amp; Budget</span></button>
              <button type="button" data-fs="2"><span class="n">3</span><span class="lbl">Style &amp; Notes</span></button>
            </div>
            <div class="form-body">
              <div data-pane="0" class="fields">
                <div class="field full"><label for="f_name">Client Name <span class="req">*</span></label><input id="f_name" name="name" autocomplete="name" value="${esc(F.name)}" placeholder="e.g. Rohan Patel"></div>
                <div class="field"><label for="f_phone">Phone / WhatsApp <span class="req">*</span></label><input id="f_phone" name="phone" type="tel" autocomplete="tel" value="${esc(F.phone)}" placeholder="+91 98XXX XXXXX"></div>
                <div class="field"><label for="f_email">Email</label><input id="f_email" name="email" type="email" autocomplete="email" value="${esc(F.email)}" placeholder="you@example.com"></div>
                <div class="field full"><label for="f_hub">Project City <span class="req">*</span></label>${sel('hub', hubs, F.hub)}</div>
              </div>
              <div data-pane="1" class="fields" hidden>
                <div class="field"><label for="f_property">Property Type <span class="req">*</span></label>${sel('property', EST.types.map((t) => t.t), F.property)}</div>
                <div class="field"><label for="f_area">Carpet Area (sq.ft.)</label><input id="f_area" name="area" inputmode="numeric" value="${esc(F.area)}" placeholder="e.g. 1650"></div>
                <div class="field"><label for="f_budget">Target Budget</label>${sel('budget', budgets, F.budget)}${pre ? '<span class="hint auto">Auto-filled from your BOQ estimate</span>' : ''}</div>
                <div class="field"><label for="f_timeline">Possession Timeline</label>${sel('timeline', ['Already in possession', 'Within 1 month', '1 – 3 months', '3 – 6 months', '6+ months / under construction'], F.timeline)}</div>
              </div>
              <div data-pane="2" class="fields" hidden>
                <div class="field full"><label>Preferred Style / Palette</label>${checks('styles', styles, F.styles)}</div>
                <div class="field full"><label>Vastu Preferences</label>${checks('vastu', vastu, F.vastu)}</div>
                <div class="field full"><label for="f_notes">Project Notes</label><textarea id="f_notes" name="notes" placeholder="Existing furniture to keep, family needs, must-haves, site visit preference…">${esc(F.notes)}</textarea></div>
              </div>
              <div class="form-nav">
                <button type="button" class="btn btn-ghost" data-back style="visibility:hidden">← Back</button>
                <button type="submit" class="btn btn-primary" data-next>Continue <span class="arr">→</span></button>
              </div>
            </div>
          </form>

          <aside class="brief-out">
            <span class="index">Formatted Project Consultation Brief</span>
            <pre id="briefText"></pre>
            <div class="acts">
              <button class="btn btn-primary" data-out="wa">Send on WhatsApp</button>
              <button class="btn btn-ghost" data-out="ig">Copy &amp; DM on Instagram</button>
              <button class="btn btn-ghost" data-out="copy" style="grid-column:1/-1">Copy Brief</button>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="section sand">
      <div class="wrap">
        <div class="sec-head reveal"><div><span class="index">Where We Work</span><h2>Ahmedabad-based.<br>Serving <em>four</em> cities.</h2></div>
        <p class="lead">Our office is in Ahmedabad, Gujarat. Site visits by appointment — Monday to Saturday, 10 am – 7 pm.</p></div>
        <div class="studios cities4">
          ${ML.HUBS.map((h, i) => `
            <article class="studio reveal">
              <div class="mapbox"><span class="city-big">${h.name}</span><span class="city-pin"></span></div>
              <div class="body">
                <span class="index plain">0${i + 1} · ${h.tag}</span>
                <h4>${h.name}${i === 0 ? ', Gujarat' : ''}</h4>
                <p>${h.serves}</p>
                <button class="link-arrow" data-pick-city="${h.name}">Choose ${h.name} in the form ↑</button>
              </div>
            </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="sec-head reveal"><div><span class="index">Frequently Asked Questions</span><h2>Frequently asked, <em>plainly</em> answered.</h2></div>
        <p class="lead">Real numbers and straight talk about fees, costs, timelines and materials.</p></div>
        <div class="faq-wrap">
          <div class="faq-cats" id="faqCats"></div>
          <div>
            <input class="faq-search" id="faqSearch" type="search" placeholder="Search questions — e.g. “3 BHK cost”, “BWP”, “warranty”" aria-label="Search FAQs">
            <div id="faqList"></div>
          </div>
        </div>
      </div>
    </section>`;

    return {
      html,
      init(root) {
        const form = $('#brief', root);
        const out = $('#briefText', root);
        let step = 0;

        const read = () => {
          ['name', 'phone', 'email', 'hub', 'property', 'area', 'budget', 'timeline', 'notes'].forEach((k) => { const el = form.elements[k]; if (el) F[k] = el.value.trim(); });
          F.styles = $$('input[name="styles"]:checked', form).map((i) => i.value);
          F.vastu = $$('input[name="vastu"]:checked', form).map((i) => i.value);
        };
        const briefText = () => {
          const L = [
            '✦ MODULABZ INTERIORS — PROJECT CONSULTATION BRIEF',
            '',
            `👤 Name: ${F.name || '—'}`,
            `📱 Phone / WhatsApp: ${F.phone || '—'}`,
            F.email ? `✉️ Email: ${F.email}` : null,
            `📍 Project City: ${F.hub || '—'}`,
            '',
            `🏠 Property: ${F.property || '—'}${F.area ? ` · ${F.area} sq.ft.` : ''}`,
            `💰 Target Budget: ${F.budget || '—'}`,
            `🗓 Possession: ${F.timeline || '—'}`,
            `🎨 Style: ${F.styles.length ? F.styles.join(', ') : '—'}`,
            `🧭 Vastu: ${F.vastu.length ? F.vastu.join(', ') : '—'}`,
            F.notes ? `📝 Notes: ${F.notes}` : null,
          ];
          if (pre) L.push('', `📊 Attached BOQ estimate: ${pre.budget} · ${pre.model} · ${pre.tier}`, `   Rooms: ${pre.rooms}`);
          L.push('', 'Requesting a free site visit. Thank you!');
          return L.filter((x) => x !== null).join('\n');
        };
        const refresh = () => { read(); out.textContent = briefText(); };
        refresh();
        form.addEventListener('input', refresh);
        form.addEventListener('change', refresh);

        const validate = (upto) => {
          read();
          const errs = [];
          const mark = (k, bad) => { const f = form.elements[k].closest('.field'); f.classList.toggle('err', bad); if (bad) errs.push(k); };
          if (upto >= 0) {
            mark('name', F.name.length < 2);
            mark('phone', !/^[+]?[\d\s-]{10,15}$/.test(F.phone));
            mark('email', !!F.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(F.email));
            mark('hub', !F.hub);
          }
          if (upto >= 1) mark('property', !F.property);
          return errs;
        };

        const setStep = (n) => {
          step = n;
          $$('[data-pane]', form).forEach((p) => { p.hidden = +p.dataset.pane !== n; });
          $$('[data-fs]', form).forEach((b, i) => { b.classList.toggle('on', i === n); b.classList.toggle('done', i < n); });
          $('[data-back]', form).style.visibility = n ? 'visible' : 'hidden';
          $('[data-next]', form).innerHTML = n === 2 ? 'Generate Brief <span class="arr">✓</span>' : 'Continue <span class="arr">→</span>';
        };
        $$('[data-fs]', form).forEach((b) => b.addEventListener('click', () => {
          const n = +b.dataset.fs;
          if (n > step && validate(n - 1).length) { toast('Please complete the highlighted fields first', 'warn'); return; }
          setStep(n);
        }));
        $('[data-back]', form).addEventListener('click', () => setStep(Math.max(0, step - 1)));
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const errs = validate(step);
          if (errs.length) { toast('Please complete the highlighted fields', 'warn'); const el = form.elements[errs[0]]; el && el.focus(); return; }
          if (step < 2) { setStep(step + 1); return; }
          refresh();
          toast('Brief ready — send it on WhatsApp or Instagram');
          $('.brief-out', root).scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        $('.brief-out', root).addEventListener('click', async (e) => {
          const b = e.target.closest('[data-out]'); if (!b) return;
          if (b.dataset.out !== 'copy' && validate(1).length) { toast('Add your name, phone, hub and property type first', 'warn'); setStep(0); return; }
          const text = briefText();
          if (b.dataset.out === 'copy') copyText(text, 'Consultation brief copied');
          if (b.dataset.out === 'wa') window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
          if (b.dataset.out === 'ig') { await copyText(text, 'Brief copied — paste it into the Instagram DM'); window.open('https://ig.me/m/modulabz_interiors', '_blank', 'noopener'); }
        });

        // City cards → set the form's project city
        root.addEventListener('click', (e) => {
          const b = e.target.closest('[data-pick-city]'); if (!b) return;
          form.elements.hub.value = b.dataset.pickCity; refresh(); setStep(0);
          window.MOTION.scrollTo(form);
          toast(b.dataset.pickCity + ' selected as your project city');
        });

        // FAQ
        const cats = ['All', ...new Set(ML.FAQ.map((f) => f.c))];
        let cat = 'All', term = '';
        const catsEl = $('#faqCats', root), list = $('#faqList', root);
        const drawCats = () => { catsEl.innerHTML = cats.map((c) => `<button data-fc="${c}" class="${c === cat ? 'on' : ''}"><span>${c}</span><span class="num">${c === 'All' ? ML.FAQ.length : ML.FAQ.filter((f) => f.c === c).length}</span></button>`).join(''); };
        const drawList = () => {
          const t = term.toLowerCase();
          const items = ML.FAQ.map((f, i) => ({ ...f, i })).filter((f) => (cat === 'All' || f.c === cat) && (!t || (f.q + f.a).toLowerCase().includes(t)));
          list.innerHTML = items.length ? items.map((f, j) => `
            <div class="faq-item ${j === 0 && !t ? 'open' : ''}">
              <button class="faq-q" aria-expanded="${j === 0 && !t}"><span class="n">${String(f.i + 1).padStart(2, '0')}</span><span class="q">${f.q}</span><span class="pm">+</span></button>
              <div class="faq-a"><div><div class="in">${f.a}</div></div></div>
            </div>`).join('') : `<div class="empty">No questions match “${esc(term)}”. <a class="link-arrow" href="#/contact" data-ask>Ask us directly</a></div>`;
        };
        drawCats(); drawList();
        catsEl.addEventListener('click', (e) => { const b = e.target.closest('[data-fc]'); if (!b) return; cat = b.dataset.fc; drawCats(); drawList(); });
        $('#faqSearch', root).addEventListener('input', (e) => { term = e.target.value.trim(); drawList(); });
        list.addEventListener('click', (e) => {
          const q = e.target.closest('.faq-q'); if (!q) return;
          const it = q.parentElement, open = !it.classList.contains('open');
          it.classList.toggle('open', open); q.setAttribute('aria-expanded', open);
        });
      },
    };
  });
})();
