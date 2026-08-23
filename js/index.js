/* ==========================================
   INDEX.JS — Launcher / Platform Selector
   Surya Teja Portfolio
   ========================================== */

/* ── CUSTOM CURSOR ── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

document.querySelectorAll('.card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform  = 'translate(-50%,-50%) scale(2.5)';
    ring.style.width     = '56px';
    ring.style.height    = '56px';
    ring.style.borderColor = 'var(--pink)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.transform  = 'translate(-50%,-50%) scale(1)';
    ring.style.width     = '34px';
    ring.style.height    = '34px';
    ring.style.borderColor = 'var(--violet)';
  });
});

(function cursorLoop() {
  rx += (mx - rx) * .15;
  ry += (my - ry) * .15;
  cur.style.left  = mx + 'px';
  cur.style.top   = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(cursorLoop);
})();


/* ── BACKGROUND NEURAL CANVAS ── */
const canvas = document.getElementById('bg');
const ctx    = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const pts = [];
for (let i = 0; i < 110; i++) {
  pts.push({
    x:     Math.random() * W,
    y:     Math.random() * H,
    vx:    (Math.random() - .5) * .28,
    vy:    (Math.random() - .5) * .28,
    r:     Math.random() * 1.5 + .4,
    pulse: Math.random() * Math.PI * 2
  });
}

(function draw() {
  requestAnimationFrame(draw);
  ctx.fillStyle = 'rgba(0,0,0,.07)';
  ctx.fillRect(0, 0, W, H);

  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.pulse += .014;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });

  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 115) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(123,47,255,${(1 - d / 115) * .22})`;
        ctx.lineWidth   = .5;
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
    const g = Math.sin(pts[i].pulse) * .4 + .6;
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
    ctx.fillStyle   = `rgba(123,47,255,${g * .5})`;
    ctx.shadowBlur  = 7;
    ctx.shadowColor = 'rgba(123,47,255,.5)';
    ctx.fill();
    ctx.shadowBlur  = 0;
  }
})();


/* ── PAGE TRANSITION ── */
function goTo(url) {
  const t = document.getElementById('transition');
  t.classList.add('go');
  setTimeout(() => window.location.href = url, 500);
}

document.getElementById('dCard').addEventListener('click', e => {
  e.preventDefault();
  goTo('desktop.html');
});
document.getElementById('mCard').addEventListener('click', e => {
  e.preventDefault();
  goTo('mobile.html');
});


/* ── AUTO DEVICE DETECT ── */
const isMob = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
              || window.innerWidth < 768;
const msg = document.getElementById('autoMsg');

setTimeout(() => {
  msg.innerHTML = isMob
    ? 'Mobile device detected — <span>Mobile View recommended ↗</span>'
    : 'Desktop detected — <span>Full Experience recommended ↗</span>';

  const highlight = isMob
    ? document.getElementById('mCard')
    : document.getElementById('dCard');

  highlight.style.borderColor = isMob
    ? 'rgba(255,45,85,.6)'
    : 'rgba(123,47,255,.6)';
  highlight.style.boxShadow = isMob
    ? '0 0 40px rgba(255,45,85,.2)'
    : '0 0 40px rgba(123,47,255,.2)';
}, 1300);
