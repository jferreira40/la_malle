/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/games/infiltre.js":
/*!*************************************!*\
  !*** ./src/pages/games/infiltre.js ***!
  \*************************************/
/***/ (() => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const randomWordFR = require('random-word-fr');
// import randomWordFR from 'random-word-fr';
var GameInfiltre = /*#__PURE__*/function () {
  function GameInfiltre() {
    _classCallCheck(this, GameInfiltre);

    this.players = [];
    this.word = "Avion";
    this.roles = [];
  }

  _createClass(GameInfiltre, [{
    key: "setPlayers",
    value: function setPlayers(arrPlayers) {
      this.players = arrPlayers;
    }
  }, {
    key: "getRoles",
    value: function getRoles(i) {
      if (i) {
        return this.roles[i];
      } else {
        return this.roles;
      }
    }
  }, {
    key: "getPlayersLength",
    value: function getPlayersLength() {
      return this.players.length;
    }
  }, {
    key: "getWord",
    value: function getWord() {
      return this.word;
    }
  }, {
    key: "attributesRoles",
    value: function attributesRoles() {
      var essentialRoles = ['Maitre du jeu', 'Infiltré'];

      for (var index = 2; index < this.players.length; index++) {
        essentialRoles.push('Citoyen');
      }

      var currentIndex = essentialRoles.length,
          temporaryValue,
          randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = essentialRoles[currentIndex];
        essentialRoles[currentIndex] = essentialRoles[randomIndex];
        essentialRoles[randomIndex] = temporaryValue;
      }

      var result = [];

      for (var i = 0; i < this.players.length; i++) {
        result[this.players[i]] = essentialRoles[i];
      }

      this.roles = result;
      return this.roles;
    }
  }]);

  return GameInfiltre;
}();

var scriptObj = {
  "start": "La partie va débuter",
  "distrib": "Distribuons les rôles, au tour de ",
  "role": "Vous êtes ",
  "master": " est le maitre du jeu",
  "rulesAll": "Tout le monde ferme les yeux, sauf le maitre du jeu",
  "masterName": "Maitre du jeu, voici le mot à faire deviner :",
  "masterRules": "Maitre du jeu, posez le téléphone à la vue de tous. Et fermez les yeux.",
  "infiltreRules": "Infiltré c’est à vous ! Ouvrez les yeux vous allez avoir 5 secondes pour retenir le mot.",
  "infiltreRules2": "Fermez les yeux infiltré. Ouvrez tous les yeux.",
  "rules": "Vous avez 5 minutes pour devinez le mot. Maitre du jeu, vous pouvez répondre uniquement par oui, non, ou je ne sais pas.",
  "done": "C’est terminé, le mot a-t-il été trouvé ?",
  "echec": "Nous n’avez pas trouvé le mot, toute l’équipe perd.",
  "debate": "Il est temps de débattre ! A vous de trouver l’infiltré.",
  "eliminate": "Qui avez vous éliminé ?",
  "winCivil": "Bien joué ! Vous avez éliminé l’infiltré. Les citoyens l’emportent !",
  "winInfiltre": "Vous avez éliminé un citoyen, l’infiltré l’emporte !"
};
var newGame = new GameInfiltre(); // console.log(newGame.attributesRoles());
// console.log(randomWordFR());

window.addEventListener("DOMContentLoaded", function (event) {
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
  var main = document.getElementsByClassName('main-wrapper')[0];
  main.classList.add('h-full', 'flex', 'flex-col', 'justify-between'); // Génération de la structure du nombre d'utilisateurs

  var wrapperCounter = document.createElement('div');
  wrapperCounter.classList.add('counter', 'flex', 'justify-center');
  var containerCounter = document.createElement('div');
  containerCounter.classList.add('flex', 'flex-col', 'justify-center');
  var incrementButton = document.createElement('button');
  incrementButton.id = 'increment';
  incrementButton.classList.add('h-8', 'w-8', 'ml-2');
  containerCounter.appendChild(incrementButton);
  var numberContainer = document.createElement('div');
  numberContainer.classList.add('value-wrapper', 'text-white', 'flex', 'items-end');
  var valueSpan = document.createElement('span');
  var valuePlayers = document.createTextNode(4);
  valueSpan.id = 'valuePlayers';
  valueSpan.classList.add('text-center', 'text-6xl', 'font-bold', 'w-12', 'mr-2');
  valueSpan.appendChild(valuePlayers);
  var valueLabel = document.createElement('span');
  var textLabel = document.createTextNode('joueurs');
  valueLabel.classList.add('text-3xl', 'font-bold');
  valueLabel.appendChild(textLabel);
  numberContainer.appendChild(valueSpan);
  numberContainer.appendChild(valueLabel);
  containerCounter.appendChild(numberContainer);
  var decrementButton = document.createElement('button');
  decrementButton.id = 'decrement';
  decrementButton.classList.add('increment', 'h-8', 'w-8', 'ml-2');
  containerCounter.appendChild(decrementButton);
  wrapperCounter.appendChild(containerCounter);
  main.appendChild(wrapperCounter);
  document.getElementById("increment").addEventListener("click", function (event) {
    var nbPlayers = document.getElementById('valuePlayers');
    var number = nbPlayers.innerHTML;
    number++;

    if (number <= 8) {
      nbPlayers.innerHTML = number;
    }
  });
  document.getElementById("decrement").addEventListener("click", function (event) {
    var nbPlayers = document.getElementById('valuePlayers');
    var number = nbPlayers.innerHTML;
    number--;

    if (number >= 4) {
      nbPlayers.innerHTML = number;
    }
  }); // Génération de la structure du nombre d'utilisateurs

  var wrapperButton = document.createElement('div');
  wrapperButton.classList.add('cta-wrapper', 'mb-14');
  var buttonRules = document.createElement('a');
  buttonRules.id = 'rules';
  buttonRules.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-lightGray', 'text-darkBlue', 'py-2', 'rounded-full', 'font-medium', 'text-xs', 'mb-3');
  var text = document.createTextNode('Voir les règles');
  buttonRules.appendChild(text);
  var buttonStart = document.createElement('a');
  buttonStart.id = 'go-stepTwo';
  buttonStart.classList.add('block', 'w-52', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm');
  var text2 = document.createTextNode('Commencer');
  buttonStart.appendChild(text2);
  wrapperButton.appendChild(buttonRules);
  wrapperButton.appendChild(buttonStart);
  main.appendChild(wrapperButton); // TODO Faire la popup des règles

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
  var main = document.getElementsByClassName('main-wrapper')[0]; // Génération des champs pour l'entrée des utilisateurs

  var wrapperFields = document.createElement('div');
  wrapperFields.classList.add('fields-wrapper', 'w-full', 'flex', 'flex-col', 'items-center');
  var labelFields = document.createElement('span');
  labelFields.classList.add('font-bold', 'text-white', 'text-sm', 'my-5');
  var textLabel = document.createTextNode('Liste des joueurs :');
  labelFields.appendChild(textLabel);
  wrapperFields.appendChild(labelFields);

  for (var i = 1; i <= nbPlayers; i++) {
    var field = document.createElement('input');
    field.setAttribute('type', 'text');
    field.setAttribute('placeholder', 'Joueur ' + i);
    field.required = true;
    field.id = "player" + i;
    field.classList.add('field', 'text-xs', 'rounded', 'shadow-custom', 'w-8/12', 'h-9', 'px-5', 'focus:outline-blue', 'mb-4');
    wrapperFields.appendChild(field);
  }

  main.appendChild(wrapperFields);
  var wrapperButton = document.createElement('div');
  wrapperButton.classList.add('cta-wrapper');
  var buttonStart = document.createElement('a');
  buttonStart.id = 'go-startGame';
  buttonStart.classList.add('block', 'w-52', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mb-14');
  var text = document.createTextNode('Lancer la partie');
  buttonStart.appendChild(text);
  wrapperButton.appendChild(buttonStart);
  main.appendChild(wrapperButton);
  document.getElementById("go-startGame").addEventListener("click", function (event) {
    event.preventDefault();
    var fieldsArray = document.getElementsByTagName('input');
    var playersArray = [];

    var _iterator = _createForOfIteratorHelper(fieldsArray),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _field = _step.value;

        if (_field.value != '') {
          playersArray.push(_field.value);
        } // TODO Faire la gestion des erreurs

      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (playersArray.length == nbPlayers) {
      newGame.setPlayers(playersArray);
      initGame();
    }
  });
}

function initGame() {
  newGame.attributesRoles();
  var main = document.getElementsByClassName('main-wrapper')[0]; // Retrait de l'interface

  document.getElementsByClassName('fields-wrapper')[0].remove();
  document.getElementsByClassName('cta-wrapper')[0].remove();
  document.getElementsByTagName('body')[0].classList.remove('selection');
  document.getElementsByTagName('body')[0].classList.add('started'); // Génération des champs pour l'entrée des utilisateurs

  var wrapperConsignes = document.createElement('div');
  wrapperConsignes.classList.add('consignes-wrapper', 'w-full', 'flex', 'flex-col', 'items-center');
  var textContainer = document.createElement('span');
  textContainer.id = "dynamicText";
  textContainer.classList.add('font-bold', 'text-white', 'text-center', 'text-4xl', 'px-8');
  var valueText = document.createTextNode(scriptObj.start);
  textContainer.appendChild(valueText);
  setTimeout(function () {
    var i = 0;
    var rolesArrLength = newGame.getPlayersLength();
    distributionRoles(i);
    var buttonStart = document.createElement('a');
    buttonStart.id = 'toggleRole';
    buttonStart.classList.add('relative', 'flex', 'justify-center', 'px-4', 'items-center', 'w-24', 'h-24', 'mx-auto', 'text-center', 'bg-white', 'rounded-full', 'text-darkBlue', 'font-medium', 'text-sm');
    var text2 = document.createTextNode('Voir mon rôle');
    buttonStart.appendChild(text2);
    main.appendChild(buttonStart);
    document.getElementById('toggleRole').addEventListener("click", function (event) {
      event.preventDefault();
      displayRole(i);
      document.getElementById('nextPlayer').addEventListener("click", function (event) {
        event.preventDefault();
        console.log(i + " < " + rolesArrLength);
        console.log(i < rolesArrLength);

        if (i < rolesArrLength - 1) {
          i++;
          distributionRoles(i);
          document.getElementById('wrapperRole').remove();
          var buttonToggle = document.getElementById('toggleRole');
          buttonToggle.classList.remove('hidden');
        } else {
          startGame();
        }
      });
    });
  }, 3000);
  wrapperConsignes.appendChild(textContainer);
  main.appendChild(wrapperConsignes);
  console.log(newGame);
}

function distributionRoles(i) {
  var main = document.getElementsByClassName('main-wrapper')[0];
  var rolesArr = newGame.getRoles();
  console.log(rolesArr);
  var dynamicContainer = document.getElementById('dynamicText');
  dynamicContainer.classList.remove('text-4xl');
  dynamicContainer.classList.add('text-2xl');
  dynamicContainer.textContent = scriptObj.distrib + Object.keys(rolesArr)[i];
}

function displayRole(i) {
  var main = document.getElementsByClassName('main-wrapper')[0];
  var rolesArr = newGame.getRoles();
  var buttonToggle = document.getElementById('toggleRole');
  buttonToggle.classList.add('hidden');
  var wrapperRole = document.createElement('div');
  wrapperRole.id = 'wrapperRole';
  wrapperRole.classList.add('bg-lightWhite', 'w-9/12', 'rounded-xl', 'py-5');
  var paragraph = document.createElement('p');
  paragraph.classList.add('text-white', 'font-bold', 'text-2xl', 'text-center');
  var textRole = document.createTextNode(scriptObj.role);
  paragraph.appendChild(textRole);
  var spanRole = document.createElement('span');
  spanRole.classList.add('text-3xl', 'block');
  var role = document.createTextNode(rolesArr[Object.keys(rolesArr)[i]]);
  spanRole.appendChild(role);
  paragraph.appendChild(spanRole);
  wrapperRole.appendChild(paragraph);
  var buttonNextPlayer = document.createElement('a');
  buttonNextPlayer.id = 'nextPlayer';
  buttonNextPlayer.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mt-4');
  var text = document.createTextNode("J'ai bien retenu");
  buttonNextPlayer.appendChild(text);
  wrapperRole.appendChild(buttonNextPlayer);
  main.appendChild(wrapperRole);
}

function startGame() {
  document.getElementsByClassName('consignes-wrapper')[0].remove();
  document.getElementById('toggleRole').remove();
  document.getElementById('wrapperRole').remove();
  var main = document.getElementsByClassName('main-wrapper')[0];
  var rolesArr = newGame.getRoles();
  var instructionsWrapper = document.createElement('div');
  instructionsWrapper.id = 'instructionsWrapper';
  instructionsWrapper.classList.add('w-9/12', 'text-white', 'font-bold', 'text-4xl', 'text-center');
  var masterInstructions = document.createTextNode(Object.keys(rolesArr).find(function (key) {
    return rolesArr[key] === 'Maitre du jeu';
  }) + scriptObj.master);
  instructionsWrapper.appendChild(masterInstructions);
  main.appendChild(instructionsWrapper);
  setTimeout(function () {
    instructionsWrapper.textContent = scriptObj.rulesAll;
  }, 3000);
  setTimeout(function () {
    instructionsWrapper.classList.remove('text-4xl');
    instructionsWrapper.classList.add('text-3xl');
    instructionsWrapper.textContent = scriptObj.masterName;
    var wordWrapper = document.createElement('div');
    wordWrapper.id = "wordWrapper";
    wordWrapper.classList.add('text-white', 'font-bold', 'text-4xl', 'text-center');
    var word = document.createTextNode(newGame.getWord());
    wordWrapper.appendChild(word);
    main.appendChild(wordWrapper);
    var buttonNextInstruction = document.createElement('a');
    buttonNextInstruction.id = 'nextInstruction';
    buttonNextInstruction.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mt-4');
    var text = document.createTextNode("J'ai bien retenu");
    buttonNextInstruction.appendChild(text);
    main.appendChild(buttonNextInstruction);
    document.getElementById('nextInstruction').addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById('nextInstruction').remove();
      document.getElementById('wordWrapper').remove();
      instructionsWrapper.textContent = scriptObj.masterRules;
      var buttonOK = document.createElement('a');
      buttonOK.id = 'okButton';
      buttonOK.classList.add('relative', 'flex', 'justify-center', 'px-4', 'items-center', 'w-24', 'h-24', 'mx-auto', 'text-center', 'bg-white', 'rounded-full', 'text-darkBlue', 'font-medium', 'text-sm');
      var text2 = document.createTextNode('OK');
      buttonOK.appendChild(text2);
      main.appendChild(buttonOK);
      document.getElementById('okButton').addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById('okButton').remove();
        instructionsWrapper.textContent = scriptObj.infiltreRules;
        setTimeout(function () {
          instructionsWrapper.textContent = '';
          var spanWord = document.createElement('span');
          spanWord.classList.add('word', 'block', 'text-5xl');
          spanWord.appendChild(word);
          instructionsWrapper.appendChild(spanWord);
          instructionsWrapper.appendChild(spanWord.cloneNode(true));
          setTimeout(function () {
            document.getElementsByClassName('word')[0].remove;
            document.getElementsByClassName('word')[1].remove;
            instructionsWrapper.textContent = scriptObj.infiltreRules2;
            setTimeout(function () {
              instructionsWrapper.textContent = scriptObj.rules;
              setTimeout(function () {
                instructionsWrapper.textContent = '';
                var counterWrapper = document.createElement('span');
                counterWrapper.id = "counterWrapper";
                counterWrapper.classList.add('text-7xl');
                counterWrapper.textContent = "05:00";
                instructionsWrapper.appendChild(counterWrapper);
                startTimer(60 * 5);
                var buttonDone = document.createElement('a');
                buttonDone.id = 'done';
                buttonDone.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mt-4');
                var text = document.createTextNode("Terminé");
                buttonDone.appendChild(text);
                instructionsWrapper.appendChild(buttonDone);
                document.getElementById('done').addEventListener("click", function (event) {
                  event.preventDefault();
                  clearInterval(window.refreshCounter);
                  endGame();
                });
              }, 3000);
            }, 4000);
          }, 5000);
        }, 3000);
      });
    });
  }, 3000);
  console.log("C'est partit");
}

function startTimer(duration) {
  var timer = duration,
      minutes,
      seconds;
  window.refreshCounter = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    counterWrapper.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(window.refreshCounter);
      endGame();
    }
  }, 1000);
}

function endGame() {
  document.getElementById('counterWrapper').remove();
  document.getElementById('done').remove();
  var instructionsWrapper = document.getElementById('instructionsWrapper');
  var wrapperQuestion = document.createElement('div');
  wrapperQuestion.id = 'wrapperQuestion';
  wrapperQuestion.classList.add('text-3xl', 'mb-5');
  wrapperQuestion.textContent = scriptObj.done;
  instructionsWrapper.appendChild(wrapperQuestion);
  var buttonOui = document.createElement('a');
  buttonOui.id = 'oui';
  buttonOui.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mb-4');
  buttonOui.textContent = "Oui";
  instructionsWrapper.appendChild(buttonOui);
  var buttonNon = document.createElement('a');
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
      var wrapperActions = document.createElement('div');
      wrapperActions.id = 'wrapperActions';
      wrapperActions.classList.add('flex', 'flex-wrap', 'justify-between');
      var rolesArr = newGame.getRoles();
      delete rolesArr[Object.keys(rolesArr).find(function (key) {
        return rolesArr[key] === 'Maitre du jeu';
      })];

      for (var player in rolesArr) {
        var playerButton = document.createElement('a');
        playerButton.id = player;
        playerButton.classList.add('playerButton', 'bg-white', 'flex', 'justify-center', 'items-center', 'text-sm', 'text-darkBlue', 'w-1/2:m', 'h-20', 'rounded-xl', 'mb-4');
        playerButton.textContent = player;
        wrapperActions.appendChild(playerButton);
      }

      instructionsWrapper.appendChild(wrapperActions);
      document.querySelectorAll('.playerButton').forEach(function (item) {
        item.addEventListener('click', function (event) {
          if (rolesArr[item.id] == "Infiltré") {
            document.getElementsByTagName('body')[0].classList.remove('eliminate');
            document.getElementsByTagName('body')[0].classList.add('wonCivil');
            wrapperActions.remove();
            wrapperQuestion.textContent = scriptObj.winCivil;
            setTimeout(function () {
              window.location.reload();
            }, 8000);
          } else {
            document.getElementsByTagName('body')[0].classList.remove('eliminate');
            document.getElementsByTagName('body')[0].classList.add('wonInfiltre');
            wrapperActions.remove();
            wrapperQuestion.textContent = scriptObj.winInfiltre;
            var buttonRestart = document.createElement('a');
            buttonRestart.id = 'restart';
            buttonRestart.classList.add('block', 'w-52', 'mx-auto', 'text-center', 'bg-darkBlue', 'py-2', 'rounded-full', 'text-white', 'font-medium', 'text-sm', 'mb-4');
            buttonRestart.textContent = "Relancer une partie";
            instructionsWrapper.appendChild(buttonRestart);
            var buttonHome = document.createElement('a');
            buttonHome.id = 'home';
            buttonHome.classList.add('block', 'w-40', 'mx-auto', 'text-center', 'bg-white', 'py-2', 'rounded-full', 'text-darkBlue', 'font-medium', 'text-xs');
            buttonHome.textContent = "Revenir à l'accueil";
            instructionsWrapper.appendChild(buttonHome);
            document.getElementById('restart').addEventListener("click", function (event) {
              event.preventDefault();
              window.location.reload();
            });
            document.getElementById('home').addEventListener("click", function (event) {
              window.location.href = "/";
            });
          }
        });
      });
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
    document.getElementById('restart').addEventListener("click", function (event) {
      event.preventDefault();
      window.location.reload();
    });
    document.getElementById('home').addEventListener("click", function (event) {
      window.location.href = "/";
    });
  });
}

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/js/infiltre": 0,
/******/ 			"public/css/style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkla_malle"] = self["webpackChunkla_malle"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/css/style"], () => (__webpack_require__("./src/pages/games/infiltre.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/css/style"], () => (__webpack_require__("./src/css/style.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;