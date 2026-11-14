(function () {
'use strict';

/* ---------- Hilfen ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const main = $('#main');
const chById = id => CHAPTERS.find(c => c.id === id);
const chName = id => { const c = chById(id); return c ? c.n + ' ' + c.title : id; };

const SUBCH = 'A-Za-zΦΨωεΘΩρσα';
function fmtSvg(s) {
  const t = x => '<tspan dy="3.5" font-size="9.5">' + x + '</tspan><tspan dy="-3.5">\u200b</tspan>';
  return s.replace(/_\{([^{}]*)\}/g, (m, x) => t(x)).replace(new RegExp('([' + SUBCH + '])_([A-Za-z0-9]+)', 'g'), (m, a, x) => a + t(x));
}
function fmt(s) {
  const svgs = [];
  s = String(s).replace(/<svg[\s\S]*?<\/svg>/g, m => { svgs.push(fmtSvg(m)); return '\u0001' + (svgs.length - 1) + '\u0001'; });
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, (m, x) => '<div class="eq">' + x.trim().replace(/ {3,}/g, '<span style="display:inline-block;width:2.2em"></span>') + '</div>');
  const fr = /\[\[((?:(?!\[\[|\]\]|\|)[\s\S])*)\|((?:(?!\[\[|\]\]|\|)[\s\S])*)\]\]/;
  let guard = 0;
  while (fr.test(s) && guard++ < 2000) s = s.replace(fr, '<span class="fr"><span>$1</span><span>$2</span></span>');
  s = s.replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>')
    .replace(new RegExp('([' + SUBCH + '])_([A-Za-z0-9]+)', 'g'), '$1<sub>$2</sub>');
  return s.replace(/\u0001(\d+)\u0001/g, (m, i) => svgs[+i]);
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- Lernstand ---------- */
const KEY = 'mtr-lernstand-v1';
let store = { read: {}, cards: {}, ex: {}, exams: [] };
try { const raw = localStorage.getItem(KEY); if (raw) store = Object.assign(store, JSON.parse(raw)); } catch (e) { /* ohne Speicher weiter */ }
function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignorieren */ } }
const cardKey = c => c.ch + ':' + c.q;

$('#reset').addEventListener('click', () => {
  const b = $('#reset');
  if (b.dataset.sure) { store = { read: {}, cards: {}, ex: {}, exams: [] }; save(); delete b.dataset.sure; b.textContent = 'Lernstand zurückgesetzt'; route(); }
  else { b.dataset.sure = '1'; b.textContent = 'Wirklich alles löschen? Noch einmal klicken'; setTimeout(() => { if (b.dataset.sure) { delete b.dataset.sure; b.textContent = 'Lernstand zurücksetzen'; } }, 5000); }
});

function progress() {
  const readable = CHAPTERS.length;
  const known = CARDS.filter(c => store.cards[cardKey(c)] === 2).length;
  const exDone = EXERCISES.filter(e => store.ex[e.id]).length;
  const last = store.exams[store.exams.length - 1];
  return { read: CHAPTERS.filter(c => store.read[c.id]).length, readable, known, exDone, last };
}

/* ---------- Router ---------- */
let cleanup = null;
function route() {
  if (cleanup) { cleanup(); cleanup = null; }
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const top = parts[0] || '';
  $$('.chain a').forEach(a => { if (a.dataset.nav === top) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  let scrollTo = null;
  if (top === 'lernen' && parts[1] && chById(parts[1])) { viewChapter(parts[1]); scrollTo = parts[2]; }
  else if (top === 'lernen') viewChapterList();
  else if (top === 'karten') viewCards(parts[1]);
  else if (top === 'uebungen' && parts[1]) viewExercise(parts[1]);
  else if (top === 'uebungen') viewExercises(parts[1]);
  else if (top === 'pruefung') viewExamStart();
  else viewHome();
  const target = scrollTo && document.getElementById('s-' + scrollTo);
  if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---------- Start ---------- */
function meter(v, max) { return '<div class="meter"><i style="width:' + (max ? Math.round(100 * v / max) : 0) + '%"></i></div>'; }
function chapterListHtml() {
  return '<ol class="chapters">' + CHAPTERS.map(c =>
    '<li><a href="#/lernen/' + c.id + '"><span class="n">' + c.n + '</span><span class="t">' + esc(c.title) + '<span class="d">' + esc(c.desc) + '</span></span>' +
    (store.read[c.id] ? '<span class="tag done">gelesen</span>' : '<span class="tag">offen</span>') + '</a></li>').join('') + '</ol>';
}
function viewHome() {
  const p = progress();
  main.innerHTML =
    '<section class="hero"><h1>Mechatronik verstehen und mündlich erklären können</h1>' +
    '<p class="lead">Der Stoff der Vorlesung MTR in acht kurzen Kapiteln. Erst lesen, dann abfragen, dann einsortieren, dann laut erklären.</p>' +
    '<ol class="plan">' +
    '<li><a href="#/lernen"><strong>1. Lernen</strong></a><p>Kapitel mit Merksätzen und Formulierungen für die Prüfung.</p>' + meter(p.read, p.readable) + '<div class="meter-label">' + p.read + ' von ' + p.readable + ' Kapiteln gelesen</div></li>' +
    '<li><a href="#/karten"><strong>2. Karteikarten</strong></a><p>Begriffe und Formeln abfragen, bis sie sitzen.</p>' + meter(p.known, CARDS.length) + '<div class="meter-label">' + p.known + ' von ' + CARDS.length + ' Karten gewusst</div></li>' +
    '<li><a href="#/uebungen"><strong>3. Übungen</strong></a><p>Zuordnen, sortieren, Lücken füllen per Drag-and-drop.</p>' + meter(p.exDone, EXERCISES.length) + '<div class="meter-label">' + p.exDone + ' von ' + EXERCISES.length + ' Übungen gelöst</div></li>' +
    '<li><a href="#/pruefung"><strong>4. Probeprüfung</strong></a><p>Fragen laut beantworten und mit den Kernpunkten abgleichen.</p>' + meter(p.last ? p.last.pct : 0, 100) + '<div class="meter-label">' + (p.last ? 'Letztes Ergebnis: ' + p.last.pct + ' %' : 'Noch keine Prüfung gemacht') + '</div></li>' +
    '</ol></section>' +
    '<h2>Kapitel</h2>' + chapterListHtml();
}
function viewChapterList() {
  main.innerHTML = '<h1>Lernen</h1><p class="lead">Jedes Kapitel dauert etwa zehn bis fünfzehn Minuten. Die orangen Kästen zeigen, wie du etwas in der Prüfung formulieren kannst.</p>' + chapterListHtml();
}

/* ---------- Kapitel ---------- */
function viewChapter(id) {
  const c = chById(id), i = CHAPTERS.indexOf(c), prev = CHAPTERS[i - 1], next = CHAPTERS[i + 1];
  const toc = '<nav class="toc" aria-label="Kapitel"><ol>' + CHAPTERS.map(k =>
    '<li><a href="#/lernen/' + k.id + '"' + (k === c ? ' aria-current="page"' : '') + '>' + k.n + ' ' + esc(k.title) + '</a>' +
    (k === c ? '<ol class="sub">' + k.sections.map(s => '<li><a href="#/lernen/' + k.id + '/' + s.id + '">' + esc(s.title) + '</a></li>').join('') + '</ol>' : '') + '</li>').join('') + '</ol></nav>';
  const nCards = CARDS.filter(k => k.ch === id).length, nEx = EXERCISES.filter(k => k.ch === id).length;
  const body = c.sections.map(s => '<h2 id="s-' + s.id + '">' + esc(s.title) + '</h2>' + fmt(s.html)).join('');
  const check = c.check.length ? '<h2>Kurz geprüft</h2><p class="muted small">Erst selbst antworten, dann aufklappen.</p>' + c.check.map(q => '<details class="checkq"><summary>' + fmt(q.q) + '</summary><p>' + fmt(q.a) + '</p></details>').join('') : '';
  main.innerHTML = '<div class="reader">' + toc + '<article class="article">' +
    '<p class="crumbs"><a href="#/lernen">Lernen</a> / Kapitel ' + c.n + '</p><h1>' + esc(c.title) + '</h1><p class="lead">' + esc(c.desc) + '</p>' +
    body + check +
    '<div class="row" style="margin-top:2rem">' +
    '<button type="button" class="btn' + (store.read[id] ? ' ghost' : '') + '" id="markread">' + (store.read[id] ? 'Gelesen ✓ (zurücknehmen)' : 'Als gelesen markieren') + '</button>' +
    (nCards ? '<a class="btn ghost" href="#/karten/' + id + '" style="text-decoration:none">' + nCards + ' Karteikarten zu diesem Kapitel</a>' : '') +
    (nEx ? '<a class="btn ghost" href="#/uebungen/kapitel-' + id + '" style="text-decoration:none">' + nEx + ' Übungen</a>' : '') +
    '</div>' +
    '<div class="pager">' + (prev ? '<a href="#/lernen/' + prev.id + '">← ' + prev.n + ' ' + esc(prev.title) + '</a>' : '<span></span>') + (next ? '<a href="#/lernen/' + next.id + '">' + next.n + ' ' + esc(next.title) + ' →</a>' : '<a href="#/karten">Weiter zu den Karteikarten →</a>') + '</div>' +
    '</article></div>';
  $('#markread').addEventListener('click', () => { if (store.read[id]) delete store.read[id]; else store.read[id] = true; save(); const y = window.scrollY; viewChapter(id); window.scrollTo(0, y); });
}

/* ---------- Kapitelfilter ---------- */
function filterBar(active, counts) {
  return '<div class="filters" role="group" aria-label="Kapitel wählen"><button type="button" class="pill" data-f="" aria-pressed="' + (!active) + '">Alle</button>' +
    CHAPTERS.filter(c => counts[c.id]).map(c => '<button type="button" class="pill" data-f="' + c.id + '" aria-pressed="' + (active === c.id) + '">' + c.n + ' ' + esc(c.title) + '</button>').join('') + '</div>';
}
function countBy(list) { const o = {}; list.forEach(x => { o[x.ch] = (o[x.ch] || 0) + 1; }); return o; }

/* ---------- Karteikarten ---------- */
function viewCards(filter) {
  if (!chById(filter)) filter = '';
  let onlyOpen = false, queue = [], pos = 0, flipped = false;
  function build() {
    let list = CARDS.filter(c => !filter || c.ch === filter);
    if (onlyOpen) list = list.filter(c => store.cards[cardKey(c)] !== 2);
    queue = shuffle(list).sort((a, b) => (store.cards[cardKey(a)] || 0) - (store.cards[cardKey(b)] || 0));
    pos = 0; flipped = false;
  }
  function stats() {
    const list = CARDS.filter(c => !filter || c.ch === filter);
    const k = list.filter(c => store.cards[cardKey(c)] === 2).length, u = list.filter(c => store.cards[cardKey(c)] === 1).length;
    return '<div class="stats"><span><b>' + k + '</b> gewusst</span><span><b>' + u + '</b> unsicher</span><span><b>' + (list.length - k - u) + '</b> offen</span></div>';
  }
  function render() {
    const c = queue[pos];
    let inner;
    if (!queue.length) inner = '<div class="result"><strong>Alle Karten dieser Auswahl sitzen.</strong> Schalte „nur offene Karten“ aus, um sie zu wiederholen.</div>';
    else if (!c) inner = '<div class="result"><strong>Durchgang beendet.</strong> ' + queue.length + ' Karten gesehen.</div><div class="row"><button type="button" class="btn" id="again">Neuer Durchgang</button><a href="#/uebungen">Weiter zu den Übungen</a></div>';
    else inner =
      '<button type="button" class="card' + (flipped ? ' back' : '') + '" id="card" aria-live="polite">' +
      '<div class="side"><span>' + (flipped ? 'Antwort' : 'Frage') + ' ' + (pos + 1) + ' von ' + queue.length + '</span><span>' + esc(chName(c.ch)) + '</span></div>' +
      (flipped ? '<div class="small muted">' + fmt(c.q) + '</div><div class="a" style="margin-top:.6rem">' + fmt(c.a) + '</div>' : '<div class="q">' + fmt(c.q) + '</div><div class="hint">Antworte laut, dann umdrehen. <kbd>Leertaste</kbd></div>') +
      '</button>' +
      (flipped ? '<div class="rate"><button type="button" class="btn bad" data-r="0">Nicht gewusst <kbd>1</kbd></button><button type="button" class="btn mid" data-r="1">Unsicher <kbd>2</kbd></button><button type="button" class="btn ok" data-r="2">Gewusst <kbd>3</kbd></button></div>' : '');
    main.innerHTML = '<h1>Karteikarten</h1>' + filterBar(filter, countBy(CARDS)) +
      '<div class="deck"><div class="row spread">' + stats() + '<label class="opt"><input type="checkbox" id="open"' + (onlyOpen ? ' checked' : '') + '> nur offene Karten</label></div>' + inner + '</div>';
    $$('.pill').forEach(b => b.addEventListener('click', () => { location.hash = '#/karten' + (b.dataset.f ? '/' + b.dataset.f : ''); }));
    $('#open').addEventListener('change', e => { onlyOpen = e.target.checked; build(); render(); });
    const card = $('#card'); if (card) card.addEventListener('click', () => { flipped = !flipped; render(); $('#card').focus(); });
    $$('[data-r]').forEach(b => b.addEventListener('click', () => rate(+b.dataset.r)));
    const again = $('#again'); if (again) again.addEventListener('click', () => { build(); render(); });
  }
  function rate(r) { const c = queue[pos]; if (!c) return; store.cards[cardKey(c)] = r; save(); pos++; flipped = false; render(); const n = $('#card'); if (n) n.focus(); }
  function onKey(e) {
    if (e.target.matches('input, textarea')) return;
    if (e.key === ' ' && queue[pos]) { e.preventDefault(); flipped = !flipped; render(); $('#card').focus(); }
    else if (flipped && ['1', '2', '3'].includes(e.key)) rate(+e.key - 1);
  }
  document.addEventListener('keydown', onKey);
  cleanup = () => document.removeEventListener('keydown', onKey);
  build(); render();
}

/* ---------- Übungen ---------- */
const TYPE = { match: 'Zuordnen', order: 'Reihenfolge', diagram: 'Lücken füllen' };
function viewExercises(arg) {
  const filter = arg && arg.indexOf('kapitel-') === 0 && chById(arg.slice(8)) ? arg.slice(8) : '';
  const list = EXERCISES.filter(e => !filter || e.ch === filter);
  main.innerHTML = '<h1>Übungen</h1><p class="lead">Ziehe die Kärtchen an die richtige Stelle. Ohne Maus geht es auch: Kärtchen antippen, dann das Ziel antippen.</p>' +
    filterBar(filter, countBy(EXERCISES)) +
    '<ul class="exlist">' + list.map(e => '<li><a href="#/uebungen/' + e.id + '"><span class="t">' + esc(e.title) + '</span><span class="k"><span>' + TYPE[e.type] + ' · Kapitel ' + chById(e.ch).n + '</span>' + (store.ex[e.id] ? '<span class="tag done">gelöst</span>' : '') + '</span></a></li>').join('') + '</ul>';
  $$('.pill').forEach(b => b.addEventListener('click', () => { location.hash = '#/uebungen' + (b.dataset.f ? '/kapitel-' + b.dataset.f : ''); }));
}

function viewExercise(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return viewExercises(id);
  const idx = EXERCISES.indexOf(ex), next = EXERCISES[idx + 1];
  // Kärtchen vereinheitlichen
  const chips = ex.type === 'order' ? ex.chips.map((t, i) => ({ t, z: String(i) })) : ex.chips;
  let board;
  if (ex.type === 'match') board = '<div class="zones">' + ex.zones.map(z => '<div class="zone" data-zone="' + z.id + '" tabindex="0"><h4>' + fmt(z.label) + '</h4></div>').join('') + '</div>';
  else if (ex.type === 'order') board = '<div class="order">' + chips.map((c, i) => '<div class="slot" data-zone="' + i + '" data-single="1" tabindex="0" aria-label="Position ' + (i + 1) + '"></div>').join('') + '</div>';
  else board = '<div class="diagram">' + ex.lines.map(line => '<div class="dline">' + line.map(el => {
    if (typeof el === 'string') return el ? '<span class="arr">' + el + '</span>' : '';
    if (el.slot) return '<span class="slot" data-zone="' + el.slot + '" data-single="1" tabindex="0" aria-label="Lücke"></span>';
    if (el.fix) return '<span class="fix">' + fmt(el.fix) + '</span>';
    return '<span class="txt">' + fmt(el.text) + '</span>';
  }).join('') + '</div>').join('') + '</div>';

  main.innerHTML = '<p class="crumbs"><a href="#/uebungen">Übungen</a> / ' + TYPE[ex.type] + ' / <a href="#/lernen/' + ex.ch + '">Kapitel ' + chById(ex.ch).n + '</a></p>' +
    '<h1>' + esc(ex.title) + '</h1><p class="lead">' + fmt(ex.prompt) + '</p>' +
    '<div class="dnd"><div class="pool" data-zone="pool" aria-label="Vorrat">' + shuffle(chips.map((c, i) => i)).map(i => '<button type="button" class="chip" data-i="' + i + '">' + fmt(chips[i].t) + '</button>').join('') + '</div>' + board + '</div>' +
    '<div id="out" aria-live="polite"></div>' +
    '<div class="row" style="margin-top:1rem"><button type="button" class="btn" id="check">Prüfen</button><button type="button" class="btn ghost" id="solve">Lösung zeigen</button><button type="button" class="btn ghost" id="redo">Neu mischen</button>' +
    (next ? '<a href="#/uebungen/' + next.id + '">Nächste Übung →</a>' : '<a href="#/pruefung">Weiter zur Probeprüfung →</a>') + '</div>';

  const root = $('.dnd'), pool = $('.pool', root);
  let selected = null;
  const zoneOf = el => el && el.closest ? el.closest('[data-zone]') : null;
  function clearMarks() { $$('.chip', root).forEach(c => c.classList.remove('right', 'wrong')); $('#out').innerHTML = ''; }
  function select(chip) { if (selected) selected.classList.remove('sel'); selected = chip; if (chip) chip.classList.add('sel'); }
  function place(chip, zone) {
    if (!zone || !root.contains(zone)) return;
    if (zone.dataset.single && zone !== chip.parentElement) { const old = $('.chip', zone); if (old) pool.appendChild(old); }
    zone.appendChild(chip); select(null); clearMarks();
  }
  // Ziehen mit Maus, Finger oder Stift
  let drag = null;
  root.addEventListener('pointerdown', e => {
    const chip = e.target.closest('.chip'); if (!chip || e.button > 0) return;
    drag = { chip, x: e.clientX, y: e.clientY, moving: false, id: e.pointerId };
  });
  function onMove(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moving) {
      if (Math.hypot(dx, dy) < 6) return;
      const r = drag.chip.getBoundingClientRect();
      drag.moving = true; drag.ox = e.clientX - r.left; drag.oy = e.clientY - r.top;
      drag.chip.style.width = r.width + 'px'; drag.chip.classList.add('drag'); select(null);
    }
    drag.chip.style.left = (e.clientX - drag.ox) + 'px'; drag.chip.style.top = (e.clientY - drag.oy) + 'px';
    const z = zoneOf(document.elementFromPoint(e.clientX, e.clientY));
    $$('.over', root).forEach(o => o.classList.remove('over'));
    if (z && root.contains(z)) z.classList.add('over');
    e.preventDefault();
  }
  function onUp(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    $$('.over', root).forEach(o => o.classList.remove('over'));
    if (d.moving) {
      d.chip.classList.remove('drag'); d.chip.style.left = d.chip.style.top = d.chip.style.width = '';
      const z = zoneOf(document.elementFromPoint(e.clientX, e.clientY));
      if (z && root.contains(z)) place(d.chip, z);
      d.chip.dataset.dragged = '1'; setTimeout(() => { delete d.chip.dataset.dragged; }, 0);
    }
  }
  document.addEventListener('pointermove', onMove, { passive: false });
  document.addEventListener('pointerup', onUp);
  document.addEventListener('pointercancel', onUp);
  cleanup = () => { document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); document.removeEventListener('pointercancel', onUp); };
  // Antippen: erst Kärtchen, dann Ziel
  root.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) {
      if (chip.dataset.dragged) return;
      if (selected && selected !== chip && chip.parentElement !== pool) { place(selected, chip.parentElement); return; }
      select(selected === chip ? null : chip); return;
    }
    const z = zoneOf(e.target); if (z && selected) place(selected, z);
  });
  root.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-zone]') && selected) { e.preventDefault(); place(selected, e.target); }
  });

  function accepts(c, zid) { if (c.z === null) return zid === 'pool'; return Array.isArray(c.z) ? c.z.includes(zid) : c.z === zid; }
  $('#check').addEventListener('click', () => {
    let ok = 0; const all = $$('.chip', root);
    all.forEach(el => { const c = chips[+el.dataset.i], zid = el.parentElement.dataset.zone; const good = accepts(c, zid); el.classList.toggle('right', good && zid !== 'pool'); el.classList.toggle('wrong', !good); if (good) ok++; });
    const done = ok === all.length;
    if (done) { store.ex[ex.id] = true; save(); }
    const left = all.filter(el => el.parentElement === pool && chips[+el.dataset.i].z !== null).length;
    $('#out').innerHTML = '<div class="result' + (done ? '' : ' part') + '"><strong>' + (done ? 'Alles richtig.' : ok + ' von ' + all.length + ' richtig.') + '</strong> ' +
      (done ? '' : left ? 'Im Vorrat liegen noch Kärtchen, die einen Platz haben.' : 'Rot markierte Kärtchen liegen falsch.') +
      (done ? '<div class="why">' + fmt(ex.why) + '</div>' : '') + '</div>';
  });
  $('#solve').addEventListener('click', () => {
    $$('.chip', root).forEach(el => pool.appendChild(el));
    $$('.chip', root).forEach(el => { const c = chips[+el.dataset.i]; if (c.z === null) return; const zid = Array.isArray(c.z) ? c.z.find(z => !$('.chip', $('[data-zone="' + z + '"]', root))) || c.z[0] : c.z; $('[data-zone="' + zid + '"]', root).appendChild(el); });
    clearMarks(); $('#out').innerHTML = '<div class="result part"><strong>Lösung.</strong> Übrige Kärtchen im Vorrat gehören nirgends hin.<div class="why">' + fmt(ex.why) + '</div></div>';
  });
  $('#redo').addEventListener('click', () => viewExercise(id));
}

/* ---------- Probeprüfung ---------- */
function viewExamStart() {
  const hist = store.exams.slice(-5).reverse();
  main.innerHTML = '<h1>Probeprüfung</h1><p class="lead">In der mündlichen Prüfung musst du Zusammenhänge frei erklären. Übe genau das: laut antworten, dann ehrlich mit den Kernpunkten abgleichen.</p>' +
    '<div class="modes">' +
    '<form class="mode" id="oral"><h2>Mündliche Prüfung</h2><p class="muted small">Offene Fragen mit Kernpunkten zum Abhaken und einer typischen Nachfrage.</p>' +
    '<fieldset><legend>Anzahl Fragen</legend>' + [5, 8, 12].map((n, i) => '<label class="opt"><input type="radio" name="n" value="' + n + '"' + (i === 1 ? ' checked' : '') + '> ' + n + '</label>').join('') + '</fieldset>' +
    '<fieldset><legend>Zeit pro Frage anzeigen</legend><label class="opt"><input type="radio" name="t" value="0"> aus</label><label class="opt"><input type="radio" name="t" value="120" checked> 2 min</label><label class="opt"><input type="radio" name="t" value="180"> 3 min</label></fieldset>' +
    '<fieldset><legend>Kapitel</legend>' + CHAPTERS.filter(c => ORAL.some(q => q.ch === c.id)).map(c => '<label class="opt"><input type="checkbox" name="ch" value="' + c.id + '" checked> ' + c.n + '</label>').join('') + '</fieldset>' +
    '<button class="btn" type="submit">Prüfung starten</button></form>' +
    '<form class="mode" id="quick"><h2>Schnelltest</h2><p class="muted small">Multiple Choice mit sofortiger Auflösung. Gut zum Aufwärmen.</p>' +
    '<fieldset><legend>Anzahl Fragen</legend>' + [10, 15, MC.length].map((n, i) => '<label class="opt"><input type="radio" name="n" value="' + n + '"' + (i === 0 ? ' checked' : '') + '> ' + (n === MC.length ? 'alle ' + n : n) + '</label>').join('') + '</fieldset>' +
    '<button class="btn" type="submit">Schnelltest starten</button></form></div>' +
    (hist.length ? '<h2>Letzte Ergebnisse</h2><div class="tablewrap"><table><tr><th>Datum</th><th>Art</th><th>Ergebnis</th></tr>' + hist.map(h => '<tr><td>' + esc(h.date) + '</td><td>' + esc(h.kind) + '</td><td>' + h.pct + ' %</td></tr>').join('') + '</table></div>' : '');
  $('#oral').addEventListener('submit', e => {
    e.preventDefault(); const f = new FormData(e.target); const chs = f.getAll('ch');
    let pool = ORAL.filter(q => chs.includes(q.ch)); if (!pool.length) pool = ORAL;
    // Kapitel möglichst gleichmäßig abdecken
    const byCh = {}; shuffle(pool).forEach(q => { (byCh[q.ch] = byCh[q.ch] || []).push(q); });
    const picked = []; const n = Math.min(+f.get('n'), pool.length);
    while (picked.length < n) for (const k of shuffle(Object.keys(byCh))) { if (picked.length < n && byCh[k].length) picked.push(byCh[k].pop()); }
    picked.sort((a, b) => chById(a.ch).n - chById(b.ch).n);
    runOral(picked, +f.get('t'));
  });
  $('#quick').addEventListener('submit', e => { e.preventDefault(); runQuick(shuffle(MC).slice(0, +new FormData(e.target).get('n'))); });
}

function finish(kind, results) {
  // results: [{ch, got, max, q}]
  const got = results.reduce((s, r) => s + r.got, 0), max = results.reduce((s, r) => s + r.max, 0), pct = max ? Math.round(100 * got / max) : 0;
  store.exams.push({ date: new Date().toLocaleDateString('de-DE'), kind, pct }); if (store.exams.length > 30) store.exams.shift(); save();
  const per = {}; results.forEach(r => { const p = per[r.ch] = per[r.ch] || { got: 0, max: 0 }; p.got += r.got; p.max += r.max; });
  const weak = results.filter(r => r.got / r.max < 0.6);
  const verdict = pct >= 85 ? 'Das sitzt. Halte das Niveau mit gelegentlichen Durchgängen.' : pct >= 65 ? 'Solide Basis. Schließe die Lücken unten gezielt.' : 'Hier fehlt noch Stoff. Lies die schwachen Kapitel noch einmal und wiederhole die Karten.';
  main.innerHTML = '<h1>Ergebnis</h1><p class="grade">' + pct + ' %</p><p class="lead">' + verdict + '</p>' +
    '<h2>Nach Kapitel</h2><div class="bars">' + Object.keys(per).sort((a, b) => chById(a).n - chById(b).n).map(k => { const p = per[k], v = Math.round(100 * p.got / p.max); return '<div class="bar"><div><a href="#/lernen/' + k + '">' + esc(chName(k)) + '</a>' + meter(v, 100) + '</div><span>' + v + ' %</span></div>'; }).join('') + '</div>' +
    (weak.length ? '<h2>Noch einmal ansehen</h2><ul>' + weak.map(r => '<li>' + fmt(r.q) + ' <a href="#/lernen/' + r.ch + '">Kapitel ' + chById(r.ch).n + '</a></li>').join('') + '</ul>' : '') +
    '<div class="row" style="margin-top:1.5rem"><a class="btn" style="text-decoration:none" href="#/pruefung" id="back">Neue Prüfung</a></div>';
  $('#back').addEventListener('click', e => { e.preventDefault(); viewExamStart(); window.scrollTo(0, 0); });
  window.scrollTo(0, 0);
}

function runOral(qs, secs) {
  let i = 0, timer = null; const results = [];
  cleanup = () => clearInterval(timer);
  function ask() {
    const q = qs[i]; let left = secs;
    main.innerHTML = '<div class="examq"><div class="row spread"><span class="muted">Frage ' + (i + 1) + ' von ' + qs.length + ' · ' + esc(chName(q.ch)) + '</span>' + (secs ? '<span class="timer" id="timer"></span>' : '') + '</div>' +
      '<div class="qbox"><p class="qtext">' + fmt(q.q) + '</p><textarea id="notes" placeholder="Optional: Stichpunkte notieren. Besser: laut antworten, als säße der Prüfer vor dir." aria-label="Stichpunkte"></textarea></div>' +
      '<div class="row" style="margin-top:1rem"><button type="button" class="btn" id="reveal">Kernpunkte aufdecken</button><button type="button" class="link" id="abort">Prüfung abbrechen</button></div><div id="sol"></div></div>';
    clearInterval(timer);
    if (secs) {
      const t = $('#timer'); const show = () => { const a = Math.abs(left); t.textContent = (left < 0 ? '+' : '') + Math.floor(a / 60) + ':' + String(a % 60).padStart(2, '0'); t.classList.toggle('late', left < 0); };
      show(); timer = setInterval(() => { left--; if ($('#timer')) show(); else clearInterval(timer); }, 1000);
    }
    $('#abort').addEventListener('click', () => { clearInterval(timer); viewExamStart(); });
    $('#reveal').addEventListener('click', () => {
      clearInterval(timer); $('#reveal').remove();
      $('#sol').innerHTML = '<h2>Was hast du genannt?</h2><p class="muted small">Hake nur ab, was du wirklich gesagt hast.</p><ul class="points">' + q.points.map((p, k) => '<li><label><input type="checkbox" data-k="' + k + '"><span>' + fmt(p) + '</span></label></li>').join('') + '</ul>' +
        (q.follow ? '<details class="sol"><summary>Nachfrage: ' + fmt(q.follow.q) + '</summary><div><p>' + fmt(q.follow.a) + '</p></div></details>' : '') +
        '<div class="row" style="margin-top:1rem"><button type="button" class="btn" id="next">' + (i + 1 < qs.length ? 'Nächste Frage' : 'Auswertung') + '</button><a href="#/lernen/' + q.ch + '" target="_blank" rel="noopener">Kapitel in neuem Tab öffnen</a></div>';
      $('#next').addEventListener('click', () => {
        results.push({ ch: q.ch, q: q.q, got: $$('#sol input:checked').length, max: q.points.length });
        i++; if (i < qs.length) { ask(); window.scrollTo(0, 0); } else finish('Mündlich', results);
      });
      $('#sol h2').scrollIntoView({ block: 'nearest' });
    });
  }
  ask(); window.scrollTo(0, 0);
}

function runQuick(qs) {
  let i = 0; const results = [];
  function ask() {
    const q = qs[i]; const opts = shuffle(q.opts.map((t, k) => ({ t, ok: k === 0 })));
    main.innerHTML = '<div class="examq"><div class="row spread"><span class="muted">Frage ' + (i + 1) + ' von ' + qs.length + ' · ' + esc(chName(q.ch)) + '</span><button type="button" class="link" id="abort">Abbrechen</button></div>' +
      '<div class="qbox"><p class="qtext">' + fmt(q.q) + '</p><div class="mc">' + opts.map((o, k) => '<button type="button" data-k="' + k + '">' + fmt(o.t) + '</button>').join('') + '</div></div><div id="sol" aria-live="polite"></div></div>';
    $('#abort').addEventListener('click', viewExamStart);
    $$('.mc button').forEach(b => b.addEventListener('click', () => {
      const pick = opts[+b.dataset.k];
      $$('.mc button').forEach(x => { x.disabled = true; if (opts[+x.dataset.k].ok) x.classList.add('right'); });
      if (!pick.ok) b.classList.add('wrong');
      results.push({ ch: q.ch, q: q.q, got: pick.ok ? 1 : 0, max: 1 });
      $('#sol').innerHTML = '<div class="result' + (pick.ok ? '' : ' part') + '"><strong>' + (pick.ok ? 'Richtig.' : 'Nicht richtig.') + '</strong> ' + fmt(q.why) + '</div><button type="button" class="btn" id="next">' + (i + 1 < qs.length ? 'Nächste Frage' : 'Auswertung') + '</button>';
      $('#next').addEventListener('click', () => { i++; if (i < qs.length) ask(); else finish('Schnelltest', results); });
      $('#next').focus();
    }));
  }
  ask(); window.scrollTo(0, 0);
}

route();
})();
