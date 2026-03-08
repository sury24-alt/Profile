/* ==========================================
   MOBILE.JS — Touch-Optimized Mobile Experience
   Surya Teja Portfolio
   ========================================== */

/* BG Canvas */
const bgC=document.getElementById('bg-c'),bgCtx=bgC.getContext('2d');
let W,H;
function res(){W=bgC.width=innerWidth;H=bgC.height=innerHeight}res();
window.addEventListener('resize',res);
const pts=[];
for(let i=0;i<60;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.2+.3,pulse:Math.random()*Math.PI*2});
(function draw(){requestAnimationFrame(draw);bgCtx.fillStyle='rgba(6,0,15,.09)';bgCtx.fillRect(0,0,W,H);
pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.pulse+=.012;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1});
for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<90){bgCtx.beginPath();bgCtx.strokeStyle=`rgba(123,47,255,${(1-d/90)*.18})`;bgCtx.lineWidth=.5;bgCtx.moveTo(pts[i].x,pts[i].y);bgCtx.lineTo(pts[j].x,pts[j].y);bgCtx.stroke()}}
bgCtx.beginPath();bgCtx.arc(pts[i].x,pts[i].y,pts[i].r,0,Math.PI*2);bgCtx.fillStyle=`rgba(123,47,255,${(Math.sin(pts[i].pulse)*.3+.5)*.5})`;bgCtx.fill()}})();

/* Vortex Contact */
const vc=document.getElementById('v-canvas'),vCtx=vc.getContext('2d');
const contactSec=document.getElementById('contact');
function vsz(){vc.width=contactSec.offsetWidth;vc.height=contactSec.offsetHeight}vsz();window.addEventListener('resize',vsz);
const vpts=[];for(let i=0;i<70;i++)vpts.push({a:Math.random()*Math.PI*2,r:40+Math.random()*150,spd:(.003+Math.random()*.004)*(Math.random()>.5?1:-1),sz:Math.random()*1.5+.3,col:['rgba(123,47,255,.7)','rgba(255,45,85,.5)','rgba(0,255,204,.4)'][Math.floor(Math.random()*3)]});
(function va(){requestAnimationFrame(va);vCtx.fillStyle='rgba(0,0,0,.05)';vCtx.fillRect(0,0,vc.width,vc.height);const cx=vc.width/2,cy=vc.height/2;vpts.forEach(p=>{p.a+=p.spd;const x=cx+Math.cos(p.a)*p.r,y=cy+Math.sin(p.a)*p.r*.45;vCtx.beginPath();vCtx.arc(x,y,p.sz,0,Math.PI*2);vCtx.fillStyle=p.col;vCtx.shadowBlur=6;vCtx.shadowColor=p.col;vCtx.fill();vCtx.shadowBlur=0})})();

/* Viz strip */
const vs=document.getElementById('vstrip');
for(let i=0;i<50;i++){const b=document.createElement('div');b.className='vb';b.style.animationDuration=(.7+Math.random()*.9)+'s';b.style.animationDelay=(Math.random()*1.4)+'s';vs.appendChild(b)}

/* Scroll reveal */
const io=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('vis'),i*70)})},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* Scroll to top button */
window.addEventListener('scroll',()=>{
  document.getElementById('totop').classList.toggle('show',scrollY>300);
  const nav=document.querySelector('nav');
  nav.style.boxShadow=scrollY>10?'0 2px 20px rgba(0,0,0,.5)':'none';
});