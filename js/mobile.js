/* ==========================================================================
   MOBILE.JS — Interactive Showcase Mobile Engine with Meme Sound FX on Scroll
   Surya Teja Portfolio
   ========================================================================== */

/* ── Mobile Procedural Audio Synthesizer ── */
let mobileAudioCtx = null;

function initMobileAudio() {
  if (!mobileAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) mobileAudioCtx = new AudioContext();
  }
  if (mobileAudioCtx && mobileAudioCtx.state === 'suspended') {
    mobileAudioCtx.resume();
  }
}

['touchstart', 'click', 'scroll', 'touchmove'].forEach(evt => {
  window.addEventListener(evt, initMobileAudio, { passive: true });
});

function playMobileVineBoom() {
  if (!mobileAudioCtx) return;
  try {
    const now = mobileAudioCtx.currentTime;
    const osc = mobileAudioCtx.createOscillator();
    const gain = mobileAudioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.8);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(gain);
    gain.connect(mobileAudioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.95);
  } catch (e) {}
}

function playMobilePop() {
  if (!mobileAudioCtx) return;
  try {
    const now = mobileAudioCtx.currentTime;
    const osc = mobileAudioCtx.createOscillator();
    const gain = mobileAudioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.07);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(mobileAudioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.085);
  } catch (e) {}
}

// Mobile scroll meme sound trigger
let mobLastScrollY = window.scrollY;
let mobScrollAccum = 0;
let mobLastMemeTime = 0;
let mobMemeIdx = 0;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  const delta = Math.abs(currentY - mobLastScrollY);
  mobLastScrollY = currentY;
  mobScrollAccum += delta;

  const now = Date.now();
  if (mobScrollAccum > 320 && now - mobLastMemeTime > 300) {
    mobScrollAccum = 0;
    mobLastMemeTime = now;
    if (mobMemeIdx % 2 === 0) playMobileVineBoom();
    else playMobilePop();
    mobMemeIdx++;
  }
}, { passive: true });

/* ── Mobile Solar Preloader with Supernova Explosion ── */
(function initMobilePreloader() {
  const preloader = document.getElementById('preloader');
  const countNum = document.getElementById('preCounterNum');
  const statusTag = document.getElementById('preStatusTag');
  if (!preloader || !countNum) return;

  const statuses = [
    'IGNITION // SOLAR EMBER',
    'FUSION // PLASMA GRANULES',
    'COLLAPSE // IMPLOSION',
    'SUPERNOVA // ZERO-G DETONATION'
  ];

  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 5.5 + 2.8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      countNum.innerHTML = `100<span class="pct">%</span>`;
      if (statusTag) statusTag.textContent = statuses[2];

      // Phase 1: Gravitational Collapse
      countNum.style.transform = 'scale(0.85)';
      countNum.style.transition = 'transform 0.2s cubic-bezier(0.19, 1, 0.22, 1)';

      setTimeout(() => {
        // Phase 2: Supernova Detonation & Audio
        if (statusTag) statusTag.textContent = statuses[3];
        countNum.style.transform = 'scale(1.4)';
        playMobileVineBoom();

        setTimeout(() => {
          preloader.style.opacity = '0';
          preloader.style.transform = 'scale(1.1)';
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 600);
        }, 300);
      }, 200);

    } else {
      const formatted = String(Math.floor(progress)).padStart(2, '0');
      countNum.innerHTML = `${formatted}<span class="pct">%</span>`;
      const sIdx = Math.min(Math.floor((progress / 100) * (statuses.length - 2)), statuses.length - 3);
      if (statusTag) statusTag.textContent = statuses[sIdx];
    }
  }, 28);
})();

/* ── Mobile Theme Switcher ── */
let currentTheme = localStorage.getItem('surya_theme') || 'quantum';
document.documentElement.setAttribute('data-theme', currentTheme);

document.querySelectorAll('.mob-theme-btn').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.theme === currentTheme);
  btn.addEventListener('click', () => {
    currentTheme = btn.dataset.theme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('surya_theme', currentTheme);
    document.querySelectorAll('.mob-theme-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === currentTheme);
    });
  });
});

/* ── Scroll Reveal ── */
const io = new IntersectionObserver(entries => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), idx * 50);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));