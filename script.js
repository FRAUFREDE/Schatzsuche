let state = JSON.parse(localStorage.getItem('missionZeltlagerState') || '{"team":null,"mission":0}');
const app = document.getElementById('app');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalButton = document.getElementById('modalButton');
const modalImage = document.getElementById('modalImage');
const mapModal = document.getElementById('mapModal');
const toast = document.getElementById('toast');
const sparkles = document.getElementById('sparkles');
document.getElementById('closeMap').onclick = () => mapModal.classList.add('hidden');
mapModal.addEventListener('click', e => { if(e.target === mapModal) mapModal.classList.add('hidden'); });
function save(){ localStorage.setItem('missionZeltlagerState', JSON.stringify(state)); }
function norm(s){ return (s||'').toString().toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9]/g,''); }
function render(){ if(!state.team) return renderStart(); renderMission(); preloadNearbyImages(); }
function navButtons(){
  const restart=document.createElement('button'); restart.className='nav-btn restart'; restart.textContent='Neustart'; restart.onclick=()=>{ if(confirm('Wirklich neu starten?')){localStorage.removeItem('missionZeltlagerState'); state={team:null,mission:0}; render(); }}; app.appendChild(restart);
  const back=document.createElement('button'); back.className='nav-btn back'; back.textContent='Zurück'; back.onclick=()=>{ if(state.mission>0){state.mission--; save(); render();} else {state.team=null; state.mission=0; save(); render();}}; app.appendChild(back);
  const map=document.createElement('button'); map.className='nav-btn map'; map.textContent='Landkarte'; map.onclick=()=>{ mapModal.classList.remove('hidden'); sparkleBurst(12); }; app.appendChild(map);
}
function renderStart(){
  app.innerHTML='';
  const s=document.createElement('section'); s.className='screen start';
  ['pink','yellow','blue'].forEach((c)=>{const b=document.createElement('button'); b.className='team-zone team-'+(c==='yellow'?'yellow':c==='blue'?'blue':'pink'); b.setAttribute('aria-label','Team '+(c==='yellow'?'Gelb':c==='blue'?'Blau':'Pink')); b.onclick=()=>{state.team=c==='yellow'?'gelb':c==='blue'?'blau':'pink'; state.mission=0; save(); sparkleBurst(22); showToast('Team '+teamName(state.team)+' startet die Mission!'); setTimeout(render, 220);}; s.appendChild(b);});
  const labels=document.createElement('div'); labels.className='team-labels'; labels.innerHTML='<span>Team Pink</span><span>Team Gelb</span><span>Team Blau</span>'; s.appendChild(labels);
  app.appendChild(s); preloadAllStartImages();
}
function renderMission(){
  app.innerHTML='';
  const list=MISSIONS[state.team];
  if(state.mission<0) state.mission=0; if(state.mission>=list.length) state.mission=list.length-1;
  const m=list[state.mission];
  const s=document.createElement('section'); s.className='screen '+(m.type==='finish'?'finish':''); s.style.backgroundImage=`url("assets/${m.bg}")`;
  const card=document.createElement('div'); card.className='card';
  const progress = Math.round(((state.mission+1)/list.length)*100);
  card.innerHTML=`<div class="mission-head"><span class="pill">Team ${teamName(state.team)}</span><div class="progress" aria-hidden="true"><span style="width:${progress}%"></span></div><span class="pill">Mission ${state.mission+1} von ${list.length}</span></div><h1>${m.title}</h1><p>${m.text}</p>`;
  if(m.type==='finish'){
    card.innerHTML += `<button class="primary" onclick="restartAll()">Nochmal starten</button>`;
    setTimeout(()=>confetti(140),250);
  } else {
    card.appendChild(buildInputArea(m));
    const err=document.createElement('div'); err.className='error-msg'; err.id='err'; card.appendChild(err);
    const actions=document.createElement('div'); actions.className='actions';
    const btn=document.createElement('button'); btn.className='primary'; btn.textContent='Fertig'; btn.onclick=()=>checkAnswer(m, card); actions.appendChild(btn); card.appendChild(actions);
  }
  s.appendChild(card); app.appendChild(s); navButtons(); focusFirst(); setTimeout(()=>sparkleBurst(5),140);
}
function teamName(t){return t==='gelb'?'Gelb':t==='blau'?'Blau':'Pink'}
function buildInputArea(m){
  const wrap=document.createElement('div');
  if(m.type==='letters'){
    const title=document.createElement('div'); title.className='answer-title'; title.textContent='Gebt das Lösungswort ein:'; wrap.appendChild(title);
    const row=document.createElement('div'); row.className='inputs word-inputs'; row.dataset.inputgroup='answer';
    const words = String(m.solution || '').trim().split(/\s+/);
    words.forEach(word=>{
      const group=document.createElement('span'); group.className='word-group'; group.setAttribute('aria-label', 'Wort');
      [...word].forEach(ch=>{ const input=document.createElement('input'); input.className='letter'; input.maxLength=1; input.inputMode='text'; input.autocomplete='off'; input.dataset.char=ch; wireInput(input); group.appendChild(input); });
      row.appendChild(group);
    });
    wrap.appendChild(row);
  } else if(m.type==='numbers'){
    const title=document.createElement('div'); title.className='answer-title'; title.textContent='Gebt den Code ein:'; wrap.appendChild(title);
    const row=document.createElement('div'); row.className='inputs'; row.dataset.inputgroup='answer';
    [...m.solution].forEach(()=>{const input=document.createElement('input'); input.className='number'; input.maxLength=1; input.inputMode='numeric'; input.pattern='[0-9]*'; wireInput(input); row.appendChild(input);}); wrap.appendChild(row);
  } else if(m.type==='labeledNumbers'){
    const title=document.createElement('div'); title.className='answer-title'; title.textContent='Gebt die Zahlen ein:'; wrap.appendChild(title);
    m.fields.forEach(f=>{const fr=document.createElement('div'); fr.className='field-row'; const lab=document.createElement('div'); lab.className='field-label'; lab.textContent=f.label+':'; fr.appendChild(lab); const group=document.createElement('div'); group.className='inputs'; group.dataset.inputgroup='answer'; for(let i=0;i<f.len;i++){const input=document.createElement('input'); input.className='number'; input.maxLength=1; input.inputMode='numeric'; input.pattern='[0-9]*'; wireInput(input); group.appendChild(input);} fr.appendChild(group); wrap.appendChild(fr);});
  }
  return wrap;
}
function wireInput(input){
  input.addEventListener('input', e=>{e.target.value=e.target.value.slice(-1).toUpperCase(); if(e.target.value){ const next=nextInput(e.target); if(next) next.focus(); }});
  input.addEventListener('keydown', e=>{ if(e.key==='Backspace' && !e.target.value){ const prev=prevInput(e.target); if(prev) prev.focus(); }});
}
function allInputs(){ return [...document.querySelectorAll('input.letter,input.number')]; }
function nextInput(el){const a=allInputs(); return a[a.indexOf(el)+1];} function prevInput(el){const a=allInputs(); return a[a.indexOf(el)-1];}
function getAnswer(){ return allInputs().map(i=>i.value).join(''); }
function checkAnswer(m, card){
  const ok = norm(getAnswer()) === norm(m.solution);
  if(!ok){ document.getElementById('err').textContent='Das stimmt noch nicht. Schaut nochmal genau hin.'; card.classList.remove('error'); void card.offsetWidth; card.classList.add('error'); showToast('Fast! Noch einmal prüfen.'); return; }
  document.getElementById('err').textContent=''; card.classList.add('success-flash'); confetti(90); sparkleBurst(25);
  showModal('Das war richtig!','Super gemacht – die nächste Mission wartet schon.', 'Weiter', null, ()=>{
    if(m.finalCode){ showFinalCode(m); }
    else if(m.hint){ showModal(m.hintTitle||'Nächster Missions-Hinweis', m.hint, 'Verstanden', m.hintImage, nextMission); }
    else nextMission();
  });
}
function showFinalCode(m){
  showModal(m.hintTitle||'Gratulation!', m.hint, 'Verstanden', null, ()=>{
    modalTitle.textContent='Euer Schloss-Code'; modalText.innerHTML=`<div class="final-code">${m.finalCode}</div>`; modalImage.classList.add('hidden'); modalButton.textContent='Wir haben das Schloss geöffnet'; modalButton.onclick=()=>{modal.classList.add('hidden'); nextMission();}; modal.classList.remove('hidden'); confetti(130);
  });
}
function nextMission(){ state.mission++; save(); modal.classList.add('hidden'); render(); }
function showModal(title, text, button, image, cb){
  modalTitle.textContent=title; modalText.textContent=text||''; modalButton.textContent=button||'Verstanden';
  if(image){ modalImage.src='assets/'+image; modalImage.classList.remove('hidden'); } else { modalImage.classList.add('hidden'); }
  modalButton.onclick=()=>{ modal.classList.add('hidden'); if(cb) cb(); };
  modal.classList.remove('hidden');
}
function confetti(amount=90){
  const c=document.getElementById('confetti'); c.innerHTML=''; const colors=['#ff83bf','#ffd35c','#7bdff2','#b2f7a3','#cdb4ff','#ffadad'];
  for(let i=0;i<amount;i++){const p=document.createElement('span'); p.className='confetti-piece'; p.style.left=Math.random()*100+'vw'; p.style.background=colors[Math.floor(Math.random()*colors.length)]; p.style.animationDelay=(Math.random()*.35)+'s'; p.style.transform=`rotate(${Math.random()*180}deg)`; c.appendChild(p);} setTimeout(()=>c.innerHTML='',2400);
}
function sparkleBurst(amount=12){
  sparkles.innerHTML='';
  for(let i=0;i<amount;i++){ const sp=document.createElement('span'); sp.className='sparkle'; sp.style.left=(12+Math.random()*76)+'vw'; sp.style.top=(10+Math.random()*76)+'vh'; sp.style.animationDelay=(Math.random()*.35)+'s'; sparkles.appendChild(sp); }
  setTimeout(()=>sparkles.innerHTML='',1600);
}
function showToast(text){ toast.textContent=text; toast.classList.remove('hidden'); setTimeout(()=>toast.classList.add('hidden'),1700); }
function focusFirst(){ /* Auf iPads keine automatische Tastatur beim Seitenwechsel. */ }
function preloadNearbyImages(){
  if(!state.team || !MISSIONS[state.team]) return;
  const imgs = new Set(['map.png','missionzeltlager.png']);
  const list = MISSIONS[state.team];
  [state.mission, state.mission+1, state.mission+2].forEach(i=>{ const m=list[i]; if(m){ if(m.bg) imgs.add(m.bg); if(m.hintImage) imgs.add(m.hintImage); }});
  imgs.forEach(src=>{ const im=new Image(); im.src='assets/'+src; });
}
function preloadAllStartImages(){ ['map.png','pinklila.png','pinkgelb.png','pinkblau.png','orangegelb.png','smilypink.png','smilygelb.png','smilyblau.png'].forEach(src=>{const im=new Image(); im.src='assets/'+src;}); }
window.restartAll=function(){ localStorage.removeItem('missionZeltlagerState'); state={team:null,mission:0}; render(); }
render();
