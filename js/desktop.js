/* ==========================================
   DESKTOP.JS — Full Cinematic PC Experience
   Surya Teja Portfolio
   ========================================== */

/* Global visibility flag — pause heavy animations when tab is hidden */
let tabVisible = true;
document.addEventListener('visibilitychange', () => { tabVisible = !document.hidden; });

/* ══════════════════════════════════════════════
   PRELOADER — Circuit Board Animation
══════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('pre-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();

  const lines = [], nodes = [];
  const colors = ['#7B2FFF', '#FF2D55', '#00FFCC', 'rgba(123,47,255,0.4)'];

  // Generate circuit paths
  for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = 80 + Math.random() * 200;
    const startX = W / 2 + (Math.random() - .5) * 40;
    const startY = H / 2 + (Math.random() - .5) * 40;
    const segments = [];
    let cx = startX, cy = startY;
    for (let s = 0; s < 4; s++) {
      const a = angle + s * (Math.PI / 2) * (Math.random() > .5 ? 1 : -1);
      const l = 30 + Math.random() * 60;
      segments.push({ x1: cx, y1: cy, x2: cx + Math.cos(a) * l, y2: cy + Math.sin(a) * l });
      cx += Math.cos(a) * l; cy += Math.sin(a) * l;
    }
    lines.push({ segments, progress: 0, delay: Math.random() * 1.5, color: colors[Math.floor(Math.random() * colors.length)] });
  }

  let start = null;
  function drawPre(ts) {
    if (!start) start = ts;
    const t = (ts - start) / 3000;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // Draw circuit lines
    lines.forEach(line => {
      if (t < line.delay) return;
      const localT = Math.min((t - line.delay) * 2, 1);
      let drawn = 0, total = line.segments.reduce((a, s) => a + Math.hypot(s.x2 - s.x1, s.y2 - s.y1), 0);
      let target = total * localT;
      line.segments.forEach(seg => {
        const segLen = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1);
        if (drawn >= target) { return; }
        const frac = Math.min((target - drawn) / segLen, 1);
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = .8;
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x1 + (seg.x2 - seg.x1) * frac, seg.y1 + (seg.y2 - seg.y1) * frac);
        ctx.stroke();
        // Node dot at end
        if (frac >= .99) {
          ctx.beginPath();
          ctx.arc(seg.x2, seg.y2, 2, 0, Math.PI * 2);
          ctx.fillStyle = line.color;
          ctx.fill();
        }
        drawn += segLen;
      });
    });

    if (t < 1.5) requestAnimationFrame(drawPre);
  }
  requestAnimationFrame(drawPre);

  // Progress bar
  const bar = document.getElementById('preBar');
  const pct = document.getElementById('prePct');
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 3 + .5;
    if (p >= 100) { p = 100; clearInterval(iv); triggerReveal(); }
    bar.style.width = p + '%';
    pct.textContent = Math.floor(p) + '%';
  }, 40);

  function triggerReveal() {
    setTimeout(() => {
      const flash = document.getElementById('preFlash');
      flash.style.transition = 'opacity .15s';
      flash.style.opacity = '1';
      setTimeout(() => {
        flash.style.transition = 'opacity .8s';
        flash.style.opacity = '0';
        document.getElementById('preloader').style.transition = 'opacity .6s';
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('preloader').style.display = 'none';
          document.body.classList.add('cinema');
        }, 600);
      }, 150);
    }, 400);
  }
})();


/* ══════════════════════════════════════════════
   THREE.JS — Particle Sphere AI Brain
══════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('three-canvas');
  if (!window.THREE) { canvas.style.display = 'none'; return; }
  const W = () => window.innerWidth, H = () => window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, W() / H(), .1, 1000);
  camera.position.z = 5.5;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W(), H());

  // ─ Main particle sphere ─
  const N = 1500;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), sizes = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(1 - 2 * (i + .5) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + .5);
    const r = 2.2 + (Math.random() - .5) * .5;
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
    // violet→pink gradient by latitude
    const t = (pos[i * 3 + 1] + r) / (2 * r);
    col[i * 3] = .48 + t * .3;    // R
    col[i * 3 + 1] = .18 - t * .1;  // G
    col[i * 3 + 2] = 1 - t * .4;    // B
    sizes[i] = Math.random() * .5 + .3;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: .035, vertexColors: true, transparent: true, opacity: .85, blending: THREE.AdditiveBlending, depthWrite: false });
  const sphere = new THREE.Points(geo, mat);
  scene.add(sphere);

  // ─ Inner wireframe ─
  const wGeo = new THREE.SphereGeometry(1.6, 14, 14);
  const wMat = new THREE.MeshBasicMaterial({ color: 0x7B2FFF, wireframe: true, transparent: true, opacity: .06 });
  const wSphere = new THREE.Mesh(wGeo, wMat);
  scene.add(wSphere);

  // ─ Orbital rings ─
  [[2.6, 0x7B2FFF, .15, .3, 0], [2.85, 0xFF2D55, .1, .5, .8], [3.1, 0x00FFCC, .07, .7, -.4]].forEach(([r, c, o, rx, ry]) => {
    const rg = new THREE.RingGeometry(r, r + .025, 40);
    const rm = new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide, transparent: true, opacity: o });
    const ring = new THREE.Mesh(rg, rm);
    ring.rotation.x = rx; ring.rotation.y = ry;
    scene.add(ring);
  });

  // ─ Floating satellite particles ─
  const satGeo = new THREE.BufferGeometry();
  const satPos = new Float32Array(60 * 3);
  for (let i = 0; i < 60; i++) {
    satPos[i * 3] = (Math.random() - .5) * 12;
    satPos[i * 3 + 1] = (Math.random() - .5) * 12;
    satPos[i * 3 + 2] = (Math.random() - .5) * 12;
  }
  satGeo.setAttribute('position', new THREE.BufferAttribute(satPos, 3));
  const satMat = new THREE.PointsMaterial({ color: 0x7B2FFF, size: .025, transparent: true, opacity: .3, blending: THREE.AdditiveBlending });
  scene.add(new THREE.Points(satGeo, satMat));

  // ─ Mouse tracking ─
  let mx = 0, my = 0, trX = 0, trY = 0;
  document.addEventListener('mousemove', e => { mx = (e.clientX / W() - .5) * 2; my = -(e.clientY / H() - .5) * 2; });

  let clock = 0;
  (function animate() {
    requestAnimationFrame(animate);
    if (!tabVisible) return;
    clock += .005;
    trX += (mx * .4 - trX) * .04;
    trY += (my * .3 - trY) * .04;
    sphere.rotation.y += .0025 + trX * .008;
    sphere.rotation.x = trY * .15;
    wSphere.rotation.y -= .003; wSphere.rotation.x += .001;
    const pulse = 1 + Math.sin(clock * 2) * .015;
    sphere.scale.setScalar(pulse);
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    camera.aspect = W() / H(); camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });
})();


/* ══════════════════════════════════════════════
   DATA STREAM — Matrix-style columns
══════════════════════════════════════════════ */
(function () {
  const c = document.getElementById('stream-canvas');
  const ctx = c.getContext('2d');
  let W, H, cols, drops;
  const chars = 'アイウエオカキクケコ01AIGENAI∑∆∇⚡λπ';
  function init() {
    W = c.width = window.innerWidth; H = c.height = window.innerHeight;
    cols = Math.floor(W / 22); drops = Array(cols).fill(0);
  }
  init(); window.addEventListener('resize', init);
  setInterval(() => {
    if (!tabVisible) return;
    ctx.fillStyle = 'rgba(6,0,15,.08)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(123,47,255,0.6)';
    ctx.font = '12px Share Tech Mono';
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 22, y * 22);
      if (y * 22 > H && Math.random() > .975) drops[i] = 0;
      else drops[i]++;
    });
  }, 150);
})();


/* ══════════════════════════════════════════════
   CURSOR + PARTICLE EXPLOSION
══════════════════════════════════════════════ */
(function () {
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  const pc = document.getElementById('particle-canvas');
  const ctx = pc.getContext('2d');
  pc.width = window.innerWidth; pc.height = window.innerHeight;
  window.addEventListener('resize', () => { pc.width = window.innerWidth; pc.height = window.innerHeight; });

  let mx = 0, my = 0, rx = 0, ry = 0;
  const particles = [];
  const cols = ['#7B2FFF', '#FF2D55', '#00FFCC', '#FFD60A'];

  let lastMove = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    const now = performance.now();
    if (now - lastMove < 40) return; // throttle to ~25fps
    lastMove = now;
    if (particles.length < 80) {
      particles.push({
        x: mx, y: my,
        vx: (Math.random() - .5) * 3.5,
        vy: (Math.random() - .5) * 3.5,
        life: 1, decay: .04 + Math.random() * .04,
        size: Math.random() * 3.5 + 1,
        color: cols[Math.floor(Math.random() * cols.length)]
      });
    }
  });

  // Click burst
  document.addEventListener('click', e => {
    for (let i = 0; i < 12; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 5;
      particles.push({
        x: e.clientX, y: e.clientY,
        vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
        life: 1, decay: .03 + Math.random() * .04,
        size: Math.random() * 4 + 2,
        color: cols[Math.floor(Math.random() * cols.length)]
      });
    }
  });

  document.querySelectorAll('a,button,[data-mag]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(3)';
      ring.style.width = '60px'; ring.style.height = '60px';
      ring.style.borderColor = 'var(--pink)';
      ring.style.borderWidth = '2px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.width = '32px'; ring.style.height = '32px';
      ring.style.borderColor = 'var(--violet)';
      ring.style.borderWidth = '1px';
    });
  });

  (function loop() {
    rx += (mx - rx) * .15; ry += (my - ry) * .15;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';

    ctx.clearRect(0, 0, pc.width, pc.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vx *= .94; p.vy *= .94;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(loop);
  })();
})();


/* ══════════════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════════════ */
document.querySelectorAll('[data-mag]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * .22}px,${dy * .22}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});


/* ══════════════════════════════════════════════
   VORTEX CONTACT CANVAS
══════════════════════════════════════════════ */
(function () {
  const c = document.getElementById('vortex-canvas');
  const ctx = c.getContext('2d');
  const sec = document.getElementById('contact');
  function size() { c.width = sec.offsetWidth; c.height = sec.offsetHeight; }
  size(); window.addEventListener('resize', size);
  const pts = [];
  for (let i = 0; i < 40; i++) {
    pts.push({
      angle: Math.random() * Math.PI * 2,
      r: 80 + Math.random() * 200,
      speed: (.002 + Math.random() * .004) * (Math.random() > .5 ? 1 : -1),
      size: Math.random() * 2.5 + .8,
      color: ['rgba(123,47,255,.8)', 'rgba(255,45,85,.6)', 'rgba(0,255,204,.5)'][Math.floor(Math.random() * 3)]
    });
  }
  let vortexFrame = 0;
  (function anim() {
    requestAnimationFrame(anim);
    if (!tabVisible) return;
    // throttle to ~30fps
    vortexFrame++;
    if (vortexFrame % 2 !== 0) return;
    ctx.fillStyle = 'rgba(0,0,0,.04)';
    ctx.fillRect(0, 0, c.width, c.height);
    const cx = c.width / 2, cy = c.height / 2;
    pts.forEach(p => {
      p.angle += p.speed;
      const x = cx + Math.cos(p.angle) * p.r;
      const y = cy + Math.sin(p.angle) * p.r * .4;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  })();
})();


/* ══════════════════════════════════════════════
   AUDIO VISUALIZER STRIP (visual only)
══════════════════════════════════════════════ */
(function () {
  const strip = document.getElementById('vizStrip');
  for (let i = 0; i < 30; i++) {
    const b = document.createElement('div');
    b.className = 'viz-bar';
    b.style.animationDuration = (0.8 + Math.random() * .8) + 's';
    b.style.animationDelay = (Math.random() * 1.5) + 's';
    strip.appendChild(b);
  }
})();


/* ══════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════ */
const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('vis'), i * 80);
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));


/* ══════════════════════════════════════════════
   NAV SCROLL BEHAVIOR
══════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (scrollY > 80) {
    nav.style.background = 'rgba(6,0,15,.95)';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.borderBottom = '1px solid rgba(123,47,255,.15)';
  } else {
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom = 'none';
  }
});


/* ══════════════════════════════════════════════
   TEXT SCRAMBLE on hero name (subtle)
══════════════════════════════════════════════ */
(function () {
  const glyphSet = '█▓▒░∑∆∇⌬◈◆◇▲▶◉01';
  function scramble(el) {
    const original = el.textContent;
    let iter = 0;
    const iv = setInterval(() => {
      el.textContent = original.split('').map((c, i) => {
        if (i < iter) return original[i];
        return c === ' ' ? ' ' : glyphSet[Math.floor(Math.random() * glyphSet.length)];
      }).join('');
      if (iter >= original.length) { clearInterval(iv); el.textContent = original; }
      iter += .5;
    }, 40);
  }
  document.querySelectorAll('.chr').forEach(el => {
    el.addEventListener('mouseenter', () => scramble(el));
  });
})();