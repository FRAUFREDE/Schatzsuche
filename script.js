
let state = JSON.parse(localStorage.getItem('missionZeltlagerState') || '{"team":null,"mission":0}');
const app = document.getElementById('app');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalButton = document.getElementById('modalButton');
const modalImage = document.getElementById('modalImage');
const mapModal = document.getElementById('mapModal');
document.getElementById('closeMap').onclick = () => mapModal.classList.add('hidden');
function save(){ localStorage.setItem('missionZeltlagerState', JSON.stringify(state)); }
function norm(s){ return (s||'').toString().toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9]/g,''); }
function render(){ if(!state.team) return renderStart(); renderMission(); preloadNearbyImages(); }
function navButtons(){
  const restart=document.createElement('button'); restart.className='nav-btn restart'; restart.textContent='Neustart'; restart.onclick=()=>{ if(confirm('Wirklich neu starten?')){localStorage.removeItem('missionZeltlagerState'); state={team:null,mission:0}; render(); }}; app.appendChild(restart);
  const back=document.createElement('button'); back.className='nav-btn back'; back.textContent='Zurück'; back.onclick=()=>{ if(state.mission>0){state.mission--; save(); render();} else {state.team=null; state.mission=0; save(); render();}}; app.appendChild(back);
  const map=document.createElement('button'); map.className='nav-btn map'; map.textContent='Landkarte'; map.onclick=()=>mapModal.classList.remove('hidden'); app.appendChild(map);
}
function renderStart(){
  app.innerHTML='';
  const s=document.createElement('section'); s.className='screen start';
  ['pink','yellow','blue'].forEach((c,i)=>{const b=document.createElement('button'); b.className='team-zone team-'+(c==='yellow'?'yellow':c==='blue'?'blue':'pink'); b.setAttribute('aria-label','Team '+(c==='yellow'?'Gelb':c==='blue'?'Blau':'Pink')); b.onclick=()=>{state.team=c==='yellow'?'gelb':c==='blue'?'blau':'pink'; state.mission=0; save(); render();}; s.appendChild(b);});
  const labels=document.createElement('div'); labels.className='team-labels'; labels.innerHTML='<span>Team Pink</span><span>Team Gelb</span><span>Team Blau</span>'; s.appendChild(labels);
  app.appendChild(s);
}
function renderMission(){
  app.innerHTML='';
  const list=MISSIONS[state.team];
  if(state.mission<0) state.mission=0; if(state.mission>=list.length) state.mission=list.length-1;
  const m=list[state.mission];
  const s=document.createElement('section'); s.className='screen '+(m.type==='finish'?'finish':''); s.style.backgroundImage=`url("assets/${m.bg}")`;
  const card=document.createElement('div'); card.className='card';
  card.innerHTML=`<div class="mission-head"><span class="pill">Team ${teamName(state.team)}</span><span class="pill">Mission ${state.mission+1} von ${list.length}</span></div><h1>${m.title}</h1><p>${m.text}</p>`;
  if(m.type==='finish'){
    card.innerHTML += `<button class="primary" onclick="restartAll()">Nochmal starten</button>`;
  } else {
    card.appendChild(buildInputArea(m));
    const err=document.createElement('div'); err.className='error-msg'; err.id='err'; card.appendChild(err);
    const actions=document.createElement('div'); actions.className='actions';
    const btn=document.createElement('button'); btn.className='primary'; btn.textContent='Fertig'; btn.onclick=()=>checkAnswer(m, card); actions.appendChild(btn); card.appendChild(actions);
  }
  s.appendChild(card); app.appendChild(s); navButtons(); focusFirst();
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
    const title=document.createElement('div'); title.className='answer-title'; title.textContent='Gebt das Lösungswort ein:'; wrap.appendChild(title);
    const row=document.createElement('div'); row.className='inputs'; row.dataset.inputgroup='answer';
    [...m.solution].forEach(ch=>{const input=document.createElement('input'); input.className='number'; input.maxLength=1; input.inputMode='numeric'; input.pattern='[0-9]*'; wireInput(input); row.appendChild(input);}); wrap.appendChild(row);
  } else if(m.type==='labeledNumbers'){
    const title=document.createElement('div'); title.className='answer-title'; title.textContent='Gebt das Lösungswort ein:'; wrap.appendChild(title);
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
  if(!ok){ document.getElementById('err').textContent='Das stimmt noch nicht. Schaut nochmal genau hin.'; card.classList.remove('error'); void card.offsetWidth; card.classList.add('error'); return; }
  document.getElementById('err').textContent=''; confetti();
  showModal('Das war richtig!','', 'Weiter', null, ()=>{
    if(m.finalCode){ showFinalCode(m); }
    else if(m.hint){ showModal(m.hintTitle||'Nächster Missions-Hinweis', m.hint, 'Verstanden', m.hintImage, nextMission); }
    else nextMission();
  });
}
function showFinalCode(m){
  showModal(m.hintTitle||'Gratulation!', m.hint, 'Verstanden', null, ()=>{
    modalTitle.textContent='Euer Schloss-Code'; modalText.innerHTML=`<div class="final-code">${m.finalCode}</div>`; modalImage.classList.add('hidden'); modalButton.textContent='Wir haben das Schloss geöffnet'; modalButton.onclick=()=>{modal.classList.add('hidden'); nextMission();}; modal.classList.remove('hidden');
  });
}
function nextMission(){ state.mission++; save(); modal.classList.add('hidden'); render(); }
function showModal(title, text, button, image, cb){
  modalTitle.textContent=title; modalText.textContent=text||''; modalButton.textContent=button||'Verstanden';
  if(image){ modalImage.src='assets/'+image; modalImage.classList.remove('hidden'); } else { modalImage.classList.add('hidden'); }
  modalButton.onclick=()=>{ modal.classList.add('hidden'); if(cb) cb(); };
  modal.classList.remove('hidden');
}
function confetti(){
  const c=document.getElementById('confetti'); c.innerHTML=''; const colors=['#ff83bf','#ffd35c','#7bdff2','#b2f7a3','#cdb4ff','#ffadad'];
  for(let i=0;i<90;i++){const p=document.createElement('span'); p.className='confetti-piece'; p.style.left=Math.random()*100+'vw'; p.style.background=colors[Math.floor(Math.random()*colors.length)]; p.style.animationDelay=(Math.random()*.35)+'s'; p.style.transform=`rotate(${Math.random()*180}deg)`; c.appendChild(p);} setTimeout(()=>c.innerHTML='',2300);
}
function focusFirst(){ /* Auf iPads lassen wir den Fokus bewusst nicht automatisch springen, damit keine Tastatur sofort aufpoppt. */ }
function preloadNearbyImages(){
  if(!state.team || !MISSIONS[state.team]) return;
  const imgs = new Set(['map.png','missionzeltlager.png']);
  const list = MISSIONS[state.team];
  [state.mission, state.mission+1, state.mission+2].forEach(i=>{ const m=list[i]; if(m){ if(m.bg) imgs.add(m.bg); if(m.hintImage) imgs.add(m.hintImage); }});
  imgs.forEach(src=>{ const im=new Image(); im.src='assets/'+src; });
}
window.restartAll=function(){ localStorage.removeItem('missionZeltlagerState'); state={team:null,mission:0}; render(); }
render();
