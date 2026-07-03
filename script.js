let state = JSON.parse(localStorage.getItem('missionZeltlagerState') || '{"team":null,"mission":0}');
const app = document.getElementById('app');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalButton = document.getElementById('modalButton');
const modalImage = document.getElementById('modalImage');
const mapModal = document.getElementById('mapModal');
const closeMap = document.getElementById('closeMap');

const PRAISES = [
  'Mission erfolgreich abgeschlossen!',
  'Klasse gemacht!',
  'Fantastisch gelöst!',
  'Ihr seid ein starkes Team!',
  'Das war richtig knifflig – super!',
  'Hinweis gesichert!',
  'Sehr gut kombiniert!',
  'Die Mission läuft großartig!',
  'Euer Team kommt dem Schatz näher!',
  'Genau richtig! Weiter geht die Mission!',
  'Rätsel geknackt!',
  'Ihr habt den nächsten Hinweis verdient!',
  'Sehr aufmerksam gesucht!',
  'Das war Teamarbeit!',
  'Mission bestanden!'
];
const TAGLINES = [
  'Ein neuer Hinweis wartet auf euch.',
  'Schaut genau hin – jede Spur kann wichtig sein.',
  'Jetzt zählt Teamarbeit.',
  'Der Schatz rückt ein Stück näher.',
  'Diese Mission bringt euch weiter.',
  'Bleibt aufmerksam und sammelt jeden Hinweis.',
  'Nur gemeinsam kommt ihr ans Ziel.',
  'Ein kleines Rätsel, ein großer Schritt.',
  'Eure Mission geht weiter.',
  'Das nächste Geheimnis wartet schon.'
];
let audioCtx = null;

closeMap.onclick = () => { playSound('close'); mapModal.classList.add('hidden'); };

function save(){ localStorage.setItem('missionZeltlagerState', JSON.stringify(state)); }
function norm(s){ return (s||'').toString().toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9]/g,''); }
function teamName(t){return t==='gelb'?'Gelb':t==='blau'?'Blau':'Pink'}
function teamClass(){ return state.team ? `theme-${state.team}` : ''; }
function playSound(kind){
  try{
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind==='success'?0.06:0.025, now+0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now+(kind==='success'?0.45:0.18));
    const notes = kind==='success' ? [523.25,659.25,783.99] : kind==='map' ? [220,330] : [300];
    notes.forEach((freq, i)=>{
      const osc = audioCtx.createOscillator();
      osc.type = kind==='success' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now+i*0.09);
      osc.connect(gain);
      osc.start(now+i*0.09);
      osc.stop(now+i*0.09+(kind==='success'?0.18:0.1));
    });
  }catch(e){}
}
function render(){ if(!state.team) return renderStart(); renderMission(); preloadNearbyImages(); }
function navButtons(){
  const restart=document.createElement('button'); restart.className='nav-btn restart'; restart.textContent='Neustart'; restart.onclick=()=>{ playSound('click'); if(confirm('Wirklich neu starten?')){localStorage.removeItem('missionZeltlagerState'); state={team:null,mission:0}; render(); }}; app.appendChild(restart);
  const back=document.createElement('button'); back.className='nav-btn back'; back.textContent='Zurück'; back.onclick=()=>{ playSound('click'); if(state.mission>0){state.mission--; save(); render();} else {state.team=null; state.mission=0; save(); render();}}; app.appendChild(back);
  const map=document.createElement('button'); map.className='nav-btn map'; map.textContent='Landkarte'; map.onclick=()=>{ playSound('map'); mapModal.classList.remove('hidden'); const card=mapModal.querySelector('.map-card'); card.classList.remove('map-unroll'); void card.offsetWidth; card.classList.add('map-unroll'); }; app.appendChild(map);
}
function renderStart(){
  app.innerHTML='';
  const s=document.createElement('section'); s.className='screen start intro-screen';
  const intro=document.createElement('div'); intro.className='intro-title'; intro.innerHTML='<h1>Mission Zeltlager</h1><p>Eine geheime Mission wartet auf euch...</p><p class="tap-hint">Tippt auf euer Zelt!</p>'; s.appendChild(intro);
  ['pink','yellow','blue'].forEach((c)=>{
    const b=document.createElement('button');
    b.className='team-zone team-'+(c==='yellow'?'yellow':c==='blue'?'blue':'pink');
    b.setAttribute('aria-label','Team '+(c==='yellow'?'Gelb':c==='blue'?'Blau':'Pink'));
    b.onclick=()=>{ playSound('success'); b.classList.add('tent-pop'); setTimeout(()=>{ state.team=c==='yellow'?'gelb':c==='blue'?'blau':'pink'; state.mission=0; save(); render(); }, 430); };
    s.appendChild(b);
  });
  const labels=document.createElement('div'); labels.className='team-labels'; labels.innerHTML='<span>Team Pink</span><span>Team Gelb</span><span>Team Blau</span>'; s.appendChild(labels);
  app.appendChild(s);
}
function progressHTML(list){
  const total = Math.max(1, list.length-1);
  const current = Math.min(state.mission, total-1);
  let out = '<div class="progress-tents" aria-label="Missionsfortschritt">';
  for(let i=0;i<total;i++) out += `<span class="${i<=current?'done':''}">⛺</span>`;
  out += '</div>';
  return out;
}
function renderMission(){
  app.innerHTML='';
  const list=MISSIONS[state.team];
  if(state.mission<0) state.mission=0; if(state.mission>=list.length) state.mission=list.length-1;
  const m=list[state.mission];
  const s=document.createElement('section'); s.className='screen mission-screen '+teamClass()+' '+(m.type==='finish'?'finish':''); s.style.backgroundImage=`url("assets/${m.bg}")`;
  const compass=document.createElement('div'); compass.className='compass'; compass.textContent='🧭'; s.appendChild(compass);
  const card=document.createElement('div'); card.className='card mission-card-enter';
  const tagline = m.tagline || TAGLINES[state.mission % TAGLINES.length];
  card.innerHTML=`${progressHTML(list)}<div class="mission-head"><span class="pill">Team ${teamName(state.team)}</span><span class="pill">Mission ${Math.min(state.mission+1,list.length-1)} von ${list.length-1}</span></div><h1>${m.title}</h1><div class="mission-tagline">${tagline}</div><p>${m.text}</p>`;
  if(m.type==='finish'){
    card.innerHTML += `<div class="treasure-finale"><div class="treasure-chest open">🎁</div><h2>Mission erfüllt!</h2><p>Ihr habt alle Rätsel gelöst und den Schatz gefunden!</p><p>Abenteuer erlebt man am schönsten gemeinsam.</p><p>Danke, dass ihr Teil von Claras Mission wart.</p><button class="primary" onclick="restartAll()">Nochmal starten</button></div>`;
  } else {
    card.appendChild(buildInputArea(m));
    const err=document.createElement('div'); err.className='error-msg'; err.id='err'; card.appendChild(err);
    const actions=document.createElement('div'); actions.className='actions';
    const btn=document.createElement('button'); btn.className='primary'; btn.textContent='Fertig'; btn.onclick=()=>checkAnswer(m, card); actions.appendChild(btn); card.appendChild(actions);
  }
  s.appendChild(card); app.appendChild(s); navButtons(); focusFirst();
}
function buildInputArea(m){
  const wrap=document.createElement('div');
  if(m.type==='letters'){
    const title=document.createElement('div'); title.className='answer-title'; title.textContent='Gebt das Lösungswort ein:'; wrap.appendChild(title);
    const row=document.createElement('div'); row.className='inputs word-inputs'; row.dataset.inputgroup='answer';
    const words = String(m.solution || '').trim().split(/\s+/);
    words.forEach(word=>{
      const group=document.createElement('span'); group.className='word-group'; group.setAttribute('aria-label', 'Wort');
      [...word].forEach(ch=>{ const input=document.createElement('input'); input.className='letter'; input.maxLength=1; input.inputMode='text'; input.autocomplete='off'; input.autocapitalize='characters'; input.dataset.char=ch; wireInput(input); group.appendChild(input); });
      row.appendChild(group);
    });
    wrap.appendChild(row);
  } else if(m.type==='numbers'){
    const title=document.createElement('div'); title.className='answer-title'; title.textContent='Gebt das Lösungswort ein:'; wrap.appendChild(title);
    const row=document.createElement('div'); row.className='inputs'; row.dataset.inputgroup='answer';
    [...m.solution].forEach(()=>{const input=document.createElement('input'); input.className='number'; input.maxLength=1; input.inputMode='numeric'; input.pattern='[0-9]*'; wireInput(input); row.appendChild(input);}); wrap.appendChild(row);
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
  if(!ok){ playSound('wrong'); document.getElementById('err').textContent='Das stimmt noch nicht. Schaut nochmal genau hin.'; card.classList.remove('error'); void card.offsetWidth; card.classList.add('error'); return; }
  document.getElementById('err').textContent=''; confetti(); stars(); playSound('success');
  const praise = PRAISES[Math.floor(Math.random()*PRAISES.length)];
  showModal('Mission geschafft!', praise, 'Weiter', null, ()=>{
    if(m.finalCode){ showFinalCode(m); }
    else if(m.hint){ showModal(m.hintTitle||'Nächster Missions-Hinweis', m.hint, 'Verstanden', m.hintImage, nextMission); }
    else nextMission();
  });
}
function showFinalCode(m){
  showModal(m.hintTitle||'Gratulation!', m.hint, 'Verstanden', null, ()=>{
    modalTitle.textContent='Seid ihr bereit?';
    modalText.innerHTML=`<div class="treasure-chest">🎁</div><p>Gebt euren Geheimcode am Schloss ein.</p><div class="final-code">${m.finalCode}</div>`;
    modalImage.classList.add('hidden');
    modalButton.textContent='Wir haben das Schloss geöffnet';
    modalButton.onclick=()=>{ playSound('success'); confetti(); modal.classList.add('hidden'); nextMission(); };
    modal.classList.remove('hidden');
  });
}
function nextMission(){ state.mission++; save(); modal.classList.add('hidden'); transitionRender(); }
function transitionRender(){ app.classList.add('page-out'); setTimeout(()=>{ app.classList.remove('page-out'); render(); }, 160); }
function showModal(title, text, button, image, cb){
  modalTitle.textContent=title; modalText.textContent=text||''; modalButton.textContent=button||'Verstanden';
  if(image){ modalImage.src='assets/'+image; modalImage.classList.remove('hidden'); } else { modalImage.classList.add('hidden'); }
  modalButton.onclick=()=>{ playSound('click'); modal.classList.add('hidden'); if(cb) cb(); };
  modal.classList.remove('hidden');
}
function confetti(){
  const c=document.getElementById('confetti'); c.innerHTML=''; const colors=state.team==='gelb'?['#ffd24d','#fff1a8','#ffae42','#ffffff']:state.team==='blau'?['#64b8ee','#bde8ff','#5e7cff','#ffffff']:['#ff83bf','#ffd1e6','#c77dff','#ffffff'];
  for(let i=0;i<120;i++){const p=document.createElement('span'); p.className='confetti-piece'; p.style.left=Math.random()*100+'vw'; p.style.background=colors[Math.floor(Math.random()*colors.length)]; p.style.animationDelay=(Math.random()*.35)+'s'; p.style.transform=`rotate(${Math.random()*180}deg)`; c.appendChild(p);} setTimeout(()=>c.innerHTML='',2500);
}
function stars(){
  const c=document.getElementById('confetti');
  for(let i=0;i<32;i++){const st=document.createElement('span'); st.className='star-piece'; st.textContent='✨'; st.style.left=(8+Math.random()*84)+'vw'; st.style.top=(15+Math.random()*60)+'vh'; st.style.animationDelay=(Math.random()*.2)+'s'; c.appendChild(st);}
  setTimeout(()=>[...document.querySelectorAll('.star-piece')].forEach(e=>e.remove()),1800);
}
function focusFirst(){ }
function preloadNearbyImages(){
  if(!state.team || !MISSIONS[state.team]) return;
  const imgs = new Set(['map.png','missionzeltlager.png']);
  const list = MISSIONS[state.team];
  [state.mission, state.mission+1, state.mission+2, state.mission+3].forEach(i=>{ const m=list[i]; if(m){ if(m.bg) imgs.add(m.bg); if(m.hintImage) imgs.add(m.hintImage); }});
  imgs.forEach(src=>{ const im=new Image(); im.src='assets/'+src; });
}
window.restartAll=function(){ localStorage.removeItem('missionZeltlagerState'); state={team:null,mission:0}; render(); }
render();
