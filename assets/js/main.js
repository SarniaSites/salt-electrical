/* SALT Electrical: site behaviour (vanilla JS, no dependencies)
   menu · header · reveals · hero power-up · services board · steps · festoon · form */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  document.documentElement.classList.add('js');
  requestAnimationFrame(function () { document.body.classList.add('is-ready'); });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Mobile menu ------------------------------------------------------- */
  var burger = $('#burger'), header = $('.site-header');
  function setMenu(open) {
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (burger) {
    burger.addEventListener('click', function () { setMenu(!header.classList.contains('menu-open')); });
    $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---- Header state + mobile bar --------------------------------------- */
  var mbar = $('#mbar'), contact = $('#contact');
  var contactVisible = false;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    if (mbar) mbar.classList.toggle('show', y > window.innerHeight * 0.6 && !contactVisible);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Active nav link --------------------------------------------------- */
  var navLinks = $$('.nav-link');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.target.id === 'contact') { contactVisible = en.isIntersecting; onScroll(); }
        if (!en.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { secObs.observe(s); });
  }

  /* ---- Reveals + one-shot "in" triggers ---------------------------------- */
  var inEls = $$('.reveal, .cable-draw, .steps, .festoon, .pendant');
  if (reduce || !('IntersectionObserver' in window)) {
    inEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    inEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Hero: power-up on load, main switch toggles ---------------------- */
  var scene = $('#scene'), sw = $('#mainSwitch');
  if (scene) {
    if (scene.getAttribute('data-start') === 'off') { if (sw) sw.setAttribute('aria-pressed', 'false'); }
    else if (reduce) { scene.classList.add('is-on'); }
    else { setTimeout(function () { scene.classList.add('is-on'); }, 650); }
    var toggle = function () {
      var on = scene.classList.contains('is-on');
      if (on) {
        scene.classList.add('is-off-quick');
        scene.classList.remove('is-on');
      } else {
        scene.classList.remove('is-off-quick');
        void scene.getBoundingClientRect();
        scene.classList.add('is-on');
      }
      sw.setAttribute('aria-pressed', on ? 'false' : 'true');
    };
    if (sw) {
      sw.addEventListener('click', toggle);
      sw.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    }
    // pause the ambient flow when the hero is off screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        scene.style.setProperty('animation-play-state', en[0].isIntersecting ? 'running' : 'paused');
        $$('.flow, .steam', scene).forEach(function (p) { p.style.animationPlayState = en[0].isIntersecting ? 'running' : 'paused'; });
      }).observe(scene);
    }
  }

  /* ---- Services board (tabs) -------------------------------------------- */
  var tabs = $$('#svcTabs [role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) {
        if (on) {
          panel.hidden = false;
          panel.classList.remove('svc-panel'); void panel.offsetWidth; panel.classList.add('svc-panel');
        } else { panel.hidden = true; }
      }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });
  // on phones, bring the panel into view after a switch is flicked
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      if (window.innerWidth >= 1024) return;
      var p = document.getElementById(t.getAttribute('aria-controls'));
      var r = p.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.75) window.scrollBy({ top: r.top - window.innerHeight * 0.45, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---- "Ask about…" buttons preselect the form ------------------------- */
  var select = $('#f-service');
  $$('[data-pick]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (select) { select.value = b.getAttribute('data-pick'); select.closest('.field').classList.remove('invalid'); }
    });
  });

  /* ---- Festoon: bulbs placed along the wire, in pixels ----------------- */
  var fest = $('#festoon');
  function drawFestoon() {
    if (!fest) return;
    var w = fest.clientWidth || window.innerWidth, h = 80;
    var ns = 'http://www.w3.org/2000/svg';
    fest.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    fest.setAttribute('preserveAspectRatio', 'xMidYMin meet');
    while (fest.firstChild) fest.removeChild(fest.firstChild);
    var sag = w < 700 ? 22 : 34, spans = w < 700 ? 2 : 4, seg = w / spans;
    var d = 'M0 10';
    for (var s = 0; s < spans; s++) d += ' Q' + (seg * s + seg / 2) + ' ' + (10 + sag * 2) + ' ' + (seg * (s + 1)) + ' 10';
    var wire = document.createElementNS(ns, 'path');
    wire.setAttribute('d', d); wire.setAttribute('fill', 'none'); wire.setAttribute('stroke', '#5f5b55'); wire.setAttribute('stroke-width', '2');
    fest.appendChild(wire);
    var len = wire.getTotalLength(), count = Math.max(6, Math.round(w / 90));
    for (var i = 1; i < count; i++) {
      var p = wire.getPointAtLength(len * i / count);
      var g = document.createElementNS(ns, 'g');
      g.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')');
      g.innerHTML = '<circle class="halo" cx="0" cy="13" r="13" fill="#ffd27d"/>' +
        '<path d="M0 0v4" stroke="#5f5b55" stroke-width="2"/>' +
        '<rect x="-3.5" y="3" width="7" height="5" rx="1" fill="#5f5b55"/>' +
        '<path class="bulb" d="M0 8c-4.5 0-6 3.5-6 6.2C-6 18 -3 20 0 20s6-2 6-5.8C6 11.5 4.5 8 0 8Z" stroke="#151515" stroke-width="1"/>';
      var delay = (reduce ? 0 : i * 0.09) + 's';
      g.querySelector('.bulb').style.transitionDelay = delay;
      g.querySelector('.halo').style.transitionDelay = delay;
      fest.appendChild(g);
    }
  }
  drawFestoon();
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawFestoon, 150); });

  /* ---- Form: inline validation + sending state ------------------------- */
  var form = $('#quoteForm');
  if (form) {
    var fields = $$('input[required], select[required], textarea[required]', form);
    var check = function (el) {
      var ok = el.checkValidity() && String(el.value).trim() !== '';
      el.closest('.field').classList.toggle('invalid', !ok);
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    };
    fields.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('invalid')) check(el); });
      el.addEventListener('change', function () { check(el); });
    });
    form.addEventListener('submit', function (e) {
      var bad = fields.filter(function (el) { return !check(el); });
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      var btn = $('#sendBtn');
      btn.classList.add('is-sending'); btn.disabled = true;
      $('.send-label', btn).textContent = 'Sending…';
    });
  }
})();
