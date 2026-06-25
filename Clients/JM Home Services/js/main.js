/* ============================================================
   JM HOME SERVICES — main.js
   Nav · Counters · Review wall · IntersectionObserver · Form
   ============================================================ */

/* ── NAV: scroll shadow + active link ──────────────────── */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── HAMBURGER MENU ─────────────────────────────────────── */
(function initHamburger() {
  const btn    = document.querySelector('.nav__hamburger');
  const mobile = document.querySelector('.nav__mobile');
  if (!btn || !mobile) return;

  function toggle(open) {
    btn.setAttribute('aria-expanded', open);
    mobile.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => {
    toggle(btn.getAttribute('aria-expanded') !== 'true');
  });

  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggle(false));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });
})();

/* ── INTERSECTION OBSERVER: scroll animations ───────────── */
(function initScrollAnims() {
  const classes = ['.fade-in', '.slide-left', '.slide-right', '.scale-in', '.stagger-children'];
  const els = document.querySelectorAll(classes.join(','));
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* ── STAT COUNTERS ──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target   = el.dataset.count;
    const isFloat  = target.includes('.');
    const hasSuffix = target.includes('+');
    const numeric  = parseFloat(target);
    const duration = 1600;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      const value    = isFloat
        ? (ease * numeric).toFixed(1)
        : Math.round(ease * numeric);
      el.textContent = value + (hasSuffix ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ── REVIEW WALL ────────────────────────────────────────── */
(function initReviewWall() {
  const reviews = [
    { name: 'Lori K.',    initial: 'L', color: 'navy',
      text: 'JM has the most delightful young men you would ever want to have around your property. They did an exceptional job on my windows and I can\'t wait to have them back again. My house looks beautiful, thank you JM.' },
    { name: 'David W.',   initial: 'D', color: 'blue',  badge: 'Local Guide',
      text: 'Our windows disappeared! JM Home Services is professional, personable, hard working, and does the job right. 2nd year using them — last year windows, this year screens, siding, eaves/gutters. One could not ask for anything more.' },
    { name: 'Sue L.',     initial: 'S', color: 'orange',
      text: 'Excellent workmanship, extremely knowledgeable and friendly. Would highly recommend. Power washed vinyl siding, gutters and inside/outside windows cleaned. Great job guys.' },
    { name: 'Gregg B.',   initial: 'G', color: 'navy',
      text: 'The guys were a pleasure to deal with and their work cleaning all the windows was top shelf — money well spent. They even offered a solution to an unrelated issue. We will use their services again without hesitation.' },
    { name: 'Deanna P.',  initial: 'D', color: 'blue',
      text: 'Mitch and his team were professional and did a fantastic job on our many dirty windows. I would highly recommend JM Home Services and will have them back in the spring!' },
    { name: 'Mandeep P.', initial: 'M', color: 'orange', badge: 'Local Guide',
      text: 'Excellent service from JM Home Services! They cleaned all our windows thoroughly and professionally. The team was punctual, friendly — I\'m very happy with their work and highly recommend them. Definitely a 5-star service!' },
    { name: 'Jackie A.',  initial: 'J', color: 'navy',
      text: 'Jacob and Mitch did an awesome job on our windows. Would highly recommend them any day. Thanks guys.' },
    { name: 'Catherine B.', initial: 'C', color: 'blue',
      text: 'Jacob and crew were incredibly efficient and professional. Communication was excellent — I wasn\'t home, so when they finished they sent me pics of every window before submitting payment. Windows looked great when I got home.' },
    { name: 'Ellen H.',   initial: 'E', color: 'orange',
      text: 'A great team of young men working their way through university who present as professional, excellent communicators, well organized with all their own equipment. I would not hesitate to have them back.' },
    { name: 'Mary M.',    initial: 'M', color: 'navy',
      text: 'I was so impressed by this group of hardworking young men. Professional, polite, and an excellent job — my windows have never looked better!' },
    { name: 'Kevin R.',   initial: 'K', color: 'blue',
      text: 'Just completed a super cleaning of my windows and gutters. Efficient and very courteous. They reviewed their work with me to ensure a satisfied customer. Definitely recommend to anyone.' },
    { name: 'Ryan T.',    initial: 'R', color: 'orange',
      text: 'Mitch came out the same day when I called, cleaned all my windows and did an amazing job. Made them look brand new again. We\'ll definitely use his services again!' },
  ];

  const wall = document.querySelector('.review-wall');
  if (!wall) return;

  // Shuffle
  const shuffled = [...reviews].sort(() => Math.random() - 0.5);

  // Split into 3 columns
  const cols = [[], [], []];
  shuffled.forEach((r, i) => cols[i % 3].push(r));

  function buildCard(r) {
    return `
      <article class="review-card">
        <div class="review-card__stars">★★★★★</div>
        <p class="review-card__text">"${r.text}"</p>
        <footer class="review-card__footer">
          <div class="review-card__avatar avatar--${r.color}">${r.initial}</div>
          <div>
            <div class="review-card__name">${r.name}</div>
            ${r.badge ? `<div class="review-card__badge">${r.badge}</div>` : ''}
          </div>
        </footer>
      </article>`;
  }

  wall.querySelectorAll('.review-col').forEach((col, i) => {
    const cards = cols[i].map(buildCard).join('');
    col.innerHTML = cards + cards; // duplicate for seamless loop
  });
})();

/* ── FAQ ACCORDION ──────────────────────────────────────── */
(function initFaq() {
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq__item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq__answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();

/* ── CONTACT FORM ───────────────────────────────────────── */
(function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const submitBtn  = form.querySelector('.btn--submit');
  const btnText    = form.querySelector('.btn-text');
  const spinner    = form.querySelector('.btn-spinner');
  const successMsg = document.querySelector('.form-success');

  function validate() {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const err = field.parentElement.querySelector('.field-error') ||
                  field.closest('.form-group').querySelector('.field-error');
      const empty = !field.value.trim();
      field.classList.toggle('error', empty);
      if (err) err.textContent = empty ? 'This field is required.' : '';
      if (empty) valid = false;
    });
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value);
      if (!ok) {
        emailField.classList.add('error');
        const err = emailField.closest('.form-group').querySelector('.field-error');
        if (err) err.textContent = 'Please enter a valid email address.';
        valid = false;
      }
    }
    return valid;
  }

  // Inline validation on blur
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      const err = field.closest('.form-group').querySelector('.field-error');
      if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('error');
        if (err) err.textContent = 'This field is required.';
      } else {
        field.classList.remove('error');
        if (err) err.textContent = '';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    /* TODO: RGD — wire to AWS API Gateway endpoint (SES). Same setup as rossgriffithsdigital.ca.
       Replace the setTimeout block below with a real fetch() once the endpoint is live:
         fetch('https://YOUR-ENDPOINT.execute-api.ca-central-1.amazonaws.com/prod/contact', {
           method: 'POST',
           body: JSON.stringify(Object.fromEntries(new FormData(form))),
           headers: { 'Content-Type': 'application/json' }
         })
         .then(res => { if (!res.ok) throw new Error(); form.style.display='none'; successMsg&&successMsg.classList.add('visible'); })
         .catch(() => { submitBtn.disabled=false; submitBtn.classList.remove('loading'); const err=form.querySelector('.form-submit-error'); if(err) err.textContent='Something went wrong. Please call us directly.'; });
       Then delete the setTimeout below.
    */

    // DEMO MODE — shows success after a short delay; no real submission until AWS endpoint is wired
    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) successMsg.classList.add('visible');
    }, 700);
  });
})();
