/**
 * ==============================================================================
 * CORVO TEAM N29 - SCRIPT JAVASCRIPT FRONTEND (Locale per Visual Studio & GitHub)
 * File: app.js
 * ==============================================================================
 */

// DEFINIZIONE DEGLI SCHEMI TATTICI UFFICIALI DEL CALCIO A 5
var SCHEMI_CALCETTO = window.SCHEMI_CALCETTO || {
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
    { id: 1, giornata: '1ª Giornata', data_ora: '2026-10-02 20:00:00', data_visualizzata: 'Ven 02 Ottobre 2026 - 20:00', avversario: 'The Ragnarok', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Albano S.A. - Palazzetto', note: '1ª Giornata (Trasferta) vs The Ragnarok al Palazzetto di Albano Sant\'Alessandro.' },
    { id: 2, giornata: '2ª Giornata', data_ora: '2026-10-08 21:00:00', data_visualizzata: 'Gio 08 Ottobre 2026 - 21:00', avversario: 'Rapid Straße', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Albano S.A. - Palazzetto', note: '2ª Giornata (In Casa) vs Rapid Straße.' },
    { id: 3, giornata: '3ª Giornata', data_ora: '2026-10-15 20:00:00', data_visualizzata: 'Settimana 15 Ottobre 2026', avversario: 'Turno di riposo', is_riposo: true, gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Turno di riposo', note: 'Turno di riposo per il Corvo Team.' },
    { id: 4, giornata: '4ª Giornata', data_ora: '2026-10-22 21:00:00', data_visualizzata: 'Gio 22 Ottobre 2026 - 21:00', avversario: 'Ghisalba Calcio a 5', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Telgate Centro sportivo', note: '4ª Giornata (Trasferta) vs Ghisalba Calcio a 5.' },
    { id: 5, giornata: '5ª Giornata', data_ora: '2026-10-30 21:30:00', data_visualizzata: 'Ven 30 Ottobre 2026 - 21:30', avversario: 'Atletico Tiburon', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Comun Nuovo Centro Sportivo', note: '5ª Giornata (Trasferta) vs Atletico Tiburon.' },
    { id: 6, giornata: '6ª Giornata', data_ora: '2026-11-06 21:00:00', data_visualizzata: 'Ven 06 Novembre 2026 - 21:00', avversario: 'Crewraçao FC', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Albano S.A. - Palazzetto', note: '6ª Giornata (In Casa) vs Crewraçao FC.' },
    { id: 7, giornata: '7ª Giornata', data_ora: '2026-11-13 21:45:00', data_visualizzata: 'Ven 13 Novembre 2026 - 21:45', avversario: 'G.S.D. Bulls', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Chignolo D\'Isola Palazzetto', note: '7ª Giornata (Trasferta) vs G.S.D. Bulls.' },
    { id: 8, giornata: '8ª Giornata', data_ora: '2026-11-20 22:00:00', data_visualizzata: 'Ven 20 Novembre 2026 - 22:00', avversario: 'Riecos', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Albano S.A. - Palazzetto', note: '8ª Giornata (In Casa) vs Riecos.' },
    { id: 9, giornata: '9ª Giornata', data_ora: '2026-11-25 20:00:00', data_visualizzata: 'Mer 25 Novembre 2026 - 20:00', avversario: 'Csdc', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Comun Nuovo Centro Sportivo', note: '9ª Giornata (Trasferta) vs Csdc.' },
    { id: 10, giornata: '10ª Giornata', data_ora: '2026-12-03 21:00:00', data_visualizzata: 'Gio 03 Dicembre 2026 - 21:00', avversario: 'Fair Play', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Albano S.A. - Palazzetto', note: '10ª Giornata (In Casa) vs Fair Play.' },
    { id: 11, giornata: '11ª Giornata', data_ora: '2026-12-08 21:00:00', data_visualizzata: 'Mar 08 Dicembre 2026 - 21:00', avversario: 'Montecura', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Seriate Centro sportivo', note: '11ª Giornata (Trasferta) vs Montecura. Chiusura girone d\'andata.' },
    { id: 12, giornata: '12ª Giornata', data_ora: '2027-01-15 21:00:00', data_visualizzata: 'Gennaio 2027', avversario: 'The Ragnarok', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Albano S.A. - Palazzetto', note: 'Gennaio 2027 - Inizio girone di ritorno (In Casa).' },
    { id: 13, giornata: '13ª Giornata', data_ora: '2027-01-22 21:00:00', data_visualizzata: 'Gennaio 2027', avversario: 'Rapid Straße', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Da definire', note: 'Gennaio 2027 - Trasferta vs Rapid Straße.' },
    { id: 14, giornata: '14ª Giornata', data_ora: '2027-02-01 20:00:00', data_visualizzata: 'Febbraio 2027', avversario: 'Turno di riposo', is_riposo: true, gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Turno di riposo', note: 'Febbraio 2027 - Turno di riposo per il Corvo Team.' },
    { id: 15, giornata: '15ª Giornata', data_ora: '2027-02-12 21:00:00', data_visualizzata: 'Febbraio 2027', avversario: 'Ghisalba Calcio a 5', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Albano S.A. - Palazzetto', note: 'Febbraio 2027 - In Casa vs Ghisalba Calcio a 5.' },
    { id: 16, giornata: '16ª Giornata', data_ora: '2027-02-26 21:00:00', data_visualizzata: 'Febbraio 2027', avversario: 'Atletico Tiburon', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Albano S.A. - Palazzetto', note: 'Febbraio 2027 - In Casa vs Atletico Tiburon.' },
    { id: 17, giornata: '17ª Giornata', data_ora: '2027-03-05 21:00:00', data_visualizzata: 'Marzo 2027', avversario: 'Crewraçao FC', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Da definire', note: 'Marzo 2027 - Trasferta vs Crewraçao FC.' },
    { id: 18, giornata: '18ª Giornata', data_ora: '2027-03-12 21:00:00', data_visualizzata: 'Marzo 2027', avversario: 'G.S.D. Bulls', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Albano S.A. - Palazzetto', note: 'Marzo 2027 - In Casa vs G.S.D. Bulls.' },
    { id: 19, giornata: '19ª Giornata', data_ora: '2027-03-19 21:00:00', data_visualizzata: 'Marzo 2027', avversario: 'Riecos', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Da definire', note: 'Marzo 2027 - Trasferta vs Riecos.' },
    { id: 20, giornata: '20ª Giornata', data_ora: '2027-04-01 21:00:00', data_visualizzata: 'Gio 01 Aprile 2027 - 21:00', avversario: 'Csdc', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: false, luogo: 'Albano S.A. - Palazzetto', note: 'Gio 01 Aprile 2027 - In Casa vs Csdc.' },
    { id: 21, giornata: '21ª Giornata', data_ora: '2027-04-16 21:00:00', data_visualizzata: 'Aprile 2027', avversario: 'Fair Play', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Seriate Centro sportivo', note: 'Aprile 2027 - Trasferta vs Fair Play.' },
    { id: 22, giornata: '22ª Giornata', data_ora: '2027-04-23 21:00:00', data_visualizzata: 'Aprile 2027', avversario: 'Montecura', gol_fatti: null, gol_subiti: null, stato: 'programmata', da_definire: true, luogo: 'Albano S.A. - Palazzetto', note: 'Aprile 2027 - Ultima giornata di campionato (In Casa) vs Montecura.' }
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
    ritrovo: 'Ore 19:30 agli spogliatoi (Palazzetto di Albano Sant\'Alessandro)',
    note: 'Gara inaugurale del campionato vs The Ragnarok! Massima puntualità per il riscaldamento pre-partita.',
    updatedAt: ''
  },
  selectedRoleFilter: 'Tutti',
  currentScorers: []
};

// Costante con il calendario ufficiale completo per ripristino o sincronizzazione
const CALENDARIO_UFFICIALE_2026_2027 = JSON.parse(JSON.stringify(state.partite));

// Elenco ufficiale delle 11 squadre partecipanti al campionato Serie C Bergamo Tornei 2026/2027
const TOURNAMENT_TEAMS = [
  { name: 'Atletico Tiburon', logo: 'logos/atletico-tiburon.svg' },
  { name: 'Corvo Team', logo: 'corvo-team-logo.svg' },
  { name: 'Crewraçao FC', logo: 'logos/crewracao.svg' },
  { name: 'Csdc', logo: 'logos/csdc.svg' },
  { name: 'Fair Play', logo: 'logos/fair-play.svg' },
  { name: 'G.S.D. Bulls', logo: 'logos/bulls.svg' },
  { name: 'Ghisalba Calcio a 5', logo: 'logos/ghisalba.svg' },
  { name: 'Montecura', logo: 'logos/montecura.svg' },
  { name: 'Rapid Straße', logo: 'logos/rapid-strasse.svg' },
  { name: 'Riecos', logo: 'logos/riecos.svg' },
  { name: 'The Ragnarok', logo: 'logos/the-ragnarok.svg' },
];

function getTeamBadgeInfo(name) {
  if (!name) return { name: 'Squadra', logo: 'corvo-team-logo.svg', isCorvo: false };
  const lower = name.toLowerCase();
  if (lower.includes('corvo')) {
    return { name: 'Corvo Team', logo: 'corvo-team-logo.svg', isCorvo: true };
  }
  if (lower.includes('ragnarok')) {
    return { name: 'The Ragnarok', logo: 'logos/the-ragnarok.svg', isCorvo: false };
  }
  if (lower.includes('rapid')) {
    return { name: 'Rapid Straße', logo: 'logos/rapid-strasse.svg', isCorvo: false };
  }
  if (lower.includes('ghisalba')) {
    return { name: 'Ghisalba Calcio a 5', logo: 'logos/ghisalba.svg', isCorvo: false };
  }
  if (lower.includes('tiburon') || lower.includes('atletico')) {
    return { name: 'Atletico Tiburon', logo: 'logos/atletico-tiburon.svg', isCorvo: false };
  }
  if (lower.includes('crewra')) {
    return { name: 'Crewraçao FC', logo: 'logos/crewracao.svg', isCorvo: false };
  }
  if (lower.includes('bulls')) {
    return { name: 'G.S.D. Bulls', logo: 'logos/bulls.svg', isCorvo: false };
  }
  if (lower.includes('riecos')) {
    return { name: 'Riecos', logo: 'logos/riecos.svg', isCorvo: false };
  }
  if (lower.includes('csdc')) {
    return { name: 'Csdc', logo: 'logos/csdc.svg', isCorvo: false };
  }
  if (lower.includes('fair play') || lower.includes('fairplay')) {
    return { name: 'Fair Play', logo: 'logos/fair-play.svg', isCorvo: false };
  }
  if (lower.includes('montecura')) {
    return { name: 'Montecura', logo: 'logos/montecura.svg', isCorvo: false };
  }
  if (lower.includes('riposo')) {
    return { name: 'Turno di riposo', logo: '', isRiposo: true, isCorvo: false };
  }
  return { name: name, logo: 'corvo-team-logo.svg', isCorvo: false };
}

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
let auth = null;
try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    if (typeof firebase.auth === 'function') {
      auth = firebase.auth();
      // Ascolta stato di autenticazione Firebase in tempo reale
      auth.onAuthStateChanged((user) => {
        if (user && user.email && user.email.toLowerCase() === 'lucabelotti771@gmail.com') {
          state.isAdmin = true;
          localStorage.setItem('corvo_local_admin', 'true');
          console.log('Firebase Auth: Amministratore connesso:', user.email, 'UID:', user.uid);
        } else if (!user) {
          if (localStorage.getItem('corvo_local_admin') !== 'true') {
            state.isAdmin = false;
          }
        }
        updateAdminUI();
      });
    }
    console.log('Firebase Cloud & Auth Connessi con successo!');
  }
} catch (e) {
  console.warn('Inizializzazione Firebase:', e);
}

// Inizializzazione sicura all'avvio
function initApp() {
  console.log('Avvio CORVO TEAM N29...');
  try {
    const savedPartite = localStorage.getItem('corvo_local_matches');
    if (savedPartite) {
      const parsedMatches = JSON.parse(savedPartite);
      if (Array.isArray(parsedMatches) && parsedMatches.length >= 20) {
        state.partite = parsedMatches;
      } else {
        // Se la cache locale ha le vecchie partite di test (es. 7), aggiorna al calendario ufficiale da 22 partite
        state.partite = CALENDARIO_UFFICIALE_2026_2027;
        localStorage.setItem('corvo_local_matches', JSON.stringify(CALENDARIO_UFFICIALE_2026_2027));
      }
    } else {
      state.partite = CALENDARIO_UFFICIALE_2026_2027;
    }

    const savedPlayers = localStorage.getItem('corvo_local_players');
    if (savedPlayers) {
      const parsedPlayers = JSON.parse(savedPlayers);
      if (Array.isArray(parsedPlayers) && parsedPlayers.length > 0) {
        // Preserva foto_url e caratteristiche ufficiali se la cache locale ne era priva
        state.giocatori.forEach(baseG => {
          const stored = parsedPlayers.find(p => p.id === baseG.id);
          if (stored) {
            if (!stored.foto_url && baseG.foto_url) stored.foto_url = baseG.foto_url;
            if (!stored.caratteristiche && baseG.caratteristiche) stored.caratteristiche = baseG.caratteristiche;
            if (!stored.piede_forte && baseG.piede_forte) stored.piede_forte = baseG.piede_forte;
          }
        });
        state.giocatori = parsedPlayers;
      }
    }

    const savedLineup = localStorage.getItem('corvo_local_lineup');
    if (savedLineup) {
      const parsedLineup = JSON.parse(savedLineup);
      if (parsedLineup && parsedLineup.gkId) {
        state.formazione = parsedLineup;
        if (parsedLineup.modulo) {
          state.activeModulo = parsedLineup.modulo;
        }
      }
    }
  } catch (e) {
    console.warn('Errore lettura cache locale:', e);
  }

  updateAdminUI();
  renderHeroMatch();
  renderMatches();
  renderModulesBar();
  renderLineup();
  renderPlayers();
  populateScorerSelect();

  // Gestione attiva schede navigazione mobile
  try {
    const mobileTabs = document.querySelectorAll('.mobile-nav-tab');
    mobileTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        mobileTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  } catch (e) {}

  // Sincronizzazione Realtime con Firebase Cloud
  setupFirebaseSync();

  // Prova a recuperare dal backend PHP se disponibile in locale (es. XAMPP)
  fetchDataFromPhpBackend();
}

// Avvio istantaneo garantito sia con DOMContentLoaded sia a pagina già pronta
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Ascolto in tempo reale da Firebase Cloud
function setupFirebaseSync() {
  if (!db) return;

  // 1. Dati Partite & Giocatori
  try {
    const docRef = db.collection('campionato').doc('corvoteam_data');
    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data && Array.isArray(data.partite) && data.partite.length >= 20) {
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

function openAdminLoginModal() {
  const m = document.getElementById('modal-login');
  if (m) {
    m.style.setProperty('display', 'flex', 'important');
    m.style.setProperty('z-index', '999999', 'important');
    m.classList.add('show', 'active');
    const userInp = document.getElementById('login-user');
    if (userInp) userInp.focus();
  } else {
    const p = prompt('Accesso Amministratore CORVO TEAM:\nInserisci la password di Luca Belotti:');
    if (p && p.trim() === 'corvo2026') {
      localStorage.setItem('corvo_local_admin', 'true');
      state.isAdmin = true;
      updateAdminUI();
      renderHeroMatch();
      renderMatches();
      renderLineup();
      alert('Accesso Amministratore confermato! Benvenuto Luca.');
    } else if (p) {
      alert('Password non valida.');
    }
  }
}

function closeAdminLoginModal() {
  const m = document.getElementById('modal-login');
  if (m) {
    m.style.setProperty('display', 'none', 'important');
    m.classList.remove('show', 'active');
  }
}

function toggleAdminLogin() {
  if (state.isAdmin || localStorage.getItem('corvo_local_admin') === 'true' || (auth && auth.currentUser)) {
    if (confirm('Sei attualmente connesso come Amministratore (Luca Belotti).\nVuoi disconnetterti per tornare alla sola visualizzazione?')) {
      if (auth && auth.currentUser) {
        auth.signOut().catch(err => console.warn('Errore signOut Firebase:', err));
      }
      localStorage.removeItem('corvo_local_admin');
      state.isAdmin = false;
      updateAdminUI();
      renderHeroMatch();
      renderMatches();
      renderLineup();
      alert('Disconnessione effettuata. Ora sei in modalità sola lettura.');
    }
  } else {
    openAdminLoginModal();
  }
}

async function handleLoginSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const userEl = document.getElementById('login-user');
  const passEl = document.getElementById('login-pass');
  const btnSubmit = document.querySelector('#form-login button[type="submit"]');
  const user = userEl ? userEl.value.trim() : '';
  const pass = passEl ? passEl.value.trim() : '';

  if (!user || !pass) {
    alert('Inserisci sia l\'email che la password.');
    return;
  }

  const originalBtnText = btnSubmit ? btnSubmit.textContent : 'Accedi';
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Autenticazione Firebase in corso...';
  }

  // 1. Prova l'autenticazione reale con Firebase Auth (permette di superare le regole di sicurezza Firestore)
  if (auth) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(user, pass);
      const authUser = userCredential.user;
      console.log('Firebase Auth: Login riuscito con successo!', authUser.email, 'UID:', authUser.uid);

      state.isAdmin = true;
      localStorage.setItem('corvo_local_admin', 'true');
      closeAdminLoginModal();
      updateAdminUI();
      renderHeroMatch();
      renderMatches();
      renderLineup();
      alert(`Accesso Amministratore confermato con Firebase Auth!\nBenvenuto Luca Belotti (${authUser.email}).\nOra hai tutti i permessi per modificare e salvare i dati direttamente nel database cloud.`);
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.textContent = originalBtnText;
      }
      return;
    } catch (fbError) {
      console.warn('Errore Firebase Auth:', fbError.code, fbError.message);
      if (fbError.code === 'auth/wrong-password' || fbError.code === 'auth/invalid-credential') {
        alert('Password non corretta per l\'account Firebase ' + user + '.\nVerifica la password che hai impostato nella console di Firebase.');
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = originalBtnText;
        }
        return;
      } else if (fbError.code === 'auth/user-not-found') {
        alert('Utente non trovato su Firebase. Assicurati di usare l\'email creata: lucabelotti771@gmail.com');
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = originalBtnText;
        }
        return;
      } else if (fbError.code === 'auth/network-request-failed') {
        console.warn('Rete offline per Firebase Auth, provo fallback offline.');
      }
    }
  }

  // 2. Fallback offline con credenziale predefinita
  if ((user.toLowerCase() === 'lucabelotti771@gmail.com' || user.toLowerCase() === 'luca belotti') && pass === 'corvo2026') {
    state.isAdmin = true;
    localStorage.setItem('corvo_local_admin', 'true');
    closeAdminLoginModal();
    updateAdminUI();
    renderHeroMatch();
    renderMatches();
    renderLineup();
    alert('Accesso Amministratore locale confermato! Benvenuto Luca Belotti.\n(Nota: per sincronizzare su Firebase Firestore protetto da regole di sicurezza, usa la password del tuo account Firebase).');
  } else {
    alert('Credenziali non valide. Inserisci l\'account lucabelotti771@gmail.com e la password associata.');
  }

  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.textContent = originalBtnText;
  }
}

// =============================================================================
// RENDERING HERO & CALENDARIO
// =============================================================================
function renderHeroMatch() {
  const next = state.partite.find(p => (p.stato === 'programmata' || p.stato === 'da_definire') && !p.is_riposo && p.avversario !== 'Turno di riposo') || state.partite[0];
  if (!next) return;

  const elGiornata = document.getElementById('hero-giornata');
  if (elGiornata) elGiornata.textContent = `${next.giornata} • Serie C Bergamo Tornei 2026/2027`;

  const isCorvoCasa = next.id === 1 ? false : !Boolean(next.note && next.note.toLowerCase().includes('trasferta'));
  const homeBadge = isCorvoCasa ? getTeamBadgeInfo('Corvo Team') : getTeamBadgeInfo(next.avversario);
  const awayBadge = isCorvoCasa ? getTeamBadgeInfo(next.avversario) : getTeamBadgeInfo('Corvo Team');

  // Home elements
  const elHomeName = document.getElementById('hero-home-name');
  if (elHomeName) elHomeName.textContent = homeBadge.name.toUpperCase();
  const elHomeLogo = document.getElementById('hero-home-logo');
  if (elHomeLogo && homeBadge.logo) elHomeLogo.src = homeBadge.logo;
  const elHomeTag = document.getElementById('hero-home-tag');
  if (elHomeTag) elHomeTag.textContent = 'CASA';

  // Away elements
  const elAwayName = document.getElementById('hero-away-name');
  if (elAwayName) elAwayName.textContent = awayBadge.name.toUpperCase();
  const elAwayLogo = document.getElementById('hero-away-logo');
  if (elAwayLogo && awayBadge.logo) elAwayLogo.src = awayBadge.logo;
  const elAwayTag = document.getElementById('hero-away-tag');
  if (elAwayTag) elAwayTag.textContent = 'OSPITE';

  const elVenue = document.getElementById('hero-venue');
  if (elVenue) elVenue.textContent = `📍 ${next.luogo || 'Albano S.A. - Palazzetto'}`;

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
    if (elDate) elDate.textContent = `📅 ${next.data_visualizzata || (next.data_ora ? next.data_ora.substring(0, 16) : 'Ven 02 Ottobre 20:00')}`;
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
    const isRiposo = p.avversario === 'Turno di riposo' || p.is_riposo;

    const card = document.createElement('div');
    card.className = `match-card ${isTbd ? 'is-tbd' : ''} ${isPlayed ? 'is-played' : ''} ${isRiposo ? 'is-riposo' : ''}`;

    let statusHtml = '';
    if (isPlayed) {
      statusHtml = '<span class="status-confirmed">Giocata</span>';
    } else if (isRiposo) {
      statusHtml = '<span class="status-tbd" style="background:rgba(100,116,139,0.2); color:#94a3b8; border-color:rgba(100,116,139,0.4);">🌴 Riposo</span>';
    } else if (isTbd) {
      statusHtml = '<span class="status-tbd">⏳ Da definire</span>';
    } else {
      statusHtml = '<span class="status-confirmed">Confermata</span>';
    }

    if (isRiposo) {
      card.innerHTML = `
        <div>
          <div class="match-card-top">
            <span class="match-giornata">${p.giornata}</span>
            ${statusHtml}
          </div>
          <div class="match-teams" style="text-align:center; padding:16px 12px; background:rgba(15,23,42,0.6);">
            <span style="font-size:1.5rem; display:block; margin-bottom:4px;">🌴</span>
            <strong style="color:#f8fafc; font-size:0.95rem; text-transform:uppercase;">Turno di Riposo</strong>
            <span style="color:#facc15; font-size:0.75rem; display:block; margin-top:2px;">Nessuna gara in programma per il Corvo Team</span>
          </div>
          <div class="match-details">
            <span>📅 ${p.data_visualizzata || p.giornata}</span>
            <span>📍 -</span>
            ${p.note ? `<p class="text-xs text-muted" style="margin-top:4px;">“${p.note}”</p>` : ''}
          </div>
        </div>
      `;
    } else {
      const isCorvoCasa = p.id === 1 ? false : !Boolean(p.note && p.note.toLowerCase().includes('trasferta'));
      const homeBadge = isCorvoCasa ? getTeamBadgeInfo('Corvo Team') : getTeamBadgeInfo(p.avversario);
      const awayBadge = isCorvoCasa ? getTeamBadgeInfo(p.avversario) : getTeamBadgeInfo('Corvo Team');

      let golCasa = '-';
      let golOspite = '-';
      if (isPlayed) {
        golCasa = isCorvoCasa ? p.gol_fatti : p.gol_subiti;
        golOspite = isCorvoCasa ? p.gol_subiti : p.gol_fatti;
      }

      card.innerHTML = `
        <div>
          <div class="match-card-top">
            <span class="match-giornata">${p.giornata}</span>
            ${statusHtml}
          </div>

          <div class="match-teams">
            <!-- Squadra Casa -->
            <div class="team-line ${homeBadge.isCorvo ? 'is-corvo' : ''}">
              <div class="team-line-left">
                <img src="${homeBadge.logo}" alt="${homeBadge.name}" class="team-mini-logo">
                <span class="team-name-clamp">${homeBadge.name}</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="team-badge-tag tag-home">CASA</span>
                <span class="score">${golCasa}</span>
              </div>
            </div>

            <!-- Squadra Ospite -->
            <div class="team-line ${awayBadge.isCorvo ? 'is-corvo' : ''}">
              <div class="team-line-left">
                <img src="${awayBadge.logo}" alt="${awayBadge.name}" class="team-mini-logo">
                <span class="team-name-clamp">${awayBadge.name}</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="team-badge-tag tag-away">OSPITE</span>
                <span class="score">${golOspite}</span>
              </div>
            </div>
          </div>

          <div class="match-details">
            <span>📅 ${isTbd ? 'Data da concordare' : (p.data_visualizzata || (p.data_ora ? p.data_ora.substring(0, 16) : 'Orario da definire'))}</span>
            <span>📍 ${p.luogo || 'Albano S.A. - Palazzetto'}</span>
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
    }

    grid.appendChild(card);
  });

  const countEl = document.getElementById('stat-count-matches');
  if (countEl) countEl.textContent = state.partite.length;
}

// Sincronizzazione automatica dell'intero calendario 2026/2027 su Google Firebase Cloud
async function syncOfficialCalendarToFirebase() {
  if (!state.isAdmin) {
    alert('Accesso riservato all\'amministratore (Luca Belotti).\nAccedi prima con il tuo account Firebase lucabelotti771@gmail.com.');
    return;
  }
  if (!confirm('Vuoi caricare e sincronizzare l\'intero Calendario Ufficiale 2026/2027 (22 partite con loghi e sedi) su Google Firebase Cloud?')) {
    return;
  }
  state.partite = CALENDARIO_UFFICIALE_2026_2027;
  saveLocalMatchesOnly();
  renderHeroMatch();
  renderMatches();
  renderLineup();

  if (db) {
    try {
      await db.collection('campionato').doc('corvoteam_data').set({
        partite: state.partite,
        giocatori: state.giocatori,
        updatedAt: new Date().toISOString(),
        updatedBy: 'Luca Belotti'
      }, { merge: true });
      alert('✅ Calendario Ufficiale 2026/2027 (22 partite con loghi) salvato con successo su Firebase Cloud!\nOra tutti i tuoi atleti e tifosi vedranno il calendario ufficiale aggiornato.');
    } catch (err) {
      console.error('Errore sincronizzazione Firebase:', err);
      if (err.code === 'permission-denied') {
        alert('⚠️ Permesso negato da Firebase.\nAssicurati di aver effettuato l\'accesso con l\'account Firebase lucabelotti771@gmail.com.');
      } else {
        alert('Errore durante il salvataggio su Firebase: ' + err.message);
      }
    }
  } else {
    alert('Calendario aggiornato in locale. (Firebase non connesso)');
  }
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
        if (err.code === 'permission-denied') {
          alert('⚠️ Attenzione: Il salvataggio locale è avvenuto, ma Firebase Cloud ha rifiutato la scrittura.\nMotivo: Permesso Negato dalle regole di sicurezza.\nEffettua l\'accesso con il tuo account Admin: lucabelotti771@gmail.com');
        }
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
// Gestione fallback robusto foto giocatori (supporta spazi, formati e percorsi)
function handlePlayerPhotoError(img, url) {
  if (!img) return;
  const tried = parseInt(img.dataset.tried || '0', 10);
  img.dataset.tried = String(tried + 1);

  if (tried === 0) {
    if (url && url.includes(' ')) {
      img.src = encodeURI(url);
      return;
    }
    if (url && url.toLowerCase().includes('belotti')) {
      img.src = 'belotti.jpg';
      return;
    }
    if (url && url.toLowerCase().includes('rota')) {
      img.src = 'rota_nicolo.jpg';
      return;
    }
  } else if (tried === 1) {
    if (url && url.toLowerCase().includes('belotti')) {
      img.src = 'belotti.jpeg';
      return;
    }
    if (url && url.toLowerCase().includes('rota')) {
      img.src = 'rota nicolo.jpg';
      return;
    }
  }

  // Se l'immagine non è presente nel filesystem o fallisce, mostra il numero di maglia elegante
  img.style.display = 'none';
  if (img.parentElement) {
    const fb = img.parentElement.querySelector('.photo-fallback');
    if (fb) fb.style.display = 'flex';
  }
}
window.handlePlayerPhotoError = handlePlayerPhotoError;

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
            <div style="width:48px; height:48px; border-radius:14px; overflow:hidden; border:2px solid var(--primary-yellow); background:#020617; flex-shrink:0; box-shadow:0 4px 10px rgba(0,0,0,0.5); position:relative; display:flex; align-items:center; justify-content:center;">
              <img src="${g.foto_url}" alt="${g.nome}" style="width:100%; height:100%; object-fit:cover;" onerror="handlePlayerPhotoError(this, '${g.foto_url}')">
              <span class="photo-fallback" style="display:none; font-size:1.1rem; font-weight:900; color:var(--primary-yellow); font-family:monospace;">#${g.numero_maglia}</span>
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
      photoBox.innerHTML = `
        <img src="${p.foto_url}" alt="${p.nome} ${p.cognome}" class="profile-avatar-img" onerror="handlePlayerPhotoError(this, '${p.foto_url}')">
        <div class="photo-fallback" style="display:none; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%;">
          <span style="font-size:2.2rem; font-weight:900; color:var(--primary-yellow); font-family:monospace; line-height:1;">#${p.numero_maglia}</span>
          <span style="font-size:0.55rem; color:#94a3b8; text-transform:uppercase; font-weight:bold; margin-top:4px;">Foto in arrivo</span>
        </div>
      `;
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
        if (err.code === 'permission-denied') {
          alert('⚠️ Attenzione: Il salvataggio locale è avvenuto, ma Firebase Cloud ha rifiutato la scrittura.\nMotivo: Permesso Negato dalle regole di sicurezza.\nEffettua l\'accesso con il tuo account Admin: lucabelotti771@gmail.com');
        }
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
