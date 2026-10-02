(function () {
      'use strict';

      /* NAV SCROLL */
      const nav = document.getElementById('nav');
      const scrollTopBtn = document.getElementById('scroll-top') || document.getElementById('footer-scroll-top');
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (nav) nav.classList.toggle('scrolled', y > 30);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('show', y > 600);
      }, { passive: true });

      /* HAMBURGER */
      const hamburger = document.getElementById('hamburger-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
        mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));
      }

      /* HERO ENTRANCE REVEAL */
      const hugeWords = document.querySelectorAll('.hero-massive-word');
      hugeWords.forEach((word, i) => {
        word.style.opacity = '0';
        word.style.transform = `translateY(${i === 0 ? '15%' : '-15%'}) scale(1.3)`;
        word.style.transition = 'opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          word.style.opacity = '1';
          word.style.transform = `translateY(${i === 0 ? '0%' : '-8%'}) scale(1)`;
        }, 150 + i * 200);
      });

      /* CUSTOM CURSOR & MAGNETIC BUTTONS */
      const cursorDot = document.getElementById('cursor-dot');
      const cursorOutline = document.getElementById('cursor-outline');
      const cursorTorch = document.getElementById('cursor-torch');
      
      window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Dot follows instantly
        if(cursorDot) {
          cursorDot.style.left = `${posX}px`;
          cursorDot.style.top = `${posY}px`;
        }
        
        // Outline follows with a slight delay via CSS transitions (or requestAnimationFrame for smoother JS, but CSS is fine for now)
        if(cursorOutline) {
          cursorOutline.style.left = `${posX}px`;
          cursorOutline.style.top = `${posY}px`;
        }

        if(cursorTorch) {
          cursorTorch.style.left = `${posX}px`;
          cursorTorch.style.top = `${posY}px`;
        }
      });

      // Add hover state for links and buttons
      const interactables = document.querySelectorAll('a, button, .magnetic, .work-card, .faq-q');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
        });
      });

      // Magnetic Buttons
      const magneticEls = document.querySelectorAll('.magnetic');
      magneticEls.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const position = el.getBoundingClientRect();
          const x = e.clientX - position.left - position.width / 2;
          const y = e.clientY - position.top - position.height / 2;
          
          el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
          if (el.querySelector('.btn-text-wrapper')) {
            el.querySelector('.btn-text-wrapper').style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
          }
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0px, 0px)';
          if (el.querySelector('.btn-text-wrapper')) {
            el.querySelector('.btn-text-wrapper').style.transform = 'translate(0px, 0px)';
          }
        });
      });



      // Premium Framer-Style Card Deck Animation
      const premiumCards = document.querySelectorAll('.premium-skill-card');
      const premiumTrackFill = document.getElementById('skills-track-fill');
      const premiumActiveNum = document.getElementById('active-skill-num');
      const skillsHeading = document.querySelector('.skills-heading');
      const skillsDesc = document.querySelector('.skills-desc');
      
      const skillsInfoData = [
        { title: "Crafting Digital Excellence", desc: "Bespoke digital solutions designed for modern brands and tech startups to scale faster and stand out in the digital landscape." },
        { title: "Robust Engineering", desc: "Scalable, high-performance web development architecture built to handle millions of users with zero friction." },
        { title: "Intuitive User Journeys", desc: "Beautifully engineered user interfaces that convert visitors into loyal customers through flawless design." },
        { title: "Data Intelligence", desc: "Actionable analytics and dynamic dashboards that give you deep, real-time insights into your business metrics." }
      ];
      
      let lastPremiumActiveIndex = -1;
      
      if (premiumCards.length > 0) {
        // Set dynamic top positions so they stack nicely
        premiumCards.forEach((card, index) => {
          card.style.top = `${140 + index * 24}px`;
        });
        
        const updatePremiumCards = () => {
          // Disable stacking effect on mobile (let it scroll normally)
          if (window.innerWidth <= 900) {
            premiumCards.forEach(c => {
               c.style.transform = 'none';
               c.style.filter = 'none';
               c.style.opacity = 1;
            });
            return;
          }
          
          let currentActiveIndex = 0;
          const triggerPoint = window.innerHeight * 0.65; // Trigger active state when card is 65% down the viewport
          
          // 1. Determine which card is currently active (in focus)
          premiumCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top <= triggerPoint) {
               currentActiveIndex = index;
            }
          });
          
          // 2. Apply stacking styles and glow states
          premiumCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            
            // The card glows if it is the currently active one
            if (index === currentActiveIndex) {
               card.classList.add('is-active');
            } else {
               card.classList.remove('is-active');
            }
            
            let overlapProgress = 0; 
            
            // If there's a card after this one, see how much it overlaps
            if (index < premiumCards.length - 1) {
              const nextCard = premiumCards[index + 1];
              const nextRect = nextCard.getBoundingClientRect();
              const currentDistance = nextRect.top - rect.top;
              
              // overlapProgress goes from 0 to 1 as the distance shrinks from cardHeight to 24px
              overlapProgress = 1 - ((currentDistance - 24) / rect.height);
              overlapProgress = Math.max(0, Math.min(1, overlapProgress));
            }
            
            // Apply scale, opacity, and blur based on how much it is overlapped
            if (overlapProgress > 0) {
               const scale = 1 - (0.06 * overlapProgress);
               const opacity = 1 - (0.6 * overlapProgress);
               const blur = 4 * overlapProgress;
               
               card.style.transform = `scale(${scale})`;
               card.style.opacity = opacity;
               card.style.filter = `blur(${blur}px)`;
               card.classList.remove('is-active'); // Loses active state when being covered
            } else {
               card.style.transform = `scale(1)`;
               card.style.opacity = 1;
               card.style.filter = `blur(0px)`;
            }
          });
          
          // Update the progress tracker and counter in the left sidebar
          if (premiumActiveNum) {
            premiumActiveNum.innerText = `0${currentActiveIndex + 1}`;
          }
          if (premiumTrackFill) {
            const progressPct = ((currentActiveIndex + 1) / premiumCards.length) * 100;
            premiumTrackFill.style.width = `${progressPct}%`;
          }
          
          if (currentActiveIndex !== lastPremiumActiveIndex && skillsHeading && skillsDesc) {
            lastPremiumActiveIndex = currentActiveIndex;
            
            // Fade out current text
            skillsHeading.style.opacity = 0;
            skillsDesc.style.opacity = 0;
            skillsHeading.style.transform = 'translateY(10px)';
            skillsDesc.style.transform = 'translateY(10px)';
            
            if (window.skillsFadeTimeout) clearTimeout(window.skillsFadeTimeout);
            
            window.skillsFadeTimeout = setTimeout(() => {
              // Update text content
              skillsHeading.innerText = skillsInfoData[currentActiveIndex].title;
              skillsDesc.innerText = skillsInfoData[currentActiveIndex].desc;
              
              // Fade in new text
              skillsHeading.style.opacity = 1;
              skillsDesc.style.opacity = 1;
              skillsHeading.style.transform = 'translateY(0px)';
              skillsDesc.style.transform = 'translateY(0px)';
            }, 300);
          }
          
          // --- Left Sidebar Exit Animation ---
          const section = document.querySelector('.premium-skills-section');
          const stickyContent = document.querySelector('.skills-sticky-content');
          if (section && stickyContent) {
             const sectionRect = section.getBoundingClientRect();
             
             // The section has padding-bottom: 50vh.
             // exitStart: when the bottom of the section enters the bottom of the screen
             // exitEnd: right before the sticky content would normally get dragged up (around 55% of screen height)
             const exitStart = window.innerHeight;
             const exitEnd = window.innerHeight * 0.55;
             
             let exitProgress = 0;
             if (sectionRect.bottom < exitStart) {
                 exitProgress = 1 - ((sectionRect.bottom - exitEnd) / (exitStart - exitEnd));
                 exitProgress = Math.max(0, Math.min(1, exitProgress));
             }
             
             if (exitProgress > 0) {
                 stickyContent.style.transform = `translateX(-${exitProgress * 80}px)`;
                 stickyContent.style.opacity = 1 - (exitProgress * 1.5); // Fades out slightly faster than it moves
             } else {
                 stickyContent.style.transform = `translateX(0px)`;
                 stickyContent.style.opacity = 1;
             }
          }
        };
        
        window.addEventListener('scroll', updatePremiumCards, { passive: true });
        // Also trigger on resize
        window.addEventListener('resize', updatePremiumCards, { passive: true });
        updatePremiumCards();
      }

      // Hero Parallax (Sticky & Scale)
      const heroRings = document.querySelector('.hero-rings');
      const heroImgWrapper = document.querySelector('.hero-image-wrapper');
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const maxScroll = window.innerHeight * 2.2;
        const progress = Math.min(Math.max(y / maxScroll, 0), 1);
        
        if (y < window.innerHeight * 4) {
          if(heroRings) {
            const ringP = Math.min(progress * 2, 1);
            heroRings.style.transform = `translate(-50%, -50%) scale(${1 + ringP * 0.6})`;
            heroRings.style.opacity = 0.35 * (1 - ringP);
          }
          
          if(heroImgWrapper) {
            const isMobile = window.innerWidth < 769;
            const targetW = isMobile ? window.innerWidth * 0.75 : 540;
            const targetH = isMobile ? window.innerWidth * 0.42 : 303.75;
            const endW = window.innerWidth;
            const endH = window.innerHeight;
            
            if (progress <= 0.2) {
              const p1 = progress / 0.2;
              const easeOut = 1 - Math.pow(1 - p1, 3);
              heroImgWrapper.style.width = `${targetW * easeOut}px`;
              heroImgWrapper.style.height = `${targetH * easeOut}px`;
              heroImgWrapper.style.borderRadius = `18px`;
              heroImgWrapper.style.transform = `translateY(0px)`;
              heroImgWrapper.style.opacity = easeOut;
            } else if (progress <= 0.4) {
              const p2 = (progress - 0.2) / 0.2;
              const easeOut = 1 - Math.pow(1 - p2, 3);
              heroImgWrapper.style.width = `${targetW + (endW - targetW) * easeOut}px`;
              heroImgWrapper.style.height = `${targetH + (endH - targetH) * easeOut}px`;
              heroImgWrapper.style.borderRadius = `${18 * (1 - easeOut)}px`;
              heroImgWrapper.style.transform = `translateY(0px)`;
              heroImgWrapper.style.opacity = 1;
            } else if (progress <= 0.6) {
              heroImgWrapper.style.width = `${endW}px`;
              heroImgWrapper.style.height = `${endH}px`;
              heroImgWrapper.style.borderRadius = `0px`;
              heroImgWrapper.style.transform = `translateY(0px)`;
              heroImgWrapper.style.opacity = 1;
            } else {
              const p4 = (progress - 0.6) / 0.4;
              const easeIn = p4 * p4; 
              heroImgWrapper.style.width = `${endW - (endW - targetW) * easeIn}px`;
              heroImgWrapper.style.height = `${endH - (endH - targetH) * easeIn}px`;
              heroImgWrapper.style.borderRadius = `${18 * easeIn}px`;
              heroImgWrapper.style.transform = `translateY(${easeIn * 150}px)`;
              heroImgWrapper.style.opacity = 1 - easeIn;
            }
          }
          
          if (hugeWords.length === 2) {
            const textProgress = Math.min(progress / 0.2, 1);
            const textEase = textProgress * textProgress;
            hugeWords[0].style.transform = `translateY(${textEase * -350}px)`; 
            hugeWords[1].style.transform = `translateY(calc(-8% + ${textEase * 350}px))`; 
            hugeWords[0].style.opacity = 1 - textEase;
            hugeWords[1].style.opacity = 1 - textEase;
            document.querySelectorAll('.ui-left').forEach(el => {
              el.style.transform = `translateX(${textEase * -150}px)`;
              el.style.opacity = 1 - textEase;
            });
            document.querySelectorAll('.ui-right').forEach(el => {
              el.style.transform = `translateX(${textEase * 150}px)`;
              el.style.opacity = 1 - textEase;
            });
          }
        }
      }, { passive: true });

      /* INTERSECTION OBSERVER — REVEAL */
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));
      const manifestoSection = document.getElementById('manifesto');
      if (manifestoSection) io.observe(manifestoSection);

      /* PROCESS GRAPH SCROLL ANIMATION */
      const processSection = document.getElementById('process');
      const processCurve = document.getElementById('process-curve');
      const processNodes = document.querySelectorAll('.graph-node');
      const processTorch = document.getElementById('process-torch');
      const processTorchCore = document.getElementById('process-torch-core');
      
      if (processSection && processCurve) {
        let pathLength = 0;
        try {
          pathLength = processCurve.getTotalLength();
        } catch (e) {
          // Fallback if SVG is not rendered
        }
        
        processCurve.style.strokeDasharray = pathLength;
        processCurve.style.strokeDashoffset = pathLength;
        
        window.addEventListener('scroll', () => {
          const rect = processSection.getBoundingClientRect();
          const maxScroll = rect.height - window.innerHeight;
          
          if (maxScroll <= 0) return; // Prevent NaN on mobile where height is auto
          
          let progress = -rect.top / maxScroll;
          progress = Math.max(0, Math.min(1, progress));
          
          processCurve.style.strokeDashoffset = pathLength * (1 - progress);
          
          if (processTorch && processTorchCore) {
            try {
              const pt = processCurve.getPointAtLength(pathLength * progress);
              const xPct = (pt.x / 1000) * 100;
              const yPct = (pt.y / 600) * 100;
              
              processTorch.style.left = `${xPct}%`;
              processTorch.style.top = `${yPct}%`;
              processTorchCore.style.left = `${xPct}%`;
              processTorchCore.style.top = `${yPct}%`;
            } catch(e) {}
            
            if (progress > 0.01 && progress < 0.99) {
              processTorch.style.opacity = 1;
              processTorchCore.style.opacity = 1;
            } else {
              processTorch.style.opacity = 0;
              processTorchCore.style.opacity = 0;
            }
          }
          
          processNodes.forEach(node => {
            const triggerProgress = parseFloat(node.getAttribute('data-progress'));
            if (progress >= triggerProgress) {
              node.classList.add('active');
            } else {
              node.classList.remove('active');
            }
          });
        }, {passive: true});
      }

      /* COUNT-UP */
      const countIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target, target = +el.dataset.target, dur = 1500, start = performance.now();
          const tick = now => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.round(eased * target);
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
          };
          requestAnimationFrame(tick);
          countIO.unobserve(el);
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('.count-num').forEach(el => countIO.observe(el));

      /* FAQ ACCORDION */
      document.querySelectorAll('[data-faq]').forEach(item => {
        const q = item.querySelector('.faq-q');
        const toggle = () => {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('[data-faq].open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
          if (!isOpen) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
        };
        q.addEventListener('click', toggle);
        q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      });

      /* 3D CAROUSEL (Scroll-driven Coverflow) */
      const workSection = document.getElementById('work');
      const cards = Array.from(document.querySelectorAll('.work-card'));
      
      function updateCarouselOnScroll() {
        if (!workSection) return;
        const rect = workSection.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        if (maxScroll <= 0) return;
        let progress = -rect.top / maxScroll;
        progress = Math.max(0, Math.min(1, progress));
        
        const activeIndexFloat = progress * (cards.length - 1);
        
        cards.forEach((card, index) => {
          const offset = index - activeIndexFloat;
          const absOffset = Math.abs(offset);
          const scale = Math.max(0.4, 1 - absOffset * 0.25);
          const translateX = offset * 115;
          card.style.transform = `translateX(${translateX}%) scale(${scale})`;
          card.style.zIndex = Math.round(100 - absOffset * 10);
          if (absOffset < 0.5) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      }
      window.addEventListener('scroll', updateCarouselOnScroll, {passive: true});
      updateCarouselOnScroll();
      
      /* JOURNAL SCROLL PARALLAX */
      const journalSection = document.getElementById('journal');
      const jLeft = document.getElementById('jcard-left');
      const jCenter = document.getElementById('jcard-center');
      const jRight = document.getElementById('jcard-right');
      
      function updateJournalOnScroll() {
        if (!journalSection) return;
        const rect = journalSection.getBoundingClientRect();
        const windowH = window.innerHeight;
        
        // Animation window
        const startY = windowH * 0.95;
        const endY = windowH * 0.25;
        
        let progress = (startY - rect.top) / (startY - endY);
        progress = Math.max(0, Math.min(1, progress));
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        if (jLeft) {
           const translateX = -150 * (1 - easeOut);
           jLeft.style.transform = `translateX(${translateX}px)`;
           jLeft.style.opacity = easeOut;
        }
        if (jCenter) {
           const translateY = 100 * (1 - easeOut);
           jCenter.style.transform = `translateY(${translateY}px)`;
           jCenter.style.opacity = easeOut;
        }
        if (jRight) {
           const translateX = 150 * (1 - easeOut);
           jRight.style.transform = `translateX(${translateX}px)`;
           jRight.style.opacity = easeOut;
        }
      }
      window.addEventListener('scroll', updateJournalOnScroll, {passive: true});
      updateJournalOnScroll();
      
    })();

      /* CUSTOM DROPDOWN */
      (function() {
        const wrapper = document.getElementById('cf-project-wrapper');
        const trigger = wrapper.querySelector('.custom-select-trigger');
        const textSpan = document.getElementById('cf-project-text');
        const options = wrapper.querySelectorAll('.custom-select-options li');
        const hiddenInput = document.getElementById('cf-project');

        trigger.addEventListener('click', () => {
          wrapper.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
          if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
          }
        });

        options.forEach(opt => {
          opt.addEventListener('click', () => {
            const val = opt.getAttribute('data-value');
            textSpan.textContent = val;
            hiddenInput.value = val;
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            wrapper.classList.remove('open');
          });
        });
      })();

      /* CONTACT FORM → WHATSAPP */
      (function () {
        const WA_NUMBER = '919980350691'; // ← replace with real number (country code + digits, no + or spaces)
        const form     = document.getElementById('contactForm');
        const success  = document.getElementById('cfSuccess');

        if (!form) return;

        form.addEventListener('submit', function (e) {
          e.preventDefault();

          const name    = (form.querySelector('#cf-name').value || '').trim();
          const honeypot = form.querySelector('#cf-website');
          
          if (honeypot && honeypot.value) {
            console.log("Bot detected.");
            return; // Silently fail for bots
          }

          const email   = (form.querySelector('#cf-email').value || '').trim();
          const project = form.querySelector('#cf-project').value || 'Not specified';
          const message = (form.querySelector('#cf-message').value || '').trim();
          const consentCheckbox = form.querySelector('#cf-consent');
          const consent = consentCheckbox ? consentCheckbox.checked : true;

          if (!name || !email || !consent) {
            // Simple inline validation highlight
            ['#cf-name','#cf-email'].forEach(sel => {
              const el = form.querySelector(sel);
              if (el && !el.value.trim()) {
                el.style.borderColor = '#ff4d4f';
                el.addEventListener('input', () => el.style.borderColor = '', { once: true });
              }
            });
            
            if (!consent && consentCheckbox) {
               const label = form.querySelector('.consent-label');
               label.style.color = '#ff4d4f';
               consentCheckbox.addEventListener('change', () => label.style.color = '', { once: true });
            }
            return;
          }

          const text =
            `*New project enquiry via Codrix website*\n\n` +
            `*Name:* ${name}\n` +
            `*Email:* ${email}\n` +
            `*Project type:* ${project}\n` +
            (message ? `\n*Message:*\n${message}` : '');

          const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

          // Show success state then open WA
          form.style.display = 'none';
          success.style.display = 'block';
          window.open(url, '_blank', 'noopener,noreferrer');
        });
      })();
    
    // Cookie Banner Logic
    (function() {
      if (!localStorage.getItem('codrix_cookie_consent')) {
        setTimeout(() => {
          const banner = document.getElementById('cookie-banner');
          if (banner) banner.classList.add('show');
        }, 2000);
      }
      
      const hideBanner = (status) => {
        localStorage.setItem('codrix_cookie_consent', status);
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.classList.remove('show');
      };

      const btnAccept = document.getElementById('cookie-accept');
      const btnReject = document.getElementById('cookie-reject');
      if (btnAccept) btnAccept.addEventListener('click', () => hideBanner('accepted'));
      if (btnReject) btnReject.addEventListener('click', () => hideBanner('rejected'));

    })();

    /* FRAXBIT-STYLE 3D PARTICLE MATRIX WAVE ANIMATION (ULTRA-HIGH CONTRAST & DENSITY) */
    (function initFraxbitHeroCanvas() {
      const canvas = document.getElementById('fraxbit-hero-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = 0;
      let height = 0;
      let dpr = 1;

      // Grid Configuration - High Density 3D Matrix
      let cols = 140;
      let rows = 85;
      const spacingX = 24;
      const spacingZ = 24;

      // Camera & Perspective settings
      const focalLength = 460;
      let cameraY = -100;
      let cameraZ = 10;
      let targetRotY = 0;
      let targetRotX = 0.32; // Pitch angle centered directly behind hero text
      let rotY = 0;
      let rotX = 0.32;

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetMouseX = 0;
      let targetMouseY = 0;
      let isMouseOverHero = false;

      // Pre-seed accent red dots deterministically
      const redDotIndices = new Set();
      let totalPoints = cols * rows;

      function generateRedDots() {
        redDotIndices.clear();
        totalPoints = cols * rows;
        const redDotCount = Math.floor(totalPoints * 0.042); // ~4.2% signature red dots
        let seed = 1337;
        function pseudoRandom() {
          seed = (seed * 9301 + 49297) % 233280;
          return seed / 233280;
        }
        for (let i = 0; i < redDotCount; i++) {
          const idx = Math.floor(pseudoRandom() * totalPoints);
          redDotIndices.add(idx);
        }
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);

        if (width < 768) {
          cols = 85;
          rows = 55;
        } else if (width < 1200) {
          cols = 115;
          rows = 70;
        } else {
          cols = 150;
          rows = 90;
        }
        generateRedDots();
      }

      resize();
      window.addEventListener('resize', resize, { passive: true });

      const heroSection = document.getElementById('hero') || document.body;
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left - width / 2;
        const y = e.clientY - rect.top - height / 2;
        targetMouseX = x;
        targetMouseY = y;
        targetRotY = (x / width) * 0.30; // Interactive yaw tilt
        targetRotX = 0.44 + (y / height) * 0.18; // Interactive pitch tilt
        isMouseOverHero = true;
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        targetRotY = 0;
        targetRotX = 0.44;
        isMouseOverHero = false;
      }, { passive: true });

      let time = 0;

      function render() {
        time += 0.022;

        // Smooth lerp camera & mouse reactivity
        rotY += (targetRotY - rotY) * 0.05;
        rotX += (targetRotX - rotX) * 0.05;
        mouseX += (targetMouseX - mouseX) * 0.06;
        mouseY += (targetMouseY - mouseY) * 0.06;

        ctx.clearRect(0, 0, width, height);

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        const halfCols = cols / 2;
        const halfRows = rows / 2;

        const projectedPoints = [];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const pointIdx = r * cols + c;

            // Base grid 3D position
            const posX = (c - halfCols) * spacingX;
            const posZ = (r - halfRows) * spacingZ + 280; // Z offset

            // 3D Superposition Wave height Y formula
            const wave1 = Math.sin(posX * 0.009 + time * 1.2) * Math.cos(posZ * 0.009 + time * 1.0) * 44;
            const wave2 = Math.sin((posX + posZ) * 0.006 + time * 0.8) * 22;
            const wave3 = Math.cos(posX * 0.014 - time * 0.9) * 14;

            let posY = wave1 + wave2 + wave3;

            // Interactive mouse displacement ripple
            if (isMouseOverHero) {
              const dx = posX - mouseX * 0.95;
              const dz = posZ - (mouseY * 0.95 + 280);
              const distSq = dx * dx + dz * dz;
              const radiusSq = 250 * 250;
              if (distSq < radiusSq) {
                const factor = (1 - distSq / radiusSq);
                posY -= Math.sin(factor * Math.PI) * 55;
              }
            }

            // 3D Yaw & Pitch Rotation
            const x1 = posX * cosY - posZ * sinY;
            const z1 = posX * sinY + posZ * cosY;

            const y2 = (posY - cameraY) * cosX - (z1 - cameraZ) * sinX;
            const z2 = (posY - cameraY) * sinX + (z1 - cameraZ) * cosX;

            if (z2 < 10) continue;

            // 3D to 2D Perspective Projection
            const scale = focalLength / z2;
            const screenX = width / 2 + x1 * scale;
            const screenY = height / 2 + y2 * scale;

            if (screenX < -30 || screenX > width + 30 || screenY < -30 || screenY > height + 30) {
              continue;
            }

            const isRed = redDotIndices.has(pointIdx);
            projectedPoints.push({
              x: screenX,
              y: screenY,
              scale: scale,
              z: z2,
              isRed: isRed,
              pointIdx: pointIdx
            });
          }
        }

        // Sort by depth (back to front rendering)
        projectedPoints.sort((a, b) => b.z - a.z);

        // Render particles with ultra-high contrast, bold sizing & glowing neon red accents
        for (let i = 0; i < projectedPoints.length; i++) {
          const p = projectedPoints[i];

          // Alpha depth fading
          const depthRatio = Math.max(0, Math.min(1, (1300 - p.z) / 1100));
          if (depthRatio <= 0.05) continue;

          if (p.isRed) {
            // Fraxbit Signature Glowing Red Accent Dot
            const pulse = 0.9 + Math.sin(time * 3.2 + p.pointIdx) * 0.25;
            const radius = Math.max(2.8, p.scale * 4.8) * pulse;
            const alpha = Math.min(1, depthRatio * 0.98);

            ctx.save();
            ctx.shadowColor = 'rgba(255, 42, 75, 1)';
            ctx.shadowBlur = Math.max(10, 18 * p.scale);
            ctx.fillStyle = `rgba(255, 42, 75, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else {
            // High-contrast crisp white/cyan matrix dot
            const radius = Math.max(1.6, p.scale * 3.4);
            const alpha = Math.min(0.92, Math.max(0.35, depthRatio * 0.9));

            ctx.fillStyle = `rgba(240, 246, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    })();