/**
 * ==============================================================================
 * CORVO TEAM N29 - SCRIPT JAVASCRIPT FRONTEND (Locale per Visual Studio & GitHub)
 * File: app.js
 * ==============================================================================
 */

// DEFINIZIONE DEGLI SCHEMI TATTICI UFFICIALI DEL CALCIO A 5
const SCHEMI_CALCETTO = {
  '1-2-1': {
    id: '1-2-1',
    nome: '1-2-1 Rombo',
    soprannome: 'Il Diamante',
    descrizione: 'Lo schema classico del Futsal: perfetto equilibrio tra ultimo difensore, ampiezza dei laterali e scarico sul pivot.',
    tag: 'BILANCIATO',
    adattoA: 'Controllo gara, possesso palla e tagli in profondità del pivot.',
    posizioni: {
      gk: { left: '8%', top: '50%', label: 'POR' },
      p1: { left: '26%', top: '50%', label: 'ULTIMO' },
      p2: { left: '52%', top: '22%', label: 'LAT SX' },
      p3: { left: '52%', top: '78%', label: 'LAT DX' },
      p4: { left: '80%', top: '50%', label: 'PIVOT' },
    }
  },
  '2-2': {
    id: '2-2',
    nome: '2-2 Quadrato',
    soprannome: 'La Scatola (Box)',
    descrizione: 'Due difensori bassi e due punte alte: genera pressing asfissiante a coppie e triangolazioni rapide sui binari.',
    tag: 'PRESSING & POSSESSO',
    adattoA: 'Bloccare avversari tecnici, pressing alto e raddoppi di marcatura.',
    posizioni: {
      gk: { left: '8%', top: '50%', label: 'POR' },
      p1: { left: '30%', top: '28%', label: 'DIF SX' },
      p2: { left: '30%', top: '72%', label: 'DIF DX' },
      p3: { left: '74%', top: '28%', label: 'PUNTA SX' },
      p4: { left: '74%', top: '72%', label: 'PUNTA DX' },
    }
  },
  '1-1-2': {
    id: '1-1-2',
    nome: '1-1-2 La Y',
    soprannome: 'Super Offensivo',
    descrizione: 'Un solo difensore ultimo, un regista fulcro a centrocampo e due punte larghe pronte a tagliare in area.',
    tag: 'TRAZIONE ANTERIORE',
    adattoA: 'Recuperare partite in svantaggio, attaccare ad alto ritmo e assedio d\'area.',
    posizioni: {
      gk: { left: '8%', top: '50%', label: 'POR' },
      p1: { left: '24%', top: '50%', label: 'ULTIMO' },
      p2: { left: '48%', top: '50%', label: 'REGISTA' },
      p3: { left: '76%', top: '24%', label: 'ALA SX' },
      p4: { left: '76%', top: '76%', label: 'ALA DX' },
    }
  },
  '3-1': {
    id: '3-1',
    nome: '3-1 Piramide',
    soprannome: 'Muro Difensivo',
    descrizione: 'Tre giocatori sulla linea arretrata a protezione della porta e un solo pivot boa isolato pronto a far salire la squadra.',
    tag: 'DIFESA & RIPARTENZA',
    adattoA: 'Difendere il vantaggio nei minuti finali o arginare avversari con attacco devastante.',
    posizioni: {
      gk: { left: '8%', top: '50%', label: 'POR' },
      p1: { left: '30%', top: '22%', label: 'TERZ SX' },
      p2: { left: '26%', top: '50%', label: 'CENTRALE' },
      p3: { left: '30%', top: '78%', label: 'TERZ DX' },
      p4: { left: '82%', top: '50%', label: 'BOA PIVOT' },
    }
  },
  '1-3-0': {
    id: '1-3-0',
    nome: '1-3-0 Falso Nueve',
    soprannome: 'Rotazione Totale',
    descrizione: 'Nessun attaccante fisso. Tre centrocampisti universali mobili che scambiano posizione senza dare riferimenti.',
    tag: 'ZERO RIFERIMENTI',
    adattoA: 'Disorientare difensori fisici o quando mancano attaccanti di ruolo.',
    posizioni: {
      gk: { left: '8%', top: '50%', label: 'POR' },
      p1: { left: '24%', top: '50%', label: 'ULTIMO' },
      p2: { left: '56%', top: '22%', label: 'UNIV SX' },
      p3: { left: '52%', top: '50%', label: 'UNIV CENT' },
      p4: { left: '56%', top: '78%', label: 'UNIV DX' },
    }
  },
  'power-play': {
    id: 'power-play',
    nome: 'Power Play 5v4',
    soprannome: 'Portiere Volante',
    descrizione: 'Il portiere avanza nella metà campo opposta creando costante superiorità numerica (5 contro 4).',
    tag: 'ALL-IN FINALE',
    adattoA: 'Ultimi 3 minuti per ribaltare o pareggiare la partita.',
    posizioni: {
      gk: { left: '36%', top: '50%', label: 'POR VOLANTE' },
      p1: { left: '54%', top: '18%', label: 'LATO ALTO' },
      p2: { left: '54%', top: '82%', label: 'LATO BASSO' },
      p3: { left: '78%', top: '32%', label: 'PIVOT SX' },
      p4: { left: '78%', top: '68%', label: 'PIVOT DX' },
    }
  }
};

// Stato dell'applicazione con i 9 atleti ufficiali e il calendario
let state = {
  isAdmin: localStorage.getItem('corvo_local_admin') === 'true',
  activeModulo: '1-2-1',
  giocatori: [
    { id: 1, nome: 'Stefano', cognome: 'Parigi', ruolo: 'Portiere', numero_maglia: 1, piede_forte: 'Destro', caratteristiche: 'Reattivo tra i pali, riflessi fulminei nelle conclusioni ravvicinate e guida vocale costante della difesa durante i calci piazzati.' },
    { id: 2, nome: 'Luca', cognome: 'Belotti', ruolo: 'Difensore', numero_maglia: 2, foto_url: 'belotti.jpg', piede_forte: 'Destro', caratteristiche: 'Capitano carismatico del Corvo Team N29. Roccioso nell\'uno contro uno, senso della posizione difensiva impeccabile e visione lucida nell\'impostazione dell\'azione da dietro.' },
    { id: 3, nome: 'Alberto', cognome: 'Ranieri', ruolo: 'Difensore', numero_maglia: 3, piede_forte: 'Destro', caratteristiche: 'Tempismo perfetto nelle diagonali difensive, marcatura asfissiante sull\'avversario diretto e grande spirito di sacrificio.' },
    { id: 4, nome: 'Nicolò', cognome: 'Rota', ruolo: 'Difensore', numero_maglia: 4, foto_url: 'rota nicolo.jpg', piede_forte: 'Destro', caratteristiche: 'Difensore energico e tenace, grandissima grinta sui contrasti, rapido nelle chiusure laterali e spinta costante lungo la corsia difensiva.' },
    { id: 5, nome: 'Pietro', cognome: 'Barcella', ruolo: 'Difensore', numero_maglia: 5, piede_forte: 'Destro', caratteristiche: 'Fisicità imponente, anticipo secco sul pivot rivale e personalità nel guidare le uscite difensive.' },
    { id: 6, nome: 'Alessandro', cognome: 'Rota', ruolo: 'Centrocampista', numero_maglia: 7, piede_forte: 'Destro', caratteristiche: 'Dinamismo instancabile lungo tutta la fascia, abile nel dribbling stretto e tempi perfetti di inserimento a rete.' },
    { id: 7, nome: 'Andrea', cognome: 'Pasinetti', ruolo: 'Attaccante', numero_maglia: 8, piede_forte: 'Destro', caratteristiche: 'Senso del gol letale, fa salire la squadra proteggendo palla di spalle e calcia con potenza da ogni posizione.' },
    { id: 8, nome: 'Raoul', cognome: 'Pasinetti', ruolo: 'Centrocampista', numero_maglia: 11, piede_forte: 'Sinistro', caratteristiche: 'Piede mancino vellutato, visione periferica e conclusioni a giro velenose dalla media distanza.' },
    { id: 9, nome: 'Andrea', cognome: 'Dossena', ruolo: 'Centrocampista', numero_maglia: 10, piede_forte: 'Destro', caratteristiche: 'Classe e fantasia, abile a dettare i ritmi della manovra e a servire assist millimetrici per i compagni.' }
  ],
  partite: [
    { id: 1, giornata: '1ª Giornata', data_ora: '2026-10-02 21:00:00', avversario: 'Cortenova All Stars', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Centro Sportivo San Rocco - Campo 1', note: 'Gara inaugurale del campionato.' },
    { id: 2, giornata: '2ª Giornata', data_ora: '2026-10-09 20:30:00', avversario: 'Virtus Calcetto Bergamo', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'PalaCalcetto Comunale - Campo Coperto', note: 'Seconda giornata di campionato.' },
    { id: 3, giornata: '3ª Giornata', data_ora: '2026-10-16 21:00:00', avversario: 'Real Madrink F.C.', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Centro Sportivo San Rocco', note: 'Data e orario in attesa di definizione con gli avversari.' },
    { id: 4, giornata: '4ª Giornata', data_ora: '2026-10-23 21:00:00', avversario: 'Sporting San Pellegrino', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Centro Sportivo Val Brembana', note: 'Da concordare con la segreteria.' },
    { id: 5, giornata: '5ª Giornata', data_ora: '2026-10-30 20:45:00', avversario: 'Atletico Brianteo', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Centro Sportivo San Rocco', note: 'In attesa di assegnazione campo.' },
    { id: 6, giornata: '6ª Giornata', data_ora: '2026-11-06 21:00:00', avversario: 'Deportivo La Carogna', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'PalaSport Intercomunale', note: 'Orario serale provvisorio.' },
    { id: 7, giornata: '7ª Giornata', data_ora: '2026-11-13 21:00:00', avversario: 'Futsal Brembana', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Da definire', note: 'Ultima gara del girone di andata.' }
  ],
  formazione: {
    matchId: 1,
    modulo: '1-2-1',
    gkId: 1,
    p1Id: 2,
    p2Id: 6,
    p3Id: 8,
    p4Id: 7,
    capitanoId: 2,
    ritrovo: 'Ore 20:30 agli spogliatoi (Maglia Ufficiale Gialla)',
    note: 'Partita inaugurale! Massima puntualità per il riscaldamento pre-partita.',
    updatedAt: ''
  },
  selectedRoleFilter: 'Tutti',
  currentScorers: []
};

// ==============================================================================
// CONFIGURAZIONE FIREBASE CLOUD (Sincronizzazione Realtime su tutti i dispositivi)
// ==============================================================================
const firebaseConfig = {
  apiKey: "AIzaSyD8EWCSTHOXtSdZPJ_evFGTeHjKCeGtDw",
  authDomain: "corvo-team.firebaseapp.com",
  projectId: "corvo-team",
  storageBucket: "corvo-team.firebasestorage.app",
  messagingSenderId: "208405905224",
  appId: "1:208405905224:web:7358f519686bc7a6b67d7d"
};

let db = null;
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('Firebase Cloud Connesso con successo!');
  }
} catch (e) {
  console.warn('Inizializzazione Firebase in fallback:', e);
}

// Inizializzazione all'avvio del DOM
document.addEventListener('DOMContentLoaded', () => {
  // Carica da localStorage come cache iniziale istantanea
  try {
    const savedPartite = localStorage.getItem('corvo_local_matches');
    if (savedPartite) state.partite = JSON.parse(savedPartite);

    const savedPlayers = localStorage.getItem('corvo_local_players');
    if (savedPlayers) state.giocatori = JSON.parse(savedPlayers);

    const savedLineup = localStorage.getItem('corvo_local_lineup');
    if (savedLineup) {
      state.formazione = JSON.parse(savedLineup);
      if (state.formazione.modulo) {
        state.activeModulo = state.formazione.modulo;
      }
    }
  } catch (e) {}

  updateAdminUI();
  renderHeroMatch();
  renderMatches();
  renderModulesBar();
  renderLineup();
  renderPlayers();
  populateScorerSelect();

  // Sincronizzazione Realtime con Firebase Cloud
  setupFirebaseSync();

  // Prova a recuperare dal backend PHP se disponibile in locale (es. XAMPP)
  fetchDataFromPhpBackend();
});

// Ascolto in tempo reale da Firebase Cloud
function setupFirebaseSync() {
  if (!db) return;

  // 1. Dati Partite & Giocatori
  try {
    const docRef = db.collection('campionato').doc('corvoteam_data');
    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data && Array.isArray(data.partite) && data.partite.length > 0) {
          state.partite = data.partite;
          saveLocalMatchesOnly();
          renderHeroMatch();
          renderMatches();
        }
        if (data && Array.isArray(data.giocatori) && data.giocatori.length > 0) {
          state.giocatori = data.giocatori;
          renderPlayers();
        }
      }
    }, (err) => {
      console.warn('Avviso Firebase partite:', err.message);
    });

    // 2. Dati Rosa Titolare & Formazione
    const lineupRef = db.collection('campionato').doc('formazione_data');
    lineupRef.onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data && data.gkId) {
          state.formazione = data;
          if (data.modulo) state.activeModulo = data.modulo;
          try {
            localStorage.setItem('corvo_local_lineup', JSON.stringify(data));
          } catch (e) {}
          renderModulesBar();
          renderLineup();
        }
      }
    }, (err) => {
      console.warn('Avviso Firebase lineup:', err.message);
    });
  } catch (err) {
    console.warn('Errore setup Firebase:', err);
  }
}

// Funzione di sincronizzazione con backend PHP locale se disponibile
async function fetchDataFromPhpBackend() {
  try {
    const resP = await fetch('api/get_partite.php');
    if (resP.ok) {
      const dataP = await resP.json();
      if (dataP.success && Array.isArray(dataP.data) && dataP.data.length > 0) {
        state.partite = dataP.data;
        renderHeroMatch();
        renderMatches();
      }
    }
    const resG = await fetch('api/get_giocatori.php');
    if (resG.ok) {
      const dataG = await resG.json();
      if (dataG.success && Array.isArray(dataG.data) && dataG.data.length > 0) {
        state.giocatori = dataG.data;
        renderPlayers();
      }
    }
  } catch (err) {}
}

// =============================================================================
// GESTIONE RUOLI: ADMIN vs VISITATORE (Zero suggerimenti o autofill)
// =============================================================================
function updateAdminUI() {
  const badge = document.getElementById('role-badge');
  const btnLogin = document.getElementById('btn-login-toggle');
  const adminElements = document.querySelectorAll('.admin-only');
  const guestElements = document.querySelectorAll('.guest-only');

  if (state.isAdmin) {
    if (badge) {
      badge.className = 'badge badge-admin';
      badge.textContent = '👑 Admin: Luca Belotti';
    }
    if (btnLogin) {
      btnLogin.textContent = 'Disconnetti';
      btnLogin.className = 'btn btn-outline';
    }
    adminElements.forEach(el => el.style.display = 'inline-flex');
    guestElements.forEach(el => el.style.display = 'none');
  } else {
    if (badge) {
      badge.className = 'badge badge-guest';
      badge.textContent = '👤 Visitatore (Sola Lettura)';
    }
    if (btnLogin) {
      btnLogin.textContent = 'Accedi come Admin';
      btnLogin.className = 'btn btn-yellow';
    }
    adminElements.forEach(el => el.style.display = 'none');
    guestElements.forEach(el => el.style.display = 'inline-flex');
  }
}

function handleLoginSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const userEl = document.getElementById('login-user');
  const passEl = document.getElementById('login-pass');
  const user = userEl ? userEl.value.trim().toLowerCase() : '';
  const pass = passEl ? passEl.value.trim() : '';
  
  if ((user === 'lucabelotti771@gmail.com' || user === 'luca belotti') && pass === 'corvo2026') {
    state.isAdmin = true;
    localStorage.setItem('corvo_local_admin', 'true');
    closeAdminLoginModal();
    updateAdminUI();
    renderHeroMatch();
    renderMatches();
    renderLineup();
    alert('Accesso Amministratore autorizzato! Benvenuto Luca Belotti.');
  } else {
    alert('Credenziali non valide. Accesso riservato esclusivamente all\'amministratore.');
  }
}

// =============================================================================
// RENDERING HERO & CALENDARIO
// =============================================================================
function renderHeroMatch() {
  const next = state.partite.find(p => p.stato === 'programmata' || p.stato === 'da_definire') || state.partite[0];
  if (!next) return;

  const elGiornata = document.getElementById('hero-giornata');
  if (elGiornata) elGiornata.textContent = `${next.giornata} • Campionato 2026/2027`;
  
  const elAwayName = document.getElementById('hero-away-name');
  if (elAwayName) elAwayName.textContent = next.avversario;
  
  const elAwayAbbr = document.getElementById('hero-away-abbr');
  if (elAwayAbbr) elAwayAbbr.textContent = next.avversario.substring(0, 2).toUpperCase();
  
  const elVenue = document.getElementById('hero-venue');
  if (elVenue) elVenue.textContent = `📍 ${next.luogo || 'Centro Sportivo San Rocco'}`;

  const isTbd = Boolean(next.da_definire);
  const statusEl = document.getElementById('hero-status');
  const elDate = document.getElementById('hero-date');
  if (isTbd) {
    if (elDate) elDate.textContent = '📅 Data in attesa di conferma';
    if (statusEl) {
      statusEl.className = 'status-tbd';
      statusEl.textContent = '⏳ Da definire';
    }
  } else {
    if (elDate) elDate.textContent = `📅 ${next.data_ora ? next.data_ora.substring(0, 16) : 'Ven 02 Ottobre 21:00'}`;
    if (statusEl) {
      statusEl.className = 'status-confirmed';
      statusEl.textContent = 'Confermata';
    }
  }
}

function renderMatches() {
  const grid = document.getElementById('matches-grid');
  if (!grid) return;
  grid.innerHTML = '';

  state.partite.forEach(p => {
    const isTbd = Boolean(p.da_definire);
    const isPlayed = p.stato === 'giocata' && p.gol_fatti !== null;

    const card = document.createElement('div');
    card.className = `match-card ${isTbd ? 'is-tbd' : ''} ${isPlayed ? 'is-played' : ''}`;

    let statusHtml = '';
    if (isPlayed) {
      statusHtml = '<span class="status-confirmed">Giocata</span>';
    } else if (isTbd) {
      statusHtml = '<span class="status-tbd">⏳ Da definire</span>';
    } else {
      statusHtml = '<span class="status-confirmed">Confermata</span>';
    }

    card.innerHTML = `
      <div>
        <div class="match-card-top">
          <span class="match-giornata">${p.giornata}</span>
          ${statusHtml}
        </div>

        <div class="match-teams">
          <div class="team-line">
            <span>CORVO TEAM</span>
            <span class="score">${isPlayed ? p.gol_fatti : '-'}</span>
          </div>
          <div class="team-line">
            <span>${p.avversario}</span>
            <span class="score">${isPlayed ? p.gol_subiti : '-'}</span>
          </div>
        </div>

        <div class="match-details">
          <span>📅 ${isTbd ? 'Data da concordare' : (p.data_ora ? p.data_ora.substring(0, 16) : 'Orario da definire')}</span>
          <span>📍 ${p.luogo || 'Centro Sportivo San Rocco'}</span>
          ${p.note ? `<p class="text-xs text-muted" style="margin-top:4px;">“${p.note}”</p>` : ''}
        </div>
      </div>

      <div class="match-actions">
        ${state.isAdmin ? `
          <button class="btn btn-sm btn-outline" onclick="openEditMatchModal(${p.id})">✏️ Modifica Orario</button>
          <button class="btn btn-sm btn-yellow" onclick="openResultModal(${p.id})">🏆 Risultato</button>
        ` : `
          <span class="text-xs text-muted">Sola visualizzazione</span>
        `}
      </div>
    `;

    grid.appendChild(card);
  });

  const countEl = document.getElementById('stat-count-matches');
  if (countEl) countEl.textContent = state.partite.length;
}

// =============================================================================
// SCHEMI TATTICI CALCIO A 5 & RENDERING ROSA TITOLARE
// =============================================================================
function renderModulesBar() {
  const bar = document.getElementById('modules-selector-bar');
  if (!bar) return;
  bar.innerHTML = '';

  Object.values(SCHEMI_CALCETTO).forEach(mod => {
    const isAct = state.activeModulo === mod.id;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `module-btn ${isAct ? 'active' : ''}`;
    btn.onclick = () => selectModulo(mod.id);
    btn.innerHTML = `
      <span class="module-btn-title">${mod.nome}</span>
      <span class="module-btn-sub">${mod.soprannome}</span>
    `;
    bar.appendChild(btn);
  });

  // Aggiorna box descrittivo
  const curr = SCHEMI_CALCETTO[state.activeModulo] || SCHEMI_CALCETTO['1-2-1'];
  const nameEl = document.getElementById('module-info-name');
  const descEl = document.getElementById('module-info-desc');
  const tagEl = document.getElementById('module-info-tag');
  const waterEl = document.getElementById('pitch-watermark');

  if (nameEl) nameEl.textContent = `${curr.nome} (${curr.soprannome}):`;
  if (descEl) descEl.textContent = `${curr.descrizione} 💡 ${curr.adattoA}`;
  if (tagEl) tagEl.textContent = curr.tag;
  if (waterEl) waterEl.textContent = curr.id;
}

function selectModulo(modId) {
  state.activeModulo = modId;
  state.formazione.modulo = modId;
  renderModulesBar();
  renderLineup();
}

function renderLineup() {
  const f = state.formazione;
  const mod = SCHEMI_CALCETTO[state.activeModulo] || SCHEMI_CALCETTO['1-2-1'];
  const match = state.partite.find(p => p.id === f.matchId) || state.partite[0];

  // Info header
  if (match) {
    const mTitle = document.getElementById('lineup-match-title');
    if (mTitle) mTitle.textContent = `${match.giornata}: CORVO TEAM vs ${match.avversario}`;
  }
  const rEl = document.getElementById('lineup-ritrovo');
  if (rEl) rEl.textContent = f.ritrovo || 'Ore 20:30 agli spogliatoi (Maglia Gialla)';

  const nEl = document.getElementById('lineup-note');
  if (nEl) nEl.textContent = `"${f.note || 'Massima concentrazione per la partita!'}"`;

  const cap = state.giocatori.find(g => g.id === f.capitanoId);
  const capEl = document.getElementById('lineup-capitano');
  if (capEl) capEl.textContent = cap ? `${cap.nome} ${cap.cognome} (#${cap.numero_maglia})` : 'Luca Belotti (#2)';

  const uEl = document.getElementById('lineup-updated');
  if (uEl && f.updatedAt) {
    uEl.textContent = `Formazione aggiornata il ${f.updatedAt}`;
  }

  // Risoluzione dei 5 giocatori titolari
  const gk = state.giocatori.find(g => g.id === f.gkId) || state.giocatori[0];
  const p1 = state.giocatori.find(g => g.id === (f.p1Id || f.defId)) || state.giocatori[1];
  const p2 = state.giocatori.find(g => g.id === (f.p2Id || f.lat1Id)) || state.giocatori[5];
  const p3 = state.giocatori.find(g => g.id === (f.p3Id || f.lat2Id)) || state.giocatori[7];
  const p4 = state.giocatori.find(g => g.id === (f.p4Id || f.fwdId)) || state.giocatori[6];

  renderPlayerMarker('marker-gk', gk, mod.posizioni.gk, true, f.capitanoId);
  renderPlayerMarker('marker-p1', p1, mod.posizioni.p1, false, f.capitanoId);
  renderPlayerMarker('marker-p2', p2, mod.posizioni.p2, false, f.capitanoId);
  renderPlayerMarker('marker-p3', p3, mod.posizioni.p3, false, f.capitanoId);
  renderPlayerMarker('marker-p4', p4, mod.posizioni.p4, false, f.capitanoId);

  // Panchina (i restanti 4 atleti)
  const starters = new Set([gk?.id, p1?.id, p2?.id, p3?.id, p4?.id].filter(Boolean));
  const bench = state.giocatori.filter(g => !starters.has(g.id));

  const benchEl = document.getElementById('lineup-bench-list');
  if (benchEl) {
    benchEl.innerHTML = '';
    bench.forEach(g => {
      const item = document.createElement('div');
      item.className = 'bench-item';
      item.style.cursor = 'pointer';
      item.title = `Clicca per aprire la scheda di ${g.nome} ${g.cognome}`;
      item.onclick = () => openPlayerProfile(g.id);
      item.innerHTML = `
        <div class="bench-item-info">
          <span class="bench-num">#${g.numero_maglia}</span>
          <div>
            <strong style="color:#fff;">${g.nome} ${g.cognome}</strong>
            <div class="text-muted" style="font-size:0.7rem;">${g.ruolo}</div>
          </div>
        </div>
        <span class="badge" style="background:#1e293b; color:#facc15; font-size:0.7rem;">Scheda ➔</span>
      `;
      benchEl.appendChild(item);
    });
  }
}

function renderPlayerMarker(elementId, player, coords, isGk, capId) {
  const el = document.getElementById(elementId);
  if (!el || !player) return;

  // Coordinate dinamiche per far muovere il marcatore sul campo in base al modulo
  el.style.left = coords.left;
  el.style.top = coords.top;
  el.style.cursor = 'pointer';
  el.title = `Clicca per aprire la scheda di ${player.nome} ${player.cognome}`;
  el.onclick = () => openPlayerProfile(player.id);

  const isCap = player.id === capId;
  el.innerHTML = `
    <div class="player-marker-shirt ${isGk ? 'gk-shirt' : ''}" style="${player.foto_url ? `background-image:url('${player.foto_url}'); background-size:cover; background-position:center; border-color:var(--primary-yellow);` : ''}">
      ${isCap ? '<span class="cap-badge">CAP</span>' : ''}
      <span style="${player.foto_url ? 'background:rgba(2,6,23,0.85); padding:1px 4px; border-radius:6px; font-size:0.75rem;' : ''}">#${player.numero_maglia}</span>
      <span class="player-marker-role" style="${player.foto_url ? 'background:rgba(2,6,23,0.85); padding:0px 3px; border-radius:4px;' : ''}">${coords.label}</span>
    </div>
    <div class="player-marker-name">${player.nome} ${player.cognome}</div>
  `;
}

// Modale Modifica Formazione Titolare & Schema (Admin)
function openEditLineupModal() {
  const f = state.formazione;

  // Match select
  const matchSelect = document.getElementById('lineup-select-match');
  if (matchSelect) {
    matchSelect.innerHTML = '';
    state.partite.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.giornata}: vs ${p.avversario} (${p.data_ora.split(' ')[0]})`;
      if (p.id === f.matchId) opt.selected = true;
      matchSelect.appendChild(opt);
    });
  }

  // Modulo select
  const modSelect = document.getElementById('lineup-select-modulo');
  if (modSelect) {
    modSelect.value = state.activeModulo || f.modulo || '1-2-1';
    onModalModuloChange(modSelect.value);
  }

  // Player selects helper
  const fillSelect = (selectId, selectedId) => {
    const s = document.getElementById(selectId);
    if (!s) return;
    s.innerHTML = '';
    state.giocatori.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g.id;
      opt.textContent = `#${g.numero_maglia} ${g.nome} ${g.cognome} (${g.ruolo})`;
      if (g.id === selectedId) opt.selected = true;
      s.appendChild(opt);
    });
  };

  fillSelect('lineup-select-gk', f.gkId);
  fillSelect('lineup-select-p1', f.p1Id || f.defId);
  fillSelect('lineup-select-p2', f.p2Id || f.lat1Id);
  fillSelect('lineup-select-p3', f.p3Id || f.lat2Id);
  fillSelect('lineup-select-p4', f.p4Id || f.fwdId);
  fillSelect('lineup-select-cap', f.capitanoId);

  const ritr = document.getElementById('lineup-input-ritrovo');
  if (ritr) ritr.value = f.ritrovo || '';
  
  const note = document.getElementById('lineup-input-note');
  if (note) note.value = f.note || '';

  openModal('modal-lineup');
}

function onModalModuloChange(modId) {
  const schema = SCHEMI_CALCETTO[modId] || SCHEMI_CALCETTO['1-2-1'];
  const lGk = document.getElementById('label-gk');
  const lP1 = document.getElementById('label-p1');
  const lP2 = document.getElementById('label-p2');
  const lP3 = document.getElementById('label-p3');
  const lP4 = document.getElementById('label-p4');

  if (lGk) lGk.textContent = `🧤 ${schema.posizioni.gk.label} (Portiere):`;
  if (lP1) lP1.textContent = `🛡️ ${schema.posizioni.p1.label}:`;
  if (lP2) lP2.textContent = `⚡ ${schema.posizioni.p2.label}:`;
  if (lP3) lP3.textContent = `⚡ ${schema.posizioni.p3.label}:`;
  if (lP4) lP4.textContent = `🎯 ${schema.posizioni.p4.label}:`;
}

function handleSaveLineup(e) {
  if (e && e.preventDefault) e.preventDefault();
  const matchId = parseInt(document.getElementById('lineup-select-match').value, 10);
  const modulo = document.getElementById('lineup-select-modulo').value;
  const gkId = parseInt(document.getElementById('lineup-select-gk').value, 10);
  const p1Id = parseInt(document.getElementById('lineup-select-p1').value, 10);
  const p2Id = parseInt(document.getElementById('lineup-select-p2').value, 10);
  const p3Id = parseInt(document.getElementById('lineup-select-p3').value, 10);
  const p4Id = parseInt(document.getElementById('lineup-select-p4').value, 10);
  const capitanoId = parseInt(document.getElementById('lineup-select-cap').value, 10);
  const ritrovo = document.getElementById('lineup-input-ritrovo').value.trim();
  const note = document.getElementById('lineup-input-note').value.trim();

  const nowStr = new Date().toLocaleDateString('it-IT') + ' ore ' + new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  state.activeModulo = modulo;
  state.formazione = {
    matchId,
    modulo,
    gkId,
    p1Id,
    p2Id,
    p3Id,
    p4Id,
    capitanoId,
    ritrovo,
    note,
    updatedAt: nowStr
  };

  // Salva localmente
  try {
    localStorage.setItem('corvo_local_lineup', JSON.stringify(state.formazione));
  } catch (err) {}

  // Sincronizza su Firebase Firestore Cloud
  if (db) {
    try {
      db.collection('campionato').doc('formazione_data').set({
        ...state.formazione,
        updatedAtLocal: nowStr
      }, { merge: true }).then(() => {
        console.log('Formazione sincronizzata con successo su Google Firebase Cloud!');
      }).catch(err => {
        console.warn('Avviso sincronizzazione cloud:', err.message);
      });
    } catch (e) {}
  }

  closeModal('modal-lineup');
  renderModulesBar();
  renderLineup();
  alert('Formazione Ufficiale e schema ' + modulo + ' salvati con successo per tutta la squadra!');
}

// =============================================================================
// RENDERING ROSA GIOCATORI & SCHEDA PROFILO DEDICATA
// =============================================================================
let currentInspectedPlayerId = 1;

function renderPlayers() {
  const grid = document.getElementById('players-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = state.selectedRoleFilter === 'Tutti'
    ? state.giocatori
    : state.giocatori.filter(g => g.ruolo === state.selectedRoleFilter);

  filtered.forEach(g => {
    const roleCls = `role-${g.ruolo.toLowerCase()}`;
    const card = document.createElement('div');
    card.className = 'player-card';
    card.style.cursor = 'pointer';
    card.title = `Clicca per aprire la scheda personale di ${g.nome} ${g.cognome}`;
    card.onclick = () => openPlayerProfile(g.id);

    const isCap = g.id === (state.formazione.capitanoId || 2);

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div style="display:flex; align-items:center; gap:10px;">
          ${g.foto_url ? `
            <div style="width:48px; height:48px; border-radius:14px; overflow:hidden; border:2px solid var(--primary-yellow); background:#020617; flex-shrink:0; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
              <img src="${g.foto_url}" alt="${g.nome}" style="width:100%; height:100%; object-fit:cover;" onerror="this.onerror=null; this.src='rota_nicolo.jpg';">
            </div>
          ` : `
            <span class="player-number">#${g.numero_maglia}</span>
          `}
          <div>
            ${g.foto_url ? `<span class="player-number" style="font-size:1.1rem; line-height:1; display:block;">#${g.numero_maglia}</span>` : ''}
            <span class="player-role-badge ${roleCls}" style="${g.foto_url ? 'margin-top:2px; display:inline-block;' : ''}">${g.ruolo}</span>
          </div>
        </div>
        ${isCap ? '<span class="badge" style="background:#facc15; color:#020617; font-weight:900; font-size:0.65rem;">👑 CAP</span>' : ''}
      </div>
      <h4 class="player-name" style="margin-top:8px;">${g.nome} ${g.cognome}</h4>
      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:10px; font-size:0.75rem; border-top:1px solid #1e293b; padding-top:8px;">
        <span class="text-muted" style="font-size:0.7rem;">${g.foto_url ? '📷 Foto Ufficiale' : '📸 In attesa foto'}</span>
        <span class="text-yellow" style="font-weight:bold; font-size:0.75rem;">Apri Scheda ➔</span>
      </div>
    `;

    grid.appendChild(card);
  });

  const pCount = document.getElementById('stat-count-players');
  if (pCount) pCount.textContent = state.giocatori.length;
}

// Apertura Scheda Profilo Giocatore
function openPlayerProfile(id) {
  const p = state.giocatori.find(g => g.id === id);
  if (!p) return;

  currentInspectedPlayerId = p.id;

  // Nome e Cognome
  const nameEl = document.getElementById('profile-player-name');
  if (nameEl) nameEl.innerHTML = `${p.nome} <span class="text-yellow">${p.cognome}</span>`;

  // Statistiche
  const roleStat = document.getElementById('profile-stat-role');
  if (roleStat) roleStat.textContent = p.ruolo;

  const numStat = document.getElementById('profile-stat-num');
  if (numStat) numStat.textContent = '#' + p.numero_maglia;

  const footStat = document.getElementById('profile-stat-foot');
  if (footStat) footStat.textContent = p.piede_forte || 'Destro';

  const roleBadge = document.getElementById('profile-badge-role');
  if (roleBadge) roleBadge.textContent = p.ruolo.toUpperCase();

  const isCap = p.id === (state.formazione.capitanoId || 2);
  const capBadge = document.getElementById('profile-badge-cap');
  if (capBadge) capBadge.style.display = isCap ? 'inline-block' : 'none';

  // Descrizione Tecnica
  const descEl = document.getElementById('profile-player-desc');
  if (descEl) {
    let desc = p.caratteristiche;
    if (!desc) {
      if (p.ruolo === 'Portiere') desc = 'Reattivo tra i pali, riflessi fulminei nelle conclusioni ravvicinate e guida vocale costante della difesa durante i piazzati.';
      else if (p.ruolo === 'Difensore') desc = 'Senso della posizione impeccabile, roccioso nell\'uno contro uno, contrasti puliti e ottima visione per impostare l\'azione dal basso.';
      else if (p.ruolo === 'Centrocampista') desc = 'Dinamismo instancabile lungo tutta la fascia, abile nel dribbling stretto e tempi perfetti di inserimento a rete.';
      else desc = 'Senso del gol letale, fa salire la squadra proteggendo palla di spalle e calcia con potenza da ogni posizione.';
    }
    descEl.textContent = desc;
  }

  // Foto o avatar numerato
  const photoBox = document.getElementById('profile-avatar-box');
  if (photoBox) {
    if (p.foto_url) {
      photoBox.innerHTML = `<img src="${p.foto_url}" alt="${p.nome} ${p.cognome}" class="profile-avatar-img">`;
    } else {
      photoBox.innerHTML = `
        <span style="font-size:2.2rem; font-weight:900; color:var(--primary-yellow); font-family:monospace; line-height:1;">#${p.numero_maglia}</span>
        <span style="font-size:0.55rem; color:#94a3b8; text-transform:uppercase; font-weight:bold; margin-top:4px;">Foto in arrivo</span>
      `;
    }
  }

  const photoInput = document.getElementById('profile-input-photo-url');
  if (photoInput) photoInput.value = p.foto_url || '';

  openModal('modal-player-profile');
}

// Salvataggio Foto Giocatore (Admin o quando Luca le carica)
function savePlayerPhotoUrl() {
  if (!currentInspectedPlayerId) return;
  const input = document.getElementById('profile-input-photo-url');
  const url = input ? input.value.trim() : '';

  const idx = state.giocatori.findIndex(g => g.id === currentInspectedPlayerId);
  if (idx !== -1) {
    state.giocatori[idx].foto_url = url;
    try {
      localStorage.setItem('corvo_local_players', JSON.stringify(state.giocatori));
    } catch (e) {}

    // Sincronizza su Firebase Cloud se connesso
    if (db) {
      try {
        db.collection('campionato').doc('corvoteam_data').set({
          giocatori: state.giocatori
        }, { merge: true });
      } catch (e) {}
    }

    openPlayerProfile(currentInspectedPlayerId);
    renderPlayers();
    alert('Foto profilo aggiornata con successo!');
  }
}

function filterSquad(role) {
  state.selectedRoleFilter = role;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.includes(role));
  });
  renderPlayers();
}

// =============================================================================
// MODIFICA GARA E ORARIO (ADMIN)
// =============================================================================
function openEditNextMatch() {
  const next = state.partite.find(p => p.stato === 'programmata' || p.stato === 'da_definire') || state.partite[0];
  if (next) openEditMatchModal(next.id);
}

function openEditMatchModal(id) {
  const p = state.partite.find(x => x.id === id);
  if (!p) return;

  document.getElementById('edit-match-id').value = p.id;
  document.getElementById('edit-match-giornata').value = p.giornata || '';
  document.getElementById('edit-match-avversario').value = p.avversario || '';
  document.getElementById('edit-match-luogo').value = p.luogo || 'Centro Sportivo San Rocco';
  document.getElementById('edit-match-da-definire').checked = Boolean(p.da_definire);
  document.getElementById('edit-match-note').value = p.note || '';

  const dateParts = (p.data_ora || '2026-10-02 21:00:00').split(' ');
  document.getElementById('edit-match-data').value = dateParts[0] || '2026-10-02';
  document.getElementById('edit-match-ora').value = (dateParts[1] || '21:00').substring(0, 5);

  openModal('modal-edit-match');
}

function handleSaveMatchEdit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const id = parseInt(document.getElementById('edit-match-id').value, 10);
  const data = document.getElementById('edit-match-data').value;
  const ora = document.getElementById('edit-match-ora').value;
  const avversario = document.getElementById('edit-match-avversario').value.trim();
  const giornata = document.getElementById('edit-match-giornata').value.trim();
  const luogo = document.getElementById('edit-match-luogo').value.trim();
  const daDefinire = document.getElementById('edit-match-da-definire').checked;
  const note = document.getElementById('edit-match-note').value.trim();

  const idx = state.partite.findIndex(p => p.id === id);
  if (idx !== -1) {
    state.partite[idx] = {
      ...state.partite[idx],
      giornata,
      avversario,
      data_ora: `${data} ${ora}:00`,
      luogo,
      da_definire: daDefinire,
      note
    };

    saveLocalMatches();
    closeModal('modal-edit-match');
    renderHeroMatch();
    renderMatches();
    renderLineup();
    alert(`Partita vs ${avversario} aggiornata con successo!`);
  }
}

// =============================================================================
// INSERIMENTO RISULTATO (ADMIN)
// =============================================================================
function openResultModal(id) {
  const p = state.partite.find(x => x.id === id);
  if (!p) return;

  document.getElementById('result-match-id').value = p.id;
  document.getElementById('result-match-title').textContent = `CORVO TEAM vs ${p.avversario} (${p.giornata})`;
  document.getElementById('result-gol-fatti').value = p.gol_fatti !== null ? p.gol_fatti : 5;
  document.getElementById('result-gol-subiti').value = p.gol_subiti !== null ? p.gol_subiti : 2;
  state.currentScorers = [];
  renderScorersList();

  openModal('modal-result');
}

function populateScorerSelect() {
  const select = document.getElementById('result-marcatore-select');
  if (!select) return;
  select.innerHTML = '';
  state.giocatori.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.id;
    opt.textContent = `#${g.numero_maglia} ${g.nome} ${g.cognome} (${g.ruolo})`;
    select.appendChild(opt);
  });
}

function addScorerRow() {
  const select = document.getElementById('result-marcatore-select');
  const idG = parseInt(select.value, 10);
  const atleta = state.giocatori.find(g => g.id === idG);
  if (!atleta) return;

  const existing = state.currentScorers.find(s => s.id === idG);
  if (existing) {
    existing.gol += 1;
  } else {
    state.currentScorers.push({ id: idG, nome: `${atleta.nome} ${atleta.cognome}`, gol: 1 });
  }

  renderScorersList();
}

function renderScorersList() {
  const wrap = document.getElementById('scorers-list');
  if (!wrap) return;
  wrap.innerHTML = '';

  state.currentScorers.forEach((s, idx) => {
    const row = document.createElement('div');
    row.style = 'display:flex; justify-content:space-between; align-items:center; background:#020617; padding:6px 12px; border-radius:8px; margin-top:6px; font-size:0.8rem;';
    row.innerHTML = `
      <span>⚽ ${s.nome}</span>
      <div>
        <strong style="color:var(--primary-yellow);">${s.gol} gol</strong>
        <button type="button" onclick="removeScorer(${idx})" style="margin-left:8px; background:none; border:none; color:#ef4444; cursor:pointer;">✕</button>
      </div>
    `;
    wrap.appendChild(row);
  });
}

function removeScorer(idx) {
  state.currentScorers.splice(idx, 1);
  renderScorersList();
}

function handleSaveResult(e) {
  if (e && e.preventDefault) e.preventDefault();
  const id = parseInt(document.getElementById('result-match-id').value, 10);
  const gf = parseInt(document.getElementById('result-gol-fatti').value, 10);
  const gs = parseInt(document.getElementById('result-gol-subiti').value, 10);

  const idx = state.partite.findIndex(p => p.id === id);
  if (idx !== -1) {
    state.partite[idx].gol_fatti = gf;
    state.partite[idx].gol_subiti = gs;
    state.partite[idx].stato = 'giocata';

    saveLocalMatches();
    closeModal('modal-result');
    renderHeroMatch();
    renderMatches();
    alert(`Risultato registrato: CORVO TEAM ${gf} - ${gs} ${state.partite[idx].avversario}!`);
  }
}

// Utility Salvataggio Partite
function saveLocalMatchesOnly() {
  try {
    localStorage.setItem('corvo_local_matches', JSON.stringify(state.partite));
  } catch (e) {}
}

function saveLocalMatches() {
  saveLocalMatchesOnly();

  // Sincronizza su Firebase Firestore Cloud
  if (db) {
    try {
      db.collection('campionato').doc('corvoteam_data').set({
        partite: state.partite,
        giocatori: state.giocatori,
        updatedAtLocal: new Date().toISOString()
      }, { merge: true }).then(() => {
        console.log('Salvataggio su Google Firebase Cloud completato!');
      }).catch(err => {
        console.warn('Avviso Firebase save:', err.message);
      });
    } catch (e) {}
  }
}

// Gestione Modali
function openModal(id) {
  const m = document.getElementById(id);
  if (m) {
    m.classList.add('show', 'active');
    m.style.setProperty('display', 'flex', 'important');
    m.style.setProperty('z-index', '999999', 'important');
  }
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) {
    m.classList.remove('show', 'active');
    m.style.setProperty('display', 'none', 'important');
  }
}

// Esporta tutte le funzioni globali su window per garantire massima affidabilità
window.toggleAdminLogin = toggleAdminLogin;
window.openAdminLoginModal = openAdminLoginModal;
window.closeAdminLoginModal = closeAdminLoginModal;
window.openModal = openModal;
window.closeModal = closeModal;
window.openEditNextMatch = openEditNextMatch;
window.openEditMatchModal = openEditMatchModal;
window.openResultModal = openResultModal;
window.openEditLineupModal = openEditLineupModal;
window.onModalModuloChange = onModalModuloChange;
window.handleLoginSubmit = handleLoginSubmit;
window.handleSaveLineup = handleSaveLineup;
window.handleSaveMatchEdit = handleSaveMatchEdit;
window.handleSaveResult = handleSaveResult;
window.filterSquad = filterSquad;
window.selectModulo = selectModulo;
window.openPlayerProfile = openPlayerProfile;
window.savePlayerPhotoUrl = savePlayerPhotoUrl;

// Chiudi cliccando fuori dal contenuto
window.addEventListener('click', (e) => {
  if (e.target && e.target.classList && e.target.classList.contains('modal')) {
    e.target.classList.remove('show', 'active');
    e.target.style.setProperty('display', 'none', 'important');
  }
});
