// const randomWordFR = require('random-word-fr');
// import randomWordFR from 'random-word-fr';

class GameInfiltre {
    constructor() {
        this.players = [];
        this.word = "Avion";
        this.roles = [];
    }

    setPlayers(arrPlayers) {
        this.players = arrPlayers;
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

// const joueurs = ["Thomas", "Jules", "Emma", "Antoine"];

let newGame = new GameInfiltre();
// console.log(newGame.attributesRoles());
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

    const main = document.getElementsByClassName('main-wrapper')[0];
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

    // TODO Faire la popup des règles

    document.getElementById("go-stepTwo").addEventListener("click", function (event) {
        event.preventDefault();
        stepTwo(parseInt(document.getElementById('valuePlayers').innerHTML));
    });

}

function stepTwo(nbPlayers) {
    // Retrait de l'interface
    document.getElementsByClassName('counter')[0].remove();
    document.getElementsByClassName('cta-wrapper')[0].remove();
    document.getElementsByTagName('body')[0].classList.add('selection');

    document.getElementsByClassName('title-wrapper')[0].classList.remove('mt-16');
    document.getElementsByClassName('title-wrapper')[0].classList.add('mt-4');

    const main = document.getElementsByClassName('main-wrapper')[0];

    // Génération des champs pour l'entrée des utilisateurs
    const wrapperFields = document.createElement('div');
    wrapperFields.classList.add('fields-wrapper', 'w-full', 'flex', 'flex-col', 'items-center');

    const labelFields = document.createElement('span');
    labelFields.classList.add('font-bold', 'text-white', 'text-sm', 'my-5');
    const textLabel = document.createTextNode('Liste des joueurs :');
    labelFields.appendChild(textLabel)

    wrapperFields.appendChild(labelFields);

    for (let i = 1; i <= nbPlayers; i++) {
        const field = document.createElement('input');
        field.setAttribute('type', 'text');
        field.setAttribute('placeholder', 'Joueur ' + i);
        field.required = true;
        field.id = "player" + i;
        field.classList.add('field', 'text-xs', 'rounded', 'shadow-custom', 'w-8/12', 'h-9', 'px-5', 'focus:outline-blue', 'mb-4');

        wrapperFields.appendChild(field);
    }

    main.appendChild(wrapperFields);

    const wrapperButton = document.createElement('div');
    wrapperButton.classList.add('cta-wrapper');

    const buttonStart = document.createElement('a');
    buttonStart.id = 'go-startGame';
    buttonStart.classList.add('block', 'w-52', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mb-14');
    const text = document.createTextNode('Lancer la partie');
    buttonStart.appendChild(text);

    wrapperButton.appendChild(buttonStart);
    main.appendChild(wrapperButton);

    document.getElementById("go-startGame").addEventListener("click", function (event) {
        event.preventDefault();

        const fieldsArray = document.getElementsByTagName('input');

        let playersArray = [];

        for (let field of fieldsArray) {
            if (field.value != '') {
                playersArray.push(field.value);
            }
            // TODO Faire la gestion des erreurs
        }

        if (playersArray.length == nbPlayers) {
            newGame.setPlayers(playersArray);
            startGame();
        }
    });
}

function startGame() {
    newGame.attributesRoles();

    const scriptObj = {
        "start" : "La partie va débuter",
        "distrib" : "Distribuons les rôles, au tour de ",
        "role" : "Vous êtes ",
        "master" : " est le maitre du jeu",
        "rules" : "Tout le monde ferme les yeux, sauf le maitre du jeu",
        "masterName" : "Maitre du jeu, voici le mot à faire deviner :",
        "masterRules" : "Maitre du jeu, posez le téléphone à la vue de tous. Et fermez les yeux.",
        "infiltreRules" : "Infiltré c’est à vous ! Ouvrez les yeux vous allez avoir 5 secondes pour retenir le mot.",
        "infitlreRules2" : "Fermez les yeux infiltré. Ouvrez tous les yeux.",
        "rules" : "Vous avez 5 minutes pour devinez le mot. Maitre du jeu, vous pouvez répondre uniquement par oui, non, ou je ne sais pas.",
        "done" : "C’est terminé, le mot a-t-il été trouvé ?",
        "echec" : "Nous n’avez pas trouvé le mot, toute l’équipe perd.",
        "debate" : "Il est temps de débattre ! A vous de trouver l’infiltré.",
        "eliminate" : "Qui avez vous éliminé ?",
        "winCivil" : "Bien joué ! Vous avez éliminé l’infiltré. Les citoyens l’emportent !",
        "winInfiltre" : "Vous avez éliminé un citoyen, l’infiltré l’emporte !",
    }

    const main = document.getElementsByClassName('main-wrapper')[0];

    // Retrait de l'interface
    document.getElementsByClassName('fields-wrapper')[0].remove();
    document.getElementsByClassName('cta-wrapper')[0].remove();
    document.getElementsByTagName('body')[0].classList.remove('selection');
    document.getElementsByTagName('body')[0].classList.add('started');

    // Génération des champs pour l'entrée des utilisateurs
    const wrapperConsignes = document.createElement('div');
    wrapperConsignes.classList.add('consignes-wrapper', 'w-full', 'flex', 'flex-col', 'items-center');

    const textContainer = document.createElement('span');
    textContainer.classList.add('font-bold', 'text-white', 'text-center', 'text-4xl', 'px-8');
    const valueText = document.createTextNode(scriptObj.start);
    textContainer.appendChild(valueText);

    setTimeout(() => {

        let i = 0;
        
        distributionRoles(i);

        document.getElementById('nextPlayer').addEventListener("click", function (event) {
            event.preventDefault();
    
            i++;

            distributionRoles(i);
        });

    }, 3000);

    wrapperConsignes.appendChild(textContainer);
    main.appendChild(wrapperConsignes);

    console.log(newGame);
}

function distributionRoles(i) {

    const buttonStart = document.createElement('a');
    buttonStart.id = 'nextPlayer';
    buttonStart.classList.add('block', 'w-52', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm');
    const text2 = document.createTextNode('Voir mon rôle');
    buttonStart.appendChild(text2);

    valueText.nodeValue = "cc";
}