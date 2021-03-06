class GameInfiltre {

    constructor(arrPlayers) {
        this.players = arrPlayers;
        this.setWord();
        this.attributesRoles();
    }

    setWord() {
        fetch("./words.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                const keys = Object.keys(data);
                const randIndex = Math.floor(Math.random() * keys.length);
                let word = data[keys[randIndex]];

                //HOTFIX Word too long to display properly
                //TODO fix words too long
                while (word.length > 10) {
                    word = randomWord(data);
                }
                this.word = word;
            });

    }

    getRoles() {
        return this.roles;
    }

    attributesRoles() {
        let essentialRoles = ['Maitre du jeu', 'Infiltré','Citoyen','Citoyen'];

        for (let index = 4; index < this.players.length; index++) {
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

        var result = this.players;
        for (var i = 0; i < this.players.length; i++)

            result[i].role = essentialRoles[i];

        this.roles = result;
    }

    getPlayersLength() {
        return this.players.length;
    }

    getWord() {
        return this.word;
    }

}

const scriptObj = {
    "start": "La partie va débuter",
    "distrib": "Distribuons les rôles, au tour de ",
    "role": "Vous êtes ",
    "master": " est le maitre du jeu",
    "rulesAll": "Tout le monde ferme les yeux, sauf le maitre du jeu",
    "masterName": "Maitre du jeu, voici le mot à faire deviner :",
    "masterRules": "Maitre du jeu, posez le téléphone à la vue de tous. Et fermez les yeux.",
    "infiltreRules": "Infiltré c’est à vous ! Ouvrez les yeux vous allez avoir 5 secondes pour retenir le mot.",
    "infiltreRules2": "Fermez les yeux infiltré. Ouvrez tous les yeux.",
    "rules": "Vous avez 5 minutes pour deviner le mot. Maitre du jeu, vous pouvez répondre uniquement par oui, non, ou je ne sais pas.",
    "done": "C’est terminé, le mot a-t-il été trouvé ?",
    "echec": "Nous n’avez pas trouvé le mot, toute l’équipe perd.",
    "debate": "Il est temps de débattre ! A vous de trouver l’infiltré.",
    "eliminate": "Qui avez vous éliminé ?",
    "winCivil": "Bien joué ! Vous avez éliminé l’infiltré. Les citoyens l’emportent !",
    "winInfiltre": "Vous avez éliminé un citoyen, l’infiltré l’emporte !",
}


let newGame;

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("direct-play").addEventListener("click", function (event) {
        event.preventDefault();
        stepOne();
    });
    document.getElementById("groupSelection").addEventListener("click", function (event) {
        event.preventDefault();
        popUpTeams();
    });
});

function popUpTeams() {
    const body = document.getElementsByTagName('body')[0];

    const popUpContainer = document.createElement('div');
    popUpContainer.classList.add('selectionPopup', 'fixed', 'w-screen', 'h-screen', 'bg-transparentGray', 'top-0', 'left-0', 'flex', 'justify-center', 'items-center');

    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('relative', 'bg-white', 'rounded', 'shadow-custom', 'w-10/12', 'h-4/6', 'pt-12', 'pb-4', 'flex', 'flex-col')
    popUpContainer.appendChild(popupWrapper);

    const crossElement = document.createElement('div');
    crossElement.classList.add('cross', 'z-10', 'absolute', 'top-4', 'right-4')
    popupWrapper.appendChild(crossElement);

    const labelPopup = document.createElement('h3');
    labelPopup.classList.add('text-lg', 'font-bold', 'text-center', 'mb-6');
    labelPopup.textContent = 'Choisissez votre équipe :';
    popupWrapper.appendChild(labelPopup);

    const listWrapper = document.createElement("div");
    listWrapper.classList.add('list-group', 'px-4', 'overflow-auto');
    popupWrapper.appendChild(listWrapper);

    getGroups(listWrapper);

    body.appendChild(popUpContainer);

    crossElement.addEventListener("click", function (event) {
        event.preventDefault();
        popUpContainer.remove();
    });
}

function getGroups(parent) {
    return new Promise(() => {
        fetch('https://la-malle.app/api/getfriendsgroupes.php', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                id: localStorage.getItem('id')
            })
        }).then(response => {
            if (response.status === 200)
                response.json().then(data => {
                    for (const group of data) {

                        if (group.count >= 4 && group.count <= 8 ) {
                            const divGroup = document.createElement('div');
                            divGroup.className = 'card relative overflow-hidden w-full mb-4 rounded-xl flex flex-col h-20 justify-end p-2.5';
                            divGroup.id = group.Id;

                            const GroupName = document.createElement('span');
                            GroupName.className = 'text-white font-bold text-xs capitalize';
                            GroupName.textContent = group.Name;

                            divGroup.append(GroupName);
                            divGroup.addEventListener("click", (event) => {
                                event.preventDefault();
                                getFriends(group.Id);
                            });

                            parent.appendChild(divGroup);
                        }
                    }
                })
        })
    })
}

function getFriends(teamID) {
    return new Promise(() => {
        fetch('https://la-malle.app/api/getfriendsgroup.php', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                id: localStorage.getItem('id'),
                groupid: teamID
            })
        }).then(response => {
            if (response.status === 200)
                response.json().then(data => {
                    playersArr = [];
                    data.forEach((player) => {
                        playersArr.push({
                            id: player.Id,
                            name: player.Name
                        })
                    });
                    newGame = new GameInfiltre(playersArr);
                    initGame();
                })
        })
    })
}

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

    // Affichage des règles
    document.getElementById("rules").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementsByTagName('body')[0].classList.add('simple');
        document.getElementsByTagName('main')[0].classList.add('hidden');
        document.getElementById('rulesPopup').classList.remove('hidden');
    });

    document.getElementById("hidePopup").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementsByTagName('body')[0].classList.remove('simple');
        document.getElementsByTagName('main')[0].classList.remove('hidden');
        document.getElementById('rulesPopup').classList.add('hidden');
    });

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
            if (field.value != '' && !playersArray.some((el) => {
                return el.name === field.value
            })) {
                playersArray.push({
                    id: "",
                    name: field.value
                });
                field.classList.remove('border-red', 'border');
            } else {
                field.classList.add('border-red', 'border');
            }
        }

        if (playersArray.length == nbPlayers) {
            newGame = new GameInfiltre(playersArray);

            initGame();
        }
    });
}

function initGame() {
    newGame.attributesRoles();

    const main = document.getElementsByClassName('main-wrapper')[0];

    // Retrait de l'interface
    if (document.getElementsByClassName('selectionPopup')[0]) {
        document.getElementsByClassName('selectionPopup')[0].remove();
        document.getElementsByClassName('title-wrapper')[0].classList.remove('mt-16');
        document.getElementsByClassName('title-wrapper')[0].classList.add('mt-4');
        main.classList.add('h-full', 'flex', 'flex-col', 'justify-between');
    }
    if (document.getElementsByClassName('fields-wrapper')[0]) {
        document.getElementsByClassName('fields-wrapper')[0].remove();
    }
    document.getElementsByClassName('cta-wrapper')[0].remove();
    document.getElementsByTagName('body')[0].classList.remove('selection');
    document.getElementsByTagName('body')[0].classList.add('started');

    // Génération des champs pour l'entrée des utilisateurs
    const wrapperConsignes = document.createElement('div');
    wrapperConsignes.classList.add('consignes-wrapper', 'w-full', 'flex', 'flex-col', 'items-center');

    const textContainer = document.createElement('span');
    textContainer.id = "dynamicText";
    textContainer.classList.add('font-bold', 'text-white', 'text-center', 'text-4xl', 'px-8');
    const valueText = document.createTextNode(scriptObj.start);
    textContainer.appendChild(valueText);

    speak(scriptObj.start);

    setTimeout(() => {

        let i = 0;
        const rolesArrLength = newGame.getPlayersLength();

        distributionRoles(i);

        const buttonStart = document.createElement('a');
        buttonStart.id = 'toggleRole';
        buttonStart.classList.add('relative', 'flex', 'justify-center', 'px-4', 'items-center', 'w-24', 'h-24', 'mx-auto', 'text-center', 'bg-white', 'rounded-full', 'text-darkBlue', 'font-medium', 'text-sm');
        const text2 = document.createTextNode('Voir mon rôle');
        buttonStart.appendChild(text2);

        main.appendChild(buttonStart)

        document.getElementById('toggleRole').addEventListener("click", function (event) {
            event.preventDefault();

            displayRole(i);

            document.getElementById('nextPlayer').addEventListener("click", function (event) {
                event.preventDefault();


                if (i < rolesArrLength - 1) {
                    i++;

                    distributionRoles(i);

                    document.getElementById('wrapperRole').remove();

                    let buttonToggle = document.getElementById('toggleRole');
                    buttonToggle.classList.remove('hidden');
                } else {
                    startGame();
                }
            });

        });

    }, 3000);

    wrapperConsignes.appendChild(textContainer);
    main.appendChild(wrapperConsignes);

}

function distributionRoles(i) {

    const main = document.getElementsByClassName('main-wrapper')[0];

    let rolesArr = newGame.getRoles();

    const dynamicContainer = document.getElementById('dynamicText');
    dynamicContainer.classList.remove('text-4xl')
    dynamicContainer.classList.add('text-2xl')
    dynamicContainer.textContent = scriptObj.distrib + rolesArr[i].name;
}

function displayRole(i) {

    const main = document.getElementsByClassName('main-wrapper')[0];
    let rolesArr = newGame.getRoles();

    let buttonToggle = document.getElementById('toggleRole');
    buttonToggle.classList.add('hidden');

    const wrapperRole = document.createElement('div');
    wrapperRole.id = 'wrapperRole';
    wrapperRole.classList.add('bg-lightWhite', 'w-9/12', 'rounded-xl', 'py-5');

    const paragraph = document.createElement('p');
    paragraph.classList.add('text-white', 'font-bold', 'text-2xl', 'text-center');
    const textRole = document.createTextNode(scriptObj.role);
    paragraph.appendChild(textRole);
    const spanRole = document.createElement('span');
    spanRole.classList.add('text-3xl', 'block');
    const role = document.createTextNode(rolesArr[i].role);
    spanRole.appendChild(role);
    paragraph.appendChild(spanRole);

    wrapperRole.appendChild(paragraph);

    const buttonNextPlayer = document.createElement('a');
    buttonNextPlayer.id = 'nextPlayer';
    buttonNextPlayer.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mt-4');
    const text = document.createTextNode("J'ai bien retenu");
    buttonNextPlayer.appendChild(text);

    wrapperRole.appendChild(buttonNextPlayer);
    main.appendChild(wrapperRole);
}

function startGame() {
    document.getElementsByClassName('consignes-wrapper')[0].remove();
    document.getElementById('toggleRole').remove();
    document.getElementById('wrapperRole').remove();


    const main = document.getElementsByClassName('main-wrapper')[0];
    const rolesArr = newGame.getRoles();

    const instructionsWrapper = document.createElement('div');
    instructionsWrapper.id = 'instructionsWrapper';
    instructionsWrapper.classList.add('w-9/12', 'text-white', 'font-bold', 'text-4xl', 'text-center');
    const masterInstructions = document.createTextNode(rolesArr.filter(obj => {
        return obj.role === 'Maitre du jeu'
    })[0].name + scriptObj.master);
    instructionsWrapper.appendChild(masterInstructions);

    speak(rolesArr.filter(obj => {
        return obj.role === 'Maitre du jeu'
    })[0].name + scriptObj.master);

    main.appendChild(instructionsWrapper);

    setTimeout(() => {
        instructionsWrapper.textContent = scriptObj.rulesAll;
        speak(scriptObj.rulesAll);
    }, 3000);

    setTimeout(() => {
        instructionsWrapper.classList.remove('text-4xl');
        instructionsWrapper.classList.add('text-3xl');
        instructionsWrapper.textContent = scriptObj.masterName;

        const wordWrapper = document.createElement('div');
        wordWrapper.id = "wordWrapper";
        wordWrapper.classList.add('text-white', 'font-bold', 'text-4xl', 'text-center');
        const word = document.createTextNode(newGame.getWord());
        wordWrapper.appendChild(word);

        main.appendChild(wordWrapper);

        const buttonNextInstruction = document.createElement('a');
        buttonNextInstruction.id = 'nextInstruction';
        buttonNextInstruction.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mt-4');
        const text = document.createTextNode("J'ai bien retenu");
        buttonNextInstruction.appendChild(text);

        main.appendChild(buttonNextInstruction);

        document.getElementById('nextInstruction').addEventListener("click", function (event) {
            event.preventDefault();

            document.getElementById('nextInstruction').remove();
            document.getElementById('wordWrapper').remove();
            instructionsWrapper.textContent = scriptObj.masterRules;

            speak(scriptObj.masterRules);

            const buttonOK = document.createElement('a');
            buttonOK.id = 'okButton';
            buttonOK.classList.add('relative', 'flex', 'justify-center', 'px-4', 'items-center', 'w-24', 'h-24', 'mx-auto', 'text-center', 'bg-white', 'rounded-full', 'text-darkBlue', 'font-medium', 'text-sm');
            const text2 = document.createTextNode('OK');
            buttonOK.appendChild(text2);

            main.appendChild(buttonOK);

            document.getElementById('okButton').addEventListener("click", function (event) {
                event.preventDefault();

                document.getElementById('okButton').remove();
                instructionsWrapper.textContent = scriptObj.infiltreRules;

                speak(scriptObj.infiltreRules);

                setTimeout(() => {
                    instructionsWrapper.textContent = '';

                    const spanWord = document.createElement('span');
                    spanWord.classList.add('word', 'block', 'text-5xl');
                    spanWord.appendChild(word);

                    instructionsWrapper.appendChild(spanWord);
                    instructionsWrapper.appendChild(spanWord.cloneNode(true));

                    setTimeout(() => {
                        document.getElementsByClassName('word')[0].remove;
                        document.getElementsByClassName('word')[1].remove;

                        instructionsWrapper.textContent = scriptObj.infiltreRules2;
                        speak(scriptObj.infiltreRules2);

                        setTimeout(() => {
                            instructionsWrapper.textContent = scriptObj.rules;

                            speak(scriptObj.rules);

                            setTimeout(() => {
                                instructionsWrapper.textContent = '';

                                const counterWrapper = document.createElement('span');
                                counterWrapper.id = "counterWrapper";
                                counterWrapper.classList.add('text-7xl');
                                counterWrapper.textContent = "05:00";

                                instructionsWrapper.appendChild(counterWrapper);

                                startTimer(60 * 5);

                                const buttonDone = document.createElement('a');
                                buttonDone.id = 'done';
                                buttonDone.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mt-4');
                                const text = document.createTextNode("Terminé");
                                buttonDone.appendChild(text);

                                instructionsWrapper.appendChild(buttonDone);

                                document.getElementById('done').addEventListener("click", function (event) {
                                    event.preventDefault();
                                    clearInterval(window.refreshCounter);
                                    endGame();
                                });
                            }, 8000);
                        }, 4000);

                    }, 5000);

                }, 6000);


            });

        });

    }, 9000);

}

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    window.refreshCounter = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        counterWrapper.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(window.refreshCounter);
            speak("C'est terminé !")
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('counterWrapper').remove();
    document.getElementById('done').remove();

    const instructionsWrapper = document.getElementById('instructionsWrapper');

    const wrapperQuestion = document.createElement('div');
    wrapperQuestion.id = 'wrapperQuestion';
    wrapperQuestion.classList.add('text-3xl', 'mb-5');
    wrapperQuestion.textContent = scriptObj.done;

    instructionsWrapper.appendChild(wrapperQuestion);

    const buttonOui = document.createElement('a');
    buttonOui.id = 'oui';
    buttonOui.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mb-4');
    buttonOui.textContent = "Oui";

    instructionsWrapper.appendChild(buttonOui);

    const buttonNon = document.createElement('a');
    buttonNon.id = 'non';
    buttonNon.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-white', 'py-2', 'rounded-full', 'text-darkBlue', 'font-medium', 'text-sm');
    buttonNon.textContent = "Non";

    instructionsWrapper.appendChild(buttonNon);

    document.getElementById('oui').addEventListener("click", function (event) {
        event.preventDefault();

        wrapperQuestion.textContent = scriptObj.debate;
        buttonOui.textContent = "C'est bon";
        buttonOui.id = 'goToEliminate';
        buttonNon.remove();

        document.getElementById('goToEliminate').addEventListener("click", function (event) {
            event.preventDefault();


            document.getElementsByTagName('body')[0].classList.add('eliminate');

            wrapperQuestion.textContent = scriptObj.eliminate;
            buttonOui.remove();

            const wrapperActions = document.createElement('div');
            wrapperActions.id = 'wrapperActions';
            wrapperActions.classList.add('flex', 'flex-wrap', 'justify-between');

            let rolesArr = newGame.getRoles();

            rolesArr = rolesArr.filter(obj => {
                return obj.role !== 'Maitre du jeu'
            })


            rolesArr.forEach(player => {
                const playerButton = document.createElement('a');
                playerButton.id = player.role;
                playerButton.classList.add('playerButton', 'bg-white', 'flex', 'justify-center', 'items-center', 'text-sm', 'text-darkBlue', 'w-1/2:m', 'h-20', 'rounded-xl', 'mb-4');
                playerButton.textContent = player.name;

                wrapperActions.appendChild(playerButton);
            })

            instructionsWrapper.appendChild(wrapperActions);

            document.querySelectorAll('.playerButton').forEach(item => {
                item.addEventListener('click', event => {
                    if (item.id == "Infiltré") {
                        // Si l'infiltré est éliminé
                        document.getElementsByTagName('body')[0].classList.remove('eliminate');
                        document.getElementsByTagName('body')[0].classList.add('wonCivil');
                        wrapperActions.remove();
                        wrapperQuestion.textContent = scriptObj.winCivil;

                        sendResults('infiltre');

                        setTimeout(() => {
                            window.location.reload();
                        }, 8000);
                    } else {
                        // Dans le cas où l'infiltré n'est pas éliminé
                        document.getElementsByTagName('body')[0].classList.remove('eliminate');
                        document.getElementsByTagName('body')[0].classList.add('wonInfiltre');
                        wrapperActions.remove();
                        wrapperQuestion.textContent = scriptObj.winInfiltre;

                        const buttonRestart = document.createElement('a');
                        buttonRestart.id = 'restart';
                        buttonRestart.classList.add('block', 'w-52', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mb-4');
                        buttonRestart.textContent = "Relancer une partie";

                        instructionsWrapper.appendChild(buttonRestart);

                        const buttonHome = document.createElement('a');
                        buttonHome.id = 'home';
                        buttonHome.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-white', 'py-2', 'rounded-full', 'text-darkBlue', 'font-medium', 'text-xs');
                        buttonHome.textContent = "Revenir à l'accueil";

                        instructionsWrapper.appendChild(buttonHome);

                        sendResults('civil');

                        document.getElementById('restart').addEventListener("click", function (event) {
                            event.preventDefault();
                            window.location.reload();
                        });

                        document.getElementById('home').addEventListener("click", function (event) {
                            window.location.href = "/";
                        });
                    }
                })
            })

        });
    });

    document.getElementById('non').addEventListener("click", function (event) {
        event.preventDefault();

        wrapperQuestion.textContent = scriptObj.echec;
        buttonOui.textContent = 'Relancer une partie';
        buttonOui.id = 'restart';
        buttonOui.classList.remove('w-40');
        buttonOui.classList.add('w-52');
        buttonNon.textContent = "Revenir à l'accueil";
        buttonNon.id = 'home';
        buttonNon.classList.remove('text-sm');
        buttonNon.classList.add('text-xs');

        sendResults('none');

        document.getElementById('restart').addEventListener("click", function (event) {
            event.preventDefault();
            window.location.reload();
        });

        document.getElementById('home').addEventListener("click", function (event) {
            window.location.href = "/";
        });
    });

}

function sendResults(result) {


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    let playersBoard = newGame.getRoles();

    playersBoard.forEach((player) => {
        player.type = "friend";

        switch (result) {
            case 'infiltre':

                if (player.role == "Infiltré") {
                    player.result = "2";
                } else {
                    player.result = "1";
                }
                break;

            case 'civil':

                if (player.role == "Citoyen" || player.role == "Maitre du jeu") {
                    player.result = "2";
                } else {
                    player.result = "1";
                }
                break;

            case 'none':

                player.result = "0"
                break;

            default:
                break;
        }

    })


    return new Promise(() => {
        fetch('https://la-malle.app/api/addresults.php', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                id: localStorage.getItem('id'),
                gameid: 1,
                date: today,
                users: playersBoard
            })
        })
    })
}

function speak(sentence) {
    var synth = window.speechSynthesis;

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }

    var utterThis = new SpeechSynthesisUtterance(sentence);
    utterThis.onend = function (event) {
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    utterThis.lang = 'fr-FR';
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
}