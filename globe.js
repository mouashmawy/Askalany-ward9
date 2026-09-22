(() => {
  const stage = document.querySelector('#photo-stage');
  const photos = window.globePhotos || [];
  const dialog = document.querySelector('#photo-dialog');
  const motion = document.querySelector('#motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let view = 'globe', paused = reduced.matches, angle = 0, tilt = -.12, selected = 0, dragging = false, moved = false, lastX = 0, lastY = 0, lastTime = 0, frame;
  const cards = photos.map((src, i) => {
    const button = document.createElement('button');
    button.className = 'photo-card'; button.type = 'button';
    button.setAttribute('aria-label', 'Open community photo ' + (i + 1));
    const img = document.createElement('img'); img.src = src; img.alt = 'Mohamed Askalany with community members — photo ' + (i + 1); img.draggable = false; img.decoding = 'async';
    button.append(img); stage.append(button);
    button.addEventListener('click', event => { if (!moved || event.detail === 0) openPhoto(i); });
    return button;
  });
  document.querySelector('#gallery-count').textContent = photos.length ? photos.length + ' moments · One community' : 'New community photos are coming soon.';
  function showPhoto(i) {
    selected = (i + photos.length) % photos.length;
    document.querySelector('#full-photo').src = photos[selected];
    document.querySelector('#full-photo').alt = cards[selected].querySelector('img').alt;
    document.querySelector('#photo-caption').textContent = (selected + 1) + ' / ' + photos.length;
  }
  function openPhoto(i) { showPhoto(i); dialog.showModal(); }
  document.querySelector('#close-photo').onclick = () => dialog.close();
  document.querySelector('#previous-photo').onclick = () => showPhoto(selected - 1);
  document.querySelector('#next-photo').onclick = () => showPhoto(selected + 1);
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('keydown', e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); showPhoto(selected + (e.key === 'ArrowLeft' ? -1 : 1)); } });
  function updateMotion() { motion.textContent = paused ? 'Play rotation' : 'Pause rotation'; motion.hidden = view === 'wall'; }
  motion.onclick = () => { paused = !paused; updateMotion(); };
  reduced.addEventListener('change', e => { paused = e.matches; updateMotion(); });
  document.querySelectorAll('[data-view]').forEach(button => {
    if (button.tagName !== 'BUTTON') return;
    button.onclick = () => {
      view = button.dataset.view; stage.dataset.view = view;
      document.querySelectorAll('.view-options button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      document.querySelector('#gallery-hint').textContent = view === 'wall' ? 'A collection of shared moments. Select any photo to take a closer look.' : view === 'orbit' ? 'Drag to explore the circle. Select any photo to take a closer look.' : 'Drag to turn the globe. Select any photo to take a closer look.';
      updateMotion(); render();
    };
  });
  stage.addEventListener('pointerdown', e => { moved = false; if (view === 'wall' || e.button !== 0) return; dragging = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener('pointermove', e => { if (!dragging) return; const dx = e.clientX-lastX, dy=e.clientY-lastY; if (Math.abs(dx)+Math.abs(dy)>3) moved=true; angle += dx*.008; tilt = Math.max(-.7,Math.min(.7,tilt+dy*.004)); lastX=e.clientX;lastY=e.clientY;render(); });
  window.addEventListener('pointerup', () => { dragging=false; });
  window.addEventListener('pointercancel', () => { dragging=false; });
  stage.addEventListener('keydown', e => { if (view === 'wall' || !['ArrowLeft','ArrowRight'].includes(e.key)) return; e.preventDefault(); paused=true; angle += e.key === 'ArrowLeft' ? -.2 : .2; updateMotion();render(); });
  function render() {
    if (view === 'wall') return;
    const cardWidth = cards[0]?.offsetWidth || 108; const radius = Math.max(0, Math.min((stage.clientWidth-cardWidth*1.12)/2/(view==='orbit'?1.25:1),stage.clientHeight*.37,240));
    cards.forEach((card,i) => {
      let x,y,z;
      if (view === 'globe') {
        const sy = photos.length === 1 ? 0 : 1 - 2*(i+.5)/photos.length;
        const ring = Math.sqrt(1-sy*sy), theta=i*Math.PI*(3-Math.sqrt(5))+angle;
        x=Math.cos(theta)*ring; y=sy;z=Math.sin(theta)*ring;
        const ty=y*Math.cos(tilt)-z*Math.sin(tilt);z=y*Math.sin(tilt)+z*Math.cos(tilt);y=ty;
      } else { const theta=i/ photos.length*Math.PI*2+angle; x=Math.sin(theta);z=Math.cos(theta);y=Math.sin(theta*2)*.16; }
      const scale=.64+(z+1)*.23;
      card.style.transform='translate(-50%,-50%) translate('+x*radius*(view==='orbit'?1.25:1)+'px,'+(y*radius+(view==='orbit'?z*45:0))+'px) scale('+scale+')';
      card.style.zIndex=String(Math.round((z+1)*100)); card.style.opacity=String(.38+(z+1)*.31);
    });
  }
  function tick(time) {
    const dt = Math.min(time-lastTime,50); lastTime=time;
    if (!paused && !dragging && !dialog.open && view !== 'wall' && !stage.contains(document.activeElement)) { angle+=dt*.00012; render(); }
    frame=requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(frame); if (!document.hidden) {lastTime=performance.now();frame=requestAnimationFrame(tick);} });
  new ResizeObserver(render).observe(stage);
  updateMotion();render();frame=requestAnimationFrame(tick);
})();
