/* =========================================================
   Pages 1–4: Home, Studio, Services, Modular Lab
   ========================================================= */
(function () {
  const { $, $$, ph, toast, register, go, onLeave, pageHead, ctaBand, STATE } = window.APP;
  const ML = window.ML;
  const ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  /* =======================================================
     PAGE 2 — ABOUT
     ======================================================= */
  register('/about', () => {
    const C = ML.COMPANY;
    const icon = (d) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${d}</svg>`;
    const html = `
    ${pageHead({ idx: '02', crumb: 'About Us', title: 'Interiors designed, made and <em>delivered</em> by one team.', lead: `${C.firm} is an Ahmedabad-based interior company focused on turnkey interior design, modular furniture and complete project execution.` })}

    <section class="section">
      <div class="wrap split top">
        <div class="reveal">
          <span class="index">Who We Are</span>
          <p class="manifesto-quote" style="margin-top:22px">“Homeowners were forced to choose between a carpenter who <em>listened</em> and a company that <em>delivered</em>. We built one that does both.”</p>
          <p class="lead" style="margin-top:26px">Modulabz Interiors designs your home in 2D and 3D, makes the modular furniture in a factory, and executes the complete project on site — civil work, ceiling, electrical, painting and furnishing — with one accountable team and one locked price.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
            <span class="chip terra">${C.firm}</span><span class="chip">${C.location}</span><span class="chip sage">10-yr Modular Warranty</span>
          </div>
        </div>
        <div class="reveal">${ph(ML.IMG.interior, { label: 'Modulabz Interiors · Ahmedabad', style: 'aspect-ratio:4/5;border-radius:6px' })}</div>
      </div>
    </section>

    <section class="section tight sand">
      <div class="wrap">
        <div class="sec-head reveal"><div><span class="index">Why Choose Us</span><h2>The difference is in <em>how</em> it’s built.</h2></div>
        <p class="lead">Three ways to get your interiors done — and why our clients choose the third.</p></div>
        <div class="compare3 reveal">
          <div><span class="eyebrow">Option A</span><h4>Local Carpenter</h4><ul>
            <li><span class="ok">✓</span>Personal, flexible</li><li><span class="x">✕</span>No 3D — you imagine it</li><li><span class="x">✕</span>Hand-cut edges, site dust</li><li><span class="x">✕</span>Material swaps go unnoticed</li><li><span class="x">✕</span>No written warranty</li></ul></div>
          <div><span class="eyebrow">Option B</span><h4>Large Online Brand</h4><ul>
            <li><span class="ok">✓</span>Factory modular</li><li><span class="x">✕</span>Catalogue designs</li><li><span class="x">✕</span>Call-centre communication</li><li><span class="x">✕</span>Limited civil &amp; on-site work</li><li><span class="ok">✓</span>Standard warranty</li></ul></div>
          <div class="hl"><span class="eyebrow" style="color:var(--brass)">Modulabz Interiors</span><h4>Designer + Factory</h4><ul>
            <li><span class="ok">✓</span>One designer, start to finish</li><li><span class="ok">✓</span>2D layouts + 3D designs</li><li><span class="ok">✓</span>Factory-made modular furniture</li><li><span class="ok">✓</span>Locked BOQ, brand invoices</li><li><span class="ok">✓</span>10-year modular warranty</li></ul></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="sec-head reveal"><div><span class="index">Our Promise</span><h2>Promises we put <em>on paper</em>.</h2></div>
        <p class="lead">Every one of these is written into your agreement — not just a line on a website.</p></div>
        <div class="guarantee reveal">
          <div><span class="ic">${icon('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>')}</span><h4>Locked Price</h4><p>The price you approve with the 3D design is final. Any change is quoted in writing first.</p></div>
          <div><span class="ic">${icon('<path d="M4 7h13l-3-3M20 17H7l3 3"/><path d="M3 3l18 18"/>')}</span><h4>No Substitutions</h4><p>No material or brand is changed without your signed approval.</p></div>
          <div><span class="ic">${icon('<path d="M6 3h9l4 4v14H6z"/><path d="M9 12l2 2 4-4"/>')}</span><h4>Brand Verification</h4><p>Brand invoices for plywood and hardware shared before installation.</p></div>
          <div><span class="ic">${icon('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>')}</span><h4>10-Year Warranty</h4><p>On modular kitchens and wardrobes, with a 72-hour service response.</p></div>
        </div>
      </div>
    </section>

    <section class="section sand">
      <div class="wrap">
        <div class="sec-head reveal"><div><span class="index">Our Team</span><h2>Four teams. <em>One</em> project lead.</h2></div>
        <p class="lead">Every project has one designer-manager who coordinates design, 3D, factory and site — so nothing falls between drawing and delivery.</p></div>
        <div class="grid-4">
          ${ML.PODS.map((p) => `
          <article class="card pod reveal">
            ${ph(p.img, { alt: p.t })}
            <div class="body">
              <span class="index plain">${p.n.replace('POD', 'TEAM')}</span>
              <h3>${p.t}</h3>
              <p class="muted" style="font-size:14px;margin:0">${p.lead}</p>
              <ul>${p.items.map((i) => `<li>${i}</li>`).join('')}</ul>
            </div>
          </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap"><div class="sec-head"><div><span class="index">Studio Timeline</span></div></div></div>
    </section>

    <section class="section sand">
      <div class="wrap">
        <div class="sec-head reveal"><div><span class="index">Where We Work</span><h2>Based in Ahmedabad.<br>Working across <em>four</em> cities.</h2></div>
        <p class="lead">Design, pricing and project management happen from our Ahmedabad office. Our own team installs and supervises on site in every city we serve.</p></div>
        <div class="cities">
          ${ML.HUBS.map((h, i) => `
            <article class="city reveal">
              <span class="index plain">0${i + 1} · ${h.tag}</span>
              <h3>${h.name}</h3>
              <p>${h.note}</p>
              <div class="city-serves"><small>We do</small>${h.serves}</div>
              <a href="#/contact?hub=${encodeURIComponent(h.name)}" class="link-arrow">Start a project in ${h.name} →</a>
            </article>`).join('')}
        </div>
      </div>
    </section>

    ${ctaBand('Let’s plan your home — <em>free</em> site visit.')}
    `;
    return { html };
  });

  /* =======================================================
     PAGE 3 — SERVICES
     ======================================================= */
  register('/services', (q) => {
    const start = Math.min(6, Math.max(1, parseInt(q.s, 10) || 1)) - 1;
    const html = `
    ${pageHead({ idx: '03', crumb: 'Services', title: 'Interior services for <em>every</em> room.', lead: 'Modular kitchens, bedrooms and wardrobes, living rooms, false ceilings, paint and furnishing — or the complete home, turnkey. Each service lists what is included, the brands we use, price ranges and timelines.' })}

    <section class="section tight">
      <div class="wrap">
        <div class="svc-tabs" role="tablist">
          ${ML.SERVICES.map((s, i) => `<button class="svc-tab ${i === start ? 'on' : ''}" data-svc="${i}" role="tab" aria-selected="${i === start}"><span class="n">${s.n}</span><span class="t">${s.short}</span></button>`).join('')}
        </div>
        <div id="svcPanel"></div>
      </div>
    </section>

    <section class="section sand">
      <div class="wrap">
        <div class="sec-head reveal"><div><span class="index">Price Guide</span><h2>All services, <em>side by side</em>.</h2></div>
        <p class="lead">Indicative ranges for 2026. Your exact number comes from a locked, itemised BOQ after the site visit.</p></div>
        <div class="table-scroll reveal">
          <table class="rate-table">
            <thead><tr><th>No.</th><th>Service</th><th>Price Band</th><th>Starting From</th><th>Timeline</th><th></th></tr></thead>
            <tbody>
              ${ML.SERVICES.map((s, i) => `<tr><td class="n" style="font-family:var(--mono);font-size:11px;color:var(--terracotta)">${s.n}</td><td style="font-family:var(--serif);font-size:20px">${s.title}</td><td class="n">${s.band}</td><td class="n">${s.from}</td><td class="n">${s.time}</td><td><button class="link-arrow" data-jump="${i}">View</button></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    ${ctaBand('Not sure which service fits? <em>Ask</em> a designer.')}
    `;
    return {
      html,
      init(root) {
        const panel = $('#svcPanel', root);
        const show = (i, scroll) => {
          const s = ML.SERVICES[i];
          $$('.svc-tab', root).forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-selected', j === i); });
          history.replaceState(null, '', `#/services?s=${s.id}`);
          panel.innerHTML = `<div class="svc-panel">
            <div class="svc-hero">
              <div>
                <span class="index">${s.n} · Service</span>
                <h2>${s.title}</h2>
                <p class="lead">${s.tagline}</p>
                <div class="svc-meta">
                  <div><div class="k">Starting From</div><div class="v num">${s.from}</div></div>
                  <div><div class="k">Typical Rate</div><div class="v num" style="font-size:19px">${s.band}</div></div>
                  <div><div class="k">Timeline</div><div class="v num">${s.time}</div></div>
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                  <button class="btn btn-primary" data-config>Configure This Service in Calculator <span class="arr">→</span></button>
                  <a href="#/contact" class="btn btn-ghost">Talk to a Designer</a>
                </div>
              </div>
              ${ph(s.img, { alt: s.title, label: s.short })}
            </div>
            <table class="spec-table">
              <tr><th>Scope Inclusions</th><td><ul class="checklist">${s.scope.map((x) => `<li>${x}</li>`).join('')}</ul></td></tr>
              <tr><th>Material Specification</th><td>${s.materials}</td></tr>
              <tr><th>Brand Ecosystem</th><td><div class="brand-list">${s.brands.map((b) => `<span class="chip">${b}</span>`).join('')}</div></td></tr>
              <tr><th>Ahmedabad Price Band &amp; Timeline</th><td>
                <div class="table-scroll"><table class="boq-mini" style="margin:0"><thead><tr><th>Configuration</th><th class="r">Indicative Investment</th><th class="r">Timeline</th></tr></thead>
                <tbody>${s.prices.map(([a, b, c]) => `<tr><td>${a}</td><td class="r">${b}</td><td class="r">${c}</td></tr>`).join('')}</tbody></table></div>
              </td></tr>
            </table>
          </div>`;
          $('[data-config]', panel).addEventListener('click', () => {
            STATE.estPreset = s.est;
            toast(`${s.short} preset loaded into the BOQ Estimator`, 'info');
            go('/estimator');
          });
          if (scroll) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        show(start);
        $$('.svc-tab', root).forEach((b) => b.addEventListener('click', () => show(+b.dataset.svc)));
        $$('[data-jump]', root).forEach((b) => b.addEventListener('click', () => { show(+b.dataset.jump); $('.svc-tabs', root).scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
      },
    };
  });

})();
