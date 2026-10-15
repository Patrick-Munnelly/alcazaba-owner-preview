/* Alcazaba Beach · Owners' area mockup
   - EN/ES language switch (remembered across pages)
   - Tabs on the Documents page
   - "More" menu on phones
   - Coming-soon page content */
(function () {
  'use strict';

  var STORAGE_KEY = 'alcazaba-lang';
  var ES = (window.ALCAZABA_I18N && window.ALCAZABA_I18N.es) || {};

  /* ---------- Helpers ---------- */
  function params() {
    return new URLSearchParams(window.location.search);
  }

  function readStoredLang() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function storeLang(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked: the URL still carries the language */ }
  }

  function currentLang() {
    var fromUrl = params().get('lang');
    if (fromUrl === 'es' || fromUrl === 'en') return fromUrl;
    var stored = readStoredLang();
    return stored === 'es' ? 'es' : 'en';
  }

  /* ---------- Coming-soon page ---------- */
  var SOON_PAGES = {
    orders: { icon: 'i-bag', title: 'Orders from the office', text: 'Request items from the office here. You pay in the office, as you do today.' },
    restaurant: { icon: 'i-utensils', title: 'Restaurant bookings', text: 'Request a table at the restaurant and see the status of your bookings.' },
    account: { icon: 'i-user', title: 'Your account', text: 'Update your contact details, password and notification settings.' },
    app: { icon: 'i-phone', title: 'The Alcazaba Beach app', text: 'Download links for iPhone and Android will go here.' },
    download: { icon: 'i-download', title: 'Document download', text: 'On the live site this opens or downloads the PDF.' },
    archive: { icon: 'i-doc', title: 'Document archive', text: 'Older newsletters and AGM papers, organised by year.' },
    conversation: { icon: 'i-chat', title: 'Past conversation', text: 'Your earlier conversations with the office will open here.' },
    forgot: { icon: 'i-user', title: 'Reset your password', text: 'Enter your email and we will send you a link to choose a new password.' }
  };

  function setupComingSoon() {
    var title = document.getElementById('soon-title');
    if (!title) return;
    var p = params();
    var key = p.get('page');
    if (!SOON_PAGES[key]) key = 'default';
    var info = SOON_PAGES[key] || { icon: 'i-tools', title: 'Coming soon', text: 'This screen is part of the next design round.' };

    var text = document.getElementById('soon-text');
    var icon = document.getElementById('soon-icon');
    title.textContent = info.title;
    title.setAttribute('data-i18n', 'soon.' + key + '.title');
    text.textContent = info.text;
    text.setAttribute('data-i18n', 'soon.' + key + '.text');
    if (icon) icon.setAttribute('href', '#' + info.icon);

    var titleTag = document.querySelector('title');
    titleTag.textContent = info.title + ' · Alcazaba Beach';
    titleTag.setAttribute('data-i18n', 'soon.' + key + '.pageTitle');

    // Pages reached before signing in: hide the owners' navigation.
    if (key === 'forgot' || p.get('from') === 'login') {
      document.body.classList.add('is-public');
      var home = document.getElementById('soon-home');
      if (home) {
        home.setAttribute('href', 'index.html');
        var label = home.querySelector('[data-i18n]');
        label.textContent = 'Back to sign in';
        label.setAttribute('data-i18n', 'soon.backToSignIn');
      }
    }

    var back = document.getElementById('soon-back');
    if (back) {
      back.addEventListener('click', function () {
        if (window.history.length > 1) window.history.back();
        else window.location.href = 'home.html';
      });
    }
  }

  /* ---------- Language ---------- */
  function rememberEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.textContent);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      if (!el.hasAttribute('data-en-placeholder')) el.setAttribute('data-en-placeholder', el.getAttribute('placeholder') || '');
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      if (!el.hasAttribute('data-en-aria-label')) el.setAttribute('data-en-aria-label', el.getAttribute('aria-label') || '');
    });
  }

  function translate(key, english, lang) {
    if (lang === 'es' && Object.prototype.hasOwnProperty.call(ES, key)) return ES[key];
    return english;
  }

  // Keep the language when moving between pages, even where browsers
  // don't share storage between local files.
  function updateLinks(lang) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('data-href') || a.getAttribute('href');
      if (!/\.html(\?|#|$)/.test(href) || /^[a-z]+:/i.test(href)) return;
      if (!a.hasAttribute('data-href')) a.setAttribute('data-href', href);
      var hashIndex = href.indexOf('#');
      var hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
      var rest = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
      var qIndex = rest.indexOf('?');
      var path = qIndex >= 0 ? rest.slice(0, qIndex) : rest;
      var query = new URLSearchParams(qIndex >= 0 ? rest.slice(qIndex + 1) : '');
      if (lang === 'es') query.set('lang', 'es'); else query.delete('lang');
      var qs = query.toString();
      a.setAttribute('href', path + (qs ? '?' + qs : '') + hash);
    });
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = translate(el.getAttribute('data-i18n'), el.getAttribute('data-en'), lang);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', translate(el.getAttribute('data-i18n-placeholder'), el.getAttribute('data-en-placeholder'), lang));
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      el.setAttribute('aria-label', translate(el.getAttribute('data-i18n-aria-label'), el.getAttribute('data-en-aria-label'), lang));
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    updateLinks(lang);
  }

  function setupLangToggle() {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        storeLang(lang);
        applyLang(lang);
        // Keep the address bar in step so a refresh keeps the language.
        try {
          var url = new URL(window.location.href);
          if (lang === 'es') url.searchParams.set('lang', 'es'); else url.searchParams.delete('lang');
          window.history.replaceState(null, '', url.toString());
        } catch (e) { /* not supported: language still applied */ }
      });
    });
  }

  /* ---------- Tabs ---------- */
  function setupTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(function (list) {
      var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab, false); });
        tab.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            var next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
            select(tabs[next], true);
          }
        });
      });

      var wanted = params().get('tab');
      var initial = tabs.filter(function (t) { return t.getAttribute('data-tab') === wanted; })[0] || tabs[0];
      select(initial, false);
    });
  }

  /* ---------- "More" menu on phones ---------- */
  function setupMoreMenu() {
    var toggle = document.querySelector('[data-more-toggle]');
    var sheet = document.getElementById('more-sheet');
    if (!toggle || !sheet) return;

    function setOpen(open) {
      sheet.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(sheet.hidden);
      if (!sheet.hidden) {
        var first = sheet.querySelector('a');
        if (first) first.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!sheet.hidden && !sheet.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !sheet.hidden) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- Active navigation ---------- */
  function markCurrentNav() {
    var current = document.body.getAttribute('data-page');
    if (!current) return;
    document.querySelectorAll('[data-nav]').forEach(function (el) {
      if (el.getAttribute('data-nav') === current) el.setAttribute('aria-current', 'page');
    });
  }

  /* ---------- Start ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var soonPage = params().get('page');
    if (soonPage === 'orders' || soonPage === 'restaurant') document.body.setAttribute('data-page', soonPage);
    markCurrentNav();
    setupComingSoon();
    rememberEnglish();
    setupLangToggle();
    setupTabs();
    setupMoreMenu();
    applyLang(currentLang());
  });
})();
