(function(){
'use strict';
var doc = document, root = doc.documentElement;
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $ = function(s,r){return (r||doc).querySelector(s)};
var $$ = function(s,r){return Array.prototype.slice.call((r||doc).querySelectorAll(s))};
var clamp = function(v,a,b){return v<a?a:(v>b?b:v)};
var S = {y:0, vw:window.innerWidth, vh:window.innerHeight, docH:0, maxY:0, vel:0, mx:0, my:0, tmx:0, tmy:0};
var bodyTop = 0;

try{ $('#yr').textContent = new Date().getFullYear(); }catch(e){}

/* ---------- layout helpers (transform-independent) ---------- */
function pageTop(el){ var y=0; while(el && el!==doc.body){ y+=el.offsetTop; el=el.offsetParent; } return y+bodyTop; }
function pageLeft(el){ var x=0; while(el && el!==doc.body){ x+=el.offsetLeft; el=el.offsetParent; } return x; }

/* ---------- nav / mobile menu ---------- */
var nav = $('#nav'), burger = $('#burger'), menu = $('#mmenu');
function setMenu(open){
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  doc.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });
$$('a', menu).forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });
doc.addEventListener('keydown', function(e){ if(e.key === 'Escape') setMenu(false); });

/* ---------- scroll-scrub elements ---------- */
var scrub = $$('.rv').map(function(el){ return {el:el, top:0, o:0, cur:0, last:-1}; });
$$('.rv-group').forEach(function(g){
  var kids = $$('.rv', g);
  kids.forEach(function(k){ var s = scrub.filter(function(x){return x.el===k;})[0]; if(s) s.grp = {g:g, i:kids.indexOf(k)}; });
});
var ctaScrub = scrub.filter(function(s){ return s.el.id === 'cta'; })[0];

/* word-by-word text reveal */
var wordEl = $('#wordScrub'), words = [], wordTop = 0, wordH = 0;
(function(){
  if(!wordEl) return;
  (function walk(node){
    Array.prototype.slice.call(node.childNodes).forEach(function(n){
      if(n.nodeType === 3){
        var frag = doc.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function(part){
          if(!part) return;
          if(/^\s+$/.test(part)) frag.appendChild(doc.createTextNode(' '));
          else { var s = doc.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); words.push({el:s, v:-1}); }
        });
        node.replaceChild(frag, n);
      } else if(n.nodeType === 1) walk(n);
    });
  })(wordEl);
})();

/* ---------- marquee (speed + skew follow scroll) ---------- */
var mq = $('#mq'), mqSet = $('.mq-set', mq), mqPos = 0, mqW = 1, mqDir = 1, mqSkew = 0;
function mqFill(){
  mqW = mqSet.getBoundingClientRect().width || 1;
  var need = Math.ceil(S.vw / mqW) + 1;
  while(mq.children.length < need){ var c = mqSet.cloneNode(true); c.setAttribute('aria-hidden','true'); mq.appendChild(c); }
}

/* ---------- timeline ---------- */
var tl = $('#tl'), steps = $$('.step', tl), tlTop = 0, tlH = 1, tlLast = -1;

/* ---------- hero ---------- */
var hero = $('[data-hero]'), heroH = 1, heroTop = 0;
var orbAnchor = $('#orbAnchor'), A = {hero:{cx:0,cy:0,w:1}, cta:{cx:0,cy:0,w:1,alpha:1}};
var ctaEl = $('#cta');
var secIds = ['home','about','services','portfolio','process','testimonials','blog','contact'];
var secs = {};

function measure(){
  S.vw = window.innerWidth; S.vh = window.innerHeight;
  bodyTop = doc.body.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
  S.docH = root.scrollHeight; S.maxY = Math.max(0, S.docH - S.vh);
  scrub.forEach(function(s){
    s.top = pageTop(s.el);
    s.o = 0;
    if(s.grp){
      var cols = 1, cs = window.getComputedStyle(s.grp.g);
      if(cs.display === 'grid') cols = cs.gridTemplateColumns.split(' ').length;
      s.o = (s.grp.i % cols) * 0.16;
    }
  });
  secIds.forEach(function(id){ var e = doc.getElementById(id); if(e) secs[id] = {top:pageTop(e), h:e.offsetHeight}; });
  if(wordEl){ wordTop = pageTop(wordEl); wordH = wordEl.offsetHeight; }
  tlTop = pageTop(tl); tlH = tl.offsetHeight || 1;
  heroTop = pageTop(hero); heroH = hero.offsetHeight || 1;
  var r = orbAnchor.getBoundingClientRect();
  A.hero.w = orbAnchor.offsetWidth; A.hero.cx = r.left + r.width/2; A.hero.cy = pageTop(orbAnchor) + orbAnchor.offsetHeight/2;
  if(ctaEl){
    var ct = pageTop(ctaEl), cw = ctaEl.offsetWidth, ch = ctaEl.offsetHeight;
    var vpLeft = ctaEl.parentNode.getBoundingClientRect().left;
    if(S.vw > 1000){
      var sz = Math.min(300, ch*1.5, cw*.26);
      A.cta.w = sz; A.cta.cx = vpLeft + cw*.515; A.cta.cy = ct + ch/2; A.cta.alpha = 1;
    } else {
      A.cta.w = Math.min(230, cw*.7); A.cta.cx = vpLeft + cw - A.cta.w*.3; A.cta.cy = ct + A.cta.w*.35; A.cta.alpha = .5;
    }
  }
  mqFill();
}

/* ---------- section spy + hero index ---------- */
var navLinksEl = $('.nav-links'), links = $$('.nav-links a'), idxBtns = $$('#idx button');
var navPill = doc.createElement('span'); navPill.className = 'nav-pill'; if(navLinksEl) navLinksEl.appendChild(navPill);
function movePill(a){
  if(!navLinksEl || !a) return;
  var r = a.getBoundingClientRect(), p = navLinksEl.getBoundingClientRect();
  navPill.style.width = r.width + 'px';
  navPill.style.transform = 'translateX('+(r.left - p.left)+'px)';
  navPill.classList.add('on');
}
function spy(){
  var y = (window.scrollY || 0) + S.vh*0.35, cur = 'home';
  secIds.forEach(function(id){ var s = secs[id]; if(s && s.top <= y) cur = id; });
  var active = null;
  links.forEach(function(a){ var on = a.getAttribute('href') === '#'+cur; a.classList.toggle('active', on); if(on) active = a; });
  if(active) movePill(active);
  var k = ['home','about','services','portfolio'].indexOf(cur);
  idxBtns.forEach(function(b,i){ b.classList.toggle('on', i === k); });
}
idxBtns.forEach(function(b){ b.addEventListener('click', function(){
  var t = doc.querySelector(b.getAttribute('data-t')); if(t) t.scrollIntoView({behavior: reduce ? 'auto':'smooth'});
}); });
links.forEach(function(a){
  a.addEventListener('mouseenter', function(){ movePill(a); });
});
if(navLinksEl) navLinksEl.addEventListener('mouseleave', function(){ var act = links.filter(function(a){return a.classList.contains('active');})[0]; if(act) movePill(act); });

/* ---------- pointer: card tilt + spotlight (mouse only) ---------- */
$$('.svc,.post').forEach(function(c){
  c.addEventListener('pointermove', function(e){
    if(e.pointerType !== 'mouse') return;
    var r = c.getBoundingClientRect(), px = (e.clientX - r.left)/r.width, py = (e.clientY - r.top)/r.height;
    c.style.setProperty('--mx', (px*r.width)+'px'); c.style.setProperty('--my', (py*r.height)+'px');
    if(!reduce){ c.style.setProperty('--ry', ((px-.5)*10)+'deg'); c.style.setProperty('--rx', ((.5-py)*8)+'deg'); }
  });
  c.addEventListener('pointerleave', function(){ c.style.setProperty('--rx','0deg'); c.style.setProperty('--ry','0deg'); });
});
window.addEventListener('pointermove', function(e){
  if(e.pointerType === 'mouse'){ S.tmx = e.clientX/S.vw - .5; S.tmy = e.clientY/S.vh - .5; }
}, {passive:true});

/* ---------- carousel (3D coverflow) ---------- */
function carousel(rootEl, opts){
  opts = opts || {};
  var track = $('.track', rootEl), slides = $$('.slide', track), i = 0, timer = null, hover = false, dots = [];
  if(opts.dots){ slides.forEach(function(_, k){ var b = doc.createElement('button'); b.setAttribute('aria-label','Go to slide '+(k+1)); b.addEventListener('click', function(){ go(k, true); }); opts.dots.appendChild(b); dots.push(b); }); }
  function layout(){
    var s = slides[i];
    track.style.transform = 'translate3d('+((rootEl.clientWidth - s.offsetWidth)/2 - s.offsetLeft)+'px,0,0)';
    slides.forEach(function(el,k){
      var on = k === i;
      el.classList.toggle('is-active', on);
      el.classList.toggle('is-before', k < i);
      el.classList.toggle('is-after', k > i);
      el.setAttribute('aria-hidden', on ? 'false' : 'true');
      $$('a,button', el).forEach(function(f){ f.tabIndex = on ? 0 : -1; });
    });
    dots.forEach(function(d,k){ d.classList.toggle('on', k === i); });
  }
  function go(n, user){ i = (n + slides.length) % slides.length; layout(); if(user) restart(); }
  function restart(){ clearInterval(timer); if(opts.auto && !reduce){ timer = setInterval(function(){ if(!hover && !doc.hidden) go(i+1); }, opts.auto); } }
  var scope = opts.controls || rootEl, p = $('[data-prev]', scope), n = $('[data-next]', scope);
  if(p) p.addEventListener('click', function(){ go(i-1, true); });
  if(n) n.addEventListener('click', function(){ go(i+1, true); });
  slides.forEach(function(s,k){ s.addEventListener('click', function(e){ if(k !== i){ e.preventDefault(); go(k, true); } }); });
  rootEl.addEventListener('mouseenter', function(){ hover = true; });
  rootEl.addEventListener('mouseleave', function(){ hover = false; });
  var sx = null, sy = null;
  rootEl.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive:true});
  rootEl.addEventListener('touchend', function(e){
    if(sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(i + (dx < 0 ? 1 : -1), true);
    sx = null;
  }, {passive:true});
  rootEl.setAttribute('tabindex','0');
  rootEl.addEventListener('keydown', function(e){ if(e.key === 'ArrowRight') go(i+1, true); if(e.key === 'ArrowLeft') go(i-1, true); });
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  if(doc.fonts && doc.fonts.ready) doc.fonts.ready.then(layout);
  layout(); restart();
}
carousel($('#workCar'), {auto:6500, controls: $('#portfolio')});
carousel($('#tCar'), {auto:7500, controls: $('#testimonials'), dots: $('#tDots')});

/* =====================================================
   3D SCENE (Three.js) — orb, rings, floating crystals
   ===================================================== */
var GL = null;
function initGL(){
  if(typeof THREE === 'undefined') return null;
  var cv = $('#gl'), renderer;
  try{ renderer = new THREE.WebGLRenderer({canvas:cv, alpha:true, antialias: S.vw > 700, powerPreference:'high-performance'}); }catch(e){ return null; }
  if(!renderer || !renderer.getContext()) return null;
  renderer.setClearColor(0x000000, 0);
  var scene = new THREE.Scene(), FOV = 32;
  var camera = new THREE.PerspectiveCamera(FOV, 1, 10, 8000);

  scene.add(new THREE.AmbientLight(0x8a7cff, .65));
  var L1 = new THREE.PointLight(0x8b5cf6, 1.7, 0), L2 = new THREE.PointLight(0x38bdf8, 1.4, 0);
  scene.add(L1); scene.add(L2);

  /* --- orb --- */
  var orb = new THREE.Group(); scene.add(orb);
  var orbMats = [];
  function reg(mat, base){ orbMats.push({m:mat, b:base}); return mat; }
  var coreMat = new THREE.ShaderMaterial({
    uniforms:{uA:{value:1}}, transparent:true,
    vertexShader:'varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }',
    fragmentShader:'varying vec3 vN; varying vec3 vV; uniform float uA; void main(){ float d = max(dot(vN,vV),0.0); float f = pow(1.0-d,2.6); vec3 inner = mix(vec3(.20,.08,.70), vec3(.40,.72,1.0), pow(d,4.0)); vec3 col = inner + vec3(.30,.50,1.0)*f*.9; gl_FragColor = vec4(col, uA); }'
  });
  var core = new THREE.Mesh(new THREE.SphereGeometry(.38, 48, 32), coreMat); orb.add(core);
  var hc = doc.createElement('canvas'); hc.width = hc.height = 128;
  var hx = hc.getContext('2d'), hg = hx.createRadialGradient(64,64,4,64,64,64);
  hg.addColorStop(0,'rgba(140,110,255,.95)'); hg.addColorStop(.35,'rgba(100,70,255,.35)'); hg.addColorStop(1,'rgba(80,60,255,0)');
  hx.fillStyle = hg; hx.fillRect(0,0,128,128);
  var halo = new THREE.Sprite(reg(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(hc), blending:THREE.AdditiveBlending, transparent:true, depthWrite:false, opacity:.85}), .85));
  halo.scale.set(2.6, 2.6, 1); orb.add(halo);

  var ringCfg = [
    {R:.94, r:[1.15,.25,.2],  sp:[.35,.22,.1],  n:16, w:.14, c1:0x7c4dff, c2:0x38bdf8},
    {R:1.0, r:[.5,1.0,-.6],   sp:[-.2,.3,.16],  n:16, w:.17, c1:0xa855f7, c2:0x6366f1},
    {R:.88, r:[-.4,.55,1.1],  sp:[.18,-.25,.2], n:14, w:.14, c1:0x3b82f6, c2:0xc084fc}
  ];
  var rings = ringCfg.map(function(c){
    var g = new THREE.Group(); g.rotation.set(c.r[0], c.r[1], c.r[2]);
    var col1 = new THREE.Color(c.c1), col2 = new THREE.Color(c.c2);
    for(var k=0;k<c.n;k++){
      var u = k/(c.n-1), rad = c.R*(1+(u-.5)*.18), off = (u-.5)*c.w*2, pts = new Float32Array(121*3);
      for(var j=0;j<=120;j++){ var a = j/120*Math.PI*2; pts[j*3] = Math.cos(a)*rad; pts[j*3+1] = Math.sin(a)*rad; pts[j*3+2] = off*Math.sin(a*2); }
      var geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pts,3));
      var m = reg(new THREE.LineBasicMaterial({color:col1.clone().lerp(col2,u), transparent:true, opacity:.3, blending:THREE.AdditiveBlending, depthWrite:false}), .3);
      g.add(new THREE.LineLoop(geo, m));
    }
    var tube = new THREE.Mesh(new THREE.TorusGeometry(c.R, .009, 6, 140), reg(new THREE.MeshBasicMaterial({color:c.c2, transparent:true, opacity:.55, blending:THREE.AdditiveBlending, depthWrite:false}), .55));
    g.add(tube);
    orb.add(g); return {g:g, sp:c.sp};
  });
  var pc = 170, pp = new Float32Array(pc*3);
  for(var q=0;q<pc;q++){ var th = Math.random()*6.283, ph = Math.acos(2*Math.random()-1), rr = .7 + Math.random()*.9; pp[q*3] = rr*Math.sin(ph)*Math.cos(th); pp[q*3+1] = rr*Math.sin(ph)*Math.sin(th); pp[q*3+2] = rr*Math.cos(ph); }
  var pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pp,3));
  var pts = new THREE.Points(pg, reg(new THREE.PointsMaterial({color:0xbcd2ff, size:2.2, sizeAttenuation:false, transparent:true, opacity:.8, blending:THREE.AdditiveBlending, depthWrite:false}), .8));
  orb.add(pts);
  var orbAlpha = -1;
  function setOrbAlpha(a){
    if(Math.abs(a - orbAlpha) < .004) return; orbAlpha = a;
    coreMat.uniforms.uA.value = a;
    orbMats.forEach(function(o){ o.m.opacity = o.b * a; });
  }

  /* --- floating crystals, anchored to sections and parallaxed --- */
  var defs = [
    {id:'about',        yf:.58, xf:.045, xm:.9,  size:58, type:'ico',   color:0x5b3df5, z:80,  k:1.25, keep:1},
    {id:'services',     yf:.05, xf:.60,  xm:.86, size:60, type:'oct',   color:0x2f6bff, z:120, k:1.15, keep:1},
    {id:'services',     yf:.92, xf:.96,  xm:.1,  size:46, type:'torus', color:0x8b5cf6, z:0,   k:.9,   keep:0},
    {id:'portfolio',    yf:.1,  xf:.52,  xm:.88, size:52, type:'tet',   color:0x38bdf8, z:100, k:1.2,  keep:1},
    {id:'portfolio',    yf:.97, xf:.04,  xm:.1,  size:40, type:'cube',  color:0x7c4dff, z:60,  k:.85,  keep:0},
    {id:'process',      yf:.07, xf:.94,  xm:.88, size:54, type:'knot',  color:0xa855f7, z:60,  k:1.2,  keep:1},
    {id:'testimonials', yf:.36, xf:.05,  xm:.1,  size:56, type:'ico',   color:0x38bdf8, z:100, k:1.1,  keep:1},
    {id:'testimonials', yf:.78, xf:.95,  xm:.9,  size:44, type:'oct',   color:0x7c4dff, z:20,  k:.9,   keep:0},
    {id:'blog',         yf:.04, xf:.5,   xm:.86, size:50, type:'torus', color:0x38bdf8, z:80,  k:1.2,  keep:1}
  ];
  function geoFor(t){
    switch(t){
      case 'ico': return new THREE.IcosahedronGeometry(1,0);
      case 'oct': return new THREE.OctahedronGeometry(1,0);
      case 'tet': return new THREE.TetrahedronGeometry(1.2,0);
      case 'cube': return new THREE.BoxGeometry(1.4,1.4,1.4);
      case 'knot': return new THREE.TorusKnotGeometry(.62,.2,90,12);
      default: return new THREE.TorusGeometry(.8,.28,16,48);
    }
  }
  var shapes = defs.map(function(d,n){
    var geo = geoFor(d.type), flat = /ico|oct|tet|cube/.test(d.type);
    var mat = new THREE.MeshStandardMaterial({color:d.color, metalness:.35, roughness:.3, emissive:new THREE.Color(d.color).multiplyScalar(.35), flatShading:flat, transparent:true, opacity:.92});
    var g = new THREE.Group(); g.add(new THREE.Mesh(geo, mat));
    if(flat){ g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({color:0xa5dcff, transparent:true, opacity:.6}))); }
    scene.add(g);
    return {g:g, mat:mat, d:d, r0:n*1.3, r1:n*.7, rs:.25 + (n%4)*.08};
  });

  function resize(){
    var dpr = Math.min(window.devicePixelRatio || 1, S.vw < 700 ? 1.5 : 2);
    renderer.setPixelRatio(dpr); renderer.setSize(S.vw, S.vh, false);
    camera.aspect = S.vw/S.vh; camera.fov = FOV;
    camera.position.z = (S.vh/2)/Math.tan(FOV/2*Math.PI/180);
    camera.updateProjectionMatrix();
    L1.position.set(-S.vw*.4, S.vh*.4, 600); L2.position.set(S.vw*.4, -S.vh*.3, 500);
    var small = S.vw < 700;
    shapes.forEach(function(s){ s.mat.opacity = small ? .55 : .92; s.g.userData.off = small && !s.d.keep; });
  }

  var intro = 0, t0 = performance.now()/1000;
  function update(t, dt){
    /* choose which anchor the orb sits on: hero first, CTA at the end */
    var onHero = (S.y < heroTop + heroH*.98);
    var a = onHero ? A.hero : A.cta;
    var sy = a.cy - S.y, sc = a.w*.42;
    var alpha = 1;
    if(onHero){
      var hp = clamp(S.y/(heroH*.9), 0, 1);
      sc *= 1 + hp*.22;
      intro = reduce ? 1 : clamp((t - t0)/1.6, 0, 1);
      var e = 1 - Math.pow(1-intro, 3);
      sc *= .72 + .28*e; alpha = e;
    } else {
      alpha = (ctaScrub ? ctaScrub.cur : 1) * a.alpha;
    }
    var visible = alpha > .01 && sy > -a.w && sy < S.vh + a.w;
    orb.visible = visible;
    if(visible){
      setOrbAlpha(alpha);
      orb.position.set(a.cx - S.vw/2, S.vh/2 - sy, 0);
      orb.scale.setScalar(sc);
      S.mx += (S.tmx - S.mx)*.05; S.my += (S.tmy - S.my)*.05;
      var tt = reduce ? 0 : t;
      orb.rotation.set(S.my*.5 + S.y*.0004, S.mx*.7 + S.y*.0012, S.y*.0007);
      rings.forEach(function(r){ r.g.rotation.x += r.sp[0]*dt*(1+Math.abs(S.vel)*.0009); r.g.rotation.y += r.sp[1]*dt*(1+Math.abs(S.vel)*.0009); r.g.rotation.z += r.sp[2]*dt; });
      pts.rotation.y = tt*.05; pts.rotation.x = tt*.03;
      var pulse = 1 + .03*Math.sin(tt*1.4); core.scale.setScalar(pulse); halo.material.rotation = tt*.05;
    }
    /* crystals */
    var small = S.vw < 700, kScale = small ? .62 : (S.vw < 1100 ? .8 : 1);
    shapes.forEach(function(s){
      var sec = secs[s.d.id];
      if(!sec || s.g.userData.off){ s.g.visible = false; return; }
      var py = sec.top + sec.h*s.d.yf, scy = S.vh/2 + (py - S.y - S.vh/2)*s.d.k;
      if(scy < -260 || scy > S.vh + 260){ s.g.visible = false; return; }
      s.g.visible = true;
      var sx = (small ? s.d.xm : s.d.xf)*S.vw;
      var tt = reduce ? 0 : t;
      s.g.position.set(sx - S.vw/2, S.vh/2 - scy + Math.sin(tt*s.rs*3 + s.r0)*7, s.d.z);
      s.g.scale.setScalar(s.d.size*kScale);
      s.g.rotation.set(s.r0 + tt*s.rs + S.y*.0016, s.r1 + tt*s.rs*.7 + S.y*.0022, S.y*.0009);
    });
    renderer.render(scene, camera);
  }
  resize();
  return {update:update, resize:resize};
}

/* fallback: 2D canvas orb if WebGL / CDN is unavailable */
function orb2D(){
  var cv = $('#orb'); if(!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d'), W=0, H=0, Sz=1, visible=true, mx=0, my=0, tx=0, ty=0;
  function resize(){ var r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio||1,2); W=r.width; H=r.height; cv.width=Math.round(W*d); cv.height=Math.round(H*d); ctx.setTransform(d,0,0,d,0,0); Sz=Math.min(W,H); if(reduce) draw(4000); }
  var rings = [
    {R:.34,ax:1.15,ay:.25,az:.2, sp:.35, n:18,w:.05,c1:[124,77,255],c2:[56,189,248]},
    {R:.36,ax:.5, ay:1.0, az:-.6,sp:-.28,n:18,w:.06,c1:[168,85,247],c2:[99,102,241]},
    {R:.32,ax:-.4,ay:.55, az:1.1,sp:.22, n:16,w:.05,c1:[59,130,246],c2:[192,132,252]}
  ];
  function mat(ax,ay,az){ var a=Math.cos(ax),b=Math.sin(ax),c=Math.cos(ay),d=Math.sin(ay),e=Math.cos(az),f=Math.sin(az); return [c*e,-c*f,d,b*d*e+a*f,-b*d*f+a*e,-b*c,-a*d*e+b*f,a*d*f+b*e,a*c]; }
  function mix(a,b,u){ return [a[0]+(b[0]-a[0])*u|0,a[1]+(b[1]-a[1])*u|0,a[2]+(b[2]-a[2])*u|0]; }
  var F = 2.6;
  function draw(t){
    ctx.clearRect(0,0,W,H); tx += (mx-tx)*.05; ty += (my-ty)*.05;
    var cx=W/2, cy=H/2, back=[], front=[], gx=tx*.5, gy=ty*.5;
    rings.forEach(function(r){
      var M = mat(r.ax + t*.00021*r.sp*2 + gy, r.ay + t*.00028*r.sp*2 + gx, r.az + t*.00017*r.sp*2);
      for(var k=0;k<r.n;k++){
        var u=k/(r.n-1), rad=r.R*(1+(u-.5)*.18), off=(u-.5)*r.w*2, col=mix(r.c1,r.c2,u), cur=[], side=null;
        for(var j=0;j<=100;j++){
          var a=j/100*6.2832, x=Math.cos(a)*rad, y=Math.sin(a)*rad, z=off*Math.sin(a*2+t*.0009);
          var X=M[0]*x+M[1]*y+M[2]*z, Y=M[3]*x+M[4]*y+M[5]*z, Z=M[6]*x+M[7]*y+M[8]*z;
          var sc=F/(F-Z), px=cx+X*sc*Sz, py=cy+Y*sc*Sz, sd=Z>=0;
          if(side===null) side=sd;
          if(sd!==side){ cur.push(px,py); (side?front:back).push({p:cur,c:col}); cur=[px,py]; side=sd; } else cur.push(px,py);
        }
        (side?front:back).push({p:cur,c:col});
      }
    });
    ctx.globalCompositeOperation='lighter';
    function strokeAll(list,al,lw){ ctx.lineWidth=lw; for(var i=0;i<list.length;i++){ var o=list[i],p=o.p; if(p.length<4) continue; ctx.strokeStyle='rgba('+o.c[0]+','+o.c[1]+','+o.c[2]+','+al+')'; ctx.beginPath(); ctx.moveTo(p[0],p[1]); for(var m=2;m<p.length;m+=2) ctx.lineTo(p[m],p[m+1]); ctx.stroke(); } }
    strokeAll(back,.15,.9);
    var sr=Sz*.135*(1+.025*Math.sin(t*.0012)), halo=ctx.createRadialGradient(cx,cy,sr*.6,cx,cy,sr*3.2);
    halo.addColorStop(0,'rgba(110,80,255,.45)'); halo.addColorStop(1,'rgba(110,80,255,0)');
    ctx.fillStyle=halo; ctx.beginPath(); ctx.arc(cx,cy,sr*3.2,0,6.2832); ctx.fill();
    ctx.globalCompositeOperation='source-over';
    var g=ctx.createRadialGradient(cx-sr*.35,cy-sr*.4,sr*.05,cx,cy,sr);
    g.addColorStop(0,'rgba(190,235,255,1)'); g.addColorStop(.3,'rgba(90,140,255,.98)'); g.addColorStop(.72,'rgba(94,52,225,.95)'); g.addColorStop(1,'rgba(30,12,100,.95)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,sr,0,6.2832); ctx.fill();
    ctx.globalCompositeOperation='lighter'; strokeAll(front,.32,1.1); ctx.globalCompositeOperation='source-over';
  }
  resize(); window.addEventListener('resize', resize);
  if(reduce){ draw(4000); return; }
  if('IntersectionObserver' in window) new IntersectionObserver(function(en){ visible = en[0].isIntersecting; }).observe(cv);
  window.addEventListener('pointermove', function(e){ mx = e.clientX/window.innerWidth-.5; my = e.clientY/window.innerHeight-.5; }, {passive:true});
  (function loop(t){ if(visible && !doc.hidden) draw(t); requestAnimationFrame(loop); })(0);
}

/* ---------- main frame ---------- */
var lastT = 0, scheduled = false, running = false;
function frame(now){
  scheduled = false;
  var dt = Math.min(Math.max((now - lastT)/1000, 0.001), .05); lastT = now;
  var t = now/1000, y = window.scrollY || window.pageYOffset || 0;
  var v = (y - S.y)/dt; S.vel += (v - S.vel)*Math.min(1, dt*9); if(reduce) S.vel = 0;
  S.y = y;

  /* progress bar + hero scroll var */
  root.style.setProperty('--sp', S.maxY ? (y/S.maxY).toFixed(4) : 0);
  hero.style.setProperty('--hp', reduce ? 0 : clamp(y/(heroH*.85), 0, 1).toFixed(4));

  /* scroll-linked reveal */
  for(var i=0;i<scrub.length;i++){
    var s = scrub[i], top = s.top - y;
    if(reduce){ if(s.last !== 1){ s.el.style.setProperty('--p', 1); s.cur = 1; s.last = 1; } continue; }
    if(top > S.vh*2 && s.cur === 0) continue;
    var endT = Math.max(S.vh*.62, s.top - S.maxY + 10), startT = endT + S.vh*.34;
    var raw = (startT - top)/(startT - endT);
    var tgt = clamp(raw*(1 + s.o) - s.o, 0, 1);
    s.cur += (tgt - s.cur)*(1 - Math.exp(-dt*11)); if(Math.abs(tgt - s.cur) < .002) s.cur = tgt;
    var val = Math.round(s.cur*1000)/1000;
    if(val !== s.last){ s.el.style.setProperty('--p', val); s.last = val; }
  }

  /* word reveal */
  if(words.length){
    var wp = reduce ? 1 : clamp((S.vh*.88 - (wordTop - y))/(S.vh*.42 + wordH*.5), 0, 1), n = words.length, tt = wp*(n + 5);
    for(var k=0;k<n;k++){ var wv = Math.round(clamp(tt - k, 0, 1)*20)/20; if(wv !== words[k].v){ words[k].el.style.setProperty('--w', wv); words[k].v = wv; } }
  }

  /* timeline */
  var tp = reduce ? 1 : clamp((S.vh*.7 - (tlTop - y))/tlH, 0, 1), tpv = Math.round(tp*1000)/1000;
  if(tpv !== tlLast){
    tlLast = tpv; tl.style.setProperty('--tp', tpv);
    steps.forEach(function(st, idx){ st.classList.toggle('lit', tpv >= (idx/(steps.length-1))*.97 - .001 && tpv > 0.02); });
  }

  /* marquee: speeds up and skews with scroll velocity, reverses on scroll-up */
  if(!reduce){
    if(Math.abs(S.vel) > 40) mqDir = S.vel > 0 ? 1 : -1;
    mqPos = (mqPos + mqDir*(46 + Math.min(Math.abs(S.vel), 3500)*.09)*dt) % mqW; if(mqPos < 0) mqPos += mqW;
    mqSkew += (clamp(-S.vel*.0032, -9, 9) - mqSkew)*.15;
    mq.style.transform = 'translate3d('+(-mqPos)+'px,0,0) skewX('+mqSkew.toFixed(2)+'deg)';
  }

  /* work slide laptop tilt follows scroll */
  var wsec = secs.portfolio; if(wsec){ var wpv = clamp((y + S.vh - wsec.top)/(wsec.h + S.vh), 0, 1).toFixed(3); root.style.setProperty('--wp', wpv); }

  if(GL) GL.update(t, dt);
}
function loop(now){ frame(now); if(!doc.hidden) requestAnimationFrame(loop); else running = false; }
function schedule(){ if(!scheduled && reduce){ scheduled = true; requestAnimationFrame(frame); } }

/* ---------- preloader ---------- */
var preloader = $('#preloader');
function hidePreloader(){ if(!preloader) return; preloader.classList.add('hide'); setTimeout(function(){ if(preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 700); }
setTimeout(hidePreloader, reduce ? 150 : 900);

/* ---------- custom cursor (fine pointer + hover capable only) ---------- */
var fineHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
if(fineHover){
  root.classList.add('has-cursor');
  var cDot = $('#cDot'), cRing = $('#cRing'), cx=innerWidth/2, cy=innerHeight/2, rx=cx, ry=cy, curShown=false;
  function setCursorMode(mode){
    ['on','on-link','on-btn','on-text','on-drag'].forEach(function(c){
      cRing.classList.toggle(c, mode === c || (mode === 'on-btn' && c === 'on') || (mode === 'on-link' && c === 'on') || (mode === 'on-drag' && c === 'on'));
      cDot.classList.toggle(c, mode === c);
    });
    if(mode === 'default'){
      ['on','on-link','on-btn','on-text','on-drag'].forEach(function(c){ cRing.classList.remove(c); cDot.classList.remove(c); });
    }
  }
  window.addEventListener('pointermove', function(e){
    if(e.pointerType && e.pointerType !== 'mouse') return;
    cx = e.clientX; cy = e.clientY;
    if(!curShown){ curShown = true; cDot.style.opacity = 1; cRing.style.opacity = 1; }
    cDot.style.transform = 'translate(-50%,-50%) translate('+cx+'px,'+cy+'px)';
    var t = e.target;
    if(t.closest('input,textarea,select,[contenteditable="true"]')) setCursorMode('on-text');
    else if(t.closest('.btn-pri')) setCursorMode('on-btn');
    else if(t.closest('.btn,.arrow-btn,button,[role="button"],.chip-btn,summary,.burger')) setCursorMode('on');
    else if(t.closest('a')) setCursorMode('on-link');
    else if(t.closest('.carousel,.track,.work-slide,.svc,.plan,.post')) setCursorMode('on-drag');
    else setCursorMode('default');
  }, {passive:true});
  window.addEventListener('pointerdown', function(){ cDot.classList.add('is-down'); });
  window.addEventListener('pointerup', function(){ cDot.classList.remove('is-down'); });
  window.addEventListener('mouseleave', function(){ cDot.style.opacity = 0; cRing.style.opacity = 0; curShown = false; setCursorMode('default'); });
  (function ringLoop(){ rx += (cx-rx)*.18; ry += (cy-ry)*.18; cRing.style.transform = 'translate(-50%,-50%) translate('+rx+'px,'+ry+'px)'; requestAnimationFrame(ringLoop); })();

  /* magnetic pull for primary buttons */
  if(!reduce){
    $$('.btn-pri').forEach(function(b){
      b.addEventListener('pointermove', function(e){
        var r = b.getBoundingClientRect();
        b.style.setProperty('--mgx', ((e.clientX - r.left - r.width/2)*.28)+'px');
        b.style.setProperty('--mgy', ((e.clientY - r.top - r.height/2)*.35)+'px');
      });
      b.addEventListener('pointerleave', function(){ b.style.setProperty('--mgx','0px'); b.style.setProperty('--mgy','0px'); });
    });
  }
}

/* ---------- boot ---------- */
var navTick = function(){ nav.classList.toggle('scrolled', (window.scrollY||0) > 24); spy(); schedule(); };
window.addEventListener('scroll', navTick, {passive:true});

function boot(){
  measure();
  GL = initGL();
  root.classList.add(GL ? 'gl' : 'no-gl');
  if(!GL) orb2D();
  measure(); navTick();
  var rt;
  window.addEventListener('resize', function(){
    clearTimeout(rt);
    rt = setTimeout(function(){ measure(); if(GL) GL.resize(); spy(); schedule(); }, 120);
  });
  if('ResizeObserver' in window){ var ro, last = 0; ro = new ResizeObserver(function(){ var h = doc.body.scrollHeight; if(Math.abs(h-last) > 2){ last = h; measure(); } }); ro.observe(doc.body); }
  if(doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function(){ measure(); });
  window.addEventListener('load', function(){ measure(); if(GL) GL.resize(); });
  doc.addEventListener('visibilitychange', function(){ if(!doc.hidden && !running && !reduce){ running = true; lastT = performance.now(); requestAnimationFrame(loop); } });
  if(reduce){ frame(performance.now()); }
  else { running = true; lastT = performance.now(); requestAnimationFrame(loop); }
}
boot();
})();