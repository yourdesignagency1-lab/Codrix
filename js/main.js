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
            
            if (progress <= 0.08) {
              const p1 = progress / 0.08;
              const easeOut = 1 - Math.pow(1 - p1, 3);
              heroImgWrapper.style.width = `${targetW * easeOut}px`;
              heroImgWrapper.style.height = `${targetH * easeOut}px`;
              heroImgWrapper.style.borderRadius = `18px`;
              heroImgWrapper.style.transform = `translateY(0px)`;
              heroImgWrapper.style.opacity = easeOut;
            } else if (progress <= 0.22) {
              const p2 = (progress - 0.08) / 0.14;
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
            const textProgress = Math.min(progress / 0.08, 1);
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
        if (!wrapper) return;
        const trigger = wrapper.querySelector('.custom-select-trigger');
        if (!trigger) return;
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
    function initFraxbitCanvas(canvasId, sectionSelector, waveDirection = 1) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      const gl = canvas.getContext('webgl', {
          alpha: true,
          antialias: false,
          depth: false,
          premultipliedAlpha: false,
          powerPreference: "low-power"
      });
      if (!gl) return;

      const vertexShaderSource = `
attribute vec2 aGrid;   // x: -1..1 across, y: 0 (near) .. 1 (far)
attribute float aSeed;  // 0..1 per point

uniform mat4 uProjView;
uniform float uTime;
uniform float uAmp;
uniform float uAspect;
uniform float uDpr;
uniform float uPointScale;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uNearW;   // half-width of the field at the near edge
uniform float uSpread;  // extra half-width per unit of depth (matches the lens)
uniform float uWaveDir;

varying float vAlpha;
varying float vBit;
varying float vRipple;
varying float vTwinkle;
varying float vHeight;

const float DEPTH = 12.0;

float terrain(vec2 p, float t) {
  // Use uWaveDir to determine wave flow direction
  return sin(p.x * 0.8 - t * 0.5 * uWaveDir) * 0.34
       + sin(p.y * 0.6 + t * 0.32 * uWaveDir + p.x * 0.3) * 0.42
       + sin((p.x - p.y) * 1.7 - t * 0.75 * uWaveDir) * 0.07;
}

void main() {
  float z = aGrid.y * DEPTH;
  vec2 p = vec2(aGrid.x * (uNearW + z * uSpread), z);
  float h = terrain(p, uTime) * uAmp;
  vec4 world = vec4(p.x, h, -p.y, 1.0);

  vec4 clip = uProjView * world;
  vec2 d = (clip.xy / clip.w - uMouse) * vec2(uAspect, 1.0);
  float dist = length(d);
  float ripple = exp(-dist * dist * 6.0) * uMouseStrength;
  world.y += ripple * (0.26 + 0.2 * sin(dist * 20.0 - uTime * 5.0));
  clip = uProjView * world;
  gl_Position = clip;

  float edge = smoothstep(1.0, 0.82, abs(aGrid.x));
  float far = smoothstep(0.62, 0.22, aGrid.y);
  float near = smoothstep(0.0, 0.05, aGrid.y);
  vAlpha = edge * far * near;

  vBit = step(0.99, aSeed);
  vRipple = ripple;
  vTwinkle = 0.55 + 0.45 * sin(uTime * 2.2 + aSeed * 90.0);
  vHeight = h;

  float size = uPointScale * (1.0 + vBit * 1.6 + ripple * 1.1) / clip.w;
  gl_PointSize = max(size, 1.0) * uDpr;
}
`;

      const fragmentShaderSource = `
precision mediump float;

uniform vec3 uDot;
uniform vec3 uAccent;
uniform float uFade;

varying float vAlpha;
varying float vBit;
varying float vRipple;
varying float vTwinkle;
varying float vHeight;

void main() {
  float r = length(gl_PointCoord - 0.5);
  float disc = smoothstep(0.5, 0.3, r);
  float light = 0.55 + clamp(vHeight, -0.6, 0.6) * 0.4 + vRipple * 0.5;
  float alpha = disc * vAlpha * uFade * mix(light, vTwinkle, vBit);
  vec3 color = mix(uDot, uAccent, vBit);
  gl_FragColor = vec4(color, alpha);
}
`;

      function compileShader(gl, type, source) {
          const shader = gl.createShader(type);
          gl.shaderSource(shader, source);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              console.error(gl.getShaderInfoLog(shader));
              return null;
          }
          return shader;
      }

      const program = gl.createProgram();
      const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
          return;
      }
      gl.useProgram(program);

      // Create Grid and Seeds
      const isMobile = window.innerWidth <= 767;
      const mCols = isMobile ? 110 : 220;
      const mRows = isMobile ? 80 : 120;
      const numPoints = mCols * mRows;
      
      const grids = new Float32Array(numPoints * 2);
      const seeds = new Float32Array(numPoints);
      
      let idx = 0;
      for (let y = 0; y < mRows; y++) {
          for (let x = 0; x < mCols; x++) {
              grids[idx * 2] = (x / (mCols - 1)) * 2 - 1; // -1 to 1
              grids[idx * 2 + 1] = Math.pow(y / (mRows - 1), 1.45); // 0 to 1 non-linear
              seeds[idx] = Math.random();
              idx++;
          }
      }

      function createBuffer(name, data, size) {
          const buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
          const loc = gl.getAttribLocation(program, name);
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
          return buffer;
      }

      createBuffer("aGrid", grids, 2);
      createBuffer("aSeed", seeds, 1);

      const uniforms = {
          projView: gl.getUniformLocation(program, "uProjView"),
          time: gl.getUniformLocation(program, "uTime"),
          amp: gl.getUniformLocation(program, "uAmp"),
          aspect: gl.getUniformLocation(program, "uAspect"),
          dpr: gl.getUniformLocation(program, "uDpr"),
          pointScale: gl.getUniformLocation(program, "uPointScale"),
          mouse: gl.getUniformLocation(program, "uMouse"),
          mouseStrength: gl.getUniformLocation(program, "uMouseStrength"),
          nearW: gl.getUniformLocation(program, "uNearW"),
          spread: gl.getUniformLocation(program, "uSpread"),
          dot: gl.getUniformLocation(program, "uDot"),
          accent: gl.getUniformLocation(program, "uAccent"),
          fade: gl.getUniformLocation(program, "uFade"),
          waveDir: gl.getUniformLocation(program, "uWaveDir")
      };

      // Set colors to Codrix Website Electric Blue theme
      function hexToRgb(hex) {
          const num = parseInt(hex.replace("#", ""), 16);
          return [(num >> 16 & 255) / 255, (num >> 8 & 255) / 255, (255 & num) / 255];
      }
      
      const dotColor = hexToRgb("#ffffff");
      const accentColor = hexToRgb("#3B4CFF"); // Codrix Electric Blue Accent
      gl.uniform3fv(uniforms.dot, dotColor);
      gl.uniform3fv(uniforms.accent, accentColor);
      gl.uniform1f(uniforms.waveDir, waveDirection);

      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);

      const state = {
          amp: 1,
          fade: 1,
          scroll: 0,
          mouse: { x: 0, y: -0.4, tx: 0, ty: -0.4, strength: 0, target: 0 },
          aspect: 1,
          proj: new Float32Array(16)
      };

      function perspective(fovy, aspect, near, far) {
          const f = 1.0 / Math.tan(fovy / 2);
          const nf = 1 / (near - far);
          return new Float32Array([
              f / aspect, 0, 0, 0,
              0, f, 0, 0,
              0, 0, (far + near) * nf, -1,
              0, 0, (2 * far * near) * nf, 0
          ]);
      }

      function resize() {
          const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
          const w = canvas.parentElement.clientWidth || window.innerWidth;
          const h = canvas.parentElement.clientHeight || window.innerHeight;
          if (!w || !h) return;
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
          gl.viewport(0, 0, canvas.width, canvas.height);
          
          state.aspect = w / h;
          const fovy = state.aspect < 1 ? Math.PI / 3 : Math.PI / 5;
          state.proj = perspective(fovy, state.aspect, 0.1, 60);
          
          const spread = Math.tan(fovy / 2) * state.aspect * 1.3;
          gl.uniform1f(uniforms.spread, spread);
          gl.uniform1f(uniforms.nearW, 2.8 * spread);
          gl.uniform1f(uniforms.aspect, state.aspect);
          gl.uniform1f(uniforms.dpr, dpr);
          gl.uniform1f(uniforms.pointScale, isMobile ? 7 : 8);
      }

      function dotProduct(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
      function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
      function normalize(a) { const len = Math.hypot(...a) || 1; return [a[0] / len, a[1] / len, a[2] / len]; }

      let startTime = performance.now();
      
      let isVisible = true;
      const io = new IntersectionObserver(([e]) => {
          isVisible = e.isIntersecting;
      });
      io.observe(canvas.parentElement || canvas);

      function render() {
          if (!isVisible) {
              requestAnimationFrame(render);
              return;
          }
          const time = (performance.now() - startTime) / 1000;
          
          const m = state.mouse;
          m.x += (m.tx - m.x) * 0.08;
          m.y += (m.ty - m.y) * 0.08;
          m.strength += (m.target - m.strength) * 0.05;

          const scroll = state.scroll;
          const up = [0, 1, 0];
          const eye = [0, 1.15 + 1.8 * scroll, 2.3 - 0.9 * scroll];
          const center = [0, 0.35 - 1.2 * scroll, -6];
          const zAxis = normalize([eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]]);
          const xAxis = normalize(cross(up, zAxis));
          const yAxis = cross(zAxis, xAxis);

          const view = new Float32Array([
              xAxis[0], yAxis[0], zAxis[0], 0,
              xAxis[1], yAxis[1], zAxis[1], 0,
              xAxis[2], yAxis[2], zAxis[2], 0,
              -dotProduct(xAxis, eye), -dotProduct(yAxis, eye), -dotProduct(zAxis, eye), 1
          ]);

          const projView = new Float32Array(16);
          for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 4; j++) {
                  projView[i * 4 + j] = 
                      state.proj[j] * view[i * 4] + 
                      state.proj[4 + j] * view[i * 4 + 1] + 
                      state.proj[8 + j] * view[i * 4 + 2] + 
                      state.proj[12 + j] * view[i * 4 + 3];
              }
          }

          gl.uniformMatrix4fv(uniforms.projView, false, projView);
          gl.uniform1f(uniforms.time, time);
          gl.uniform1f(uniforms.amp, state.amp * (1 + 0.5 * scroll));
          gl.uniform1f(uniforms.fade, state.fade * (1 - 0.6 * scroll));
          gl.uniform2f(uniforms.mouse, m.x, m.y);
          gl.uniform1f(uniforms.mouseStrength, m.strength);

          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.POINTS, 0, numPoints);

          requestAnimationFrame(render);
      }

      window.addEventListener('resize', resize);
      resize();
      
      const targetSection = document.querySelector(sectionSelector) || document.body;
      targetSection.addEventListener("pointermove", (e) => {
          const rect = targetSection.getBoundingClientRect();
          const inside = e.clientY >= rect.top && e.clientY <= rect.bottom;
          state.mouse.target = inside ? 1 : 0;
          if (inside) {
              state.mouse.tx = (e.clientX - rect.left) / rect.width * 2 - 1;
              state.mouse.ty = -((e.clientY - rect.top) / rect.height * 2 - 1);
          }
      }, { passive: true });
      targetSection.addEventListener("pointerleave", () => state.mouse.target = 0);

      window.addEventListener('scroll', () => {
          const maxScroll = window.innerHeight * 2.2;
          const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
          state.scroll = progress;
      }, { passive: true });

      requestAnimationFrame(render);
    }

    function initAllCanvases() {
      initFraxbitCanvas('fraxbit-hero-canvas', '#hero', 1);
      initFraxbitCanvas('fraxbit-footer-canvas', '.footer-premium', -1);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAllCanvases);
    } else {
      initAllCanvases();
    }
    window.addEventListener('load', initAllCanvases);
