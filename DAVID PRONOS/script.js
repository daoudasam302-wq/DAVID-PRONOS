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

window.onload = loadMatches;