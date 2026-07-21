function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Ton pronostic ?");

    if (team1 && team2 && pronostic) {
        let matchDiv = document.createElement("div");
        matchDiv.classList.add("match");

        matchDiv.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic: ${pronostic}</span>
        `;

        document.querySelector(".matches").appendChild(matchDiv);
    }
}function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${pronostic}</span>
        `;

        document.body.appendChild(div);
    }
}function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${pronostic}</span>
        `;

        document.getElementById("matches").appendChild(div);
    }
}// Charger les matchs sauvegardés
window.onload = function () {
    let data = localStorage.getItem("matches");

    if (data) {
        document.getElementById("matches").innerHTML = data;
    }
};

function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${pronostic}</span>
        `;

        let container = document.getElementById("matches");
        container.appendChild(div);

        // Sauvegarde
        localStorage.setItem("matches", container.innerHTML);
    }
}function loadMatches() {
    let data = localStorage.getItem("matches");

    if (data) {
        document.getElementById("matches").innerHTML = data;
    }
}

function saveMatches() {
    let container = document.getElementById("matches");
    localStorage.setItem("matches", container.innerHTML);
}

function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${pronostic}</span>
            <br><br>
            <button onclick="deleteMatch(this)">❌ Supprimer</button>
        `;

        document.getElementById("matches").appendChild(div);
        saveMatches();
    }
}

function deleteMatch(button) {
    button.parentElement.remove();
    saveMatches();
}

// charger au démarrage
window.onload = loadMatches;function loadMatches() {
    let data = localStorage.getItem("matches");
    if (data) {
        document.getElementById("matches").innerHTML = data;
    }
}

function saveMatches() {
    localStorage.setItem("matches", document.getElementById("matches").innerHTML);
}

function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");
    let vip = confirm("Match VIP ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        let vipText = vip ? "🔐 VIP" : "Gratuit";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${vip ? "🔒 Caché" : pronostic}</span><br>
            <small>${vipText}</small><br><br>

            <button onclick="editMatch(this)">✏️ Modifier</button>
            <button onclick="deleteMatch(this)">❌ Supprimer</button>
        `;

        document.getElementById("matches").appendChild(div);
        saveMatches();
    }
}

function deleteMatch(btn) {
    btn.parentElement.remove();
    saveMatches();
}

function editMatch(btn) {
    let newProno = prompt("Nouveau pronostic ?");
    if (newProno) {
        btn.parentElement.querySelector("span").innerText = "Pronostic : " + newProno;
        saveMatches();
    }
}

function clearAll() {
    if (confirm("Tout supprimer ?")) {
        document.getElementById("matches").innerHTML = "";
        localStorage.removeItem("matches");
    }
}

window.onload = loadMatches;function loadMatches() {
    let data = localStorage.getItem("matches");
    if (data) {
        document.getElementById("matches").innerHTML = data;
    }
}

function saveMatches() {
    localStorage.setItem("matches", document.getElementById("matches").innerHTML);
}

function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${pronostic}</span><br><br>

            <button onclick="editMatch(this)">✏️ Modifier</button>
            <button onclick="deleteMatch(this)">❌ Supprimer</button>
        `;

        document.getElementById("matches").appendChild(div);
        saveMatches();
    }
}

function deleteMatch(btn) {
    btn.parentElement.remove();
    saveMatches();
}

function editMatch(btn) {
    let newProno = prompt("Nouveau pronostic ?");
    if (newProno) {
        btn.parentElement.querySelector("span").innerText = "Pronostic : " + newProno;
        saveMatches();
    }
}

function clearAll() {
    if (confirm("Tout supprimer ?")) {
        document.getElementById("matches").innerHTML = "";
        localStorage.removeItem("matches");
    }
}

window.onload = loadMatches;function loadMatches() {
    let data = localStorage.getItem("matches");
    if (data) {
        document.getElementById("matches").innerHTML = data;
    }
}

function saveMatches() {
    localStorage.setItem("matches", document.getElementById("matches").innerHTML);
}

function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${pronostic}</span><br><br>

            <button onclick="editMatch(this)">✏️ Modifier</button>
            <button onclick="deleteMatch(this)">❌ Supprimer</button>
        `;

        document.getElementById("matches").appendChild(div);
        saveMatches();
    }
}

function deleteMatch(btn) {
    btn.parentElement.remove();
    saveMatches();
}

function editMatch(btn) {
    let newProno = prompt("Nouveau pronostic ?");
    if (newProno) {
        btn.parentElement.querySelector("span").innerText = "Pronostic : " + newProno;
        saveMatches();
    }
}

function clearAll() {
    if (confirm("Tout supprimer ?")) {
        document.getElementById("matches").innerHTML = "";
        localStorage.removeItem("matches");
    }
}

window.onload = loadMatches;
function loadMatches() {
    let data = localStorage.getItem("matches");
    if (data) {
        document.getElementById("matches").innerHTML = data;
    }
}

function saveMatches() {
    localStorage.setItem("matches", document.getElementById("matches").innerHTML);
}

function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${team1} vs ${team2}</p>
            <span>Pronostic : ${pronostic}</span><br><br>

            <button onclick="editMatch(this)">✏️ Modifier</button>
            <button onclick="deleteMatch(this)">❌ Supprimer</button>
        `;

        document.getElementById("matches").appendChild(div);
        saveMatches();
    }
}

function deleteMatch(btn) {
    btn.parentElement.remove();
    saveMatches();
}

function editMatch(btn) {
    let newProno = prompt("Nouveau pronostic ?");
    if (newProno) {
        btn.parentElement.querySelector("span").innerText = "Pronostic : " + newProno;
        saveMatches();
    }
}

function clearAll() {
    if (confirm("Tout supprimer ?")) {
        document.getElementById("matches").innerHTML = "";
        localStorage.removeItem("matches");
    }
}

window.onload = loadMatches;div.innerHTML = `
    <p>⚽ ${team1} vs ${team2}</p>
    <span>Pronostic : ${pronostic}</span><br><br>

    <button onclick="deleteMatch(this)">❌</button>
`;
// Exemple (tu vas avoir ton propre code)
const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX",
  projectId: "XXXX",
};// CONFIG FIREBASE (remplace avec le tien)
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_DOMAIN",
  projectId: "TON_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// AJOUTER MATCH
function addMatch() {
    let team1 = prompt("Equipe 1 ?");
    let team2 = prompt("Equipe 2 ?");
    let pronostic = prompt("Pronostic ?");

    if (team1 && team2 && pronostic) {
        db.collection("matches").add({
            team1,
            team2,
            pronostic
        });
    }
}

// AFFICHER MATCHS
db.collection("matches").onSnapshot((snapshot) => {
    let container = document.getElementById("matches");
    container.innerHTML = "";

    snapshot.forEach(doc => {
        let data = doc.data();

        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>${data.team1} vs ${data.team2}</p>
            <span>${data.pronostic}</span>
        `;

        container.appendChild(div);
    });
});// SIGNUP
function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        alert("Compte créé !");
    })
    .catch(error => alert(error.message));
}

// LOGIN
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        alert("Connecté !");
        document.getElementById("auth").style.display = "none";
    })
    .catch(error => alert(error.message));
}firebase.auth().onAuthStateChanged(user => {
    if (user) {
        document.getElementById("auth").style.display = "none";
    } else {
        document.getElementById("auth").style.display = "block";
    }
});firebase.auth().createUserWithEmailAndPassword(email, password)
.then((userCredential) => {
    let user = userCredential.user;

    db.collection("users").doc(user.uid).set({
        balance: 10000
    });
});firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection("users").doc(user.uid).onSnapshot(doc => {
            document.getElementById("balance").innerText =
                "💰 Solde : " + doc.data().balance + " FCFA";
        });
    }
});function createCoupon() {
    let amount = prompt("Montant ?");
    let match = prompt("Match ?");
    let cote = prompt("Cote ?");

    let user = firebase.auth().currentUser;

    db.collection("users").doc(user.uid).get().then(doc => {
        let balance = doc.data().balance;

        if (amount > balance) {
            alert("Solde insuffisant !");
            return;
        }

        // retirer argent
        db.collection("users").doc(user.uid).update({
            balance: balance - amount
        });

        // enregistrer coupon
        db.collection("coupons").add({
            userId: user.uid,
            match,
            cote,
            amount
        });

        alert("Coupon créé !");
    });
}// SURVEILLER CONNEXION
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("Connecté :", user.email);

        document.getElementById("auth").style.display = "none";
        document.getElementById("app").style.display = "block";

        loadUserData(user);
    } else {
        document.getElementById("auth").style.display = "block";
        document.getElementById("app").style.display = "none";
    }
});function signup() {
    let email = email.value;
    let password = password.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        let user = userCredential.user;

        // créer profil utilisateur
        db.collection("users").doc(user.uid).set({
            balance: 10000
        });

        alert("Compte créé !");
    })
    .catch(err => alert(err.message));
}

function login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .catch(err => alert(err.message));
}

function logout() {
    firebase.auth().signOut();
}function loadUserData(user) {
    db.collection("users").doc(user.uid)
    .onSnapshot(doc => {
        let data = doc.data();

        document.getElementById("balance").innerText =
            "💰 Solde : " + data.balance + " FCFA";
    });

    loadUserCoupons(user);
}function createCoupon() {
    let user = firebase.auth().currentUser;

    let amount = prompt("Montant ?");
    let match = prompt("Match ?");
    let cote = prompt("Cote ?");

    db.collection("coupons").add({
        userId: user.uid,
        match,
        cote,
        amount,
        date: new Date()
    });

    alert("Coupon enregistré !");
}function loadUserCoupons(user) {
    db.collection("coupons")
    .where("userId", "==", user.uid)
    .onSnapshot(snapshot => {
        let container = document.getElementById("matches");
        container.innerHTML = "";

        snapshot.forEach(doc => {
            let data = doc.data();

            let div = document.createElement("div");
            div.className = "match";

            div.innerHTML = `
                <p>${data.match}</p>
                <span>${data.amount} FCFA | cote ${data.cote}</span>
            `;

            container.appendChild(div);
        });
    });
}
const API_KEY = "5f8bdb8a41a86dd0bc2140e5a56bf529";

async function loadMatches() {
    let response = await fetch("https://v3.football.api-sports.io/fixtures?date=2026-07-21", {
        method: "GET",
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "v3.football.api-sports.io"
        }
    });

    let data = await response.json();

    displayMatches(data.response);
}function displayMatches(matches) {
    let container = document.getElementById("matches");
    container.innerHTML = "";

    matches.forEach(match => {
        let home = match.teams.home.name;
        let away = match.teams.away.name;
        let time = match.fixture.date;

        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>⚽ ${home} vs ${away}</p>
            <span>${new Date(time).toLocaleString()}</span>
        `;

        container.appendChild(div);
    });
}function displayMatches(matches) {
    let container = document.getElementById("matches");
    container.innerHTML = "";

    matches.forEach(match => {
        let home = match.teams.home.name;
        let away = match.teams.away.name;
        let time = match.fixture.date;

        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <p>⚽ ${home} vs ${away}</p>
            <span>${new Date(time).toLocaleString()}</span>
        `;

        container.appendChild(div);
    });
}
loadMatches();let today = new Date().toISOString().split("T")[0];

fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`, )
const API_KEY = "5f8bdb8a41a86dd0bc2140e5a56bf529";
function displayMatches(matches) {
    let container = document.getElementById("matches");
    container.innerHTML = "";

    matches.forEach(match => {
        let home = match.homeTeam.name;
        let away = match.awayTeam.name;

        let homeLogo = match.homeTeam.logo;
        let awayLogo = match.awayTeam.logo;

        let league = match.tournament.name;

        let div = document.createElement("div");
        div.className = "match";

        div.innerHTML = `
            <h4>${league}</h4>

            <div class="teams">
                <img src="${homeLogo}" width="30"> ${home}
                vs
                <img src="${awayLogo}" width="30"> ${away}
            </div>

            <button onclick="selectMatch('${home} vs ${away}')">Parier</button>
        `;

        container.appendChild(div);
    });
}function selectMatch(match) {
    let cote = (Math.random() * 3 + 1).toFixed(2); // cote aléatoire
    let amount = prompt("Montant ?");
    
    let user = firebase.auth().currentUser;

    db.collection("users").doc(user.uid).get().then(doc => {
        let balance = doc.data().balance;

        if (amount > balance) {
            alert("Solde insuffisant !");
            return;
        }

        // retirer argent
        db.collection("users").doc(user.uid).update({
            balance: balance - amount
        });

        // enregistrer coupon
        db.collection("coupons").add({
            userId: user.uid,
            match,
            cote,
            amount,
            status: "en cours"
        });

        alert("Coupon ajouté !");
    });
}function calculateGain(amount, cote) {
    return (amount * cote).toFixed(0);
}div.innerHTML = `
    <p>${data.match}</p>
    <span>${data.amount} FCFA | cote ${data.cote}</span>
    <strong>Gain possible : ${data.amount * data.cote} FCFA</strong>
`;
alert("JS connecté !");
function ajouterMatch() {
    alert("Bouton fonctionne !");
}document.getElementById("addBtn").addEventListener("click", function() {
    alert("Ça marche !");
});
document.addEventListener("DOMContentLoaded", function() {

    console.log("JS chargé ✅");

    const btn = document.getElementById("addBtn");

    if (btn) {
        btn.addEventListener("click", function() {
            alert("Bouton OK !");
        });
    }

});
