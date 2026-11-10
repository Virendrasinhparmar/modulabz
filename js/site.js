/* =========================================================
   Modulabz Interiors — site script
   ---------------------------------------------------------
   CONTACT DETAILS: set the real WhatsApp number here
   (country code + number, digits only, e.g. 919876543210).
   ========================================================= */
const MODULABZ = {
  whatsapp: '', // ← add number, e.g. '919876543210'
  email: '',    // ← add email, e.g. 'info@modulabz.in'
};

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* Header shadow */
  const header = $('.header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Mobile menu */
  const mm = $('#mobileMenu');
  const openMenu = () => { mm.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mm.classList.remove('open'); document.body.style.overflow = ''; };
  $('#burger') && $('#burger').addEventListener('click', openMenu);
  $$('[data-close-menu]').forEach((b) => b.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  /* Active nav link */
  const page = document.body.dataset.page;
  $$(`[data-nav="${page}"]`).forEach((a) => a.classList.add('active'));

  /* WhatsApp links use the number above once it is set */
  if (MODULABZ.whatsapp) $$('[data-wa]').forEach((a) => { a.href = `https://wa.me/${MODULABZ.whatsapp}`; a.target = '_blank'; a.rel = 'noopener'; });

  /* Year */
  $$('[data-year]').forEach((e) => (e.textContent = new Date().getFullYear()));

  /* Hero slider */
  const slides = $$('.slide'), dots = $$('.hero-dots button');
  if (slides.length) {
    let i = 0, t;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
    };
    const play = () => { clearInterval(t); t = setInterval(() => show(i + 1), 5500); };
    dots.forEach((d, k) => d.addEventListener('click', () => { show(k); play(); }));
    show(0); play();
  }

  /* FAQ accordion */
  $$('.faq-item').forEach((item) => {
    const q = $('.faq-q', item), a = $('.faq-a', item);
    const set = (open) => { item.classList.toggle('open', open); q.setAttribute('aria-expanded', open); a.style.maxHeight = open ? a.scrollHeight + 'px' : '0'; };
    if (item.classList.contains('open')) set(true);
    q.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      $$('.faq-item').forEach((o) => { if (o !== item && o.classList.contains('open')) { o.classList.remove('open'); $('.faq-a', o).style.maxHeight = '0'; $('.faq-q', o).setAttribute('aria-expanded', false); } });
      set(open);
    });
  });

  /* Project filter */
  const fbtns = $$('.filters button');
  fbtns.forEach((b) => b.addEventListener('click', () => {
    fbtns.forEach((x) => x.classList.toggle('on', x === b));
    const f = b.dataset.filter;
    $$('[data-cat]').forEach((c) => { c.style.display = f === 'all' || c.dataset.cat === f ? '' : 'none'; });
  }));

  /* Pre-fill form from ?type= in the URL (e.g. from package buttons) */
  const params = new URLSearchParams(location.search);
  const preType = params.get('type'), preCity = params.get('city');

  /* Quote forms → WhatsApp / email */
  $$('form[data-quote]').forEach((form) => {
    const msg = $('.form-msg', form);
    if (preType && form.elements.type) form.elements.type.value = preType;
    if (preCity && form.elements.city) form.elements.city.value = preCity;
    const build = () => {
      const v = (n) => (form.elements[n] ? form.elements[n].value.trim() : '');
      return [
        'Hello Modulabz Interiors, I would like a quotation.',
        '',
        `Name: ${v('name')}`,
        `Phone: ${v('phone')}`,
        v('city') && `City: ${v('city')}`,
        v('type') && `Property: ${v('type')}`,
        v('budget') && `Budget: ${v('budget')}`,
        v('message') && `Details: ${v('message')}`,
      ].filter(Boolean).join('\n');
    };
    const valid = () => {
      let ok = true;
      ['name', 'phone'].forEach((n) => {
        const el = form.elements[n]; if (!el) return;
        const bad = n === 'phone' ? !/^[+\d][\d\s-]{9,14}$/.test(el.value.trim()) : el.value.trim().length < 2;
        el.closest('.field').classList.toggle('err', bad); if (bad) ok = false;
      });
      if (!ok) msg.textContent = 'Please enter your name and a valid phone number.';
      return ok;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!valid()) return;
      const text = encodeURIComponent(build());
      if (MODULABZ.whatsapp) {
        window.open(`https://wa.me/${MODULABZ.whatsapp}?text=${text}`, '_blank', 'noopener');
        msg.textContent = 'Opening WhatsApp — just press send. We will reply shortly.';
      } else if (MODULABZ.email) {
        location.href = `mailto:${MODULABZ.email}?subject=${encodeURIComponent('Interior quotation request')}&body=${text}`;
        msg.textContent = 'Opening your email app — just press send.';
      } else {
        msg.textContent = 'Thank you! (Website owner: add the WhatsApp number in js/site.js to receive these requests.)';
      }
    });
  });

  /* Gentle reveal on scroll */
  const rv = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach((e) => io.observe(e));
  } else rv.forEach((e) => e.classList.add('in'));
})();
