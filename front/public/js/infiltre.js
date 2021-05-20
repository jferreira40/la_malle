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
}(); // const joueurs = ["Thomas", "Jules", "Emma", "Antoine"];


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
      startGame();
    }
  });
}

function startGame() {
  newGame.attributesRoles(); // Retrait de l'interface

  document.getElementsByClassName('fields-wrapper')[0].remove();
  document.getElementsByClassName('cta-wrapper')[0].remove();
  document.getElementsByTagName('body')[0].classList.remove('selection');
  document.getElementsByTagName('body')[0].classList.add('started');
  console.log(newGame);
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