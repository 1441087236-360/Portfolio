// /*==================== MENU SHOW Y HIDDEN ====================*/
// const navMenu = document.getElementById('nav-menu'),
//       navToggle = document.getElementById('nav-toggle'),
//       navClose = document.getElementById('nav-close')


// /*===== MENU SHOW =====*/
// /* Validate if constant exists */
// if(navToggle){
//     navToggle.addEventListener('click', () => {
//         navMenu.classList.add('show-menu')
//     })
// }


// /*===== MENU HIDDEN =====*/
// /* Validate if constant exists */
// if(navClose){
//     navClose.addEventListener('click', () => {
//         navMenu.classList.remove('show-menu')
//     })
// }

// /*==================== REMOVE MENU MOBILE ====================*/
// const navLink = document.querySelectorAll('.nav__link')
// function linkAction(){
//     // When we click on each nav__link, we remove the show-menu class
//     navMenu.classList.remove('show-menu')
// }
// navLink.forEach(n => n.addEventListener('click', linkAction))

(function () {
  // tiny helpers that work even on old browsers
  function on(el, evt, fn) {
    if (!el) return;
    if (el.addEventListener) el.addEventListener(evt, fn, false);
    else if (el.attachEvent) el.attachEvent('on' + evt, fn);
  }

  function hasClass(el, cls) {
    if (!el) return false;
    if (el.classList) return el.classList.contains(cls);
    return (' ' + (el.className || '') + ' ').indexOf(' ' + cls + ' ') > -1;
  }
  function addClass(el, cls) {
    if (!el) return;
    if (el.classList) el.classList.add(cls);
    else if (!hasClass(el, cls)) el.className = (el.className ? el.className + ' ' : '') + cls;
  }
  function removeClass(el, cls) {
    if (!el) return;
    if (el.classList) el.classList.remove(cls);
    else el.className = (' ' + (el.className || '') + ' ').replace(' ' + cls + ' ', ' ').trim();
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else on(document, 'DOMContentLoaded', fn);
  }

  ready(function () {
    var navMenu = document.getElementById('nav-menu');
    var navToggle = document.getElementById('nav-toggle');
    var navClose = document.getElementById('nav-close');

    if (navToggle && navMenu) {
      on(navToggle, 'click', function () { addClass(navMenu, 'show-menu'); });
    }
    if (navClose && navMenu) {
      on(navClose, 'click', function () { removeClass(navMenu, 'show-menu'); });
    }

    // querySelectorAll exists in IE8+ (partial) / IE9+, fall back to getElementsByClassName if needed
    var navLinks = document.querySelectorAll ? document.querySelectorAll('.nav__link') :
                   (document.getElementsByClassName ? document.getElementsByClassName('nav__link') : []);

    for (var i = 0; navLinks && i < navLinks.length; i++) {
      (function (link) {
        on(link, 'click', function () {
          removeClass(navMenu, 'show-menu');
        });
      })(navLinks[i]);
    }
  });
})();



// ===================== NAVBORDERS ====================*/

(() => {
  const bottomBorder = document.getElementById('bottomBorder');
  // configurable idle timeout (ms)
  const IDLE_TIMEOUT = 750;

  let isActive = false;
  let idleTimer = null;

  function setActive(on) {
    if (on === isActive) return;
    isActive = on;
    if (isActive) bottomBorder.classList.add('bb-active');
    else bottomBorder.classList.remove('bb-active');
  }

  function onActivity() {
    // show border
    setActive(true);
    // reset idle timer
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => setActive(false), IDLE_TIMEOUT);
  }

  // listen for common scroll-like inputs
  window.addEventListener('wheel', onActivity, {passive:true});
  window.addEventListener('touchmove', onActivity, {passive:true});
  window.addEventListener('scroll', onActivity, {passive:true});
  window.addEventListener('keydown', (e) => {
    // some keys that indicate intent to scroll/navigate
    const keys = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End','Space'];
    if (keys.includes(e.key)) onActivity();
  });
})();

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')
function toggleSkills(){
    let itemClass = this.parentNode.className
    for(let i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}
skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})


/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})
modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})
/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
      cssMode: true,
      loop: true,

      pagination: {
        el: ".panel1-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiperNext",
        prevEl: ".swiperPrev",
      }
      
     
    });


const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");

    const swiperGrid = new Swiper(".swiperGrid", {
    slidesPerView: 2,
    grid: {
        rows: 2,
    },
    spaceBetween: 30,
    slidesPerGroup: 1,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".panel2-pagination",
        type: "progressbar",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiperNext1",
        prevEl: ".swiperPrev1",
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
        if (progressCircle) {
            progressCircle.style.setProperty("--progress", 1 - progress);
        }
        if (progressContent) {
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
        },
    },
    });


// (function() {
//   // selectors for your existing elements
//   const swiperEl = document.querySelector('.swiperGrid');          // the visible slider
//   const prevBtn  = document.querySelector('.swiperPrev1');      // existing prev button
//   const nextBtn  = document.querySelector('.swiperNext1');      // existing next button
//   if (!swiperEl || !prevBtn || !nextBtn) return;

//   // move them to body so they are not clipped
//   prevBtn.classList.add('floating-swiper-nav', 'prev');
//   nextBtn.classList.add('floating-swiper-nav', 'next');
//   document.body.appendChild(prevBtn);
//   document.body.appendChild(nextBtn);

//   // how far outside the slider edges you want them (px)
//   const OUTER_OFFSET = 28;

//   // position function (uses bounding rect of slider)
//   function positionNav() {
//     const r = swiperEl.getBoundingClientRect();
//     const btnW = prevBtn.offsetWidth; // assumed same for both
//     // vertical center
//     const top = r.top + r.height / 2;

//     // prev: left of slider minus offset (negative effect relative to slider edge)
//     prevBtn.style.top = `${top}px`;
//     prevBtn.style.left = `${r.left - OUTER_OFFSET - btnW}px`;

//     // next: right of slider plus offset
//     nextBtn.style.top = `${top}px`;
//     nextBtn.style.left = `${r.right + OUTER_OFFSET}px`;
//   }

//   // throttle with rAF
//   let rafId = null;
//   function schedulePosition() {
//     if (rafId) cancelAnimationFrame(rafId);
//     rafId = requestAnimationFrame(() => {
//       positionNav();
//       rafId = null;
//     });
//   }

//   // initial position
//   positionNav();

//   // reposition on scroll / resize / orientation changes
//   window.addEventListener('resize', schedulePosition, { passive: true });
//   window.addEventListener('scroll', schedulePosition, { passive: true });
//   window.addEventListener('orientationchange', schedulePosition, { passive: true });

//   // Also re-position after images load in slider (if needed)
//   window.addEventListener('load', schedulePosition);

//   // If you init Swiper *after* moving DOM nodes, pass their selectors as usual:
//   // const swiper = new Swiper('.mySwiper', {
//   //   navigation: { nextEl: '.swiperNext1', prevEl: '.swiperPrev1' },
//   //   ...
//   // });
// })();

// (function () {
//   const BREAKPOINT = 1025; // desktop >= 768px (change if you want)
//   const swiperEl = document.querySelector('.swiperGrid');
//   const prevBtn  = document.querySelector('.swiperPrev1');
//   const nextBtn  = document.querySelector('.swiperNext1');
//   if (!swiperEl || !prevBtn || !nextBtn) return;

//   // remember original locations to restore on small screens
//   const prevOriginal = { parent: prevBtn.parentNode, nextSibling: prevBtn.nextSibling };
//   const nextOriginal = { parent: nextBtn.parentNode, nextSibling: nextBtn.nextSibling };

//   let isFloating = false;
//   let rafId = null;
//   const OUTER_OFFSET = 28; // px outside the slider; tweak to taste

//   function positionNav() {
//     const r = swiperEl.getBoundingClientRect();
//     const btnW = prevBtn.offsetWidth || 44;
//     const top = r.top + r.height / 2;

//     prevBtn.style.top  = `${top+17}px`;
//     prevBtn.style.left = `${r.left - OUTER_OFFSET - btnW}px`;

//     nextBtn.style.top  = `${top+17}px`;
//     nextBtn.style.left = `${r.right + OUTER_OFFSET}px`;
//   }

//   function schedulePosition() {
//     if (rafId) cancelAnimationFrame(rafId);
//     rafId = requestAnimationFrame(() => {
//       positionNav();
//       rafId = null;
//     });
//   }

//   function makeFloating() {
//     if (isFloating) return;
//     // add class for styling
//     prevBtn.classList.add('floating-swiper-nav', 'prev');
//     nextBtn.classList.add('floating-swiper-nav', 'next');
//     // move to body so they aren't clipped
//     document.body.appendChild(prevBtn);
//     document.body.appendChild(nextBtn);
//     // initial position + listeners
//     schedulePosition();
//     window.addEventListener('resize', schedulePosition, { passive: true });
//     window.addEventListener('scroll', schedulePosition, { passive: true });
//     window.addEventListener('orientationchange', schedulePosition, { passive: true });
//     isFloating = true;
//   }

//   function teardownFloating() {
//     if (!isFloating) return;
//     // remove listeners
//     window.removeEventListener('resize', schedulePosition, { passive: true });
//     window.removeEventListener('scroll', schedulePosition, { passive: true });
//     window.removeEventListener('orientationchange', schedulePosition, { passive: true });
//     if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
//     // move buttons back to original locations
//     if (prevOriginal.nextSibling) {
//       prevOriginal.parent.insertBefore(prevBtn, prevOriginal.nextSibling);
//     } else {
//       prevOriginal.parent.appendChild(prevBtn);
//     }
//     if (nextOriginal.nextSibling) {
//       nextOriginal.parent.insertBefore(nextBtn, nextOriginal.nextSibling);
//     } else {
//       nextOriginal.parent.appendChild(nextBtn);
//     }
//     // clean inline styles & classes added
//     prevBtn.style.top = prevBtn.style.left = '';
//     nextBtn.style.top = nextBtn.style.left = '';
//     prevBtn.classList.remove('floating-swiper-nav', 'prev');
//     nextBtn.classList.remove('floating-swiper-nav', 'next');
//     isFloating = false;
//   }

//   // decide on load / resize
//   function checkBreakpoint() {
//     if (window.innerWidth >= BREAKPOINT) {
//       makeFloating();
//     } else {
//       teardownFloating();
//     }
//   }

//   // init
//   checkBreakpoint();
//   // watch for changes
//   window.addEventListener('resize', () => {
//     // debounce slightly
//     clearTimeout(window.___swNavResizeTimer);
//     window.___swNavResizeTimer = setTimeout(checkBreakpoint, 120);
//   });
//   // also reposition after images/load
//   window.addEventListener('load', () => { if (isFloating) schedulePosition(); });
// })();


(function () {
  const BREAKPOINT = 1025;
  const swiperEl = document.querySelector('.swiperGrid');
  const prevBtn  = document.querySelector('.swiperPrev1');
  const nextBtn  = document.querySelector('.swiperNext1');
  if (!swiperEl || !prevBtn || !nextBtn) return;

  const prevOriginal = { parent: prevBtn.parentNode, nextSibling: prevBtn.nextSibling };
  const nextOriginal = { parent: nextBtn.parentNode, nextSibling: nextBtn.nextSibling };

  let isFloating = false;
  let rafId = null;
  const OUTER_OFFSET = 28;

  function positionNav() {
    if (!document.body.contains(prevBtn) || !document.body.contains(nextBtn)) return;

    const r = swiperEl.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) {
      requestAnimationFrame(positionNav);
      return;
    }
    const btnW = prevBtn.offsetWidth || 44;
    const top = r.top + r.height / 2;

    prevBtn.style.top  = `${top + 17}px`;
    prevBtn.style.left = `${r.left - OUTER_OFFSET - btnW}px`;

    nextBtn.style.top  = `${top + 17}px`;
    nextBtn.style.left = `${r.right + OUTER_OFFSET}px`;
  }

  function schedulePosition() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      positionNav();
      rafId = null;
    });
  }

  function makeFloating() {
    if (isFloating) return;
    prevBtn.classList.add('floating-swiper-nav', 'prev');
    nextBtn.classList.add('floating-swiper-nav', 'next');
    document.body.appendChild(prevBtn);
    document.body.appendChild(nextBtn);
    schedulePosition();
    window.addEventListener('resize', schedulePosition, { passive: true });
    window.addEventListener('scroll', schedulePosition, { passive: true });
    window.addEventListener('orientationchange', schedulePosition, { passive: true });
    isFloating = true;
  }

  function teardownFloating() {
    if (!isFloating) return;
    window.removeEventListener('resize', schedulePosition, { passive: true });
    window.removeEventListener('scroll', schedulePosition, { passive: true });
    window.removeEventListener('orientationchange', schedulePosition, { passive: true });
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (prevOriginal.nextSibling) {
      prevOriginal.parent.insertBefore(prevBtn, prevOriginal.nextSibling);
    } else {
      prevOriginal.parent.appendChild(prevBtn);
    }
    if (nextOriginal.nextSibling) {
      nextOriginal.parent.insertBefore(nextBtn, nextOriginal.nextSibling);
    } else {
      nextOriginal.parent.appendChild(nextBtn);
    }
    prevBtn.style.top = prevBtn.style.left = '';
    nextBtn.style.top = nextBtn.style.left = '';
    prevBtn.classList.remove('floating-swiper-nav', 'prev');
    nextBtn.classList.remove('floating-swiper-nav', 'next');
    prevBtn.style.display = '';
    nextBtn.style.display = '';
    isFloating = false;
  }

  function checkBreakpoint() {
    if (window.innerWidth >= BREAKPOINT) {
      makeFloating();
    } else {
      teardownFloating();
    }
  }
  const panelSelectorCandidates = ['#portfolio__panel2', '.panel2', '.panel.panel2'];
  let panel2 = null;
  for (const s of panelSelectorCandidates) {
    panel2 = document.querySelector(s);
    if (panel2) break;
  }
  if (!panel2 && swiperEl) {
    panel2 = swiperEl.closest('div') || null;
  }

  function isPanelVisible(node) {
    if (!node) return false;
    if (node.classList && node.classList.contains('hidden')) return false;
    return node.offsetParent !== null && node.getBoundingClientRect().height > 0;
  }

  function updateNavVisibilityBasedOnPanel() {
    const panelVisible = isPanelVisible(panel2);
    if (window.innerWidth >= BREAKPOINT && isFloating) {
      if (panelVisible) {
        prevBtn.style.display = '';
        nextBtn.style.display = '';
        requestAnimationFrame(() => {
          schedulePosition();
        });
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }
    } else {
      prevBtn.style.display = '';
      nextBtn.style.display = '';
    }
  }

  if (panel2) {
    const mo = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          requestAnimationFrame(updateNavVisibilityBasedOnPanel);
          break;
        }
      }
    });
    mo.observe(panel2, { attributes: true, attributeFilter: ['class'] });

    const mo2 = new MutationObserver(() => {
      requestAnimationFrame(updateNavVisibilityBasedOnPanel);
    });
    mo2.observe(panel2, { attributes: true, attributeFilter: ['style'] });
  }

  checkBreakpoint();

  window.addEventListener('resize', () => {
    clearTimeout(window.___swNavResizeTimer);
    window.___swNavResizeTimer = setTimeout(() => {
      checkBreakpoint();
      requestAnimationFrame(updateNavVisibilityBasedOnPanel);
    }, 120);
  });

  window.addEventListener('load', () => {
    if (isFloating) schedulePosition();
    requestAnimationFrame(updateNavVisibilityBasedOnPanel);
  });

  requestAnimationFrame(updateNavVisibilityBasedOnPanel);

})();



/*==================== PORTFOLIO PANELS ====================*/

(function () {
  const btn = document.getElementById('panel-toggle');
  const icon = document.getElementById('portfolio__toggle-icon');
  const p1 = document.getElementById('portfolio__panel1');
  const p2 = document.getElementById('portfolio__panel2');
  const portfolio__panels = document.getElementById('portfolio__panels');

  let showing = 1;

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function updateA11y(targetId) {
    btn.setAttribute('aria-controls', targetId);
    btn.setAttribute('aria-expanded', 'true');
  }

  function showPanel(n) {
    showing = n;
    if (n === 1) {
      p1.classList.add('active');
      p2.classList.remove('active');
      p1.removeAttribute('aria-hidden');
      p2.setAttribute('aria-hidden', 'true');
      updateA11y('portfolio__panel1');
      // icon.style.replace('uim-apps', 'uim-slider-h');
      icon.classList.add('uil-apps');
      icon.classList.remove('uil-slider-h');
    } else {
      p1.classList.remove('active');
      p2.classList.add('active');
      p1.setAttribute('aria-hidden', 'true');
      p2.removeAttribute('aria-hidden');
      updateA11y('portfolio__panel2');
      // icon.style.replace('uim-slider-h', 'uim-apps');
      icon.classList.add('uil-slider-h');
      icon.classList.remove('uil-apps');
    }
    adjustportfolio__panelsHeight();
  }
  
  function adjustportfolio__panelsHeight() {
    if (isMobile()) {
      const active = document.querySelector('.panel.active');
      if (active) {
        const h = active.scrollHeight;
        portfolio__panels.style.height = h + 'px';
      } else {
        portfolio__panels.style.height = '0px';
      }
    } else {
      portfolio__panels.style.height = 'auto';
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      adjustportfolio__panelsHeight();
    }, 120);
  });

  btn.addEventListener('click', () => {
    showing = showing === 1 ? 2 : 1;
    showPanel(showing);
  });

  window.addEventListener('load', adjustportfolio__panelsHeight);
  setTimeout(adjustportfolio__panelsHeight, 200);

})();


/*==================== TESTIMONIAL ====================*/
let swiper2 = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
   
    spaceBetween: 48,
    pagination: {
        el: ".swiper-pagination-testimonial",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints:{
        568:{
            slidesPerView: 2,
        }
      }
    });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const section = document.querySelectorAll('section[id]')
function scrollActive(){
    const scrollY = window.pageYOffset
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        const link = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');
        if (!link) return;

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            link.classList.add('active-link')
        }else{
            link.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if(this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconSun = 'uil-sun';
const iconMoon = 'uil-moon';

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => (themeButton && themeButton.classList.contains(iconSun)) ? iconSun : iconMoon;

const savedTheme = localStorage.getItem('selected-theme');
const savedIcon  = localStorage.getItem('selected-icon');
const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  if (!theme) return;
  if (theme === 'dark') {
    document.body.classList.add(darkTheme);
    if (themeButton) { themeButton.classList.add(iconSun); themeButton.classList.remove(iconMoon); }
  } else {
    document.body.classList.remove(darkTheme);
    if (themeButton) { themeButton.classList.add(iconMoon); themeButton.classList.remove(iconSun); }
  }
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const systemPrefersDark = !!(mq && mq.matches);
  applyTheme(systemPrefersDark ? 'dark' : 'light');
}

if (themeButton && savedIcon) {
  themeButton.classList.remove(iconSun, iconMoon);
  themeButton.classList.add(savedIcon);
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);

    if (themeButton.classList.contains(iconSun)) {
      themeButton.classList.remove(iconSun);
      themeButton.classList.add(iconMoon);
    } else {
      themeButton.classList.remove(iconMoon);
      themeButton.classList.add(iconSun);
    }

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}

if (mq) {
  const systemChangeHandler = (e) => {
    if (!localStorage.getItem('selected-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  };

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', systemChangeHandler);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(systemChangeHandler);
  }
}

const sr = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 2000,
  reset: true
});


/*==================== HOME SOCIAL ICON ACTIVE LINK ====================*/

(function(){
    const btn = document.querySelector('.icon-button');

    // detect touch-capable devices
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    if(isTouch){
      btn.addEventListener('click', (e) => {
        // toggle visibility on touch; if clicking tooltip itself, ignore
        if(btn.classList.contains('open')){
          btn.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
        } else {
          btn.classList.add('open');
          btn.setAttribute('aria-expanded','true');

          // close when clicking/tapping outside
          const closeOutside = (ev) => {
            if(!btn.contains(ev.target)){
              btn.classList.remove('open');
              btn.setAttribute('aria-expanded','false');
              document.removeEventListener('click', closeOutside);
            }
          };
          setTimeout(()=> document.addEventListener('click', closeOutside), 0);
        }
      });
    }

    // keep aria-expanded accurate for keyboard users
    btn.addEventListener('focusin', ()=> btn.setAttribute('aria-expanded','true'));
    btn.addEventListener('focusout', ()=> btn.setAttribute('aria-expanded','false'));
  })();


  // ======================================================================

function updateCountdown() {
            const offerExpires = document.querySelector('.offer-expires');
            const now = new Date().getTime();
            const offerEnd = now + (7 * 24 * 60 * 60 * 1000); // 7 days from now
            const distance = offerEnd - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            offerExpires.innerHTML = `⏰ Expires in ${days}d ${hours}h`;
        }

        // Update countdown every hour
        updateCountdown();
        setInterval(updateCountdown, 3600000);

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add click tracking for contact buttons (optional)
        document.querySelectorAll('.contact-btn, .project-cta, .floating-contact').forEach(button => {
            button.addEventListener('click', function() {
                console.log('Contact button clicked:', this.textContent.trim());
                // Add your analytics tracking here
            });
        });

/*=======================================CONTACTME========================*/
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('contact__form');
//   const sendBtn = document.getElementById('contact__send__btn');

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     sendBtn.disabled = true;
//     const originalText = sendBtn.textContent;
//     sendBtn.textContent = 'Sending...';

//     // use FormData to avoid relying on form.<name> properties
//     const fd = new FormData(form);
//     const payload = {
//       name: (fd.get('name') || '').toString().trim(),
//       email: (fd.get('email') || '').toString().trim(),
//       project: (fd.get('project') || '').toString().trim(),
//       message: (fd.get('message') || '').toString().trim()
//     };
//     const API_URL = 'http://localhost:3000/api/contact';

//     try {
//       const res = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       // try to parse JSON safely
//       let data = {};
//       try { data = await res.json(); } catch (_) { data = {}; }

//       if (res.ok) {
//         alert('Message sent — thank you!');
//         form.reset();
//       } else {
//         alert('Send failed: ' + (data.error || res.statusText || res.status));
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       alert('Network error: ' + err.message);
//     } finally {
//       sendBtn.disabled = false;
//       sendBtn.textContent = originalText;
//     }
//   });
// });
