/**
 * BAGLA ASTROLOGY & HOROSCOPE
 * Interactive Client Logic, Cosmic Starfield & Vedic Astrology Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initHeader();
  initZodiacHoroscope();
  initPalmistryInteractive();
  initFaqAccordion();
  initReviewsPage();
  initDrishtiChatLoader();
});

/* ==========================================================================
   0. DRISHTI AI CHATBOT AUTO-LOADER
   ========================================================================== */
function initDrishtiChatLoader() {
  if (window.DrishtiChat) return;
  if (!document.getElementById('drishti-chat-script')) {
    const s = document.createElement('script');
    s.id = 'drishti-chat-script';
    s.src = 'js/drishti-chat.js';
    s.defer = true;
    document.head.appendChild(s);
  }
}

/* ==========================================================================
   1. COSMIC STARFIELD CANVAS
   ========================================================================== */
function initStarfield() {
  const canvas = document.getElementById('canvas-stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let stars = [];
  const numStars = 95;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        isGold: Math.random() > 0.65
      });
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 0.95 || star.alpha < 0.15) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.isGold 
        ? `rgba(212, 175, 55, ${Math.max(0.1, star.alpha * 0.55)})` 
        : `rgba(16, 42, 67, ${Math.max(0.06, star.alpha * 0.35)})`;
      ctx.fill();
    }
    animationFrameId = requestAnimationFrame(animateStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateStars();
}

/* ==========================================================================
   2. HEADER & MOBILE NAVIGATION
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile dropdown toggle handling
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        const parent = toggle.closest('.nav-item-dropdown');
        if (parent) {
          parent.classList.toggle('dropdown-open');
        }
      }
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE 12 ZODIAC HOROSCOPE SYSTEM
   ========================================================================== */
const zodiacData = {
  aries: {
    name: "Aries",
    vedic: "Mesha (मेष)",
    dates: "Mar 21 - Apr 19",
    glyph: "♈",
    element: "Fire",
    ruler: "Mars (Mangal)",
    color: "Crimson Red & Coral",
    numbers: "9, 18, 27",
    gemstone: "Red Coral (Moonga)",
    overview: "Planetary alignments favor bold personal initiatives today. The Sun illuminates your house of courage and self-realization, opening up pathways that felt blocked earlier this month.",
    career: "A new project or leadership mandate will be entrusted to you. Maintain patience during team negotiations and avoid hasty financial speculation.",
    love: "Passionate energies run high. Clear communication with your partner resolves past misunderstandings; singles may receive an unexpected auspicious proposal.",
    wellness: "Vitality is elevated, but regulate fiery foods and stay hydrated. Evening meditation brings deep equilibrium to mind and body."
  },
  taurus: {
    name: "Taurus",
    vedic: "Vrishabha (वृषभ)",
    dates: "Apr 20 - May 20",
    glyph: "♉",
    element: "Earth",
    ruler: "Venus (Shukra)",
    color: "Royal White & Emerald",
    numbers: "6, 15, 24",
    gemstone: "Diamond or White Sapphire",
    overview: "Venus casts a gentle, prosperous gaze across your chart. Harmony reigns supreme in your household and auspicious financial discussions gain strong momentum.",
    career: "Prudent long-term investments yield optimistic outlooks. If managing property or creative projects, this is an excellent transit to finalize contracts.",
    love: "Domestic warmth and romantic tenderness strengthen marital bonds. Spending quality time with loved ones restores peace.",
    wellness: "Pay attention to vocal cord and neck tension. Gentle stretching and listening to soothing mantras will ground your energy."
  },
  gemini: {
    name: "Gemini",
    vedic: "Mithuna (मिथुन)",
    dates: "May 21 - Jun 20",
    glyph: "♊",
    element: "Air",
    ruler: "Mercury (Budha)",
    color: "Emerald Green & Light Yellow",
    numbers: "5, 14, 23",
    gemstone: "Emerald (Panna)",
    overview: "Mercury stimulates your cognitive agility and communication acumen. Your words carry high persuasive resonance in business meetings and written proposals.",
    career: "Ideal day for sales pitches, marketing strategy, publishing, and digital ventures. Networking brings high-value connections.",
    love: "Playful banter and intellectual resonance spark sparks of connection. Plan an impromptu evening conversation or cultural outing.",
    wellness: "Mental overstimulation can cause restlessness. Practice alternate nostril breathing (Pranayama) before sleeping."
  },
  cancer: {
    name: "Cancer",
    vedic: "Karka (कर्क)",
    dates: "Jun 21 - Jul 22",
    glyph: "♋",
    element: "Water",
    ruler: "Moon (Chandra)",
    color: "Pearl White & Silver",
    numbers: "2, 11, 20",
    gemstone: "Natural Pearl (Moti)",
    overview: "The Moon enhances your intuitive perception and emotional intelligence. Listen closely to your inner voice when making major household or financial decisions.",
    career: "Collaborative teamwork flourishes under your nurturing guidance. Recognition from seniors or mentors is indicated.",
    love: "Deep emotional bonding and shared heartfelt memories bring couples closer. A blessing from an elderly matriarch is indicated.",
    wellness: "Digestive sensitivity requires light, wholesome, Sattvic meals. Drinking water from a silver vessel balances lunar energies."
  },
  leo: {
    name: "Leo",
    vedic: "Simha (सिंह)",
    dates: "Jul 23 - Aug 22",
    glyph: "♌",
    element: "Fire",
    ruler: "Sun (Surya Dev)",
    color: "Golden Yellow & Saffron",
    numbers: "1, 10, 19",
    gemstone: "Ruby (Manik)",
    overview: "Surya Bhagwan empowers your aura with magnificent radiance and natural authority. Your leadership capabilities stand out effortlessly in any room.",
    career: "Key milestones in administrative, government, or executive pursuits receive favorable cosmic support. Step up to take charge.",
    love: "Generosity and warmth win admiration. Share your triumphs humbly with your partner to foster enduring mutual respect.",
    wellness: "Cardiovascular and spinal health are strong. Morning Surya Namaskar facing the rising sun multiplies your vitality."
  },
  virgo: {
    name: "Virgo",
    vedic: "Kanya (कन्या)",
    dates: "Aug 23 - Sep 22",
    glyph: "♍",
    element: "Earth",
    ruler: "Mercury (Budha)",
    color: "Dark Green & Navy Blue",
    numbers: "5, 14, 32",
    gemstone: "Green Tourmaline or Emerald",
    overview: "Analytical clarity reaches its peak. You can spot minute details and financial optimizations that others overlook, bringing practical peace of mind.",
    career: "Accounting, audits, legal documentation, and research activities move forward without obstacles. Efficiency is your superpower today.",
    love: "Acts of helpful service and thoughtful consideration mean more than grand gestures. Express your appreciation openly.",
    wellness: "Support nervous system balance with herbal chamomile or tulsi tea. Keep screen time controlled during late evening."
  },
  libra: {
    name: "Libra",
    vedic: "Tula (तुला)",
    dates: "Sep 23 - Oct 22",
    glyph: "♎",
    element: "Air",
    ruler: "Venus (Shukra)",
    color: "Pastel Pink & Sky Blue",
    numbers: "6, 15, 33",
    gemstone: "Opal or Blue Diamond",
    overview: "The scales find divine equilibrium. Aesthetic appreciation, social grace, and balanced judgment allow you to mediate longstanding disputes smoothly.",
    career: "Partnerships, client relations, and public relations initiatives yield fruitful agreements. Keep contractual clauses clear and transparent.",
    love: "Romance and mutual harmony blossom effortlessly. A memorable date night or affectionate gesture strengthens vows.",
    wellness: "Kidney and lower back health benefit from consistent hydration and mindful posture during work hours."
  },
  scorpio: {
    name: "Scorpio",
    vedic: "Vrishchika (वृश्चिक)",
    dates: "Oct 23 - Nov 21",
    glyph: "♏",
    element: "Water",
    ruler: "Mars / Ketu",
    color: "Maroon & Jet Black",
    numbers: "9, 18, 36",
    gemstone: "Red Coral or Cat's Eye",
    overview: "Deep transformative cosmic currents are at work. Secret aspirations, hidden knowledge, and spiritual insights emerge into conscious awareness.",
    career: "Investigative work, strategic turnaround plans, and financial settlements proceed advantageously. Keep your plans discreet for now.",
    love: "Intense emotional loyalty and vulnerability deepen soul-level connections. Release old grudges to welcome higher blessings.",
    wellness: "Channel intense emotions into invigorating physical exercise or spiritual Sadhana. Avoid excessive spicy foods."
  },
  sagittarius: {
    name: "Sagittarius",
    vedic: "Dhanu (धनु)",
    dates: "Nov 22 - Dec 21",
    glyph: "♐",
    element: "Fire",
    ruler: "Jupiter (Brihaspati)",
    color: "Bright Yellow & Golden Ochre",
    numbers: "3, 12, 21",
    gemstone: "Yellow Sapphire (Pukhraj)",
    overview: "Guru Brihaspati bestows expansive fortune, wisdom, and philosophical joy. Optimism is your magnet for auspicious coincidences and noble mentors.",
    career: "Higher education, international trade, mentoring, and legal matters receive great acceleration. An inspiring new journey begins.",
    love: "Shared spiritual values and philosophical discussions bring wonderful companionship. Plan an outdoor excursion together.",
    wellness: "Liver health and vitality are strong. Walking in nature under open skies rejuvenates your optimistic spirit."
  },
  capricorn: {
    name: "Capricorn",
    vedic: "Makara (मकर)",
    dates: "Dec 22 - Jan 19",
    glyph: "♑",
    element: "Earth",
    ruler: "Saturn (Shani Dev)",
    color: "Dark Blue & Charcoal",
    numbers: "8, 17, 26",
    gemstone: "Blue Sapphire (Neelam)",
    overview: "Shani Dev rewards discipline, perseverance, and ethical conduct. Your longstanding labor begins showing concrete, structured results.",
    career: "Senior executives and institutions notice your dependability. Solid foundations are being laid for enduring long-term prestige.",
    love: "Quiet steadfast devotion and emotional security form the bedrock of your relationship. Honor traditional family commitments.",
    wellness: "Knee joints and bones require nourishment. Include calcium-rich foods, sesame oil massage, and warm baths."
  },
  aquarius: {
    name: "Aquarius",
    vedic: "Kumbha (कुम्भ)",
    dates: "Jan 20 - Feb 18",
    glyph: "♒",
    element: "Air",
    ruler: "Saturn / Rahu",
    color: "Electric Cyan & Royal Purple",
    numbers: "4, 13, 22",
    gemstone: "Hessonite Garnet (Gomed)",
    overview: "Visionary ideas and humanitarian pursuits find strong resonance today. You are inspired to innovate and connect with wider communities.",
    career: "Technology, scientific research, unconventional ventures, and community projects gain extraordinary momentum. Think outside conventional boundaries.",
    love: "Friendship forms the highest pillar of romantic fulfillment. Emphasize intellectual camaraderie and mutual freedom.",
    wellness: "Circulation and ankles require care. Leg elevation and rhythmic movement during work breaks will sustain peak stamina."
  },
  pisces: {
    name: "Pisces",
    vedic: "Meena (मीन)",
    dates: "Feb 19 - Mar 20",
    glyph: "♓",
    element: "Water",
    ruler: "Jupiter (Brihaspati)",
    color: "Sea Green & Pale Gold",
    numbers: "3, 12, 30",
    gemstone: "Yellow Topaz or Pukhraj",
    overview: "Mystical intuition and artistic inspiration flow abundantly. Dreams and spiritual inclinations offer direct answers to complex life dilemmas.",
    career: "Creative arts, spiritual healing, counseling, and non-profit endeavors yield tremendous inner and outer satisfaction.",
    love: "Compassionate, unconditional love dissolves tensions. A poetic or heartfelt expression touches your beloved deeply.",
    wellness: "Foot reflexology, adequate restful sleep, and meditation by water will purify your energetic aura."
  }
};

function initZodiacHoroscope() {
  const cards = document.querySelectorAll('.zodiac-card');
  const displaySignName = document.getElementById('horoscope-sign-name');
  const displaySignVedic = document.getElementById('horoscope-sign-vedic');
  const displaySignDates = document.getElementById('horoscope-sign-dates');
  const displayBigGlyph = document.getElementById('horoscope-big-glyph');
  const displayRuler = document.getElementById('horoscope-ruler');
  const displayColor = document.getElementById('horoscope-color');
  const displayNumbers = document.getElementById('horoscope-numbers');
  const displayGemstone = document.getElementById('horoscope-gemstone');
  const displayOverview = document.getElementById('horoscope-overview');
  const displayCareer = document.getElementById('horoscope-career');
  const displayLove = document.getElementById('horoscope-love');
  const displayWellness = document.getElementById('horoscope-wellness');

  if (!cards.length || !displaySignName) return;

  function updateHoroscope(signKey) {
    const data = zodiacData[signKey];
    if (!data) return;

    // Update active class on cards
    cards.forEach(card => {
      if (card.getAttribute('data-sign') === signKey) {
        card.classList.add('active');
        card.setAttribute('aria-selected', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-selected', 'false');
      }
    });

    // Content fade animation
    const panel = document.querySelector('.horoscope-display-panel');
    if (panel) {
      panel.style.opacity = '0.4';
      panel.style.transform = 'translateY(4px)';
      panel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }

    setTimeout(() => {
      displaySignName.textContent = data.name;
      displaySignVedic.textContent = data.vedic;
      displaySignDates.textContent = data.dates;
      displayBigGlyph.textContent = data.glyph;
      displayRuler.textContent = data.ruler;
      displayColor.textContent = data.color;
      displayNumbers.textContent = data.numbers;
      displayGemstone.textContent = data.gemstone;
      displayOverview.textContent = data.overview;
      displayCareer.textContent = data.career;
      displayLove.textContent = data.love;
      displayWellness.textContent = data.wellness;

      if (panel) {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      }
    }, 120);
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const sign = card.getAttribute('data-sign');
      updateHoroscope(sign);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const sign = card.getAttribute('data-sign');
        updateHoroscope(sign);
      }
    });
  });
}

/* ==========================================================================
   4. PALMISTRY INTERACTIVE HIGHLIGHTER
   ========================================================================== */
function initPalmistryInteractive() {
  const legendItems = document.querySelectorAll('.legend-item');
  const svgLines = document.querySelectorAll('.palm-svg-line');

  if (!legendItems.length) return;

  legendItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const lineTarget = item.getAttribute('data-line');
      svgLines.forEach(line => {
        if (line.getAttribute('data-line') === lineTarget) {
          line.setAttribute('stroke-width', '5');
          line.style.filter = 'drop-shadow(0 0 6px #d97706)';
        } else {
          line.setAttribute('stroke-width', '2');
          line.style.opacity = '0.35';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      svgLines.forEach(line => {
        line.setAttribute('stroke-width', '3');
        line.style.opacity = '1';
        line.style.filter = 'none';
      });
    });
  });
}



/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordion items
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      } else {
        question.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE REVIEWS & DEVOTEE FEED ENGINE
   ========================================================================== */
function initReviewsPage() {
  const reviewsContainer = document.getElementById('reviews-feed-container');
  const reviewForm = document.getElementById('devotee-review-form');
  const totalReviewsPill = document.getElementById('total-reviews-count');
  const totalReviewsSub = document.getElementById('total-reviews-sub');
  const filterButtons = document.querySelectorAll('.review-filter-btn');
  const sortSelect = document.getElementById('review-sort-select');

  if (!reviewsContainer) return; // Only execute on pages with the review container

  // Initial reviews array reset to 0 (no hardcoded/dummy reviews)
  const defaultReviews = [];
  const STORAGE_KEY = 'bagla_astrology_reviews_v2';

  // Load reviews from localStorage or initialize
  function loadAllReviews() {
    try {
      // Clear legacy storage key with old mock reviews
      localStorage.removeItem('bagla_astrology_reviews');
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading reviews from localStorage:', e);
    }
    return defaultReviews;
  }

  function saveReviews(reviews) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Error saving reviews:', e);
    }
  }

  let allReviews = loadAllReviews();
  let currentFilter = 'all';
  let currentSort = 'newest';

  // Render Stars Helper
  function renderStars(rating) {
    let starsHtml = '';
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        starsHtml += `<svg viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      } else {
        starsHtml += `<svg viewBox="0 0 24 24" fill="#d4c5b5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      }
    }
    return starsHtml;
  }

  // Calculate and Update Total Review Counters & Real-Time Stats
  function updateStatistics() {
    const totalCount = allReviews.length;

    if (totalReviewsPill) {
      totalReviewsPill.innerHTML = `<span class="counter-num">${totalCount}</span> Devotee Review${totalCount === 1 ? '' : 's'}`;
    }
    if (totalReviewsSub) {
      totalReviewsSub.textContent = `Based on ${totalCount} verified devotee consultation${totalCount === 1 ? '' : 's'}`;
    }

    const avgScoreEl = document.getElementById('average-rating-number');
    const avgStarsEl = document.getElementById('average-rating-stars');

    if (totalCount === 0) {
      if (avgScoreEl) avgScoreEl.textContent = '0.0';
      if (avgStarsEl) avgStarsEl.innerHTML = renderStars(0);

      for (let k = 1; k <= 5; k++) {
        const fillEl = document.getElementById(`bar-fill-${k}`);
        const pctEl = document.getElementById(`bar-pct-${k}`);
        if (fillEl) fillEl.style.width = '0%';
        if (pctEl) pctEl.textContent = '0%';
      }
      return;
    }

    // Calculate actual average from submitted reviews
    const sumRatings = allReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0);
    const avg = (sumRatings / totalCount).toFixed(1);
    if (avgScoreEl) avgScoreEl.textContent = avg;
    if (avgStarsEl) avgStarsEl.innerHTML = renderStars(Number(avg));

    // Calculate percentage breakdown for 1 to 5 stars
    for (let k = 1; k <= 5; k++) {
      const count = allReviews.filter(r => Math.round(Number(r.rating)) === k).length;
      const pct = Math.round((count / totalCount) * 100);
      const fillEl = document.getElementById(`bar-fill-${k}`);
      const pctEl = document.getElementById(`bar-pct-${k}`);
      if (fillEl) fillEl.style.width = `${pct}%`;
      if (pctEl) pctEl.textContent = `${pct}%`;
    }
  }

  // Render Reviews List
  function renderReviews() {
    let filtered = allReviews.filter(rev => {
      if (currentFilter === 'all') return true;
      return (rev.service || '').toLowerCase().includes(currentFilter.toLowerCase());
    });

    if (currentSort === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (!filtered.length) {
      if (allReviews.length === 0) {
        reviewsContainer.innerHTML = `
          <div class="empty-reviews-card">
            <div class="empty-sacred-icon">🕉️</div>
            <h3 class="empty-title">Abhi Tak Koi Review Darj Nahi Hua Hai</h3>
            <p class="empty-subtitle">
              Shastri Amit Kumar Sharma Ji ke sath apna pavitra anubhav share karne wale pehle bhakt banein!
            </p>
            <p class="empty-en">
              (No devotee reviews recorded yet. Be the first to share your sincere spiritual experience!)
            </p>
            <a href="#write-review" class="btn btn-gold" style="margin-top: 14px; font-size: 0.9rem; padding: 12px 28px;">
              <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              <span>Pehla Review Likhein (Write First Review)</span>
            </a>
          </div>
        `;
      } else {
        reviewsContainer.innerHTML = `
          <div class="empty-reviews-card">
            <div class="empty-sacred-icon">🔍</div>
            <h3 class="empty-title">Is Category Me Koi Review Nahi Mila</h3>
            <p class="empty-subtitle">Kripya "All Reviews" filter select karein ya naya review submit karein.</p>
          </div>
        `;
      }
      return;
    }

    reviewsContainer.innerHTML = filtered.map(review => {
      const initials = (review.name || 'D').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      return `
        <div class="devotee-review-card" data-id="${review.id}">
          <div class="review-card-top">
            <div class="devotee-profile">
              <div class="devotee-avatar">${initials}</div>
              <div class="devotee-details">
                <h4>
                  ${review.name}
                  <span class="verified-devotee-badge">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    Verified
                  </span>
                </h4>
                <div class="devotee-location">${review.city}</div>
              </div>
            </div>
            <span class="review-service-pill">${review.service}</span>
          </div>

          <div class="review-rating-line">
            <div class="review-stars">
              ${renderStars(review.rating)}
            </div>
            <span class="review-date-text">${review.date}</span>
          </div>

          <h3 class="review-title-text">${review.title}</h3>
          <p class="review-body-text">${review.comment}</p>

          <div class="review-card-footer">
            <button class="helpful-btn" onclick="handleHelpfulClick(${review.id})">
              <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
              <span>Pranam / Helpful (${review.helpful || 0})</span>
            </button>
            <span style="font-size: 0.76rem; color: var(--gold-500); font-weight: 600;">Authentic Consultation</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Star Rating Picker interactive text
  const starInputs = document.querySelectorAll('input[name="review-rating"]');
  const starLabel = document.getElementById('selected-star-label');
  const ratingTexts = {
    "5": "5 Stars — Exceptional & Blessed Guidance",
    "4": "4 Stars — Very Sincere & Helpful Guidance",
    "3": "3 Stars — Satisfactory Consultation",
    "2": "2 Stars — Average Experience",
    "1": "1 Star — Needs Improvement"
  };

  starInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (starLabel) {
        starLabel.textContent = ratingTexts[input.value] || `${input.value} Stars`;
      }
    });
  });

  // Filter Buttons Click
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderReviews();
    });
  });

  // Sort Dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderReviews();
    });
  }

  // Handle Form Submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reviewer-name')?.value.trim();
      const city = document.getElementById('reviewer-city')?.value.trim() || 'Jaipur, India';
      const service = document.getElementById('reviewer-service')?.value || 'Vedic Astrology Consultation';
      const selectedRatingInput = document.querySelector('input[name="review-rating"]:checked');
      const rating = selectedRatingInput ? parseInt(selectedRatingInput.value, 10) : 5;
      const title = document.getElementById('reviewer-title')?.value.trim() || 'Thoughtful & Sincere Spiritual Guidance';
      const comment = document.getElementById('reviewer-comment')?.value.trim();

      if (!name) {
        alert('Please enter your name.');
        document.getElementById('reviewer-name')?.focus();
        return;
      }
      if (!comment) {
        alert('Please write a brief summary of your consultation experience.');
        document.getElementById('reviewer-comment')?.focus();
        return;
      }

      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);

      const newReview = {
        id: Date.now(),
        name: name,
        city: city,
        service: service,
        rating: rating,
        date: formattedDate,
        title: title,
        comment: comment,
        helpful: 1
      };

      // Add to array and save
      allReviews.unshift(newReview);
      saveReviews(allReviews);

      // Update counters & UI
      updateStatistics();
      renderReviews();

      // Show Thank You Box with WhatsApp share button
      const successBox = document.getElementById('review-success-toast');
      if (successBox) {
        const waReviewText = encodeURIComponent(
          `Pranam Shastri Amit Kumar Sharma Ji,\n\nMaine aapki website par naya review submit kiya hai:\n- Devotee: ${name} (${city})\n- Service: ${service}\n- Rating: ${rating}/5 Stars\n- Title: ${title}\n- Review: "${comment}"\n\nJai Maa Baglamukhi!`
        );
        successBox.innerHTML = `
          <h4>🙏 Pranam ${name}! Thank You for Your Blessed Review</h4>
          <p style="margin-bottom: 14px;">
            Aapka review website par successfully add ho gaya hai! Ab total <strong>${allReviews.length}</strong> review darj ho chuke hain.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="https://wa.me/919829743685?text=${waReviewText}" target="_blank" class="btn btn-whatsapp" style="font-size: 0.86rem; padding: 10px 20px;">
              <span>Also Send this Review to Shastri Ji on WhatsApp</span>
            </a>
            <a href="#reviews-feed-container" class="btn btn-gold" style="font-size: 0.86rem; padding: 10px 20px;">
              <span>View Your Review in Feed</span>
            </a>
          </div>
        `;
        successBox.style.display = 'block';
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset Form
      reviewForm.reset();
      if (starLabel) {
        starLabel.textContent = "5 Stars — Exceptional & Blessed Guidance";
      }
      const defaultRadio = document.querySelector('input[name="review-rating"][value="5"]');
      if (defaultRadio) defaultRadio.checked = true;
    });
  }

  // Global helpful handler attached to window
  window.handleHelpfulClick = function(id) {
    const rev = allReviews.find(r => r.id === id);
    if (rev) {
      rev.helpful = (rev.helpful || 0) + 1;
      saveReviews(allReviews);
      renderReviews();
    }
  };

  // Initial render on page load
  updateStatistics();
  renderReviews();
}

