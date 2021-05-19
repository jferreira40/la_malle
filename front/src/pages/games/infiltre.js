// const randomWordFR = require('random-word-fr');
// import randomWordFR from 'random-word-fr';

class GameInfiltre {
    constructor(players) {
        this.players = players;
        this.word = "Avion";
        this.roles = [];
    }
    attributesRoles() {
        let essentialRoles = ['Maitre du jeu', 'Infiltré'];

        for (let index = 2; index < this.players.length; index++) {
            essentialRoles.push('Citoyen');
        }

        var currentIndex = essentialRoles.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = essentialRoles[currentIndex];
            essentialRoles[currentIndex] = essentialRoles[randomIndex];
            essentialRoles[randomIndex] = temporaryValue;
        }

        var result = [];
        for (var i = 0; i < this.players.length; i++)
            result[this.players[i]] = essentialRoles[i];

        this.roles = result;
        return this.roles;
    }
}

const joueurs = ["Thomas", "Jules", "Emma", "Antoine"];

let newGame = new GameInfiltre(joueurs);
console.log(newGame.attributesRoles());
// console.log(randomWordFR());

window.addEventListener("DOMContentLoaded", (event) => {
    if (document.body.classList.contains('infiltre')) {
        // Si le jeu est lancé directement
        document.getElementById("direct-play").addEventListener("click", function (event) {
            event.preventDefault();
            stepOne();
        });

    }
});

function stepOne() {
    // Retrait de l'interface de selection
    document.getElementsByClassName('cta-wrapper')[0].remove();

    const main = document.getElementsByTagName('main')[0];
    main.classList.add('h-full', 'flex', 'flex-col', 'justify-between');

    // Génération de la structure du nombre d'utilisateurs
    const wrapperCounter = document.createElement('div');
    wrapperCounter.classList.add('counter', 'flex', 'justify-center');

    const containerCounter = document.createElement('div');
    containerCounter.classList.add('flex', 'flex-col', 'justify-center');

    const incrementButton = document.createElement('button');
    incrementButton.id = 'increment';
    incrementButton.classList.add('h-8', 'w-8', 'ml-2');
    containerCounter.appendChild(incrementButton);

    const numberContainer = document.createElement('div');
    numberContainer.classList.add('value-wrapper', 'text-white', 'flex', 'items-end');
    const valueSpan = document.createElement('span');
    const valuePlayers = document.createTextNode(4);
    valueSpan.id = 'valuePlayers';
    valueSpan.classList.add('text-center', 'text-6xl', 'font-bold', 'w-12', 'mr-2');
    valueSpan.appendChild(valuePlayers);
    const valueLabel = document.createElement('span');
    const textLabel = document.createTextNode('joueurs')
    valueLabel.classList.add('text-3xl', 'font-bold');
    valueLabel.appendChild(textLabel);

    numberContainer.appendChild(valueSpan);
    numberContainer.appendChild(valueLabel);
    containerCounter.appendChild(numberContainer);

    const decrementButton = document.createElement('button');
    decrementButton.id = 'decrement';
    decrementButton.classList.add('increment', 'h-8', 'w-8', 'ml-2');
    containerCounter.appendChild(decrementButton);

    wrapperCounter.appendChild(containerCounter);

    main.appendChild(wrapperCounter);

    document.getElementById("increment").addEventListener("click", function (event) {
        const nbPlayers = document.getElementById('valuePlayers');
        let number = nbPlayers.innerHTML;
        number++;
        if (number <= 8) {
            nbPlayers.innerHTML = number;
        }
    });

    document.getElementById("decrement").addEventListener("click", function (event) {
        const nbPlayers = document.getElementById('valuePlayers');
        let number = nbPlayers.innerHTML;
        number--;
        if (number >= 4) {
            nbPlayers.innerHTML = number;
        }
    });

    // Génération de la structure du nombre d'utilisateurs
    const wrapperButton = document.createElement('div');
    wrapperButton.classList.add('cta-wrapper', 'mb-14');

    const buttonRules = document.createElement('a');
    buttonRules.id = 'rules';
    buttonRules.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-lightGray', 'text-darkBlue', 'py-2', 'rounded-full', 'font-medium', 'text-xs', 'mb-3');
    const text = document.createTextNode('Voir les règles');
    buttonRules.appendChild(text);

    const buttonStart = document.createElement('a');
    buttonStart.id = 'go-stepTwo';
    buttonStart.classList.add('block', 'w-52', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm');
    const text2 = document.createTextNode('Commencer');
    buttonStart.appendChild(text2);

    wrapperButton.appendChild(buttonRules);
    wrapperButton.appendChild(buttonStart);

    main.appendChild(wrapperButton);

    console.log(document.getElementById('valuePlayers').innerHTML);
}

