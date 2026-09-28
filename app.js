/**
 * ==============================================================================
 * CORVO TEAM N29 - SCRIPT JAVASCRIPT FRONTEND (Locale per Visual Studio & GitHub)
 * File: app.js
 * ==============================================================================
 */

// Stato dell'applicazione con i 9 atleti ufficiali e il calendario
let state = {
  isAdmin: localStorage.getItem('corvo_local_admin') === 'true',
  giocatori: [
    { id: 1, nome: 'Stefano', cognome: 'Parigi', ruolo: 'Portiere', numero_maglia: 1 },
    { id: 2, nome: 'Luca', cognome: 'Belotti', ruolo: 'Difensore', numero_maglia: 2 },
    { id: 3, nome: 'Alberto', cognome: 'Ranieri', ruolo: 'Difensore', numero_maglia: 3 },
    { id: 4, nome: 'Nicolò', cognome: 'Rota', ruolo: 'Difensore', numero_maglia: 4 },
    { id: 5, nome: 'Pietro', cognome: 'Barcella', ruolo: 'Difensore', numero_maglia: 5 },
    { id: 6, nome: 'Alessandro', cognome: 'Rota', ruolo: 'Centrocampista', numero_maglia: 7 },
    { id: 7, nome: 'Andrea', cognome: 'Pasinetti', ruolo: 'Attaccante', numero_maglia: 8 },
    { id: 8, nome: 'Raoul', cognome: 'Pasinetti', ruolo: 'Centrocampista', numero_maglia: 11 },
    { id: 9, nome: 'Andrea', cognome: 'Dossena', ruolo: 'Centrocampista', numero_maglia: 10 }
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
    gkId: 1,
    defId: 2,
    lat1Id: 6,
    lat2Id: 8,
    fwdId: 7,
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
    if (savedLineup) state.formazione = JSON.parse(savedLineup);
  } catch (e) {}

  updateAdminUI();
  renderHeroMatch();
  renderMatches();
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
    } else {
      docRef.set({
        partite: state.partite,
        giocatori: state.giocatori,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(err => console.log('Init doc err:', err));
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
        try {
          localStorage.setItem('corvo_local_lineup', JSON.stringify(data));
        } catch (e) {}
        renderLineup();
      }
    } else {
      lineupRef.set({
        ...state.formazione,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(err => console.log('Init lineup err:', err));
    }
  }, (err) => {
    console.warn('Avviso Firebase lineup:', err.message);
  });
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

  if (state.isAdmin) {
    badge.className = 'badge badge-admin';
    badge.textContent = '👑 Admin: Luca Belotti';
    btnLogin.textContent = 'Disconnetti';
    btnLogin.className = 'btn btn-outline';
    adminElements.forEach(el => el.style.display = 'inline-flex');
  } else {
    badge.className = 'badge badge-guest';
    badge.textContent = '👤 Visitatore (Sola Lettura)';
    btnLogin.textContent = 'Accedi come Admin';
    btnLogin.className = 'btn btn-yellow';
    adminElements.forEach(el => el.style.display = 'none');
  }
}

function toggleAdminLogin() {
  if (state.isAdmin) {
    state.isAdmin = false;
    localStorage.removeItem('corvo_local_admin');
    updateAdminUI();
    renderHeroMatch();
    renderMatches();
    renderLineup();
    alert('Disconnesso: modalità sola consultazione attiva.');
  } else {
    document.getElementById('login-user').value = '';
    document.getElementById('login-pass').value = '';
    openModal('modal-login');
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const user = document.getElementById('login-user').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value.trim();
  
  if ((user === 'lucabelotti771@gmail.com' || user === 'luca belotti') && pass === 'corvo2026') {
    state.isAdmin = true;
    localStorage.setItem('corvo_local_admin', 'true');
    closeModal('modal-login');
    updateAdminUI();
    renderHeroMatch();
    renderMatches();
    renderLineup();
    alert('Accesso Amministratore autorizzato! Benvenuto Luca Belotti.');
  } else {
    alert('Accesso negato. Credenziali riservate non valide.');
  }
}

// =============================================================================
// RENDERING HERO & CALENDARIO
// =============================================================================
function renderHeroMatch() {
  const next = state.partite.find(p => p.stato === 'programmata' || p.stato === 'da_definire') || state.partite[0];
  if (!next) return;

  document.getElementById('hero-giornata').textContent = `${next.giornata} • Campionato 2026/2027`;
  document.getElementById('hero-away-name').textContent = next.avversario;
  document.getElementById('hero-away-abbr').textContent = next.avversario.substring(0, 2).toUpperCase();
  document.getElementById('hero-venue').textContent = `📍 ${next.luogo || 'Centro Sportivo San Rocco'}`;

  const isTbd = Boolean(next.da_definire);
  const statusEl = document.getElementById('hero-status');
  if (isTbd) {
    document.getElementById('hero-date').textContent = '📅 Data in attesa di conferma';
    statusEl.className = 'status-tbd';
    statusEl.textContent = '⏳ Da definire';
  } else {
    document.getElementById('hero-date').textContent = `📅 ${next.data_ora ? next.data_ora.substring(0, 16) : 'Ven 02 Ottobre 21:00'}`;
    statusEl.className = 'status-confirmed';
    statusEl.textContent = 'Confermata';
  }
}

function renderMatches() {
  const grid = document.getElementById('matches-grid');
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

  document.getElementById('stat-count-matches').textContent = state.partite.length;
}

// =============================================================================
// RENDERING ROSA TITOLARE & FORMAZIONE (5v5)
// =============================================================================
function renderLineup() {
  const f = state.formazione;
  const match = state.partite.find(p => p.id === f.matchId) || state.partite[0];

  // Info header
  if (match) {
    document.getElementById('lineup-match-title').textContent = `${match.giornata}: CORVO TEAM vs ${match.avversario}`;
  }
  document.getElementById('lineup-ritrovo').textContent = f.ritrovo || 'Ore 20:30 agli spogliatoi (Maglia Gialla)';
  document.getElementById('lineup-note').textContent = `"${f.note || 'Massima concentrazione per la partita!'}"`;

  const cap = state.giocatori.find(g => g.id === f.capitanoId);
  document.getElementById('lineup-capitano').textContent = cap ? `${cap.nome} ${cap.cognome} (#${cap.numero_maglia})` : 'Luca Belotti (#2)';

  if (f.updatedAt) {
    document.getElementById('lineup-updated').textContent = `Formazione aggiornata il ${f.updatedAt}`;
  }

  // Risoluzione dei 5 giocatori titolari
  const gk = state.giocatori.find(g => g.id === f.gkId) || state.giocatori[0];
  const def = state.giocatori.find(g => g.id === f.defId) || state.giocatori[1];
  const lat1 = state.giocatori.find(g => g.id === f.lat1Id) || state.giocatori[5];
  const lat2 = state.giocatori.find(g => g.id === f.lat2Id) || state.giocatori[7];
  const fwd = state.giocatori.find(g => g.id === f.fwdId) || state.giocatori[6];

  renderPitchSlot('slot-gk', gk, 'POR', true, f.capitanoId);
  renderPitchSlot('slot-def', def, 'DIF', false, f.capitanoId);
  renderPitchSlot('slot-lat1', lat1, 'LAT SX', false, f.capitanoId);
  renderPitchSlot('slot-lat2', lat2, 'LAT DX', false, f.capitanoId);
  renderPitchSlot('slot-fwd', fwd, 'PIVOT', false, f.capitanoId);

  // Panchina (i restanti 4 atleti)
  const starters = new Set([gk?.id, def?.id, lat1?.id, lat2?.id, fwd?.id].filter(Boolean));
  const bench = state.giocatori.filter(g => !starters.has(g.id));

  const benchEl = document.getElementById('lineup-bench-list');
  benchEl.innerHTML = '';

  bench.forEach(g => {
    const item = document.createElement('div');
    item.className = 'bench-item';
    item.innerHTML = `
      <div class="bench-item-info">
        <span class="bench-num">#${g.numero_maglia}</span>
        <div>
          <strong style="color:#fff;">${g.nome} ${g.cognome}</strong>
          <div class="text-muted" style="font-size:0.7rem;">${g.ruolo}</div>
        </div>
      </div>
      <span class="badge" style="background:#1e293b; color:#94a3b8; font-size:0.7rem;">Panchina</span>
    `;
    benchEl.appendChild(item);
  });
}

function renderPitchSlot(elementId, player, roleLabel, isGk, capId) {
  const el = document.getElementById(elementId);
  if (!el || !player) return;

  const isCap = player.id === capId;
  el.innerHTML = `
    <div class="player-marker">
      <div class="player-marker-shirt ${isGk ? 'gk-shirt' : ''}">
        ${isCap ? '<span class="cap-badge">CAP</span>' : ''}
        <span>#${player.numero_maglia}</span>
        <span class="player-marker-role">${roleLabel}</span>
      </div>
      <div class="player-marker-name">${player.nome} ${player.cognome}</div>
    </div>
  `;
}

// Modale Modifica Formazione Titolare (Admin)
function openEditLineupModal() {
  const f = state.formazione;

  // Match select
  const matchSelect = document.getElementById('lineup-select-match');
  matchSelect.innerHTML = '';
  state.partite.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.giornata}: vs ${p.avversario} (${p.data_ora.split(' ')[0]})`;
    if (p.id === f.matchId) opt.selected = true;
    matchSelect.appendChild(opt);
  });

  // Player selects helper
  const fillSelect = (selectId, selectedId) => {
    const s = document.getElementById(selectId);
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
  fillSelect('lineup-select-def', f.defId);
  fillSelect('lineup-select-lat1', f.lat1Id);
  fillSelect('lineup-select-lat2', f.lat2Id);
  fillSelect('lineup-select-fwd', f.fwdId);
  fillSelect('lineup-select-cap', f.capitanoId);

  document.getElementById('lineup-input-ritrovo').value = f.ritrovo || '';
  document.getElementById('lineup-input-note').value = f.note || '';

  openModal('modal-lineup');
}

function handleSaveLineup(e) {
  e.preventDefault();
  const matchId = parseInt(document.getElementById('lineup-select-match').value, 10);
  const gkId = parseInt(document.getElementById('lineup-select-gk').value, 10);
  const defId = parseInt(document.getElementById('lineup-select-def').value, 10);
  const lat1Id = parseInt(document.getElementById('lineup-select-lat1').value, 10);
  const lat2Id = parseInt(document.getElementById('lineup-select-lat2').value, 10);
  const fwdId = parseInt(document.getElementById('lineup-select-fwd').value, 10);
  const capitanoId = parseInt(document.getElementById('lineup-select-cap').value, 10);
  const ritrovo = document.getElementById('lineup-input-ritrovo').value.trim();
  const note = document.getElementById('lineup-input-note').value.trim();

  const nowStr = new Date().toLocaleDateString('it-IT') + ' ore ' + new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

  state.formazione = {
    matchId,
    gkId,
    defId,
    lat1Id,
    lat2Id,
    fwdId,
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
    db.collection('campionato').doc('formazione_data').set({
      ...state.formazione,
      updatedAtServer: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => {
      console.log('Formazione sincronizzata con successo su Google Firebase Cloud!');
    }).catch(err => {
      console.error('Errore sincronizzazione formazione:', err);
    });
  }

  closeModal('modal-lineup');
  renderLineup();
  alert('Formazione Ufficiale salvata e visibile a tutti i compagni!');
}

// =============================================================================
// RENDERING ROSA GIOCATORI
// =============================================================================
function renderPlayers() {
  const grid = document.getElementById('players-grid');
  grid.innerHTML = '';

  const filtered = state.selectedRoleFilter === 'Tutti'
    ? state.giocatori
    : state.giocatori.filter(g => g.ruolo === state.selectedRoleFilter);

  filtered.forEach(g => {
    const roleCls = `role-${g.ruolo.toLowerCase()}`;
    const card = document.createElement('div');
    card.className = 'player-card';

    card.innerHTML = `
      <span class="player-number">#${g.numero_maglia}</span>
      <span class="player-role-badge ${roleCls}">${g.ruolo}</span>
      <h4 class="player-name">${g.nome} ${g.cognome}</h4>
      <p class="text-xs text-muted mt-2">CORVO TEAM N29 • Tesserato ufficiale</p>
    `;

    grid.appendChild(card);
  });

  document.getElementById('stat-count-players').textContent = state.giocatori.length;
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
  e.preventDefault();
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
  e.preventDefault();
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
    db.collection('campionato').doc('corvoteam_data').set({
      partite: state.partite,
      giocatori: state.giocatori,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => {
      console.log('Salvataggio su Google Firebase Cloud completato!');
    }).catch(err => {
      console.error('Errore durante salvataggio su Firebase Cloud:', err);
    });
  }
}

// Gestione Modali
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

// Chiudi cliccando fuori
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
