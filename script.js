// ========== DONNÉES GLOBALES ==========
let currentUser = null;
let selectedOdd = null;
let selectedMatch = null;
let currentBetMatch = null;
let apiFootballKey = localStorage.getItem('apiFootballKey') || '5f8bdb8a41a86dd0bc2140e5a56bf529';

// Matchs fictifs avec catégories : live, à venir et historiques
const mockMatches = [
    { id: 1, team1: "Real Madrid", team2: "Barcelona", league: "Liga", status: "live", minute: "67'", score: "2 - 1", date: "En direct", odds: { team1: 1.85, draw: 3.50, team2: 4.20 } },
    { id: 2, team1: "PSG", team2: "Marseille", league: "Ligue 1", status: "live", minute: "45'", score: "1 - 0", date: "En direct", odds: { team1: 1.45, draw: 4.50, team2: 7.50 } },
    { id: 3, team1: "Manchester City", team2: "Arsenal", league: "Premier League", status: "upcoming", date: "Ce soir 20:45", odds: { team1: 2.10, draw: 3.40, team2: 3.50 } },
    { id: 4, team1: "Liverpool", team2: "Chelsea", league: "Premier League", status: "upcoming", date: "Demain 18:30", odds: { team1: 2.30, draw: 3.30, team2: 3.20 } },
    { id: 5, team1: "Bayern Munich", team2: "Borussia Dortmund", league: "Bundesliga", status: "upcoming", date: "Samedi 17:30", odds: { team1: 1.75, draw: 3.80, team2: 5.00 } },
    { id: 6, team1: "Inter Milan", team2: "Juventus", league: "Serie A", status: "history", date: "Hier 21:00", result: "3 - 2", odds: { team1: 2.80, draw: 3.10, team2: 2.60 } },
    { id: 7, team1: "Olympique Lyon", team2: "Nice", league: "Ligue 1", status: "history", date: "Avant-hier 19:00", result: "1 - 1", odds: { team1: 2.20, draw: 3.40, team2: 2.90 } },
    { id: 8, team1: "Atletico Madrid", team2: "Sevilla", league: "Liga", status: "history", date: "Hier 20:00", result: "2 - 0", odds: { team1: 1.95, draw: 3.45, team2: 3.80 } },
    { id: 9, team1: "AC Milan", team2: "Napoli", league: "Serie A", status: "upcoming", date: "Dimanche 19:00", odds: { team1: 2.50, draw: 3.20, team2: 2.70 } },
    { id: 10, team1: "Ajax", team2: "Feyenoord", league: "Eredivisie", status: "history", date: "Hier 18:45", result: "0 - 0", odds: { team1: 2.15, draw: 3.35, team2: 3.00 } }
];

// ========== AUTHENTIFICATION ==========
function signup() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('⚠️ Veuillez remplir tous les champs');
        return;
    }

    if (password.length < 4) {
        alert('⚠️ Le mot de passe doit contenir au moins 4 caractères');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (users[email]) {
        alert('⚠️ Ce compte existe déjà');
        return;
    }

    users[email] = {
        password: password,
        balance: 10000, // 10000 FCFA au départ
        coupons: [],
        history: []
    };

    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Compte créé avec succès ! Solde initial: 10000 FCFA');
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('⚠️ Veuillez remplir tous les champs');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (!users[email] || users[email].password !== password) {
        alert('⚠️ Email ou mot de passe incorrect');
        return;
    }

    currentUser = email;
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('appSection').style.display = 'block';
    document.getElementById('userEmail').style.display = 'inline';
    document.getElementById('userEmail').textContent = email;
    document.getElementById('logoutBtn').style.display = 'inline-block';
    
    loadUserData();
    loadMatches();
}

function logout() {
    currentUser = null;
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('appSection').style.display = 'none';
    document.getElementById('userEmail').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// ========== GESTION DES UTILISATEURS ==========
function loadUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];

    if (!user) return;

    document.getElementById('balance').textContent = user.balance.toLocaleString('fr-FR') + ' FCFA';
    document.getElementById('couponCount').textContent = user.coupons.length;
    
    loadCoupons();
    loadHistory();
}

function saveUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];

    if (user) {
        localStorage.setItem('users', JSON.stringify(users));
        loadUserData();
    }
}

// ========== MATCHS ==========
function buildMatchCard(match) {
    const card = document.createElement('div');
    card.className = 'match-card';

    let statusBadge = '';
    let metaInfo = '';

    if (match.status === 'live') {
        statusBadge = '<span class="match-badge live">🔴 En direct</span>';
        metaInfo = `<div class="match-meta">${match.minute} • Score : ${match.score}</div>`;
    } else if (match.status === 'upcoming') {
        statusBadge = '<span class="match-badge upcoming">⏳ À venir</span>';
        metaInfo = `<div class="match-meta">${match.date}</div>`;
    } else {
        statusBadge = '<span class="match-badge history">🕘 Historique</span>';
        metaInfo = `<div class="match-meta">${match.date} • Résultat : ${match.result}</div>`;
    }

    card.innerHTML = `
        <div class="match-header">
            <span>${match.league}</span>
            ${statusBadge}
        </div>
        <div class="match-teams">
            <div class="team">
                <div class="team-logo">⚽</div>
                <div class="team-name">${match.team1}</div>
            </div>
            <div class="vs">vs</div>
            <div class="team">
                <div class="team-logo">⚽</div>
                <div class="team-name">${match.team2}</div>
            </div>
        </div>
        ${metaInfo}
        <div class="market-strip">
            <button class="market-pill" onclick="quickBet(${match.id}, '${match.team1} vs ${match.team2}', ${JSON.stringify(match)}, 'team1', 'Victoire 1', ${match.odds.team1})">1 • ${match.odds.team1.toFixed(2)}</button>
            <button class="market-pill" onclick="quickBet(${match.id}, '${match.team1} vs ${match.team2}', ${JSON.stringify(match)}, 'draw', 'Match nul', ${match.odds.draw})">N • ${match.odds.draw.toFixed(2)}</button>
            <button class="market-pill" onclick="quickBet(${match.id}, '${match.team1} vs ${match.team2}', ${JSON.stringify(match)}, 'team2', 'Victoire 2', ${match.odds.team2})">2 • ${match.odds.team2.toFixed(2)}</button>
        </div>
        <div class="market-tags">
            <span>1X2</span>
            <span>Double chance</span>
            <span>BTTS</span>
            <span>Over 2.5</span>
        </div>
        <button class="btn-bet" onclick="openBettingModal(${match.id}, '${match.team1} vs ${match.team2}', ${JSON.stringify(match)})">🎯 Voir tous les marchés</button>
    `;

    return card;
}

async function loadMatches() {
    const matchesList = document.getElementById('matchesList');
    matchesList.innerHTML = '<p style="color:#94a3b8;">Chargement des matchs réels...</p>';

    let matchesToRender = [];

    if (apiFootballKey) {
        try {
            const today = new Date();
            const from = today.toISOString().slice(0, 10);
            const to = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
            const response = await fetch(`https://v3.football.api-sports.io/fixtures?from=${from}&to=${to}`, {
                headers: {
                    'x-rapidapi-key': apiFootballKey,
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-apisports-key': apiFootballKey
                }
            });

            if (response.ok) {
                const data = await response.json();
                const fixtures = data.response || [];

                matchesToRender = fixtures.slice(0, 30).map(f => {
                    const status = f.fixture.status.short;
                    let matchStatus = 'upcoming';
                    let meta = f.fixture.date ? new Date(f.fixture.date).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : 'À venir';

                    if (['1H', '2H', 'ET', 'HT', 'LIVE', 'AET', 'P'].includes(status)) {
                        matchStatus = 'live';
                        meta = `${f.fixture.status.elapsed || ''} • Score : ${f.goals.home ?? 0} - ${f.goals.away ?? 0}`;
                    } else if (['FT', 'AET', 'PEN'].includes(status)) {
                        matchStatus = 'history';
                        meta = `Terminé • Résultat : ${f.goals.home ?? 0} - ${f.goals.away ?? 0}`;
                    }

                    return {
                        id: f.fixture.id,
                        team1: f.teams.home.name,
                        team2: f.teams.away.name,
                        league: f.league.name,
                        status: matchStatus,
                        date: meta,
                        minute: f.fixture.status.elapsed ? `${f.fixture.status.elapsed}'` : '',
                        score: `${f.goals.home ?? 0} - ${f.goals.away ?? 0}`,
                        result: `${f.goals.home ?? 0} - ${f.goals.away ?? 0}`,
                        odds: { team1: 1.85, draw: 3.40, team2: 2.95 }
                    };
                });
            }
        } catch (error) {
            console.warn('API-Football indisponible :', error);
        }
    }

    if (matchesToRender.length === 0) {
        matchesList.innerHTML = '<p style="color:#f87171;">Aucune fixture réelle n’a pu être chargée pour le moment.</p>';
        return;
    }

    const sections = [
        { title: '🔴 En direct', matches: matchesToRender.filter(m => m.status === 'live') },
        { title: '⏳ À venir', matches: matchesToRender.filter(m => m.status === 'upcoming') },
        { title: '🕘 Matchs d\'avant / historiques', matches: matchesToRender.filter(m => m.status === 'history') }
    ];

    sections.forEach(section => {
        if (section.matches.length === 0) return;

        const sectionWrap = document.createElement('div');
        sectionWrap.className = 'match-section';

        sectionWrap.innerHTML = `<h3>${section.title}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'matches-grid';

        section.matches.forEach(match => grid.appendChild(buildMatchCard(match)));
        sectionWrap.appendChild(grid);
        matchesList.appendChild(sectionWrap);
    });
}

function selectOdd(matchId, oddType, oddValue) {
    selectedMatch = matchId;
    selectedOdd = { type: oddType, value: oddValue };

    const clickedBtn = event?.currentTarget || event?.target?.closest('.odd-btn');
    document.querySelectorAll('.odd-btn').forEach(btn => btn.classList.remove('selected'));
    if (clickedBtn) {
        clickedBtn.classList.add('selected');
    }
}

// ========== MODAL PARIS ==========
function quickBet(matchId, matchTitle, matchData, type, label, value) {
    openBettingModal(matchId, matchTitle, matchData, type, label, value);
}

function openBettingModal(matchId, matchTitle, matchData, type = null, label = null, value = null) {
    selectedMatch = matchId;
    currentBetMatch = matchData || { title: matchTitle };
    document.getElementById('matchTitle').textContent = '⚽ ' + matchTitle;
    document.getElementById('bettingModal').style.display = 'flex';
    document.getElementById('bettingAmount').value = '1000';
    renderBettingOptions(matchData, type, label, value);
    updateCalculatedGain();
}

function closeBettingModal() {
    document.getElementById('bettingModal').style.display = 'none';
    selectedOdd = null;
    document.getElementById('oddsContainer').innerHTML = '';
}

document.getElementById('bettingAmount')?.addEventListener('input', updateCalculatedGain);

function renderBettingOptions(matchData, type = null, label = null, value = null) {
    const container = document.getElementById('oddsContainer');
    container.innerHTML = '';

    const options = [
        { label: 'Victoire 1', value: matchData?.odds?.team1 || 1.85, key: 'team1' },
        { label: 'Match nul', value: matchData?.odds?.draw || 3.40, key: 'draw' },
        { label: 'Victoire 2', value: matchData?.odds?.team2 || 2.95, key: 'team2' },
        { label: 'Double chance (1N)', value: 1.45, key: 'double' },
        { label: 'Both teams to score', value: 1.70, key: 'btts' },
        { label: 'Plus de 2.5 buts', value: 1.60, key: 'over25' },
        { label: '1er buteur', value: 3.20, key: 'firstscorer' },
        { label: 'Score exact 1-0', value: 7.50, key: 'score10' }
    ];

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'odds-option';
        btn.innerHTML = `<strong>${option.label}</strong><span>@${option.value.toFixed(2)}</span>`;
        btn.onclick = () => {
            selectedOdd = { type: option.key, value: option.value, label: option.label };
            document.querySelectorAll('.odds-option').forEach(el => el.classList.remove('selected'));
            btn.classList.add('selected');
            updateCalculatedGain();
        };
        if (type && option.key === type) {
            btn.classList.add('selected');
            selectedOdd = { type: option.key, value: value || option.value, label: label || option.label };
        }
        container.appendChild(btn);
    });
}

function updateCalculatedGain() {
    if (!selectedOdd) return;

    const amount = parseInt(document.getElementById('bettingAmount').value) || 0;
    const gain = Math.floor(amount * selectedOdd.value);

    document.getElementById('calculatedGain').innerHTML = 
        `Gain potentiel: <strong>${gain.toLocaleString('fr-FR')} FCFA</strong>`;
}

function placeBet() {
    if (!selectedOdd) {
        alert('⚠️ Veuillez sélectionner une cote');
        return;
    }

    const amount = parseInt(document.getElementById('bettingAmount').value) || 0;
    
    if (amount < 100 || amount > 50000) {
        alert('⚠️ Le montant doit être entre 100 et 50000 FCFA');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];

    if (user.balance < amount) {
        alert('⚠️ Solde insuffisant !');
        return;
    }

    // Créer le coupon
    const coupon = {
        id: Date.now(),
        matchId: selectedMatch,
        match: document.getElementById('matchTitle').textContent.replace('⚽ ', ''),
        amount: amount,
        odd: selectedOdd.value,
        potentialGain: Math.floor(amount * selectedOdd.value),
        oddType: selectedOdd.type,
        betLabel: selectedOdd.label,
        date: new Date().toLocaleString('fr-FR'),
        status: 'pending'
    };

    user.coupons.push(coupon);
    user.balance -= amount;

    // Enregistrer l'historique
    user.history.push({
        type: 'bet',
        amount: amount,
        description: `Pari sur ${coupon.match}`,
        date: new Date().toLocaleString('fr-FR')
    });

    localStorage.setItem('users', JSON.stringify(users));
    
    alert('✅ Pari placé avec succès !');
    closeBettingModal();
    loadUserData();
}

// ========== COUPONS ==========
function loadCoupons() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];

    const couponsList = document.getElementById('couponsList');
    const couponStats = document.getElementById('couponStats');

    couponsList.innerHTML = '';

    if (user.coupons.length === 0) {
        couponsList.innerHTML = '<p style="color: #94a3b8; text-align: center;">Aucun coupon pour le moment</p>';
        couponStats.style.display = 'none';
        return;
    }

    couponStats.style.display = 'block';

    let totalStake = 0;
    let totalPotentialGain = 0;

    user.coupons.forEach(coupon => {
        totalStake += coupon.amount;
        totalPotentialGain += coupon.potentialGain;

        const couponCard = document.createElement('div');
        couponCard.className = 'coupon-card';

        const statusClass = coupon.status === 'pending' ? 'status-pending' : 
                          coupon.status === 'won' ? 'status-won' : 'status-lost';
        const statusText = coupon.status === 'pending' ? 'En Attente' : 
                          coupon.status === 'won' ? 'Gagnée' : 'Perdue';

        couponCard.innerHTML = `
            <div class="coupon-match">🎯 ${coupon.match}</div>
            <div class="coupon-details">
                <span>Mise: <strong>${coupon.amount.toLocaleString('fr-FR')} FCFA</strong></span>
                <span>Cote: <strong>@${coupon.odd.toFixed(2)}</strong></span>
            </div>
            <div class="coupon-details">
                <span>Pari: <strong>${coupon.betLabel || 'Type de pari'}</strong></span>
            </div>
            <div class="coupon-details">
                <span>Gain potentiel: <strong>${coupon.potentialGain.toLocaleString('fr-FR')} FCFA</strong></span>
                <span class="coupon-status ${statusClass}">${statusText}</span>
            </div>
            <small style="color: #94a3b8;">${coupon.date}</small>
            <button class="btn-remove" onclick="removeCoupon(${coupon.id})">❌ Annuler</button>
        `;

        couponsList.appendChild(couponCard);
    });

    document.getElementById('totalStake').textContent = totalStake.toLocaleString('fr-FR') + ' FCFA';
    document.getElementById('potentialGain').textContent = totalPotentialGain.toLocaleString('fr-FR') + ' FCFA';
}

function removeCoupon(couponId) {
    if (!confirm('Êtes-vous sûr de vouloir annuler ce coupon ?')) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];

    const coupon = user.coupons.find(c => c.id === couponId);
    if (!coupon) return;

    // Rembourser le montant
    user.balance += coupon.amount;

    // Supprimer le coupon
    user.coupons = user.coupons.filter(c => c.id !== couponId);

    // Enregistrer l'historique
    user.history.push({
        type: 'refund',
        amount: coupon.amount,
        description: `Remboursement d'un coupon (${coupon.match})`,
        date: new Date().toLocaleString('fr-FR')
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Coupon annulé et remboursé');
    loadUserData();
}

function validateAllCoupons() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];

    user.coupons.forEach(coupon => {
        // Simulation aléatoire
        const won = Math.random() > 0.5;
        coupon.status = won ? 'won' : 'lost';

        if (won) {
            user.balance += coupon.potentialGain;
            user.history.push({
                type: 'win',
                amount: coupon.potentialGain,
                description: `Victoire sur ${coupon.match}`,
                date: new Date().toLocaleString('fr-FR')
            });
        } else {
            user.history.push({
                type: 'loss',
                amount: -coupon.amount,
                description: `Défaite sur ${coupon.match}`,
                date: new Date().toLocaleString('fr-FR')
            });
        }
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Coupons validés !');
    loadUserData();
}

function deleteAllCoupons() {
    if (!confirm('Êtes-vous sûr de vouloir annuler TOUS les coupons ?')) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];

    // Calculer le remboursement total
    let totalRefund = user.coupons.reduce((sum, c) => sum + c.amount, 0);

    user.balance += totalRefund;
    user.coupons = [];

    user.history.push({
        type: 'refund',
        amount: totalRefund,
        description: 'Annulation de tous les coupons',
        date: new Date().toLocaleString('fr-FR')
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert(`✅ ${totalRefund.toLocaleString('fr-FR')} FCFA remboursés`);
    loadUserData();
}

// ========== HISTORIQUE ==========
function loadHistory() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[currentUser];
    const historyList = document.getElementById('historyList');

    historyList.innerHTML = '';

    if (user.history.length === 0) {
        historyList.innerHTML = '<p style="color: #94a3b8; text-align: center;">Aucune transaction</p>';
        return;
    }

    // Afficher en ordre inverse (plus récent d'abord)
    user.history.slice().reverse().forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        const amountClass = item.amount > 0 ? 'amount-in' : 'amount-out';
        const sign = item.amount > 0 ? '+' : '';

        historyItem.innerHTML = `
            <div class="history-text">
                <div class="history-date">${item.date}</div>
                <div>${item.description}</div>
            </div>
            <div class="history-amount ${amountClass}">
                ${sign}${item.amount.toLocaleString('fr-FR')} FCFA
            </div>
        `;

        historyList.appendChild(historyItem);
    });
}

// ========== NAVIGATION TABS ==========
function showTab(tabName) {
    // Cacher tous les tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Afficher le tab actif
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// ========== INITIALISATION ==========
window.addEventListener('load', () => {
    // Vérifier si l'utilisateur est déjà connecté
    const urlParams = new URLSearchParams(window.location.search);
    const autoLogin = urlParams.get('login');

    if (autoLogin) {
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('password').value = 'test123';
    }
}); 
