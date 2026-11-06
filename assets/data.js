/* =========================================================
   Modulabz Interiors — Content & Configuration
   NOTE: Project names, counts, prices and timelines below are
   representative placeholders. Replace with verified studio data.
   ========================================================= */
(function () {
  const U = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

  const IMG = {
    heroLiving: U('1618221195710-dd6b41faaea6', 2200),
    living2: U('1600210492486-724fe5c67fb0'),
    living3: U('1616486338812-3dadae4b4ace'),
    living4: U('1618220179428-22790b461013'),
    kitchen: U('1556909114-f6e7ad7d3136'),
    kitchen2: U('1600489000022-c2086d79f9d4'),
    bedroom: U('1616594039964-ae9021a400a0'),
    bedroom2: U('1615874959474-d609969a20ed'),
    bedroom3: U('1631679706909-1844bbd07221'),
    wardrobe: U('1595428774223-ef52624120d2'),
    office: U('1497366216548-37526070297c'),
    office2: U('1497366811353-6870744d04b2'),
    cafe: U('1554118811-1e0d58224f24'),
    retail: U('1441986300917-64674bd600d8'),
    villa: U('1600585154340-be6161a56a0c'),
    interior: U('1586023492125-27b2c045efd7'),
    dining: U('1617806118233-18e1de247200'),
    detail: U('1600566753190-17f0baa2a6c3'),
    detail2: U('1600607687939-ce8a6c25118c'),
    blueprint: U('1503387762-592deb58ef4e'),
  };

  const ROUTES = [
    { path: '/', label: 'Home', title: 'Home', idx: '01' },
    { path: '/about', label: 'About Us', title: 'About Modulabz Interiors', idx: '02' },
    { path: '/services', label: 'Services', title: 'Interior Design Services', idx: '03' },
    { path: '/portfolio', label: 'Projects', title: 'Our Projects', idx: '04' },
    { path: '/estimator', label: 'Cost Estimator', title: 'Interior Cost Estimator', idx: '05' },
    { path: '/contact', label: 'Contact', title: 'Contact Us', idx: '06' },
  ];

  const COMPANY = {
    name: 'Modulabz Interiors',
    firm: 'Modulabz Interiors (Vraj Interiors)',
    location: 'Ahmedabad, Gujarat, India',
    focus: 'Turnkey interior design, modular furniture solutions and project execution',
    cities: ['Ahmedabad', 'Palanpur', 'Baroda', 'Mumbai'],
  };

  const HOTSPOTS = [
    {
      n: '01', x: 22, y: 42, title: 'Raw Unfilled Italian Travertine Cladding',
      desc: 'Vein-matched, honed travertine slabs dry-clad on a concealed SS bracket system — the pores left deliberately unfilled for a soft, tactile, sun-bleached texture.',
      specs: [['Material', 'Italian Travertine, 18 mm'], ['Finish', 'Honed · Unfilled'], ['Install', 'Dry-clad SS brackets'], ['Climate', 'Breathable in 45°C summers']],
    },
    {
      n: '02', x: 58, y: 70, title: 'CNC-Fluted Burma Teak Console',
      desc: 'A floating media console with 12 mm CNC-routed flutes on HDHMR core, wrapped in crown-cut Burma teak veneer and sealed in 10% sheen PU.',
      specs: [['Core', 'HDHMR 18 mm, CNC fluted'], ['Veneer', 'Burma Teak, crown-cut'], ['Finish', 'Matte PU · 10% sheen'], ['Hardware', 'Blum push-to-open']],
    },
    {
      n: '03', x: 76, y: 16, title: 'Concealed 2700K High-CRI Cove Lighting',
      desc: 'Recessed aluminium profile LED strips in a shadow-gap POP cove — warm 2700K, CRI 95+, dimmable in three scenes for evenings that feel like golden hour.',
      specs: [['Colour Temp', '2700K Warm White'], ['CRI', '95+ · flicker-free'], ['Profile', 'Recessed Al + diffuser'], ['Control', '3-scene dimmable']],
    },
  ];

  const SERVICES = [
    {
      n: '01', id: 1, short: 'Modular Kitchen', title: 'Modular Kitchen Interiors',
      tagline: 'The heart of the home — factory-made, soft-closing and built for everyday Indian cooking.',
      img: IMG.kitchen, from: '₹2.4 L', band: '₹1,350 – ₹3,800 / running ft.', time: '4 – 6 weeks',
      scope: ['L-shaped, U-shaped & parallel kitchens', 'Island & breakfast-counter kitchens', 'Tall units & pantry pull-outs', 'Corner carousels & magic corners', 'Chimney, hob & appliance planning', 'Quartz / granite countertops', 'Under-cabinet lighting', 'Installation & handover'],
      materials: 'BWP marine ply carcass at sink and hob, acrylic / PU / laminate shutters, quartz or granite countertops.',
      brands: ['CenturyPly', 'Greenply', 'Merino', 'Hettich', 'Blum', 'Häfele', 'Ebco', 'Kaff / Elica'],
      prices: [['Straight / Parallel Kitchen', '₹2.4 L – ₹4.5 L', '4 – 5 weeks'], ['L / U-Shaped Kitchen', '₹3.5 L – ₹7 L', '5 – 6 weeks'], ['Island Kitchen', '₹6 L – ₹12 L', '6 weeks']],
      est: { type: 'kw', model: 'modular' },
    },
    {
      n: '02', id: 2, short: 'Bedroom & Wardrobe', title: 'Bedroom & Wardrobe Interiors',
      tagline: 'Calm bedrooms and wardrobes that finally fit everything — sliding, hinged or walk-in.',
      img: IMG.bedroom, from: '₹1.1 L', band: '₹1,200 – ₹2,800 / sq.ft. (shutter)', time: '4 – 6 weeks',
      scope: ['Sliding & hinged wardrobes', 'Walk-in dressing rooms', 'Beds with storage', 'Headboard & wall panelling', 'Study & dressing units', 'Lofts & overhead storage', 'Kids’ room furniture', 'Bedside & reading lighting'],
      materials: 'Calibrated BWR ply carcass, laminate / acrylic / fluted-glass shutters, soft-close hinges and channels.',
      brands: ['CenturyPly', 'Merino', 'Royale Touche', 'Hettich', 'Häfele', 'Saint-Gobain glass'],
      prices: [['Sliding Wardrobe (8 ft)', '₹1.1 L – ₹2.6 L', '4 – 5 weeks'], ['Complete Master Bedroom', '₹2.5 L – ₹6 L', '5 – 6 weeks'], ['Walk-In Dressing Room', '₹3 L – ₹8 L', '5 – 6 weeks']],
      est: { type: 'kw', model: 'modular' },
    },
    {
      n: '03', id: 3, short: 'Living Room', title: 'Living Room Interiors',
      tagline: 'Where the family gathers — TV units, panelling, crockery and lighting that feel like you.',
      img: IMG.living2, from: '₹1.8 L', band: '₹1,400 – ₹3,000 / sq.ft.', time: '4 – 8 weeks',
      scope: ['TV units & media walls', 'Wall panelling & cladding', 'Crockery & bar units', 'Foyer & shoe units', 'Pooja units', 'Sofa & furniture selection', 'Feature lighting', 'Curtains & décor styling'],
      materials: 'Veneer, fluted HDHMR, stone or tile cladding, PU and laminate finishes chosen to suit the room.',
      brands: ['Merino', 'Greenlam', 'Asian Paints', 'Philips', 'Hettich'],
      prices: [['TV Unit & Panelling', '₹1.8 L – ₹4 L', '4 weeks'], ['Complete Living & Dining', '₹4 L – ₹10 L', '6 – 8 weeks'], ['Pooja Unit', '₹60 k – ₹1.6 L', '3 weeks']],
      est: { type: '2bhk', model: 'turnkey' },
    },
    {
      n: '04', id: 4, short: 'POP False Ceiling', title: 'POP False Ceiling & Lighting',
      tagline: 'Clean ceiling lines, hidden cove lights and switch planning that make every room glow.',
      img: IMG.living3, from: '₹95 / sq.ft.', band: '₹95 – ₹220 / sq.ft.', time: '1 – 3 weeks',
      scope: ['POP & gypsum false ceilings', 'Cove & profile lighting', 'Spot & track lights', 'Electrical rewiring', 'Modular switches', 'Fan & AC point planning', 'Shadow-gap detailing', 'Ceiling painting'],
      materials: 'Gypsum board or POP on GI framework, warm 2700K–3000K LED, modular switch plates.',
      brands: ['Gyproc', 'Saint-Gobain', 'Philips', 'Legrand', 'Polycab', 'Havells'],
      prices: [['Simple Cove Ceiling', '₹95 – ₹130 / sq.ft.', '1 – 2 weeks'], ['Designer Ceiling + Lights', '₹140 – ₹220 / sq.ft.', '2 – 3 weeks'], ['Full Home Electrical', '₹110 – ₹290 / sq.ft.', '2 – 3 weeks']],
      est: { type: '3bhk', model: 'turnkey' },
    },
    {
      n: '05', id: 5, short: 'Paint & Furnishing', title: 'Paint Work & Home Furnishing',
      tagline: 'Colour, texture and soft furnishing — the finishing layer that makes a house feel finished.',
      img: IMG.dining, from: '₹22 / sq.ft.', band: '₹22 – ₹90 / sq.ft. (paint)', time: '1 – 3 weeks',
      scope: ['Interior & exterior painting', 'Textures & wallpaper', 'Curtains & blinds', 'Sofa & upholstery', 'Rugs & carpets', 'Lighting fixtures', 'Art & décor', 'Final styling'],
      materials: 'Premium emulsions, texture and designer finishes, wallpapers, and fabrics selected with you.',
      brands: ['Asian Paints Royale', 'Berger', 'Nilaya', 'D’Decor', 'Marshalls'],
      prices: [['Full Home Repaint (2 BHK)', '₹45 k – ₹1 L', '1 – 2 weeks'], ['Texture / Wallpaper Wall', '₹8 k – ₹35 k', '2 – 3 days'], ['Complete Furnishing', '₹1.5 L – ₹6 L', '2 – 3 weeks']],
      est: { type: '2bhk', model: 'turnkey' },
    },
    {
      n: '06', id: 6, short: 'Turnkey Interiors', title: 'Turnkey Interiors — Homes, Villas & Offices',
      tagline: 'One team, one price, one handover — from civil changes to the last cushion.',
      img: IMG.living4, from: '₹1,450 / sq.ft.', band: '₹1,450 – ₹3,200 / sq.ft.', time: '8 – 18 weeks',
      scope: ['2D layouts & 3D designs', 'Civil changes & masonry', 'False ceiling & electrical', 'Modular kitchen & wardrobes', 'Flooring & tiling', 'Painting & textures', 'Furniture & furnishing', 'Cleaning & handover'],
      materials: 'Every brand, code and thickness written into a locked BOQ — no substitutions without your approval.',
      brands: ['CenturyPly', 'Polycab', 'Legrand', 'Gyproc', 'Asian Paints', 'Kajaria', 'Jaquar', 'Hettich'],
      prices: [['2 BHK Flat', '₹6.5 L – ₹12 L', '8 – 10 weeks'], ['3 BHK Flat', '₹11 L – ₹22 L', '10 – 12 weeks'], ['4 BHK / Villa', '₹22 L – ₹60 L+', '12 – 18 weeks'], ['Office / Showroom', '₹1,200 – ₹2,800 / sq.ft.', '6 – 12 weeks']],
      est: { type: '3bhk', model: 'turnkey' },
    },
  ];

  /* Design packages by home size (like the reference site) */
  const BHK = [
    { t: '2 BHK Interior Design', d: 'Smart, space-saving interiors for compact homes — kitchen, two bedrooms, living and storage, Vastu-friendly.', price: '₹6.5 L – ₹12 L', time: '8 – 10 weeks', img: IMG.living4, est: { type: '2bhk', model: 'turnkey' } },
    { t: '3 BHK Interior Design', d: 'The most popular family package — modular kitchen, three bedrooms, living & dining, false ceiling.', price: '₹11 L – ₹22 L', time: '10 – 12 weeks', img: IMG.living2, est: { type: '3bhk', model: 'turnkey' } },
    { t: '4 BHK Interior Design', d: 'Larger homes with room for statement walls, walk-in wardrobes and an island kitchen.', price: '₹22 L – ₹40 L', time: '12 – 14 weeks', img: IMG.bedroom2, est: { type: '4bhk', model: 'turnkey' } },
    { t: '5 BHK Interior Design', d: 'Premium apartments and penthouses with bespoke joinery, stone and layered lighting.', price: '₹35 L – ₹60 L', time: '14 – 16 weeks', img: IMG.dining, est: { type: '4bhk', model: 'turnkey', area: 3600 } },
    { t: 'Villa Interior Design', d: 'Bungalows and villas designed room by room — from entrance foyer to terrace.', price: '₹40 L – ₹1.2 Cr', time: '16 – 24 weeks', img: IMG.villa, est: { type: 'villa', model: 'turnkey' } },
  ];

  const PILLARS = [
    { n: '01', t: 'Material', h: 'Honest materials, <em>chosen</em> for climate.', img: IMG.detail,
      p: 'In a city that touches 45°C and then soaks through the monsoon, the board inside your shutter matters more than the laminate on it. We specify BWP where water lives, BWR where air is dry, and never let the two swap.',
      specs: [['Wet Zones', 'IS:710 BWP Marine Ply'], ['Dry Zones', 'Calibrated BWR Ply'], ['Fluted Shutters', 'HDHMR CNC-routed']] },
    { n: '02', t: 'Light', h: 'Light that <em>layers</em>, not floods.', img: IMG.living4,
      p: 'Ambient cove, focused task and accent wash — three layers on three circuits. We simulate every room in 3D at 2700K–3000K before a single conduit is chased.',
      specs: [['Ambient', '2700K cove · CRI 95+'], ['Task', '3000K under-cabinet'], ['Accent', 'Track & wall-wash']] },
    { n: '03', t: 'Detail', h: 'The 2 mm that make it <em>luxury</em>.', img: IMG.detail2,
      p: 'Shadow gaps, PUR zero-joint edges, aligned grain across shutters, flush handles that land exactly on the 900 mm datum. Details nobody notices — until they are missing.',
      specs: [['Edge', 'PUR zero-joint banding'], ['Gaps', '2 mm shutter reveal'], ['Grain', 'Book-matched across runs']] },
    { n: '04', t: 'Form', h: 'Proportion before <em>decoration</em>.', img: IMG.dining,
      p: 'We draw the room in plan, section and elevation first — sight lines, ceiling heights, circulation and Vastu axes — so every piece of joinery feels inevitable, not added.',
      specs: [['Planning', '2D CAD + Vastu axes'], ['Validation', '3D + 360° walkthrough'], ['Datum', 'Unified 900 / 2100 mm lines']] },
  ];

  const PODS = [
    { n: 'POD 01', t: '2D CAD & Spatial Planning', img: IMG.blueprint, lead: 'The geometry of your home, solved before it is built.',
      items: ['Civil change & demolition drawings', 'Electrical, switchboard & data points', 'False ceiling plans & sections', 'Vastu zoning & directional alignment', 'Furniture layouts with clearances'] },
    { n: 'POD 02', t: '3D Photorealistic Visualisation Lab', img: IMG.living4, lead: 'See it at golden hour before you sign a single BOQ line.',
      items: ['Corona / V-Ray photoreal rendering', 'Daylight & 2700K lighting simulation', 'Texture mapping of real material codes', '360° VR walkthroughs', 'Live revision rounds'] },
    { n: 'POD 03', t: 'Factory Modular Engineering', img: IMG.kitchen2, lead: 'Where precision is a machine setting, not a hope.',
      items: ['CNC panel cutting to ±0.5 mm', 'PUR & hot-melt edge banding', 'Hardware drilling & calibration', 'Dry-fit QC before dispatch', 'Barcode-labelled flat packing'] },
    { n: 'POD 04', t: 'On-Site Turnkey PMC', img: IMG.living3, lead: 'One accountable site lead. Daily. Documented.',
      items: ['Daily site supervision & photo log', 'Civil, electrical & POP vendor coordination', 'Weekly progress & snag reports', '100+ point quality audits', 'Handover & warranty documentation'] },
  ];

  const HUBS = [
    { id: 'ahd', name: 'Ahmedabad', tag: 'Head office', note: 'Our home city and design base. Every project is designed, priced and managed from here, with our site team visiting daily during execution.', serves: 'Flats, villas, offices and showrooms across Ahmedabad' },
    { id: 'palanpur', name: 'Palanpur', tag: 'Regular projects', note: 'Bungalows and family homes in Palanpur and North Gujarat, executed by our own team with scheduled site visits.', serves: 'Bungalows, family homes and shops' },
    { id: 'baroda', name: 'Baroda', tag: 'Regular projects', note: 'Apartments and villas in Vadodara. Design is done in Ahmedabad; modular furniture is factory-made and installed on site by our team.', serves: 'Apartments, villas and offices' },
    { id: 'mumbai', name: 'Mumbai', tag: 'Selected projects', note: 'Selected apartment and office projects in Mumbai, with remote design reviews and on-site supervision at each milestone.', serves: 'Apartments and offices' },
  ];

  const PALETTES = [
    { id: 'p1', n: '01', name: 'Warm Travertine & Teak', mood: 'Sun-bleached, tactile and calm — the Ahmedabad afternoon, indoors.',
      wall: '#E9DFD0', floor: '#CDB89A', accent: '#8A5A36', joinery: '#9C6B43', fabric: '#D8CBB7', metal: '#B89146', ceiling: '#F3EEE6',
      swatches: [['Travertine', '#D9CBB5', true], ['Burma Teak', '#8A5A36', true], ['Linen White', '#F1EBE1'], ['Sand Bouclé', '#CFC1AA'], ['Brushed Brass', '#B89146']],
      rooms: ['Living & Dining', 'Master Suite', 'Foyer'], kelvin: 2700 },
    { id: 'p2', n: '02', name: 'Cashmere Matte & Smoked Oak', mood: 'Hushed, tonal and tailored — a soft-grey cocoon for city penthouses.',
      wall: '#D9D4CD', floor: '#7A6A5A', accent: '#4A4038', joinery: '#5B4D40', fabric: '#BDB5AA', metal: '#8F8A84', ceiling: '#ECE9E4',
      swatches: [['Cashmere Matte', '#CFC8BE'], ['Smoked Oak', '#5B4D40', true], ['Greige Plaster', '#B7AEA2'], ['Charcoal Fluted', '#3B3632', true], ['Gunmetal', '#6E6A66']],
      rooms: ['Penthouse Living', 'Modular Kitchen', 'Home Office'], kelvin: 3000 },
    { id: 'p3', n: '03', name: 'Terracotta, Lime Plaster & Brass', mood: 'Earthy, artisanal and Gujarati at heart — courtyards, clay and glow.',
      wall: '#E7D2BE', floor: '#A65E3E', accent: '#9E5A3C', joinery: '#B9774F', fabric: '#C9A27E', metal: '#B89146', ceiling: '#F1E5D6',
      swatches: [['Lime Plaster', '#E4D3BF'], ['Terracotta', '#A65E3E'], ['Kota Stone', '#7F7A63'], ['Handloom Ochre', '#C79A55', true], ['Antique Brass', '#A47E3B']],
      rooms: ['Villa Courtyard', 'Pooja Room', 'Dining'], kelvin: 2400 },
  ];

  const MATRIX = {
    boards: {
      label: 'Core Boards',
      items: [
        { name: 'IS:710 BWP Marine Plywood', sub: 'Boiling Water Proof · Gurjan core', note: 'Sink bases, hob units, vanity, utility & any wet wall.',
          m: [['Water Resistance', 98], ['Screw Holding', 92], ['Termite Proof', 95], ['Dimensional Stability', 90], ['Cost Index', 85]], use: '<b>Where we use it:</b> every kitchen sink & hob carcass, bathroom vanities, utility balcony storage.' },
        { name: 'Calibrated BWR Ply', sub: 'Boiling Water Resistant · sanded to ±0.3 mm', note: 'Dry wardrobes, TV units, beds, study and lofts.',
          m: [['Water Resistance', 72], ['Screw Holding', 88], ['Termite Proof', 85], ['Dimensional Stability', 86], ['Cost Index', 62]], use: '<b>Where we use it:</b> bedroom wardrobes, lofts, beds and living units away from water.' },
        { name: 'High-Density HDHMR', sub: 'High-Density High-Moisture-Resistance board', note: 'CNC-fluted, routed & profiled shutters.',
          m: [['Water Resistance', 80], ['Screw Holding', 74], ['Termite Proof', 90], ['Dimensional Stability', 94], ['Cost Index', 58]], use: '<b>Where we use it:</b> fluted shutters, CNC jaali, profiled handles and painted PU doors.' },
      ],
    },
    finishes: {
      label: 'Shutter Finishes',
      items: [
        { name: '1.5 mm Anti-Fingerprint Acrylic', sub: 'High-gloss or super-matte', note: 'Kitchens & high-touch shutters.',
          m: [['Scratch Resistance', 78], ['Heat / UV Stability', 82], ['Fingerprint Resistance', 95], ['Repairability', 55], ['Luxury Feel', 84]], use: '<b>Best for:</b> modern kitchens and kids’ room wardrobes that see daily hands.' },
        { name: 'Italian PU Lacquer', sub: 'Multi-coat sprayed polyurethane', note: 'Seamless painted joinery in any shade.',
          m: [['Scratch Resistance', 70], ['Heat / UV Stability', 76], ['Fingerprint Resistance', 68], ['Repairability', 90], ['Luxury Feel', 94]], use: '<b>Best for:</b> fluted HDHMR, bespoke colour matches and statement islands.' },
        { name: 'Natural Crown-Cut Veneer', sub: 'Teak, oak, walnut — book-matched', note: 'Warm, real-wood living spaces.',
          m: [['Scratch Resistance', 60], ['Heat / UV Stability', 64], ['Fingerprint Resistance', 72], ['Repairability', 86], ['Luxury Feel', 98]], use: '<b>Best for:</b> living consoles, master wardrobes, wall panelling and doors.' },
        { name: 'Zero-Joint PUR Laminate', sub: '1 mm HPL + PUR edge banding', note: 'Durable, value-led, seamless edges.',
          m: [['Scratch Resistance', 92], ['Heat / UV Stability', 88], ['Fingerprint Resistance', 80], ['Repairability', 50], ['Luxury Feel', 70]], use: '<b>Best for:</b> rentals, utility, kids’ rooms and Essential-tier homes needing toughness.' },
      ],
    },
    hardware: {
      label: 'Hardware Ecosystem',
      items: [
        { name: 'Blum Tandembox & Aventos', sub: 'Austria · drawer systems & lift-ups', note: 'Cycle-tested to 80,000 openings.',
          m: [['Cycle Rating', 98], ['Load (Drawer)', 92], ['Soft-Close Quality', 98], ['Warranty Life', 96], ['Cost Index', 95]], use: '<b>Rating:</b> 80,000 cycles · 65 kg dynamic load · lifetime manufacturer warranty.' },
        { name: 'Hettich Innotech Atira', sub: 'Germany · double-wall drawers', note: 'Engineered balance of quality and value.',
          m: [['Cycle Rating', 92], ['Load (Drawer)', 86], ['Soft-Close Quality', 90], ['Warranty Life', 88], ['Cost Index', 76]], use: '<b>Rating:</b> 100,000 cycles (EN 15338 L3) · 40–70 kg load options.' },
        { name: 'Häfele Soft-Close Fittings', sub: 'Germany · hinges, slides & accessories', note: 'Wide range of wardrobe & kitchen fittings.',
          m: [['Cycle Rating', 86], ['Load (Drawer)', 80], ['Soft-Close Quality', 86], ['Warranty Life', 82], ['Cost Index', 64]], use: '<b>Rating:</b> 50,000+ cycle hinges · sliding wardrobe systems up to 80 kg per door.' },
      ],
    },
  };

  const VASTU = [
    { id: 'foyer', name: 'Entrance Foyer', dir: 'N / NE / E', angle: 22,
      principle: 'The main door is the mouth of the home. North, Northeast or East entries invite light, prana and prosperity.',
      modern: ['Bright 3000K wash on the threshold', 'Floating shoe console — no clutter at the door', 'Mirror on side wall, never facing the door', 'Natural stone or wood threshold strip'],
      avoid: ['Dark, cramped entry lobbies', 'Dustbins or shoe heaps near the door', 'Broken or squeaky hardware'] },
    { id: 'kitchen', name: 'Agni-Corner Kitchen', dir: 'SE', angle: 135,
      principle: 'Southeast is governed by Agni, the fire element. Cooking here, facing East, is considered ideal for health and energy.',
      modern: ['Hob placed so the cook faces East', 'Sink kept apart from hob (fire vs. water)', 'Warm terracotta or ochre accents', 'Tall unit / pantry on South or West wall'],
      avoid: ['Hob directly under a beam', 'Sink and hob on the same short run', 'Kitchen in the Northeast'] },
    { id: 'mandir', name: 'Northeast Mandir / Pooja', dir: 'NE', angle: 45,
      principle: 'Ishanya — the Northeast — is the most sacred and lightest zone. Ideal for the mandir, meditation and stillness.',
      modern: ['CNC-jaali backlit pooja unit in teak or white PU', 'Deity facing West so you face East while praying', 'Brass bell & diya shelf with heat-proof inlay', 'Pocket shutters to close the mandir when needed'],
      avoid: ['Mandir under a staircase or beside a toilet wall', 'Heavy storage overhead', 'Dark colours in the NE zone'] },
    { id: 'master', name: 'Master Bedroom Suite', dir: 'SW', angle: 225,
      principle: 'Southwest — Nairutya — brings stability and grounding. The head of the family traditionally sleeps here.',
      modern: ['Bed headboard against the South or West wall', 'Heavy wardrobes along South / West', 'Earthy, grounded palette; avoid stark blue', 'Warm 2700K bedside reading lights'],
      avoid: ['Mirrors facing the bed', 'Bed under a beam', 'Head pointing North while sleeping'] },
    { id: 'office', name: 'Executive Office Desk', dir: 'N / E facing', angle: 0,
      principle: 'North is ruled by Kubera (wealth); East by the rising sun (growth). Sit facing either while you work.',
      modern: ['Desk placed so you face North or East', 'Solid wall behind you — no window or door', 'Cable-managed desk with concealed power', 'Credenza on the South-West for weight'],
      avoid: ['Sitting with your back to the door', 'Overhead loft above the chair', 'Clutter on the North wall'] },
  ];

  const PROJECTS = [
    { id: 'p1', title: 'The Travertine Residence', cat: 'Residential', tier: 'high', loc: 'Ahmedabad', area: 2850, cost: 42, weeks: 14, type: '4 BHK Penthouse', img: IMG.living2,
      brief: 'A family of five moving from an old bungalow into a 4 BHK sky-penthouse wanted the warmth of a house without its clutter.',
      challenge: 'A 14-foot double-height living room with harsh western glare and a structural beam cutting across the dining zone.',
      solution: 'We clad the double-height wall in honed travertine, wrapped the beam in a fluted teak bulkhead that becomes the dining light-trough, and specified motorised sheer + blackout layers for the glare.',
      boq: [['Living & Dining', 'Travertine cladding, teak console, cove lighting', 12.4], ['Modular Kitchen', 'Island kitchen, PU + quartz, Blum Tandembox', 8.6], ['4 Bedroom Suites', 'Veneer & fluted-glass wardrobes, beds, vanities', 13.2], ['Ceiling & Electrical', 'Gypsum shadow-gap ceiling, smart switches', 4.9], ['Finishes & Styling', 'Lime plaster, wallpaper, soft furnishings', 2.9]] },
    { id: 'p2', title: 'Cashmere Kitchen Studio', cat: 'Modular Kitchens', tier: 'low', loc: 'Ahmedabad', area: 210, cost: 5.8, weeks: 5, type: 'L + Island Kitchen', img: IMG.kitchen,
      brief: 'A home baker wanted a calm, matte kitchen with real prep space and room for two ovens.',
      challenge: 'A narrow 7-ft kitchen opening into the living room with exposed plumbing on the window wall.',
      solution: 'Re-routed plumbing into a BWP false wall, created an L-run with a slim 600 mm island, and used anti-fingerprint cashmere acrylic with a tall twin-oven unit.',
      boq: [['Carcass', 'IS:710 BWP ply, 18 mm', 1.6], ['Shutters', 'Anti-fingerprint acrylic, cashmere matte', 1.4], ['Hardware', 'Blum Tandembox + Aventos HK-S', 1.3], ['Countertop', 'Quartz 20 mm + backsplash', 0.9], ['Appliances & Lighting', 'Chimney, hob, profile LED', 0.6]] },
    { id: 'p3', title: 'Lime & Terracotta Villa', cat: 'Residential', tier: 'high', loc: 'Palanpur', area: 4600, cost: 78, weeks: 20, type: 'Bungalow / Villa', img: IMG.villa,
      brief: 'A Gujarati family building a weekend villa wanted it to feel rooted — clay, lime and courtyards — but with modern comfort.',
      challenge: 'Large glazing on the west and a client who wanted no visible AC units in the living pavilion.',
      solution: 'Lime-plaster walls and terracotta jaali screens moderate heat; ductable AC is concealed in a teak-slatted ceiling; a central courtyard pulls cross-ventilation.',
      boq: [['Civil & Jaali', 'Terracotta jaali, courtyard paving, lime plaster', 18.5], ['Living Pavilion', 'Slatted teak ceiling, built-in seating', 16.2], ['Kitchen & Dining', 'Island kitchen, Kota stone, brass details', 12.8], ['5 Bedrooms', 'Veneer wardrobes, beds, vanities', 21.0], ['MEP & Lighting', 'Ductable HVAC, scene lighting, automation', 9.5]] },
    { id: 'p4', title: 'Fluted-Glass Wardrobe Suite', cat: 'Wardrobes', tier: 'low', loc: 'Ahmedabad', area: 180, cost: 3.4, weeks: 4, type: 'Master Walk-In', img: IMG.bedroom,
      brief: 'Turn a 9×10 ft spare room into a walk-in dressing room for a couple who shared one cramped wardrobe.',
      challenge: 'A window on the only long wall and very little natural light.',
      solution: 'Fluted-glass hinged shutters with internal 3000K LED profiles, a dresser-island with velvet-lined jewellery drawers, and a mirrored window-seat.',
      boq: [['Carcass', 'Calibrated BWR ply, 18 mm', 0.9], ['Shutters', 'Fluted glass in black aluminium profile', 1.0], ['Island & Drawers', 'Hettich Innotech, velvet inserts', 0.8], ['Lighting', 'Sensor-activated LED profiles', 0.4], ['Mirror & Seat', 'Full-height mirror, upholstered seat', 0.3]] },
    { id: 'p5', title: 'Arcline Workspace', cat: 'Commercial', tier: 'mid', loc: 'Baroda', area: 2400, cost: 34, weeks: 10, type: 'Corporate Office', img: IMG.office,
      brief: 'A 40-seat fintech team needed a workplace that recruits — focused, acoustic, and photogenic.',
      challenge: 'Open shell with a low 9-ft slab and a 10-week deadline tied to a lease start date.',
      solution: 'Exposed painted soffit with acoustic baffles to gain height, glass cabins with fluted film, a terracotta brand wall, and a parallel factory-site schedule to hit the 10-week window.',
      boq: [['Partitions & Cabins', 'Toughened glass, fluted film, acoustic doors', 8.2], ['Workstations', '40 linear seats, storage pedestals', 9.4], ['Ceiling & Acoustics', 'Baffles, PET panels, painted soffit', 5.6], ['Electrical & Data', 'Raised floor boxes, Cat-6, lighting', 6.8], ['Brand & Pantry', 'Reception, brand wall, café pantry', 4.0]] },
    { id: 'p6', title: 'Ember Café & Bake House', cat: 'Retail', tier: 'mid', loc: 'Ahmedabad', area: 950, cost: 24, weeks: 8, type: 'Café / F&B', img: IMG.cafe,
      brief: 'A specialty coffee brand’s flagship — warm, Instagrammable, and fast to turn tables.',
      challenge: 'Heavy footfall, food-safety compliance and a brand palette that had to work in daylight and at night.',
      solution: 'Terrazzo counter, micro-cement floors, Fenix NTM tables that self-heal micro-scratches, and a two-scene lighting plan for day café and night dessert bar.',
      boq: [['Counter & BOH', 'Terrazzo counter, SS service line', 7.8], ['Seating & Tables', 'Banquettes, Fenix NTM tables', 5.2], ['Flooring & Walls', 'Micro-cement, lime-wash, tile', 4.6], ['Lighting & Electrical', 'Two-scene lighting, pendant cluster', 3.6], ['Signage & Styling', 'Façade sign, neon, planters', 2.8]] },
    { id: 'p7', title: 'Smoked Oak 3 BHK', cat: 'Residential', tier: 'mid', loc: 'Baroda', area: 1720, cost: 17.5, weeks: 11, type: '3 BHK Flat', img: IMG.living4,
      brief: 'First-time owners moving from a rental wanted a complete, move-in-ready home on possession day.',
      challenge: 'A fixed 11-week window between possession and a family wedding.',
      solution: 'Design locked in 3 weeks, modular manufacturing run parallel to civil and POP, and a 100-point audit 4 days before the deadline.',
      boq: [['Modular Kitchen', 'L-shaped, PUR laminate + quartz', 3.6], ['Wardrobes & Storage', '3 wardrobes, TV unit, crockery, foyer', 6.2], ['Ceiling & Civil', 'POP cove ceiling, minor civil', 2.4], ['Electrical & Lighting', 'Rewiring, modular switches, profiles', 2.5], ['Finishes & Decor', 'Paint, textures, wallpaper, curtains', 2.8]] },
    { id: 'p8', title: 'Serene Dental Studio', cat: 'Commercial', tier: 'low', loc: 'Mumbai', area: 720, cost: 7.6, weeks: 7, type: 'Clinic', img: IMG.office2,
      brief: 'A dentist wanted patients to feel they were walking into a spa, not a clinic.',
      challenge: 'Strict hygiene, plumbing for 2 operatories and a small waiting lounge.',
      solution: 'Anti-bacterial laminates, seamless vinyl coving, warm-wood reception and indirect 3500K lighting to calm anxious patients.',
      boq: [['Operatories', 'Plumbing, anti-bacterial joinery', 2.6], ['Reception & Lounge', 'Veneer reception desk, seating', 1.7], ['Flooring', 'Seamless vinyl with coving', 1.1], ['Lighting & Electrical', 'Indirect 3500K, dedicated circuits', 1.3], ['Finishes', 'Antimicrobial paint, signage', 0.9]] },
  ];

  const BA_SCENES = [
    { id: 'living', label: 'Living Room', img: IMG.living2 },
    { id: 'kitchen', label: 'Modular Kitchen', img: IMG.kitchen },
    { id: 'bedroom', label: 'Master Suite', img: IMG.bedroom },
  ];

  /* ---------- Estimator configuration ---------- */
  const EST = {
    types: [
      { id: '2bhk', t: '2 BHK Flat', s: '≈ 850 – 1,250 sq.ft.', area: 1100, rooms: { kitchen: 1, living: 1, master: 1, guest: 1, pooja: 1, foyer: 1, ceiling: 1 }, k: 1 },
      { id: '3bhk', t: '3 BHK Flat', s: '≈ 1,350 – 2,000 sq.ft.', area: 1650, rooms: { kitchen: 1, living: 1, master: 1, guest: 2, pooja: 1, foyer: 1, ceiling: 1 }, k: 1 },
      { id: '4bhk', t: '4 BHK / Penthouse', s: '≈ 2,200 – 4,000 sq.ft.', area: 2800, rooms: { kitchen: 1, living: 1, master: 2, guest: 2, pooja: 1, foyer: 1, ceiling: 1 }, k: 1.15 },
      { id: 'villa', t: 'Bungalow / Villa', s: '≈ 3,000 – 5,000 sq.ft.', area: 4000, rooms: { kitchen: 1, living: 1, master: 2, guest: 3, pooja: 1, foyer: 1, ceiling: 1 }, k: 1.3 },
      { id: 'kw', t: 'Kitchen + Wardrobes Only', s: 'Modular-only scope', area: 600, rooms: { kitchen: 1, living: 0, master: 1, guest: 1, pooja: 0, foyer: 0, ceiling: 0 }, k: 1 },
      { id: 'commercial', t: 'Commercial Office', s: 'Workplace · clinic · cabin', area: 1500, rooms: { kitchen: 1, living: 1, master: 2, guest: 2, pooja: 0, foyer: 1, ceiling: 1 }, k: 1, commercial: true },
      { id: 'retail', t: 'Retail / Café', s: 'F&B · boutique · showroom', area: 900, rooms: { kitchen: 1, living: 1, master: 0, guest: 0, pooja: 0, foyer: 1, ceiling: 1 }, k: 1.1, commercial: true },
    ],
    models: [
      { id: 'design', t: '2D/3D Design Consultancy Only', s: 'Drawings, 3D renders & BOQ — you execute' },
      { id: 'modular', t: 'Factory Modular Fit-Out', s: 'Design + modular joinery, installed' },
      { id: 'turnkey', t: 'Full Turnkey Execution', s: 'Civil to styling — one locked BOQ' },
    ],
    tiers: [
      { id: 'essential', t: 'Essential Modern', s: 'BWR/BWP ply · PUR laminate · Hettich/Ebco', m: 0.8, design: 300 },
      { id: 'premium', t: 'Premium Contemporary', s: 'Acrylic / PU · Hettich Innotech · quartz', m: 1, design: 375 },
      { id: 'luxury', t: 'Bespoke Architectural Luxury', s: 'Veneer / Italian PU · Blum · stone', m: 1.55, design: 450 },
    ],
    // Premium-tier base costs (₹)
    base: {
      kitchen: 380000,
      masterWardrobe: 185000,
      guestWardrobe: 125000,
      livingUnits: 165000,
      pooja: 75000,
      foyer: 55000,
      ceilingPerSqft: 105,
      civilPerSqft: 55,
      electricalPerSqft: 165,
      finishesPerSqft: 140,
    },
    milestones: [
      { k: 'Booking', p: 10, c: '#B89146' },
      { k: '3D & BOQ Sign-Off', p: 40, c: '#9E5A3C' },
      { k: 'Modular Dispatch', p: 45, c: '#42624B' },
      { k: 'Handover', p: 5, c: '#656058' },
    ],
  };

  const STAGES = [
    { n: '01', t: 'Consultation', weeks: 'Week 0', lead: 'A free site visit, a long conversation, and a written brief.',
      deliverables: ['Free site visit & laser measurement', 'Lifestyle & Vastu questionnaire', 'Moodboard direction (2–3 palettes)', 'Indicative budget range'],
      gate: 'You approve the design brief and scope', pay: '10% Booking — design work begins', time: '3 – 5 days' },
    { n: '02', t: 'Concept & 2D CAD', weeks: 'Weeks 1 – 2', lead: 'Your home, solved in plan before it is imagined in 3D.',
      deliverables: ['As-built CAD of your space', '2–3 furniture layout options', 'Vastu zoning overlay', 'Electrical & ceiling concept plans'],
      gate: 'You sign off the final layout', pay: 'No payment at this stage', time: '7 – 10 days' },
    { n: '03', t: '3D Visualisation & BOQ Lock', weeks: 'Weeks 2 – 4', lead: 'See every room photoreal — then lock the price, in writing.',
      deliverables: ['Photoreal 3D renders of every room', '360° walkthrough', 'Physical sample box of finishes', 'Itemised, brand-specified locked BOQ'],
      gate: 'You approve 3D & sign the locked BOQ', pay: '40% — 3D & BOQ sign-off', time: '10 – 14 days' },
    { n: '04', t: 'Factory & Site Execution', weeks: 'Weeks 4 – 12', lead: 'Factory and site run in parallel — that is how we save weeks.',
      deliverables: ['Civil, POP & electrical at site', 'CNC manufacturing at factory', 'Weekly photo / video progress', 'Brand invoices shared at dispatch'],
      gate: 'Dry-fit QC passed at factory', pay: '45% — modular dispatch', time: '5 – 10 weeks' },
    { n: '05', t: '100-Point Audit & Handover', weeks: 'Final week', lead: 'We check 100+ points so you do not have to.',
      deliverables: ['100-point quality audit report', 'Snag rectification within 72 hrs', 'Deep cleaning & styling', 'Warranty certificate & care manual'],
      gate: 'You walk through and accept handover', pay: '5% — on handover', time: '5 – 7 days' },
  ];

  const PILLARS9 = [
    ['Customised Design Solutions', 'No catalogue templates. Every layout is drawn for your plan, your family and your Vastu.'],
    ['Locked BOQ Pricing', 'The price you sign is the price you pay — itemised by brand, code and thickness.'],
    ['Factory-Grade Precision', 'CNC cutting to ±0.5 mm and PUR edge banding — not hand-cut site carpentry.'],
    ['Climate-Smart Materials', 'BWP where water lives, BWR where it’s dry — engineered for Ahmedabad’s extremes.'],
    ['Transparent Brand Verification', 'Written brand confirmation and invoices for every ply sheet and hardware channel.'],
    ['Single-Window Accountability', 'One project lead, one WhatsApp group, one point of responsibility.'],
    ['On-Time Milestone Delivery', 'Week-by-week schedule shared upfront, with progress reports every Saturday.'],
    ['100-Point Quality Audit', 'Alignment, gaps, hardware, finish, electrical — checked and signed before handover.'],
    ['Dedicated After-Sales Support', '10-year modular warranty and a 72-hour service response for any issue.'],
  ];

  const NRI = [
    ['Video Discovery Call', 'A 45-minute call across your time zone. Share your floor plan and your parents’ wish-list — we take it from there.'],
    ['Local Site Survey on Your Behalf', 'We collect keys from your builder or family, laser-measure, and send a video tour within 72 hours.'],
    ['Digital Design & Courier Sample Box', 'Review 3D renders and 360° walkthroughs online; a physical box of finishes is couriered to family in Ahmedabad or to you abroad.'],
    ['Weekly WhatsApp Video Walkthroughs', 'Every Saturday, your site lead walks you through progress live — timed to your morning or evening.'],
    ['Digital Milestone Sign-Offs', 'Approve BOQ, dispatch and handover digitally; pay in INR via NRE/NRO transfer against milestone invoices.'],
    ['Move-In Ready Handover', 'Deep-cleaned, styled and documented — keys handed to your family, or held for your arrival.'],
  ];

  const FAQ = [
    { c: 'Pricing', q: 'Do you charge per sq.ft. or a percentage of project cost?', a: 'For <b>design-only consultancy</b> we charge a flat ₹300–₹450 per sq.ft. of carpet area depending on scope. For <b>modular and turnkey</b> projects, design is included and you pay against an itemised, locked BOQ — there is no hidden percentage fee layered on top.' },
    { c: 'Pricing', q: 'What does a 2 BHK interior realistically cost in Ahmedabad?', a: 'A complete 2 BHK (≈1,100 sq.ft.) typically lands between <b>₹6.5 L and ₹12 L</b> for turnkey work — the spread depends mainly on finish tier (laminate vs. acrylic vs. veneer), false ceiling extent and how much loose furniture you need. Kitchen + wardrobes alone usually start around ₹3.5 L.' },
    { c: 'Pricing', q: 'And a 3 BHK or 4 BHK?', a: 'A 3 BHK (≈1,650 sq.ft.) generally ranges <b>₹11 L – ₹22 L</b>; a 4 BHK or penthouse <b>₹22 L – ₹45 L+</b>. Bungalows and villas vary widely with civil scope. Use our BOQ Estimator for a room-by-room range before we visit.' },
    { c: 'Pricing', q: 'Will my price change once work starts?', a: 'No. Once you sign the <b>locked BOQ</b>, the price only changes if <b>you</b> request a scope change — and every change is quoted in writing before it is executed. We never substitute a material or brand without your signed approval.' },
    { c: 'Timelines', q: 'How long does a full home interior take?', a: 'Typical turnkey timelines: <b>2 BHK 8–10 weeks</b>, <b>3 BHK 10–12 weeks</b>, <b>4 BHK 12–16 weeks</b>, from 3D sign-off. Modular-only projects take 4–7 weeks. We run factory manufacturing in parallel with site civil work to compress the schedule.' },
    { c: 'Timelines', q: 'Do you guarantee timelines?', a: 'We commit a week-by-week schedule in writing with the BOQ. Delays caused by us are tracked against that schedule and reported every Saturday. The most common delays — late client approvals or society permissions — are flagged early so they never become surprises.' },
    { c: 'Materials', q: 'What is BWP marine ply and do I really need it?', a: '<b>BWP (Boiling Water Proof, IS:710)</b> plywood is bonded with phenolic resin and survives continuous moisture. We use it mandatorily under sinks, around hobs, in vanities and utility areas. Dry wardrobes use calibrated BWR ply, which is cost-effective and stable. Mixing them correctly is the single biggest reason modular furniture survives an Ahmedabad monsoon.' },
    { c: 'Materials', q: 'Which hardware brands do you use?', a: 'Blum, Hettich and Häfele depending on tier, plus Ebco for accessories. The exact series (e.g. Blum Tandembox, Hettich Innotech Atira) is written into your BOQ — and invoices are shared at dispatch so you can verify.' },
    { c: 'Process', q: 'Can you incorporate my existing furniture?', a: 'Absolutely. We measure and photograph pieces you want to keep during the site visit and design around them — re-polishing, re-upholstering, or integrating them into new built-ins so they feel intentional.' },
    { c: 'Process', q: 'Do you follow Vastu Shastra?', a: 'Yes, as much or as little as you wish. Our 2D CAD pod overlays Vastu zoning on every layout — kitchen in the Agni corner, mandir in the Northeast, master bed in the Southwest — and resolves it with modern, minimal detailing.' },
    { c: 'Process', q: 'Do you work outside Ahmedabad?', a: 'Yes. Along with <b>Ahmedabad</b>, we regularly take projects in <b>Palanpur</b> and <b>Baroda</b>, and selected projects in <b>Mumbai</b>. Design is done from our Ahmedabad office and our own team installs and supervises on site. If you live away from your project city, we share weekly WhatsApp video updates.' },
    { c: 'Warranty', q: 'What does the 10-year modular warranty cover?', a: 'It covers <b>manufacturing defects in modular carcasses and shutters</b> — delamination, warping, edge-band failure — for 10 years. Hardware carries the manufacturer’s warranty (Blum lifetime, Hettich/Häfele as per series). Service requests are attended within 72 hours.' },
  ];

  window.ML = { IMG, ROUTES, COMPANY, BHK, HOTSPOTS, SERVICES, PILLARS, PODS, HUBS, PALETTES, MATRIX, VASTU, PROJECTS, BA_SCENES, EST, STAGES, PILLARS9, NRI, FAQ };
})();
