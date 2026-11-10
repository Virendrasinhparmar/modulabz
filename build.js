/* =========================================================
   Modulabz Interiors — static page builder
   Run:  node build.js
   Edit the CONTENT section below, then re-run to regenerate
   index.html, about.html, services.html, projects.html, contact.html
   ========================================================= */
const fs = require('fs');
const path = require('path');

/* ======================= CONTENT ======================= */
const U = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const IMG = {
  hero1: U('1618221195710-dd6b41faaea6', 2000), hero2: U('1600210492486-724fe5c67fb0', 2000), hero3: U('1616594039964-ae9021a400a0', 2000),
  living: U('1600210492486-724fe5c67fb0'), living2: U('1616486338812-3dadae4b4ace'), living3: U('1618220179428-22790b461013'),
  kitchen: U('1556909114-f6e7ad7d3136'), kitchen2: U('1600489000022-c2086d79f9d4'),
  bedroom: U('1616594039964-ae9021a400a0'), bedroom2: U('1615874959474-d609969a20ed'), bedroom3: U('1631679706909-1844bbd07221'),
  wardrobe: U('1595428774223-ef52624120d2'), office: U('1497366216548-37526070297c'), office2: U('1497366811353-6870744d04b2'),
  cafe: U('1554118811-1e0d58224f24'), villa: U('1600585154340-be6161a56a0c'), interior: U('1586023492125-27b2c045efd7'),
  dining: U('1617806118233-18e1de247200'), detail: U('1600566753190-17f0baa2a6c3'), detail2: U('1600607687939-ce8a6c25118c'),
  blueprint: U('1503387762-592deb58ef4e'),
};

const COMPANY = {
  name: 'Modulabz Interiors',
  firm: 'Modulabz Interiors (Vraj Interiors)',
  location: 'Ahmedabad, Gujarat, India',
  cities: ['Ahmedabad', 'Palanpur', 'Baroda', 'Mumbai'],
  instagram: 'https://www.instagram.com/modulabz_interiors/',
  igHandle: '@modulabz_interiors',
  hours: 'Mon – Sat, 10:00 am – 7:00 pm',
};

const ICONS = {
  kitchen: '<rect x="6" y="20" width="36" height="22" rx="1.5"/><path d="M6 28h36M18 20v22M30 20v22M12 24h2M23 24h2M35 24h2"/><rect x="10" y="6" width="28" height="9" rx="1.5"/><path d="M16 10.5h4M28 10.5h4"/>',
  bedroom: '<path d="M5 38V14M43 38V26a4 4 0 0 0-4-4H5M5 32h38"/><rect x="9" y="17" width="10" height="5" rx="2"/><path d="M5 38v3M43 38v3"/>',
  living: '<path d="M9 23v-5a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v5"/><path d="M5 26a3 3 0 0 1 6 0v4h26v-4a3 3 0 0 1 6 0v10H5z"/><path d="M9 36v4M39 36v4"/>',
  wardrobe: '<rect x="9" y="5" width="30" height="36" rx="1.5"/><path d="M24 5v36M20 20v5M28 20v5M9 41v3M39 41v3"/>',
  ceiling: '<path d="M4 8h40M10 8v5h28V8"/><path d="M24 13v8"/><path d="M17 29a7 7 0 0 1 14 0z"/><path d="M24 33v2M16 37l-2 2M32 37l2 2"/>',
  paint: '<rect x="8" y="6" width="26" height="10" rx="2"/><path d="M34 11h5v9H23v6"/><rect x="20" y="26" width="6" height="16" rx="1.5"/>',
  furnishing: '<path d="M6 6h36M10 6v32M38 6v32"/><path d="M10 6c4 6 4 12 0 18M38 6c-4 6-4 12 0 18"/><path d="M16 42h16M24 30v12"/><path d="M18 24h12l-2 6H20z"/>',
  turnkey: '<path d="M6 22L24 7l18 15"/><path d="M10 19v22h28V19"/><circle cx="22" cy="30" r="4"/><path d="M26 30h8M31 30v3"/>',
};

const SERVICES = [
  { id: 'bedroom', t: 'Bedroom Interior', img: IMG.bedroom,
    short: 'Calm, restful bedrooms with headboard panelling, false ceilings, lighting and finishing.',
    long: 'A bedroom should help you switch off. We design beds with storage, headboard walls, side tables, dressing and study units, and plan warm lighting so the room feels relaxed at night and bright in the morning.',
    inc: ['Beds with storage', 'Headboard & wall panelling', 'Side tables & dressers', 'Study and work units', 'Kids’ room furniture', 'Bedside & cove lighting'],
    price: 'From ₹2.5 Lakh / room', time: '4 – 6 weeks' },
  { id: 'living', t: 'Living Room Interior', img: IMG.living,
    short: 'Living rooms that bring the family together — TV units, wall panelling, crockery units and lighting.',
    long: 'The living room is the first thing guests see and where the family spends evenings. We design the TV wall, panelling, crockery and bar units, foyer storage and lighting so the space feels welcoming and stays clutter-free.',
    inc: ['TV units & media walls', 'Wall panelling & cladding', 'Crockery & bar units', 'Foyer & shoe storage', 'Pooja units', 'Feature & cove lighting'],
    price: 'From ₹1.8 Lakh', time: '4 – 8 weeks' },
  { id: 'ceiling', t: 'POP False Ceiling', img: IMG.living2,
    short: 'Elegant POP and gypsum ceilings with cove lights, spot lights and complete electrical planning.',
    long: 'A well-designed ceiling changes the feel of a room. We create POP and gypsum false ceilings with hidden cove lighting and spot lights, and plan fan, AC and switch points so everything lines up neatly.',
    inc: ['POP & gypsum ceilings', 'Cove & profile lighting', 'Spot & track lights', 'Fan and AC point planning', 'Electrical wiring & switches', 'Ceiling painting'],
    price: 'From ₹95 / sq.ft.', time: '1 – 3 weeks' },
  { id: 'paint', t: 'Home Paint Work', img: IMG.dining,
    short: 'Fresh interior painting, textures and wallpapers with neat masking and clean-up.',
    long: 'A fresh coat of paint can transform a tired home. We help you choose colours, then handle surface preparation, putty, primer and painting — plus texture walls and wallpapers — with careful masking and full clean-up.',
    inc: ['Colour consultation', 'Interior & exterior painting', 'Putty & surface preparation', 'Texture walls', 'Wallpapers', 'Clean-up after work'],
    price: 'From ₹22 / sq.ft.', time: '1 – 2 weeks' },
  { id: 'furnishing', t: 'Furnishing Work', img: IMG.living3,
    short: 'Curtains, blinds, sofas, upholstery and décor chosen to complete the look of your home.',
    long: 'Furnishings give a home its personality. We help you select and install curtains and blinds, sofas and upholstery, rugs, lights and décor that match your interiors and your budget.',
    inc: ['Curtains & blinds', 'Sofas & upholstery', 'Rugs & carpets', 'Decorative lighting', 'Art & décor', 'Final styling'],
    price: 'From ₹1.5 Lakh', time: '2 – 3 weeks' },
  { id: 'turnkey', t: 'Turnkey Interior', img: IMG.living2,
    short: 'Complete interiors from design to handover — one team, one quotation, one point of contact.',
    long: 'With turnkey interiors you hand us the keys and get back a finished home. We manage design, civil changes, false ceiling, electrical, carpentry, painting and furnishing — with one team, one quotation and one person responsible.',
    inc: ['2D layout & 3D design', 'Civil & plumbing changes', 'False ceiling & electrical', 'Carpentry & panelling work', 'Painting & furnishing', 'Cleaning & handover'],
    price: 'From ₹1,450 / sq.ft.', time: '8 – 16 weeks' },
];

const SOLUTIONS = [
  { t: '2BHK Interior Design', img: IMG.living3, d: 'Smart, well-planned interiors for 2BHK homes — living room, two bedrooms, false ceiling and lighting, Vastu-friendly on request.', type: '2 BHK' },
  { t: '3BHK Interior Design', img: IMG.living, d: 'Complete interiors for family 3BHK homes, designed around your lifestyle — from wall panelling to false ceilings and finishing.', type: '3 BHK' },
  { t: '4BHK Interior Design', img: IMG.bedroom2, d: 'Elegant interiors for larger homes with feature walls, layered lighting and premium finishes.', type: '4 BHK' },
  { t: '5BHK Interior Design', img: IMG.dining, d: 'Premium interiors for large apartments and penthouses with custom furniture, stone finishes and layered lighting.', type: '5 BHK' },
  { t: 'Villa Interior Design', img: IMG.villa, d: 'Room-by-room interior design for bungalows and villas — from the entrance foyer to the terrace.', type: 'Villa / Bungalow' },
  { t: 'Office & Commercial', img: IMG.office, d: 'Practical, good-looking offices, cabins, showrooms and cafés that are built to handle daily use.', type: 'Office / Commercial' },
];

/* Real work from instagram.com/modulabz_interiors — shown with Instagram's official embed.
   To add a post: copy its link (…/p/CODE/ or …/reel/CODE/) and add it here, newest first.
   type: 'residential' | 'commercial' | 'design' (3D designs). Add hide: true to keep a post off the website. */
const INSTAGRAM_ALL = [
  { kind: 'reel', code: 'DffGAKbACIs', type: 'residential' },
  { kind: 'post', code: 'Der19oRS3VD', hide: true }, // promotional poster — not project work
  { kind: 'reel', code: 'DcC-gHJi1Du', type: 'residential' },
  { kind: 'reel', code: 'DZxUULXAGvM', type: 'commercial' },
  { kind: 'reel', code: 'DYcFsmwNEEO', type: 'residential' },
  { kind: 'reel', code: 'DYAE98ktA4L', hide: true }, // message reel — not project work
  { kind: 'reel', code: 'DT69Dj8gsVB', type: 'residential' },
  { kind: 'post', code: 'DT4eszLAiFt', type: 'design' },
  { kind: 'post', code: 'DTxur_GjZnp', type: 'design' },
  { kind: 'post', code: 'DTvZrk8DViC', type: 'design' },
  { kind: 'post', code: 'DTs2eY4jcxq', type: 'design' },
  { kind: 'post', code: 'DTUuUJ3jQ2G', type: 'design' },
];

const INSTAGRAM = INSTAGRAM_ALL.filter((p) => !p.hide);

const FAQ = [
  { q: 'What services does Modulabz Interiors offer?', a: 'We offer complete turnkey interiors as well as individual services — bedroom and living room interiors, POP false ceilings, painting and furnishing — for homes, villas, offices and shops.' },
  { q: 'Where are you located and which cities do you serve?', a: 'We are based in Ahmedabad, Gujarat. We take projects in Ahmedabad, Palanpur, Baroda and Mumbai, with our own team handling installation and site supervision.' },
  { q: 'Will I see the design before work starts?', a: 'Yes. We first prepare a 2D layout and then 3D designs of your rooms, so you can see colours, materials and furniture before anything is made.' },
  { q: 'How much does a 2BHK or 3BHK interior cost?', a: 'It depends on the scope and finishes you choose. As a rough guide, a complete 2BHK usually starts around ₹6.5 lakh and a 3BHK around ₹11 lakh. Share your requirements and we will send a detailed quotation.' },
  { q: 'How long does a complete home interior take?', a: 'Most 2BHK and 3BHK turnkey projects take about 8 to 12 weeks after the design is approved. Single rooms or ceiling work usually take 2 to 4 weeks.' },
  { q: 'Can you work around my existing furniture?', a: 'Of course. We can include furniture you want to keep in the design, and repolish or re-upholster it so it matches your new interiors.' },
];

/* ======================= PARTIALS ======================= */
const BROWN = '#9C5F16', GOLD = '#C9A36A';
const FONT = `font-family="Montserrat, 'Poppins', system-ui, sans-serif"`;
const mark = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><polygon points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5" fill="none" stroke="${BROWN}" stroke-width="6.2"/><path d="M26.5 69 V32.5 L50 19.5 L73.5 32.5 V69" fill="none" stroke="currentColor" stroke-width="6.4"/><path d="M50 35 V74" stroke="${BROWN}" stroke-width="5.4" stroke-linecap="round"/></g>`;
const sofa = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${GOLD}"><rect x="2" y="3" width="14" height="6" rx="2"/><rect x="0" y="5" width="4" height="7" rx="1.5"/><rect x="14" y="5" width="4" height="7" rx="1.5"/><rect x="2" y="8" width="14" height="4" rx="1"/><circle cx="17.5" cy="0.8" r="1.4"/></g>`;
const LOGO_H = `<svg viewBox="0 0 300 72" role="img" aria-label="Modulabz Interiors">${mark(0, 0, 0.72)}<text x="82" y="39" ${FONT} font-weight="800" font-size="26" fill="currentColor" textLength="200" lengthAdjust="spacing">MODULABZ</text><text x="84" y="60" ${FONT} font-weight="600" font-size="11.5" fill="currentColor" textLength="132" lengthAdjust="spacing">INTERIORS</text>${sofa(222, 49, 0.9)}</svg>`;
const LOGO_S = `<svg viewBox="0 0 300 222" role="img" aria-label="Modulabz Interiors">${mark(82, 0, 1.36)}<text x="150" y="174" text-anchor="middle" ${FONT} font-weight="800" font-size="33" fill="currentColor" textLength="266" lengthAdjust="spacing">MODULABZ</text><text x="138" y="203" text-anchor="middle" ${FONT} font-weight="600" font-size="15" fill="currentColor" textLength="172" lengthAdjust="spacing">INTERIORS</text>${sofa(232, 190, 1.15)}</svg>`;

const I = {
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  ig: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>',
  map: '<svg viewBox="0 0 24 24"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg>',
  wa: '<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7a.6.6 0 0 0 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.8.8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3z"/></svg>',
};

const NAV = [
  ['index.html', 'Home', 'home'],
  ['about.html', 'About Us', 'about'],
  ['services.html', 'Services', 'services', SERVICES.map((s) => [`services.html#${s.id}`, s.t])],
  ['projects.html', 'Projects', 'projects'],
  ['contact.html', 'Contact Us', 'contact'],
];

const head = (title, desc) => `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="theme-color" content="#1B2A34">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23ffffff'/%3E%3Cpolygon points='50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5' fill='none' stroke='%239C5F16' stroke-width='6.2'/%3E%3Cpath d='M26.5 69V32.5L50 19.5L73.5 32.5V69' fill='none' stroke='%231B2A34' stroke-width='6.4'/%3E%3Cpath d='M50 35V74' stroke='%239C5F16' stroke-width='5.4' stroke-linecap='round'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>`;

const header = () => `
  <div class="topbar">
    <div class="container">
      <div class="tb-left">
        <span>${I.pin.replace('<svg', '<svg aria-hidden="true"')}${COMPANY.location}</span>
        <span class="tb-cities">Serving ${COMPANY.cities.join(' · ')}</span>
      </div>
      <div class="tb-right">
        <span>${I.clock.replace('<svg', '<svg aria-hidden="true"')}${COMPANY.hours}</span>
        <a href="${COMPANY.instagram}" target="_blank" rel="noopener">${I.ig.replace('<svg', '<svg aria-hidden="true"')}${COMPANY.igHandle}</a>
      </div>
    </div>
  </div>
  <header class="header">
    <div class="container">
      <a href="index.html" class="logo" aria-label="Modulabz Interiors — home">${LOGO_H}</a>
      <nav aria-label="Main">
        <ul class="nav">
          ${NAV.map(([href, label, key, sub]) => sub
            ? `<li class="has-sub"><a href="${href}" data-nav="${key}">${label}</a><ul class="sub">${sub.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></li>`
            : `<li><a href="${href}" data-nav="${key}">${label}</a></li>`).join('\n          ')}
        </ul>
      </nav>
      <div class="header-cta">
        <a href="contact.html" class="btn btn-brown">Get Free Quote</a>
        <button class="burger" id="burger" aria-label="Open menu"><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
    <div class="scrim" data-close-menu></div>
    <div class="panel" role="dialog" aria-label="Menu">
      <div class="mm-top"><a href="index.html" class="logo" aria-label="Home">${LOGO_H}</a><button class="mm-close" data-close-menu aria-label="Close menu">×</button></div>
      <ul>
        ${NAV.map(([href, label, key, sub]) => `<li><a href="${href}" data-nav="${key}">${label}</a></li>${sub ? sub.map(([h, l]) => `<li class="mm-sub"><a href="${h}" data-close-menu>${l}</a></li>`).join('') : ''}`).join('\n        ')}
      </ul>
      <a href="contact.html" class="btn btn-brown">Get Free Quote</a>
    </div>
  </div>`;

const quoteForm = (cls = '', title = true) => `
  <form class="${cls}" data-quote novalidate>
    <div class="form-grid">
      <div class="field"><label for="q-name${cls}">Your Name *</label><input id="q-name${cls}" name="name" autocomplete="name" placeholder="Full name"></div>
      <div class="field"><label for="q-phone${cls}">Phone / WhatsApp *</label><input id="q-phone${cls}" name="phone" type="tel" autocomplete="tel" placeholder="+91 98XXX XXXXX"></div>
      <div class="field"><label for="q-city${cls}">City</label><select id="q-city${cls}" name="city"><option value="">Select city</option>${COMPANY.cities.map((c) => `<option>${c}</option>`).join('')}<option>Other</option></select></div>
      <div class="field"><label for="q-type${cls}">Property Type</label><select id="q-type${cls}" name="type"><option value="">Select type</option>${['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Villa / Bungalow', 'Office / Commercial', 'Single room / Renovation'].map((o) => `<option>${o}</option>`).join('')}</select></div>
      <div class="field"><label for="q-budget${cls}">Budget</label><select id="q-budget${cls}" name="budget"><option value="">Select budget</option>${['Under ₹5 Lakh', '₹5 – 10 Lakh', '₹10 – 20 Lakh', '₹20 – 40 Lakh', 'Above ₹40 Lakh', 'Not decided'].map((o) => `<option>${o}</option>`).join('')}</select></div>
      <div class="field"><label for="q-msg${cls}">Requirement</label><input id="q-msg${cls}" name="message" placeholder="e.g. Living room + false ceiling"></div>
    </div>
    <div class="form-actions"><button type="submit" class="btn btn-brown">Get Free Quotation</button></div>
    <p class="form-msg" role="status"></p>
  </form>`;

const quoteBand = () => `
  <section class="quote" id="quote">
    <div class="container">
      <h2>Get an instant interior design quotation</h2>
      <p class="sub-t">Fill in a few details and our designer will get back to you with ideas and an estimate.</p>
      ${quoteForm()}
    </div>
  </section>`;

const ctaStrip = (h = 'Planning your dream home interior?', p = 'Talk to our designer — free consultation and site visit.') => `
  <section class="cta-strip">
    <div class="container">
      <div><h2>${h}</h2><p>${p}</p></div>
      <a href="contact.html" class="btn btn-dark">Book Free Consultation</a>
    </div>
  </section>`;

const footer = () => `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="logo" aria-label="Modulabz Interiors">${LOGO_S}</a>
        <p>${COMPANY.firm} is an Ahmedabad-based interior company providing turnkey interior design and complete project execution.</p>
        <div class="socials"><a href="${COMPANY.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a></div>
      </div>
      <div>
        <h4>Services</h4>
        <ul>${SERVICES.map((s) => `<li><a href="services.html#${s.id}">${s.t}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}<li><a href="contact.html">Get Free Quote</a></li></ul>
      </div>
      <div>
        <h4>Contact Info</h4>
        <ul class="f-contact">
          <li>${I.pin}<span>${COMPANY.location}</span></li>
          <li>${I.map}<span>Serving ${COMPANY.cities.join(', ')}</span></li>
          <li>${I.clock}<span>${COMPANY.hours}</span></li>
          <li>${I.ig}<a href="${COMPANY.instagram}" target="_blank" rel="noopener">${COMPANY.igHandle}</a></li>
        </ul>
      </div>
    </div>
    <div class="container f-bottom">
      <span>© <span data-year>2026</span> ${COMPANY.firm}. All rights reserved.</span>
      <span>Interior Designer in Ahmedabad · Palanpur · Baroda · Mumbai</span>
    </div>
  </footer>
  <a href="contact.html" class="wa-float" data-wa aria-label="Chat on WhatsApp">${I.wa}</a>
  <script src="js/site.js"></script>
</body>
</html>`;

const page = (key, title, desc, body) => `${head(title, desc)}
<body data-page="${key}">${header()}
<main>
${body}
</main>${footer().replace('</body>', body.includes('instagram-media') ? '  <script async src="https://www.instagram.com/embed.js"></script>\n</body>' : '</body>')}`;

const banner = (title, crumb, img) => `
  <section class="banner" style="background-image:url('${img}')">
    <div class="container">
      <h1>${title}</h1>
      <div class="crumbs"><a href="index.html">Home</a><span>›</span>${crumb}</div>
    </div>
  </section>`;

const svcCard = (s) => `
        <div class="svc reveal">
          <div class="ic"><svg viewBox="0 0 48 48" aria-hidden="true">${ICONS[s.id]}</svg></div>
          <h3>${s.t}</h3>
          <p>${s.short}</p>
          <a href="services.html#${s.id}" class="btn btn-dark btn-sm">Know More</a>
        </div>`;

const solutionCard = (s) => `
        <article class="card reveal">
          <div class="img"><img src="${s.img}" alt="${s.t}" loading="lazy"></div>
          <div class="body">
            <h3>${s.t}</h3>
            <p>${s.d}</p>
            <a href="contact.html?type=${encodeURIComponent(s.type)}#quote" class="btn btn-dark btn-sm">Get Quote →</a>
          </div>
        </article>`;

const projectCard = (p) => `
        <article class="card reveal" data-cat="${p.cat}">
          <div class="img"><img src="${p.img}" alt="${p.t}" loading="lazy"></div>
          <div class="body">
            <div class="meta"><span class="pill brown">${p.city}</span><span class="pill">${p.type}</span></div>
            <h3>${p.t}</h3>
            <div class="facts">
              <div><span>Area</span><b>${p.area}</b></div>
              <div><span>Budget</span><b>${p.budget}</b></div>
              <div><span>Duration</span><b>${p.time}</b></div>
              <div><span>City</span><b>${p.city}</b></div>
            </div>
            <ul class="work-list">${p.work.map((w) => `<li>${w}</li>`).join('')}</ul>
          </div>
        </article>`;

const igEmbed = (p) => {
  const url = `https://www.instagram.com/${p.kind === 'reel' ? 'reel' : 'p'}/${p.code}/`;
  return `
        <div class="ig-item" data-cat="${p.type || 'residential'}">
          <blockquote class="instagram-media" data-instgrm-permalink="${url}?utm_source=ig_embed" data-instgrm-version="14">
            <a href="${url}" target="_blank" rel="noopener" class="ig-fallback">${p.kind === 'reel' ? '▶ Watch this project video' : 'View this design'} on Instagram</a>
          </blockquote>
        </div>`;
};

const faqBlock = (img) => `
  <section class="section">
    <div class="container faq-wrap">
      <div>
        <div class="sec-title left"><span class="tag">Have a question?</span><h2>Frequently Asked Questions</h2></div>
        ${FAQ.map((f, i) => `<div class="faq-item ${i === 0 ? 'open' : ''}"><button class="faq-q" aria-expanded="${i === 0}">${f.q}</button><div class="faq-a"><p>${f.a}</p></div></div>`).join('\n        ')}
      </div>
      <img src="${img}" alt="Interior design consultation" loading="lazy">
    </div>
  </section>`;

const citiesBlock = () => `
  <section class="section light">
    <div class="container">
      <div class="sec-title"><span class="tag">Where we work</span><h2>Interior Designers for 4 Cities</h2><p>Based in Ahmedabad, Gujarat — our own team designs, installs and supervises every project.</p></div>
      <div class="cities">
        ${[['Ahmedabad', 'Head office & design studio'], ['Palanpur', 'Homes & bungalows'], ['Baroda', 'Apartments, villas & offices'], ['Mumbai', 'Apartments & offices']].map(([c, d]) => `<div class="city reveal">${I.pin}<h3>${c}</h3><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>`;

/* ======================= PAGES ======================= */
const pages = {};

pages['index.html'] = page('home',
  'Interior Designer in Ahmedabad | Modulabz Interiors',
  'Modulabz Interiors — interior designer in Ahmedabad for turnkey interiors, false ceilings, painting, furnishing and complete project execution. Serving Ahmedabad, Palanpur, Baroda and Mumbai.',
  `
  <section class="hero" aria-label="Featured interiors">
    <div class="slide" style="background-image:url('${IMG.hero1}')"></div>
    <div class="slide" style="background-image:url('${IMG.hero2}')"></div>
    <div class="slide" style="background-image:url('${IMG.hero3}')"></div>
    <div class="hero-content">
      <h1>Beautiful Interiors,<br>Designed &amp; Delivered</h1>
      <p class="kicker">Interior Design · Turnkey Interiors · Project Execution</p>
      <div class="btns"><a href="services.html" class="btn btn-brown">Our Services</a><a href="contact.html" class="btn btn-outline">Get Free Quote</a></div>
    </div>
    <div class="hero-dots"><button aria-label="Slide 1"></button><button aria-label="Slide 2"></button><button aria-label="Slide 3"></button></div>
  </section>

  <section class="section light">
    <div class="container">
      <div class="sec-title"><span class="tag">What we do</span><h2>Our Interior Services</h2>
        <p>Transform your space with Modulabz Interiors — an Ahmedabad interior company that designs and executes complete interiors. From a single room to a full home, every project is planned in 2D and 3D and delivered by one team.</p></div>
      <div class="svc-grid">${SERVICES.map(svcCard).join('')}
      </div>
    </div>
  </section>

  <section class="work-band" style="background-image:url('${IMG.living2}')">
    <div class="container">
      <p class="small">Turnkey Interior Projects</p>
      <h2>Check out our work</h2>
      <a href="${COMPANY.instagram}" target="_blank" rel="noopener" class="play" aria-label="Watch our project videos on Instagram">${I.play}</a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="sec-title"><span class="tag">Interior design solutions</span><h2>Interiors for Every Home Size</h2>
        <p>Whether it is a compact 2BHK or a large villa, we tailor the design to your space, your style and your budget — functional, beautiful and Vastu-friendly on request.</p></div>
      <div class="card-grid">${SOLUTIONS.map(solutionCard).join('')}
      </div>
    </div>
  </section>

  <section class="section dark">
    <div class="container">
      <div class="sec-title"><span class="tag">Why choose us</span><h2>Why Modulabz Interiors</h2></div>
      <div class="why">
        <div class="why-item reveal"><div class="num">01</div><h3>Design First</h3><p>2D layouts and 3D designs so you see your home before work begins.</p></div>
        <div class="why-item reveal"><div class="num">02</div><h3>Quality Execution</h3><p>Our own site team supervises every stage for a clean finish and quality work.</p></div>
        <div class="why-item reveal"><div class="num">03</div><h3>Clear Quotation</h3><p>Itemised quotation with materials and brands written down — no hidden costs.</p></div>
        <div class="why-item reveal"><div class="num">04</div><h3>One Team, Start to Finish</h3><p>Design, execution and handover managed by one team and one point of contact.</p></div>
      </div>
    </div>
  </section>

  <section class="section light">
    <div class="container">
      <div class="sec-title"><span class="tag">Our work</span><h2>Recent Projects</h2><p>Latest work from our Instagram — tap to watch.</p></div>
      <div class="ig-grid">${INSTAGRAM.slice(0, 3).map(igEmbed).join('')}
      </div>
      <p class="center" style="margin-top:34px"><a href="projects.html" class="btn btn-line">View All Projects</a></p>
    </div>
  </section>

  ${citiesBlock().replace('section light', 'section')}
  ${faqBlock(IMG.detail2)}
  ${quoteBand()}`);

pages['about.html'] = page('about',
  'About Us | Modulabz Interiors, Ahmedabad',
  'About Modulabz Interiors (Vraj Interiors) — an Ahmedabad interior company for turnkey interior design and project execution.',
  `
  ${banner('About Us', 'About Us', IMG.interior)}

  <section class="section">
    <div class="container split">
      <div class="reveal">
        <div class="sec-title left"><span class="tag">Who we are</span><h2>Modulabz Interiors</h2></div>
        <p><b>${COMPANY.firm}</b> is an interior design and execution company based in Ahmedabad, Gujarat. We focus on <b>turnkey interior design and complete project execution</b> for homes, villas, offices and shops.</p>
        <p>We believe getting your interiors done should be simple. That is why one team handles everything — understanding your needs, preparing 2D and 3D designs, and finishing the work on site — so you have one point of contact from the first meeting to the final handover.</p>
        <ul class="ticks"><li>Residential & commercial interiors</li><li>2D layouts & 3D designs</li><li>Expert site supervision</li><li>Complete turnkey execution</li><li>Clear, itemised quotations</li><li>Projects in 4 cities</li></ul>
        <a href="contact.html" class="btn btn-brown">Talk to Our Designer</a>
      </div>
      <img class="reveal" src="${IMG.living}" alt="Living room designed by Modulabz Interiors" loading="lazy">
    </div>
  </section>

  <section class="section light">
    <div class="container split rev">
      <div class="reveal">
        <div class="sec-title left"><span class="tag">Our approach</span><h2>Our Mission &amp; Vision</h2></div>
        <p><b>Mission —</b> to create interiors that are beautiful, practical and built to last, delivered on time and within the agreed budget.</p>
        <p><b>Vision —</b> to be the most trusted interior company for families and businesses in Gujarat and beyond, known for honest pricing and quality work.</p>
      </div>
      <img class="reveal" src="${IMG.bedroom2}" alt="Bedroom interior" loading="lazy">
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="sec-title"><span class="tag">How we work</span><h2>Our Process</h2><p>A simple, step-by-step process so you always know what happens next.</p></div>
      <div class="steps">
        <div class="step reveal"><h3>Consultation</h3><p>We meet, visit your site, take measurements and understand your needs and budget.</p></div>
        <div class="step reveal"><h3>2D Layout</h3><p>We plan furniture and space in 2D — with Vastu if you need it.</p></div>
        <div class="step reveal"><h3>3D Design & Quote</h3><p>You see your rooms in 3D and receive an itemised quotation.</p></div>
        <div class="step reveal"><h3>Execution</h3><p>Our team completes the work on site, with regular updates to you.</p></div>
        <div class="step reveal"><h3>Handover</h3><p>Final checks, cleaning and handover of your finished space.</p></div>
      </div>
    </div>
  </section>

  ${citiesBlock()}
  ${ctaStrip()}`);

pages['services.html'] = page('services',
  'Interior Design Services | Modulabz Interiors, Ahmedabad',
  'Bedroom and living room interiors, POP false ceilings, painting, furnishing and turnkey interiors by Modulabz Interiors.',
  `
  ${banner('Our Services', 'Services', IMG.living3)}

  <section class="section light">
    <div class="container">
      <div class="sec-title"><span class="tag">What we do</span><h2>Complete Interior Solutions</h2><p>Choose a single service or let us handle your complete interior — turnkey.</p></div>
      <div class="svc-grid">${SERVICES.map(svcCard).join('').replace(/services\.html#/g, '#')}
      </div>
    </div>
  </section>

  <div>
  ${SERVICES.map((s, i) => `
  <section class="svc-row" id="${s.id}">
    <div class="container split ${i % 2 ? 'rev' : ''}">
      <div class="reveal">
        <div class="sec-title left"><span class="tag">Service ${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2></div>
        <p>${s.long}</p>
        <ul class="ticks">${s.inc.map((x) => `<li>${x}</li>`).join('')}</ul>
        <div class="price"><div><small>Starting price</small><b>${s.price}</b></div><div><small>Timeline</small><b>${s.time}</b></div></div>
        <a href="contact.html#quote" class="btn btn-brown">Get Quote for ${s.t}</a>
      </div>
      <img class="reveal" src="${s.img}" alt="${s.t}" loading="lazy">
    </div>
  </section>`).join('')}
  </div>

  <section class="section">
    <div class="container">
      <div class="sec-title"><span class="tag">Interior design solutions</span><h2>Interiors for Every Home Size</h2></div>
      <div class="card-grid">${SOLUTIONS.map(solutionCard).join('')}
      </div>
    </div>
  </section>

  ${ctaStrip('Not sure which service you need?', 'Tell us about your space — we will suggest the right solution.')}`);

pages['projects.html'] = page('projects',
  'Our Projects | Modulabz Interiors',
  'Interior projects by Modulabz Interiors in Ahmedabad, Palanpur, Baroda and Mumbai — homes, offices and commercial spaces.',
  `
  ${banner('Our Projects', 'Projects', IMG.living3)}

  <section class="section light">
    <div class="container">
      <div class="sec-title"><span class="tag">Portfolio</span><h2>Our Completed Projects</h2><p>Homes and workplaces we have designed and completed — plus 3D designs we create for our clients. Tap any video to play.</p></div>
      <div class="filters">
        <button class="on" data-filter="all">All Projects</button>
        <button data-filter="residential">Residential</button>
        <button data-filter="commercial">Commercial</button>
        <button data-filter="design">3D Designs</button>
      </div>
      <div class="ig-grid">${INSTAGRAM.map(igEmbed).join('')}
      </div>
      <p class="center" style="margin-top:34px"><a href="${COMPANY.instagram}" target="_blank" rel="noopener" class="btn btn-line">See all posts on Instagram</a></p>
    </div>
  </section>

  <section class="work-band" style="background-image:url('${IMG.living}')">
    <div class="container">
      <p class="small">See our sites and handovers</p>
      <h2>Watch our projects on Instagram</h2>
      <a href="${COMPANY.instagram}" target="_blank" rel="noopener" class="play" aria-label="Open Instagram">${I.play}</a>
    </div>
  </section>

  ${quoteBand()}`);

pages['contact.html'] = page('contact',
  'Contact Us | Modulabz Interiors, Ahmedabad',
  'Contact Modulabz Interiors for a free interior design consultation and quotation in Ahmedabad, Palanpur, Baroda and Mumbai.',
  `
  ${banner('Contact Us', 'Contact Us', IMG.dining)}

  <section class="section light">
    <div class="container">
      <div class="contact-cards">
        <div class="c-card reveal"><div class="ic">${I.pin}</div><h3>Our Location</h3><p>${COMPANY.location}</p></div>
        <div class="c-card reveal"><div class="ic">${I.map}</div><h3>Cities We Serve</h3><p>${COMPANY.cities.join(', ')}</p></div>
        <div class="c-card reveal"><div class="ic">${I.clock}</div><h3>Working Hours</h3><p>${COMPANY.hours}</p></div>
        <div class="c-card reveal"><div class="ic">${I.ig}</div><h3>Instagram</h3><a href="${COMPANY.instagram}" target="_blank" rel="noopener">${COMPANY.igHandle}</a></div>
      </div>

      <div class="contact-grid" id="quote">
        <div class="box">
          <div class="sec-title left" style="margin-bottom:24px"><span class="tag">Free quotation</span><h2>Tell Us About Your Project</h2></div>
          ${quoteForm('light-form')}
        </div>
        <iframe class="map" title="Ahmedabad, Gujarat on Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Ahmedabad,+Gujarat,+India&output=embed"></iframe>
      </div>
    </div>
  </section>

  ${faqBlock(IMG.detail)}`);

/* ======================= WRITE ======================= */
for (const [file, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(__dirname, file), html.replace(/\n{3,}/g, '\n\n'));
  console.log('wrote', file, Math.round(html.length / 1024) + ' KB');
}
