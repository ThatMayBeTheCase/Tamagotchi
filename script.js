// Status
let pet = {
    hunger: 50,
    energy: 50,
    happiness: 50
};

let gameLoop = null;

function startLoop() {
    if (gameLoop !== null) clearInterval(gameLoop);
    gameLoop = setInterval(tick, 3000); // 3 sekunder (1000 ms = 1 sekund)
}

// Hjälpfunktioner.
function clamp(value) {
    return Math.max(0, Math.min(100, value));
}
function setControlsEnabled(enabled) {
    document.getElementById("feed").disabled = !enabled;
    document.getElementById("play").disabled = !enabled;
    document.getElementById("sleep").disabled = !enabled;
}

function render() {
    document.getElementById("hunger").textContent = pet.hunger;
    document.getElementById("energy").textContent = pet.energy;
    document.getElementById("happiness").textContent = pet.happiness;

// Ändra emoji baserat på medelvärde
const hungerWellness = 100 - pet.hunger;
const avg = (hungerWellness + pet.energy + pet.happiness) / 3;
const petDiv = document.getElementById("pet");
if (avg > 70) {
    petDiv.textContent = "😊";
    } 
    else if (avg > 30) {
        petDiv.textContent = "😐";
    }
    else {
        petDiv.textContent = "😭";
    }
}

// Funktioner till knapparna, mata/leka/sova
function feed() {
    pet.hunger = clamp(pet.hunger - 20);
    pet.energy = clamp(pet.energy - 5);
    render();
}

function play() {
    pet.happiness = clamp(pet.happiness + 20);
    pet.energy = clamp(pet.energy - 10);
    pet.hunger = clamp(pet.hunger + 5);
    render();
}

function sleep() {
    pet.energy = clamp(pet.energy + 25);
    pet.hunger = clamp(pet.hunger + 10);
    render();
}

// Ökar/minskar status över tid, var 3e sekund.
function tick() {
    pet.hunger = clamp(pet.hunger + 3);
    pet.energy = clamp(pet.energy - 3);
    pet.happiness = clamp(pet.happiness - 2);
    render();

    if (pet.hunger === 100 || pet.energy === 0 || pet.happiness === 0) {
        document.getElementById("message").textContent = "Ditt husdjur övergav dig!";
        if (gameLoop !== null) {
            clearInterval(gameLoop);
            gameLoop = null;
        }
        document.getElementById("restart").hidden = false;
        setControlsEnabled(false);                          
    }

}

// Event listeners, lyssna på knapptryck.
document.getElementById("feed").addEventListener("click", feed);
document.getElementById("play").addEventListener("click", play);
document.getElementById("sleep").addEventListener("click", sleep);
document.getElementById("restart").addEventListener("click", resetGame);

render();
startLoop();

// Reset funktion, startar om och nollställer spelet.
function resetGame() {
    pet = { hunger: 50, energy: 50, happiness: 50 };

    document.getElementById("message").textContent = "";
    document.getElementById("restart").hidden = true;

    setControlsEnabled(true);

    render();
    startLoop();
}
