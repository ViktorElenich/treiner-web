(function () {
  'use strict';

  // ===== CONFIG =====
  const CONFIG = {
    navHeight: 72,
    revealThreshold: 0.15,
    counterDuration: 2,
    cursorLerp: 0.12,
    magneticStrength: 0.3,

    // URL бота на Render
    webhookUrl: 'https://treiner-bot.onrender.com',
  };

  // ===== UTILS =====
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Санитизация ввода — удаляет HTML-теги и ограничивает длину
  function sanitize(str, maxLen = 200) {
    return str.replace(/<[^>]*>/g, '').trim().slice(0, maxLen);
  }

  const isTouchDevice = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== REGISTER GSAP PLUGINS =====
  gsap.registerPlugin(ScrollTrigger);

  // ===== LENIS SMOOTH SCROLL =====
  let lenis;

  function initLenis() {
    if (prefersReducedMotion) return;

    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // ===== PRELOADER =====
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      const tl = gsap.timeline();
      tl.to('.preloader-spinner', {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
        .to('.preloader-text', {
          opacity: 0,
          y: -10,
          duration: 0.3,
        }, '-=0.2')
        .to(preloader, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            document.body.style.overflow = '';
            initHeroAnimations();
          },
        });
    });
  }

  // ===== HERO ANIMATIONS =====
  function initHeroAnimations() {
    if (prefersReducedMotion) return;

    // Split hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && typeof SplitType !== 'undefined') {
      const split = new SplitType(heroTitle, { types: 'chars, words' });

      gsap.from(split.chars, {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.2,
      });
    }

    // Hero elements
    gsap.from('.hero-label', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.6,
      ease: 'power3.out',
    });

    gsap.from('.hero-buttons', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.hero-stats', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 1,
      ease: 'power3.out',
    });

    gsap.from('.hero-image-wrapper', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out',
    });

    // Hero parallax
    gsap.to('.hero-glow--1', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -100,
      opacity: 0.02,
    });

    gsap.to('.hero-glow--2', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -60,
      x: 40,
    });
  }

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    if (prefersReducedMotion) return;

    // Section titles with SplitType
    document.querySelectorAll('.section-title.split-text').forEach((title) => {
      if (title.closest('.hero')) return; // Hero handled separately

      if (typeof SplitType !== 'undefined') {
        const split = new SplitType(title, { types: 'chars, words' });

        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power4.out',
        });
      }
    });

    // Lead title
    const leadTitle = document.querySelector('.lead-title.split-text');
    if (leadTitle && typeof SplitType !== 'undefined') {
      const split = new SplitType(leadTitle, { types: 'chars, words' });
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: leadTitle,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: 'power4.out',
      });
    }

    // Section labels
    gsap.utils.toArray('.section-label').forEach((el) => {
      if (el.closest('.hero')) return;
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power3.out',
      });
    });

    // Section subtitles
    gsap.utils.toArray('.section-subtitle').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
      });
    });

    // Pain cards - staggered
    gsap.from('.pain-card', {
      scrollTrigger: {
        trigger: '.pain-grid',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // About section
    gsap.from('.about-visual', {
      scrollTrigger: { trigger: '.about-inner', start: 'top 75%' },
      opacity: 0,
      x: -60,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.about-content', {
      scrollTrigger: { trigger: '.about-inner', start: 'top 75%' },
      opacity: 0,
      x: 60,
      duration: 1,
      ease: 'power3.out',
    });

    // Service cards - staggered
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Online cards - staggered
    gsap.fromTo('.online-card:not(.hidden)',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.online-grid',
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );

    // Process steps - staggered
    gsap.from('.process-step', {
      scrollTrigger: {
        trigger: '.process-steps',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    });

    // Lead section
    gsap.from('.lead-left', {
      scrollTrigger: { trigger: '.lead-inner', start: 'top 75%' },
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.lead-right', {
      scrollTrigger: { trigger: '.lead-inner', start: 'top 75%' },
      opacity: 0,
      x: 40,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
    });

    // Review cards
    gsap.from('.review-card', {
      scrollTrigger: {
        trigger: '.reviews-swiper',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // FAQ section
    gsap.from('.faq-left', {
      scrollTrigger: { trigger: '.faq-inner', start: 'top 75%' },
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-list',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Consultation box
    gsap.from('.consultation-box', {
      scrollTrigger: { trigger: '.consultation-box', start: 'top 80%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Results strip
    gsap.from('.results-stat', {
      scrollTrigger: {
        trigger: '.results-strip',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }

  // ===== NAVIGATION =====
  function initNav() {
    const nav = document.getElementById('nav');
    let lastScrollY = 0;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Scrolled state
          if (currentScrollY > 60) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }

          // Hide on scroll down, show on scroll up (with 15px threshold)
          const scrollDelta = currentScrollY - lastScrollY;
          if (scrollDelta > 5 && currentScrollY > CONFIG.navHeight * 2) {
            nav.classList.add('hidden');
            lastScrollY = currentScrollY;
          } else if (scrollDelta < -15) {
            nav.classList.remove('hidden');
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Nav transition
    gsap.set(nav, { transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' });
  }

  // ===== MOBILE MENU =====
  function initMobileMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');
    const links = menu.querySelectorAll('.mobile-menu-link');

    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
      const isOpen = menu.classList.contains('active');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    function openMenu() {
      burger.classList.add('active');
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Stagger links with GSAP
      gsap.from(links, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
      });
    }

    function closeMenu() {
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ===== SMOOTH SCROLL (anchor links) =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const offset = CONFIG.navHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        if (lenis) {
          lenis.scrollTo(top, { duration: 1.2 });
        } else {
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ===== FAQ ACCORDION =====
  function initAccordion() {
    const items = document.querySelectorAll('.faq-item');

    items.forEach((item) => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');

        // Close all
        items.forEach((i) => {
          i.classList.remove('open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked (if was closed)
        if (!wasOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ===== FORMS =====
  function initForms() {
    // Lead form
    const leadForm = document.getElementById('leadForm');
    const leadSuccess = document.getElementById('leadSuccess');

    if (leadForm) {
      leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm(leadForm)) return;

        // Собираем и санитизируем данные формы
        const formData = {
          name: sanitize(leadForm.querySelector('[name="name"]').value, 100),
          phone: sanitize(leadForm.querySelector('[name="phone"]').value, 30),
        };

        // Отправляем на сервер бота (если URL настроен)
        if (CONFIG.webhookUrl) {
          try {
            await fetch(CONFIG.webhookUrl + '/api/lead', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
          } catch (err) {
            // Не блокируем показ success-сообщения при ошибке сети
            console.warn('Не удалось отправить заявку:', err);
          }
        }

        leadForm.style.display = 'none';
        leadSuccess.classList.add('visible');
      });
    }

    // Consultation form
    const consultForm = document.getElementById('consultationForm');
    const consultSuccess = document.getElementById('consultationSuccess');

    if (consultForm) {
      consultForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm(consultForm)) return;

        // Собираем и санитизируем данные формы
        const formData = {
          name: sanitize(consultForm.querySelector('[name="name"]').value, 100),
          phone: sanitize(consultForm.querySelector('[name="phone"]').value, 30),
          direction: sanitize(consultForm.querySelector('[name="direction"]').value, 50),
          goal: sanitize(consultForm.querySelector('[name="goal"]')?.value || '', 300),
        };

        // Отправляем на сервер бота (если URL настроен)
        if (CONFIG.webhookUrl) {
          try {
            await fetch(CONFIG.webhookUrl + '/api/consultation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
          } catch (err) {
            console.warn('Не удалось отправить заявку:', err);
          }
        }

        consultForm.style.display = 'none';
        consultSuccess.classList.add('visible');
      });
    }
  }

  function validateForm(form) {
    let valid = true;
    const inputs = form.querySelectorAll('[required]');

    inputs.forEach((input) => {
      removeError(input);

      if (!input.value.trim()) {
        showError(input, 'Заполните это поле');
        valid = false;
      } else if (input.type === 'tel' && input.value.trim().length < 5) {
        showError(input, 'Введите корректный номер');
        valid = false;
      }
    });

    return valid;
  }

  function showError(input, message) {
    input.style.borderColor = 'var(--red)';
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('form-error')) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      input.parentNode.insertBefore(errorEl, input.nextSibling);
    }
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  function removeError(input) {
    input.style.borderColor = '';
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('form-error')) {
      errorEl.style.display = 'none';
    }
  }

  // ===== NUMBER COUNTERS =====
  function initCounters() {
    if (prefersReducedMotion) return;

    // Hero stats
    document.querySelectorAll('.hero-stat-number').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      gsap.to(el, {
        textContent: target,
        duration: CONFIG.counterDuration,
        snap: { textContent: 1 },
        ease: 'power1.out',
        delay: 1.2,
      });
    });

    // Results stats
    document.querySelectorAll('.results-stat-number').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      gsap.to(el, {
        scrollTrigger: {
          trigger: el.closest('.results-strip'),
          start: 'top 85%',
        },
        textContent: target,
        duration: CONFIG.counterDuration,
        snap: { textContent: 1 },
        ease: 'power1.out',
      });
    });
  }

  // ===== SCROLL PROGRESS BAR =====
  function initScrollProgress() {
    if (prefersReducedMotion) return;

    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }

  // ===== FLOATING CTA =====
  function initFloatingCTA() {
    const floatCta = document.getElementById('floatCta');
    if (!floatCta) return;

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 80%',
      onEnterBack: () => floatCta.classList.remove('visible'),
      onLeave: () => floatCta.classList.add('visible'),
    });

    // Hide near consultation section
    ScrollTrigger.create({
      trigger: '#consultation',
      start: 'top 80%',
      end: 'bottom top',
      onEnter: () => floatCta.classList.remove('visible'),
      onLeaveBack: () => floatCta.classList.add('visible'),
    });
  }

  // ===== SWIPER =====
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    new Swiper('.reviews-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoHeight: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  // ===== CUSTOM CURSOR =====
  function initCustomCursor() {
    if (isTouchDevice || prefersReducedMotion) return;

    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');

    if (!cursor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // Show cursor
    gsap.set([cursor, ring], { opacity: 1 });

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Cursor follows immediately
      gsap.set(cursor, {
        x: mouseX - 6,
        y: mouseY - 6,
      });
    });

    // Ring follows with delay
    function animateRing() {
      ringX = lerp(ringX, mouseX - 20, CONFIG.cursorLerp);
      ringY = lerp(ringY, mouseY - 20, CONFIG.cursorLerp);

      gsap.set(ring, {
        x: ringX,
        y: ringY,
      });

      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, input, select, textarea, .btn, .service-card, .pain-card');

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        gsap.to(ring, { scale: 1.5, opacity: 0.5, duration: 0.3 });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      });
    });
  }

  // ===== MAGNETIC BUTTONS =====
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;

    document.querySelectorAll('.btn--magnetic').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });

      // Reduce strength for buttons inside hero to prevent overlap
      const isHeroBtn = btn.closest('.hero-buttons');
      const strength = isHeroBtn ? 0.15 : CONFIG.magneticStrength;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        xTo(x * strength);
        yTo(y * strength);
      });

      btn.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  // ===== EXIT INTENT POPUP =====
  function initExitIntent() {
    const popup = document.getElementById('exitPopup');
    const closeBtn = document.getElementById('popupClose');
    const ctaBtn = document.getElementById('popupCta');

    if (!popup) return;

    // Only show once per session
    if (sessionStorage.getItem('exitPopupShown')) return;

    const showPopup = () => {
      popup.classList.add('visible');
      sessionStorage.setItem('exitPopupShown', 'true');
      document.removeEventListener('mouseleave', onMouseLeave);
    };

    const hidePopup = () => {
      popup.classList.remove('visible');
    };

    const onMouseLeave = (e) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Only on desktop
    if (!isTouchDevice) {
      // Delay activation by 10 seconds
      setTimeout(() => {
        document.addEventListener('mouseleave', onMouseLeave);
      }, 10000);
    }

    if (closeBtn) closeBtn.addEventListener('click', hidePopup);
    if (ctaBtn) ctaBtn.addEventListener('click', hidePopup);

    popup.addEventListener('click', (e) => {
      if (e.target === popup) hidePopup();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hidePopup();
    });
  }

  // ===== COOKIE CONSENT =====
  function initCookieConsent() {
    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('cookieAccept');

    if (!banner || !acceptBtn) return;

    if (localStorage.getItem('cookiesAccepted')) return;

    // Show after delay
    setTimeout(() => {
      banner.classList.add('visible');
    }, 2000);

    acceptBtn.addEventListener('click', () => {
      banner.classList.remove('visible');
      localStorage.setItem('cookiesAccepted', 'true');
    });
  }

  // ===== BACK TO TOP =====
  function initBackToTop() {
    // The floating CTA handles this implicitly, but we add scroll-to-top on logo click
    document.querySelectorAll('.nav-logo, .footer-logo').forEach((logo) => {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.5 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  // ===== PARALLAX =====
  function initParallax() {
    if (prefersReducedMotion || isTouchDevice) return;

    // About experience badge
    gsap.to('.about-experience', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -30,
    });

    // Hero badge
    gsap.to('.hero-badge', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -20,
    });

    // Process numbers
    gsap.utils.toArray('.process-number').forEach((num) => {
      gsap.to(num, {
        scrollTrigger: {
          trigger: num.closest('.process-step'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -15,
        opacity: 0.3,
      });
    });
  }


  // ===== ENROLLMENT (набор на онлайн-программы) =====
  function initEnrollment() {
    const MONTHS_RU = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    function getEnrollmentStatus() {
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth();
      const year = now.getFullYear();

      // Набор открыт: с 20-го числа текущего месяца по 3-е следующего
      const isOpen = day >= 20 || day <= 3;

      if (isOpen) {
        // Считаем дату закрытия (3-е следующего месяца, 23:59)
        let closeDate;
        if (day >= 20) {
          // Сейчас 20-31 — закрытие 3-го следующего месяца
          closeDate = new Date(year, month + 1, 3, 23, 59, 59);
        } else {
          // Сейчас 1-3 — закрытие 3-го текущего месяца
          closeDate = new Date(year, month, 3, 23, 59, 59);
        }
        const daysLeft = Math.max(0, Math.ceil((closeDate - now) / (1000 * 60 * 60 * 24)));

        // Название месяца, на который идёт набор
        let targetMonth;
        if (day >= 20) {
          targetMonth = MONTHS_RU[(month + 1) % 12];
        } else {
          targetMonth = MONTHS_RU[month];
        }

        return { isOpen: true, daysLeft, targetMonth, closeDate };
      } else {
        // Набор закрыт — следующий откроется 20-го текущего месяца
        const openDate = new Date(year, month, 20);
        const nextMonth = MONTHS_RU[(month + 1) % 12];
        return { isOpen: false, openDay: 20, openMonth: MONTHS_RU[month], nextMonth };
      }
    }

    const status = getEnrollmentStatus();

    // === Hero banner ===
    const banner = document.getElementById('enrollmentBanner');
    const bannerIcon = document.getElementById('enrollmentIcon');
    const bannerText = document.getElementById('enrollmentText');

    if (banner) {
      if (status.isOpen) {
        banner.className = 'enrollment-banner enrollment-banner--open';
        bannerIcon.textContent = '\uD83D\uDD25';
        bannerText.textContent = status.daysLeft === 0
          ? 'Набор открыт \u2014 последний день!'
          : 'Набор открыт \u2014 ещё ' + status.daysLeft + ' ' + pluralDays(status.daysLeft);
      } else {
        banner.className = 'enrollment-banner enrollment-banner--closed';
        bannerIcon.textContent = '\u23F3';
        bannerText.textContent = 'Набор с 20 ' + status.openMonth;
      }
    }

    // === Online section status ===
    const enrollStatus = document.getElementById('enrollmentStatus');
    const statusIcon = document.getElementById('enrollmentStatusIcon');
    const statusMessage = document.getElementById('enrollmentStatusMessage');

    if (enrollStatus) {
      if (status.isOpen) {
        enrollStatus.className = 'enrollment-status enrollment-status--open';
        statusIcon.textContent = '\uD83D\uDD25';
        statusMessage.textContent = status.daysLeft === 0
          ? 'Набор открыт \u2014 последний день!'
          : 'Набор открыт \u2014 ещё ' + status.daysLeft + ' ' + pluralDays(status.daysLeft);
      } else {
        enrollStatus.className = 'enrollment-status enrollment-status--closed';
        statusIcon.textContent = '\uD83D\uDD12';
        statusMessage.textContent = 'Набор закрыт \u2014 следующий с 20 ' + status.openMonth;
      }
    }

    // === Кнопки тарифов: Выбрать / Записаться в лист ожидания ===
    const ctaButtons = document.querySelectorAll('.online-cta-btn');

    if (!status.isOpen) {
      // Набор закрыт — кнопки ведут в бота для записи в вейтлист
      ctaButtons.forEach(function(btn) {
        btn.textContent = 'Записаться в лист ожидания \u2192';
        btn.href = 'https://t.me/viktortreiner_bot?start=waitlist';
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener');
        btn.classList.add('online-cta--waitlist');
      });
    }

    function pluralDays(n) {
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return 'день';
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'дня';
      return 'дней';
    }
  }

  // ===== BOOTSTRAP =====
  document.addEventListener('DOMContentLoaded', () => {
    // Prevent scroll during preload
    document.body.style.overflow = 'hidden';

    initLenis();
    initPreloader();
    initNav();
    initMobileMenu();
    initSmoothScroll();
    initAccordion();
    initEnrollment();
    initForms();
    initScrollReveal();
    initCounters();
    initScrollProgress();
    initFloatingCTA();
    initSwiper();
    initCustomCursor();
    initMagneticButtons();
    initParallax();
    initBackToTop();
    initExitIntent();
    initCookieConsent();
  });
})();
