// ========== DONNÉES GLOBALES ==========
let currentUser = null;
let selectedOdd = null;
let selectedMatch = null;

// Matchs fictifs
const mockMatches = [
    { id: 1, team1: "Real Madrid", team2: "Barcelona", league: "Liga", odds: { team1: 1.85, draw: 3.50, team2: 4.20 } },
    { id: 2, team1: "PSG", team2: "Marseille", league: "Ligue 1", odds: { team1: 1.45, draw: 4.50, team2: 7.50 } },
    { id: 3, team1: "Manchester City", team2: "Arsenal", league: "Premier League", odds: { team1: 2.10, draw: 3.40, team2: 3.50 } },
    { id: 4, team1: "Liverpool", team2: "Chelsea", league: "Premier League", odds: { team1: 2.30, draw: 3.30, team2: 3.20 } },
    { id: 5, team1: "Bayern Munich", team2: "Borussia Dortmund", league: "Bundesliga", odds: { team1: 1.75, draw: 3.80, team2: 5.00 } },
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
function loadMatches() {
    const matchesList = document.getElementById('matchesList');
    matchesList.innerHTML = '';

    mockMatches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        
        matchCard.innerHTML = `
            <div class="match-header">${match.league}</div>
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
            <div class="match-odds">
                <button class="odd-btn" onclick="selectOdd(${match.id}, 'team1', ${match.odds.team1})">
                    <div class="odd-label">Victoire 1</div>
                    <div class="odd-value">${match.odds.team1.toFixed(2)}</div>
                </button>
                <button class="odd-btn" onclick="selectOdd(${match.id}, 'draw', ${match.odds.draw})">
                    <div class="odd-label">Match Nul</div>
                    <div class="odd-value">${match.odds.draw.toFixed(2)}</div>
                </button>
                <button class="odd-btn" onclick="selectOdd(${match.id}, 'team2', ${match.odds.team2})">
                    <div class="odd-label">Victoire 2</div>
                    <div class="odd-value">${match.odds.team2.toFixed(2)}</div>
                </button>
            </div>
            <button class="btn-bet" onclick="openBettingModal(${match.id}, '${match.team1} vs ${match.team2}')">🎯 Parier</button>
        `;
        
        matchesList.appendChild(matchCard);
    });
}

function selectOdd(matchId, oddType, oddValue) {
    selectedMatch = matchId;
    selectedOdd = { type: oddType, value: oddValue };
    
    // Mettre à jour l'UI
    document.querySelectorAll('.odd-btn').forEach(btn => btn.classList.remove('selected'));
    event.target.closest('.odd-btn').classList.add('selected');
}

// ========== MODAL PARIS ==========
function openBettingModal(matchId, matchTitle) {
    selectedMatch = matchId;
    document.getElementById('matchTitle').textContent = '⚽ ' + matchTitle;
    document.getElementById('bettingModal').style.display = 'flex';
    document.getElementById('bettingAmount').value = '1000';
    updateCalculatedGain();
}

function closeBettingModal() {
    document.getElementById('bettingModal').style.display = 'none';
    selectedOdd = null;
}

document.getElementById('bettingAmount')?.addEventListener('input', updateCalculatedGain);

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
