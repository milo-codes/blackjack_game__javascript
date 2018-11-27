/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.js":
/*!***************************!*\
  !*** ./client/src/app.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n// require the relevant files n stuff\nconst PlayerView = __webpack_require__(/*! ./views/player_view.js */ \"./client/src/views/player_view.js\");\nconst DealerView = __webpack_require__(/*! ./views/dealer_view.js */ \"./client/src/views/dealer_view.js\");\nconst ResultView = __webpack_require__(/*! ./views/result_view.js */ \"./client/src/views/result_view.js\");\nconst Game = __webpack_require__(/*! ./models/game.js */ \"./client/src/models/game.js\");\n\n// listener for dom content loaded\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"DOMContentLoaded\");\n  // document query selector for container - player\n  const playerContainer = document.querySelector( 'div#player_container' );\n  // create new instance of player view  (container)\n  const playerView = new PlayerView(playerContainer);\n  //call bind events on player view\n  playerView.bindEvents();\n  // renderButton?\n\n  // document query selector for container - dealer\n  const dealerContainer = document.querySelector( 'div#dealer_container' );\n  // create new instance of dealer view  (container)\n  const dealerView = new DealerView(dealerContainer);\n  //call bind events on dealer view\n  dealerView.bindEvents();\n\n  // document query selector for container - result\n  const resultContainer = document.querySelector(  'div#result_container' );\n  // create new instance of result view  (container)\n  const resultView = new ResultView(resultContainer);\n  //call bind events on result view\n  resultView.bindEvents();\n\n\n  // new instance of model\n  const game = new Game();\n  // call model bind events\n  game.bindEvents();\n  // call model get data\n  game.getShuffledDeck(); // TODO decide when model gets data and what kind of data\n});\n\n\n//# sourceURL=webpack:///./client/src/app.js?");

/***/ }),

/***/ "./client/src/helpers/pub_sub.js":
/*!***************************************!*\
  !*** ./client/src/helpers/pub_sub.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./client/src/helpers/pub_sub.js?");

/***/ }),

/***/ "./client/src/helpers/request_helper.js":
/*!**********************************************!*\
  !*** ./client/src/helpers/request_helper.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url;\n};\n\nRequestHelper.prototype.get = function () {\n  return fetch(this.url)\n    .then((response) => response.json());\n};\n\nRequestHelper.prototype.post = function (payload) {\n  return fetch(this.url, {\n    method: 'POST',\n    body: JSON.stringify(payload),\n    headers: { 'Content-Type': 'application/json' }\n  })\n    .then((response) => response.json());\n};\n\nRequestHelper.prototype.delete = function (id) {\n  return fetch(`${this.url}/${id}`, {\n    method: 'DELETE'\n  })\n    .then((response) => response.json());\n};\n\nRequestHelper.prototype.update = function (id) {\n  return fetch(`${this.url}/${id}`, {\n    method: 'UPDATE'\n  })\n    .then((response) => response.json());\n};\n\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./client/src/helpers/request_helper.js?");

/***/ }),

/***/ "./client/src/models/game.js":
/*!***********************************!*\
  !*** ./client/src/models/game.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./client/src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./client/src/helpers/pub_sub.js\");\n\nconst Game = function () {\n  this.newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';\n  this.requestDeck = new RequestHelper(this.newDeckUrl);\n  this.roundObject = {};\n  this.playerWinCount = 0;\n  this.dealerWinCount = 0;\n};\n\nGame.prototype.bindEvents = function () {\n  const shuffleDeckButton = document.querySelector(\"#shuffle-deck-button\");\n  shuffleDeckButton.addEventListener(\"click\", () => {\n    this.getShuffledDeck();\n  });\n\n  PubSub.subscribe(\"ResultView:auto-redeal\", () => {\n    const dealerTotalBox = document.querySelector('div#dealer_total');\n    dealerTotalBox.innerHTML = \"\";\n    this.dealCards(this.deckId);\n\n    const totalTextBox = document.querySelector(\"div#total_text_container\")\n    totalTextBox.innerHTML = \"\";\n  });\n\n  PubSub.subscribe(\"ResultView:hit-button-click\", () => {\n    this.drawOneCard(this.roundObject.playerCards, `player`)\n    this.playCardSound();\n  });\n\n  PubSub.subscribe(\"ResultView:stick-button-click\", () => {\n    PubSub.publish(`Game:dealer-drawn-card-ready`, this.roundObject.dealerCards);\n    setTimeout(() => {\n      this.renderDealerAction(this.roundObject.dealerCards);\n    }, 300);\n\n  });\n\n};\n\n// start of game, new shuffled 6 deck & initial deal\nGame.prototype.getShuffledDeck = function () {\n  this.playerWinCount = 0;\n  this.dealerWinCount = 0;\n  PubSub.publish(\"Game:player_win_count\", this.playerWinCount);\n  PubSub.publish(\"Game:dealer_win_count\", this.dealerWinCount);\n  this.requestDeck.get()\n    .then((shuffledDeck) => {\n      this.newCardsUrl = `https://deckofcardsapi.com/api/deck/${ shuffledDeck.deck_id }/draw/?count=2`;\n      this.deckId = shuffledDeck.deck_id;\n      return shuffledDeck.deck_id;\n    })\n    .then((deckId) => {\n      this.dealCards(deckId);\n    })\n};\n\n// initial deal - two cards each, first dealer card hidden\nGame.prototype.dealCards = function (deckId) {\n  this.requestCards = new RequestHelper(this.newCardsUrl);\n  this.requestCards.get()\n    .then((drawnCards) => {\n      this.convert(drawnCards.cards);\n      this.roundObject.dealerCards = drawnCards.cards;\n      PubSub.publish(\"Game:dealer-cards-ready\", this.roundObject.dealerCards);\n    })\n    .then(() => {\n      this.requestCards.get()\n        .then((drawnCards) => {\n          this.convert(drawnCards.cards);\n          this.roundObject.playerCards = drawnCards.cards;\n          PubSub.publish(\"Game:player-cards-ready\", this.roundObject.playerCards);\n          const playerTotal = this.getHandTotal(this.roundObject.playerCards);\n          PubSub.publish(\"Game:player-total\", playerTotal);\n          this.blackJackChecker(this.roundObject);\n          this.bustChecker(this.roundObject);\n        })\n    });\n};\n\n// an actor draws one card into their card array\nGame.prototype.drawOneCard = function (array, actor) {\n  this.drawOneUrl = `https://deckofcardsapi.com/api/deck/${ this.deckId }/draw/?count=1`;\n  this.requestOneCard = new RequestHelper(this.drawOneUrl);\n  this.requestOneCard.get()\n    .then((cardObject) => {\n      this.convert(cardObject.cards);\n      array.push(cardObject.cards[0]);\n\n      const playerTotal = this.getHandTotal(this.roundObject.playerCards)\n\n      // IS THIS WHERE WE WERE TRYING TO INJECT THE ACTOR TO MAKE FUNCTION REUSABLE?\n      PubSub.publish(\"Game:player-total\", playerTotal);\n      PubSub.publish(`Game:${ actor }-drawn-card-ready`, array);\n      this.bustChecker(this.roundObject);\n      return array;\n    })\n    .then((array) => {\n      if (actor == `dealer`) {\n        setTimeout(() => {\n          this.renderDealerAction(array)\n        }, 300);\n      }\n    })\n};\n\n// triggered after player 'sticks' and recurrs if condition true\nGame.prototype.renderDealerAction = function (array) {\n  // CAN BE REFACTORED:\n  const dealerTotal = this.getHandTotal(this.roundObject.dealerCards)\n  PubSub.publish(\"Game:dealer-total\", dealerTotal);\n\n  if ((this.getHandTotal(array) <= 16) && (this.getHandTotal(array) <= this.getHandTotal(this.roundObject.playerCards) )) {\n    setTimeout(() => {\n      this.drawOneCard(array, `dealer`)\n      this.playCardSound();\n    }, 300);\n  }\n  else if (this.getHandTotal(array) > 21) {\n    //this is supposed to be empty, so if the dealer goes bust, this.getResult is not called in the line below\n  }\n  else {\n    setTimeout(() => {\n      this.getResult(this.roundObject)\n    }, 300);\n  }\n};\n\n// converts picture cards and ace values as cards dealt/drawn\nGame.prototype.convert = function (drawnCards) {\n  drawnCards.forEach((cardObject) => {\n    if ((cardObject.value === \"JACK\") || (cardObject.value === \"QUEEN\") || (cardObject.value === \"KING\")) {\n      cardObject.value = \"10\";\n    }\n    else if (cardObject.value === \"ACE\") {\n      cardObject.value = \"11\";\n    }\n  });\n};\n\n// determines win/draw/bust and publishes result\nGame.prototype.getResult = function (roundObject) {\n  const playerTotal = this.getHandTotal(roundObject.playerCards)\n  const dealerTotal = this.getHandTotal(roundObject.dealerCards)\n\n  PubSub.publish(\"Game:player-total\", playerTotal);\n  PubSub.publish(\"Game:dealer-total\", dealerTotal);\n\n  whoWon = \"\";\n\n  if (playerTotal > 21) {\n    whoWon = \"You went Bust! Dealer wins!\"\n    this.playLoseSound();\n    this.dealerWinCount += 1;\n  }\n  else if (dealerTotal > 21) {\n    whoWon = \"Dealer went Bust! You win!\"\n    this.playWinSound();\n    this.playerWinCount += 1;\n  }\n  else if (dealerTotal > playerTotal) {\n    whoWon = \"Dealer wins!\"\n    this.playLoseSound();\n    this.dealerWinCount += 1;\n  }\n  else if (playerTotal > dealerTotal) {\n    whoWon = \"You win!\";\n    this.playWinSound();\n    this.playerWinCount += 1;\n  }\n  else {\n    whoWon = \"It's a draw!\"\n  }\n\n  PubSub.publish(\"Game:result-loaded\", whoWon);\n//------------------------------------------------------------\n  PubSub.publish(\"Game:player_win_count\", this.playerWinCount);\n  PubSub.publish(\"Game:dealer_win_count\", this.dealerWinCount);\n//-------------------------------------------------------------\n};\n\nGame.prototype.getHandTotal = function (array) {\n  total = 0;\n  array.forEach((card) => {\n    total += Number(card.value)\n  });\n  return total;\n};\n\n// checks for Blackjack upon initial deal\nGame.prototype.blackJackChecker = function (roundObject) {\n  const playerTotal = this.getHandTotal(roundObject.playerCards)\n  const dealerTotal = this.getHandTotal(roundObject.dealerCards)\n  if ((playerTotal == 21) || (dealerTotal == 21)) {\n\n    PubSub.publish(\"Game:dealer-total\", dealerTotal);\n    this.getResult(roundObject);\n    // show dealer's hidden card if anyone has Blackjack:\n    PubSub.publish(`Game:dealer-drawn-card-ready`, this.roundObject.dealerCards);\n  }\n  else {\n    this.renderChoice(roundObject);\n  }\n};\n\n// if no Blackjack, player given choice to hit/stick\nGame.prototype.renderChoice = function (roundObject) {\n  PubSub.publish(\"Game:choice-loaded\");\n}\n\n// triggered each time card drawn:\nGame.prototype.bustChecker = function (roundObject) {\n  if (this.getHandTotal(roundObject.playerCards) > 21) {\n    setTimeout(() => {\n      this.checkForEleven(roundObject.playerCards)\n    }, 300);\n  }\n  else if (this.getHandTotal(roundObject.dealerCards) > 21) {\n    setTimeout(() => {\n      this.checkForEleven(roundObject.dealerCards)\n    }, 300);\n  }\n};\n\n// handling ace value being 1 or 11:\nGame.prototype.checkForEleven = function (cards) {\n\n  const elevenCard = cards.find( card => card.value == \"11\");\n  if (elevenCard != undefined) {\n    elevenCard.value = \"1\"\n    const playerTotal = this.getHandTotal(this.roundObject.playerCards);\n    PubSub.publish(\"Game:player-total\", playerTotal);\n  }\n  else {\n    PubSub.publish(`Game:dealer-drawn-card-ready`, this.roundObject.dealerCards);\n    setTimeout(() => {\n      this.getResult(this.roundObject);\n    }, 300);\n  };\n};\n\nGame.prototype.playCardSound = function () {\n  var sound = new Audio(\"/sound/cardPlace4.wav\");\n  sound.play()\n};\n\nGame.prototype.playWinSound = function () {\n  var sound = new Audio(\"/sound/youwin.wav\");\n  sound.play()\n};\n\nGame.prototype.playLoseSound = function () {\n  var sound = new Audio(\"/sound/youlose.wav\");\n  sound.play()\n};\n\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./client/src/models/game.js?");

/***/ }),

/***/ "./client/src/views/dealer_view.js":
/*!*****************************************!*\
  !*** ./client/src/views/dealer_view.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./client/src/helpers/pub_sub.js\");\n\nconst DealerView = function (container) {\n  this.container = container;\n};\n\n\nDealerView.prototype.bindEvents = function () {\n  PubSub.subscribe(\"Game:dealer-cards-ready\", (event) => {\n    this.renderHidden(event.detail);\n  });\n  PubSub.subscribe(\"Game:dealer-drawn-card-ready\", (event) => {\n    this.renderRevealed(event.detail);\n  });\n  PubSub.subscribe(\"Game:dealer-total\", (total) => {\n    this.renderTotal(total);\n  });\n  PubSub.subscribe(\"Game:dealer_win_count\", (winCount) => {\n    this.renderWinCount(winCount.detail);\n  });\n};\n\nDealerView.prototype.renderHidden = function (cards) {\n  this.container.innerHTML = \"\";\n\n  cards.forEach( (card, index) => {\n    // hide first dealer card:\n    if (index == 0) {\n      const hiddenCardImage = document.createElement('img');\n      hiddenCardImage.src = \"/css/hidden-card-NEW2.png\";\n      hiddenCardImage.classList.add('card_image');\n      this.container.appendChild(hiddenCardImage);\n    }\n    else {\n      const cardImage = document.createElement('img');\n      cardImage.src = card.image;\n      cardImage.classList.add('card_image');\n      this.container.appendChild(cardImage);\n    }\n})};\n\nDealerView.prototype.renderRevealed = function (cards) {\n  this.container.innerHTML = \"\";\n  cards.forEach( (card) => {\n    const cardImage = document.createElement('img');\n    cardImage.src = card.image;\n    cardImage.classList.add('card_image');\n    this.container.appendChild(cardImage);\n  });\n};\n\nDealerView.prototype.renderTotal = function (total) {\n\n  const totalTextBox = document.querySelector(\"div#total_text_container\")\n  totalTextBox.innerHTML = \"Dealer total\";\n\n  // const totalText = document.createElement(\"p\");\n  // totalText.textContent = \"Dealer total\";\n  // totalText.setAttribute(\"id\", \"totalText\");\n  // totalTextBox.appendChild(totalText)\n  // console.log('total text box:', totalTextBox);\n  //\n  // console.log('inner html:', totalTextBox.innerHTML);\n\n  const box = document.querySelector('div#dealer_total');\n  box.innerHTML = \"\";\n\n  const totalCounter = document.createElement('p');\n  totalCounter.textContent = total.detail;\n  box.appendChild(totalCounter);\n};\n\nDealerView.prototype.renderWinCount = function (number) {\n  const containerDiv = document.querySelector('div#dealer_win_count_container');\n  containerDiv.innerHTML = \"\";\n  const winCountBox = document.createElement('p');\n  winCountBox.setAttribute('id', 'dealer_win_counter');\n  winCountBox.textContent = `Number of wins: ${number}`;\n  containerDiv.appendChild(winCountBox)\n\n};\n\n\nmodule.exports = DealerView;\n\n\n//# sourceURL=webpack:///./client/src/views/dealer_view.js?");

/***/ }),

/***/ "./client/src/views/player_view.js":
/*!*****************************************!*\
  !*** ./client/src/views/player_view.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./client/src/helpers/pub_sub.js\")\n\nconst PlayerView = function (container) {\n  this.container = container;\n}\n\nPlayerView.prototype.bindEvents = function () {\n  PubSub.subscribe(\"Game:player-cards-ready\", (event) => {\n    this.render(event.detail);\n  });\n  PubSub.subscribe(\"Game:player-drawn-card-ready\", (event) => {\n    this.render(event.detail);\n  });\n  PubSub.subscribe(\"Game:player-total\", (total) => {\n    this.renderTotal(total);\n  });\n  PubSub.subscribe(\"Game:player_win_count\", (winCount) => {\n    this.renderWinCount(winCount.detail);\n  });\n};\n\n// define the render method\nPlayerView.prototype.render = function (cards) {\n  this.container.innerHTML = \"\";\n  cards.forEach ((card) => {\n  // card.image\n  const cardImage = document.createElement(\"img\");\n  cardImage.src = card.image;\n  cardImage.classList.add('card_image');\n  this.container.appendChild(cardImage);\n})};\n\nPlayerView.prototype.renderTotal = function (total) {\n  const box = document.querySelector('div#player_total');\n  box.innerHTML = \"\";\n\n  const totalCounter = document.createElement('p');\n  totalCounter.textContent = total.detail;\n  box.appendChild(totalCounter);\n};\n\nPlayerView.prototype.renderWinCount = function (number) {\n  const containerDiv = document.querySelector('div#player_win_count_container');\n  containerDiv.innerHTML = \"\";\n  const winCountBox = document.createElement('p');\n  winCountBox.setAttribute('id', 'player_win_counter');\n  winCountBox.textContent = `Number of wins: ${number}`;\n  containerDiv.appendChild(winCountBox)\n};\n\nmodule.exports = PlayerView;\n\n\n//# sourceURL=webpack:///./client/src/views/player_view.js?");

/***/ }),

/***/ "./client/src/views/result_view.js":
/*!*****************************************!*\
  !*** ./client/src/views/result_view.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("//this is result_view.js\n\n\n\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./client/src/helpers/pub_sub.js\");\n\nconst ResultView = function (container) {\n  this.container = container;\n};\n\nResultView.prototype.bindEvents = function () {\n  PubSub.subscribe(\"Game:result-loaded\", (event) => {\n    // render payload:\n    this.renderResult(event.detail);\n    setTimeout(() => {\n      this.loadDonut();\n    }, 800);\n  });\n  PubSub.subscribe(\"Game:choice-loaded\", () => {\n    this.renderChoice();\n  });\n};\n\nResultView.prototype.renderResult = function (result) {\n  this.container.innerHTML = \"\";\n  // render result\n  const paragraph = document.createElement('p');\n  paragraph.textContent = result;\n  this.container.appendChild(paragraph);\n};\n\nResultView.prototype.renderChoice = function () {\n  this.container.innerHTML = \"\";\n\n  const hitButton = document.createElement(\"button\");\n  hitButton.classList.add(\"player-choice-button\");\n  hitButton.textContent = \"Hit\";\n  this.container.appendChild(hitButton);\n  hitButton.addEventListener(\"click\", () => {\n    PubSub.publish(\"ResultView:hit-button-click\")\n  });\n\n  const stickButton = document.createElement(\"button\");\n  stickButton.classList.add(\"player-choice-button\");\n  stickButton.textContent = \"Stick\";\n  this.container.appendChild(stickButton);\n  stickButton.addEventListener(\"click\", () => {\n    PubSub.publish(\"ResultView:stick-button-click\")\n  });\n};\n\nResultView.prototype.loadDonut = function () {\n  const loadingContainer = document.createElement(\"div\");\n  loadingContainer.classList.add(\"loading\");\n  this.container.appendChild(loadingContainer);\n\n  const donut = document.createElement(\"div\");\n  donut.classList.add(\"donut\");\n  loadingContainer.appendChild(donut);\n\n  const loadingText = document.createElement(\"p\");\n  loadingText.id = \"loading-text\";\n  loadingText.textContent = \"Ready for the next deal?\"\n  loadingContainer.appendChild(loadingText);\n\n\n  setTimeout(() => {\n    PubSub.publish(\"ResultView:auto-redeal\");\n  }, 1500);\n};\n\nmodule.exports = ResultView;\n\nResultView.prototype.countDown = function (number) {\n\n  getReadyContainer.textContent = `${ number }`;\n\n};\n\n\n//# sourceURL=webpack:///./client/src/views/result_view.js?");

/***/ })

/******/ });