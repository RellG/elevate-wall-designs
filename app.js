/* Elevate Wall Designs — interactions */
(() => {
  'use strict';

  /* Year */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Sticky nav scroll state */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 80) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile drawer */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const drawerClose = document.getElementById('drawerClose');
  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  burger?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* Scroll reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Gallery filter */
  const chips = document.querySelectorAll('.chip');
  const tiles = document.querySelectorAll('#gallery .gallery__tile');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    tiles.forEach(t => {
      const cats = (t.dataset.cat || '').split(' ');
      t.classList.toggle('is-hidden', f !== 'all' && !cats.includes(f));
    });
  }));

  /* Lightbox */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');
  const lbClose = document.getElementById('lightboxClose');
  const openLightbox = (tile) => {
    lbImg.src = tile.dataset.full;
    lbImg.alt = tile.dataset.title || '';
    lbCap.textContent = `${tile.dataset.title || ''} — ${tile.dataset.meta || ''}`;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };
  const closeLightbox = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  };
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  tiles.forEach(t => {
    if (t.classList.contains('gallery__tile--video')) {
      const v = t.querySelector('video');
      t.style.cursor = 'pointer';
      t.addEventListener('click', () => {
        if (!v) return;
        if (v.paused) { v.play(); t.classList.add('is-playing'); }
        else { v.pause(); t.classList.remove('is-playing'); }
      });
      v?.addEventListener('ended', () => t.classList.remove('is-playing'));
      if (t.classList.contains('gallery__tile--featured') && !prefersReducedMotion && v) {
        const playWhenVisible = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) { v.play().catch(() => {}); t.classList.add('is-playing'); }
            else { v.pause(); }
          });
        }, { threshold: 0.4 });
        playWhenVisible.observe(t);
      }
    } else {
      t.addEventListener('click', () => openLightbox(t));
    }
  });
  lbClose?.addEventListener('click', closeLightbox);
  lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLightbox(); });

  /* Before / After drag slider */
  const ba = document.getElementById('ba');
  if (ba) {
    const after = ba.querySelector('.ba__after');
    const handle = ba.querySelector('.ba__handle');
    const grip = ba.querySelector('.ba__grip');
    let dragging = false;
    const set = (pct) => {
      const v = Math.max(2, Math.min(98, pct));
      after.style.clipPath = `inset(0 0 0 ${v}%)`;
      handle.style.left = `${v}%`;
      grip.style.left = `${v}%`;
    };
    const moveFromEvent = (e) => {
      const rect = ba.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      set(pct);
    };
    const start = (e) => { dragging = true; moveFromEvent(e); };
    const end = () => { dragging = false; };
    const move = (e) => { if (dragging) moveFromEvent(e); };
    ba.addEventListener('mousedown', start);
    ba.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
    /* slow auto-tease on first view */
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let t = 50, dir = 1;
      const teaseIo = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const id = setInterval(() => {
            t += dir * 0.6;
            if (t > 62) dir = -1;
            if (t < 38) { clearInterval(id); set(50); return; }
            set(t);
          }, 18);
          teaseIo.disconnect();
        }
      }, { threshold: 0.4 });
      teaseIo.observe(ba);
    }
  }

  /* Form (mock submit) */
  const form = document.getElementById('leadForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = 'Sent ✓';
    btn.disabled = true;
    btn.style.background = 'var(--champagne)';
    btn.style.borderColor = 'var(--champagne)';
    btn.style.color = 'var(--ink)';
    setTimeout(() => {
      form.reset();
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.cssText = '';
    }, 2600);
  });

  /* Smooth-scroll offset for fixed nav */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
