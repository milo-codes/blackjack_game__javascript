// TEST CARD DETAILS

const two = {
  value: "2",
  image: "https://deckofcardsapi.com/static/img/2C.png"
};

const three = {
  value: "3",
  image: "https://deckofcardsapi.com/static/img/3C.png"
};

const four = {
  value: "4",
  image: "https://deckofcardsapi.com/static/img/4C.png"
};

const five = {
  value: "5",
  image: "https://deckofcardsapi.com/static/img/5C.png"
};
const six = {
  value: "6",
  image: "https://deckofcardsapi.com/static/img/6C.png"
};
const seven = {
  value: "7",
  image: "https://deckofcardsapi.com/static/img/7C.png"
};

const eight = {
  value: "8",
  image: "https://deckofcardsapi.com/static/img/8C.png"
};

const nine = {
  value: "9",
  image: "https://deckofcardsapi.com/static/img/9C.png"
};

const king = {
  value: "10",
  image: "https://deckofcardsapi.com/static/img/KC.png"
};

const ace = {
  value: "11",
  image: "https://deckofcardsapi.com/static/img/AC.png"
};

// start of game.js code with modified deal and draw functions:
const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require("../helpers/pub_sub.js");

const Game = function () {
  this.newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
  this.requestDeck = new RequestHelper(this.newDeckUrl);
  this.roundObject = {};
};

Game.prototype.bindEvents = function () {
  const playAgainButton = document.querySelector("#play-again-button");
  playAgainButton.addEventListener("click", () => {
    const dealerTotalBox = document.querySelector('div#dealer_total');
    dealerTotalBox.innerHTML = "";
    this.dealCards(this.deckId);
  });

  PubSub.subscribe("ResultView:hit-button-click", () => {
    this.drawOneCard(this.roundObject.playerCards, `player`)
  });

  PubSub.subscribe("ResultView:stick-button-click", () => {
    PubSub.publish(`Game:dealer-drawn-card-ready`, this.roundObject.dealerCards);
    setTimeout(() => {
      this.renderDealerAction(this.roundObject.dealerCards);
    }, 1000);
    const dealerTotal = this.getHandTotal(this.roundObject.dealerCards)
    PubSub.publish("Game:dealer-total", dealerTotal);
  });
};

// start of game, new shuffled 6 deck & initial deal
Game.prototype.getShuffledDeck = function () {
  this.requestDeck.get()
    .then((shuffledDeck) => {
      this.newCardsUrl = `https://deckofcardsapi.com/api/deck/${ shuffledDeck.deck_id }/draw/?count=2`;
      this.deckId = shuffledDeck.deck_id;
      return shuffledDeck.deck_id;
    })
    .then((deckId) => {
      this.dealCards(deckId);
    })
};

// initial deal - two cards each, first dealer card hidden
Game.prototype.dealCards = function (deckId) {

  // TEST CARDS FOR DEALER
  let testDealerCardsArray = [two, three];
  // TEST CARDS FOR DEALER

  this.roundObject.dealerCards = testDealerCardsArray;
  PubSub.publish("Game:dealer-cards-ready", this.roundObject.dealerCards);

  // TEST CARDS FOR PLAYER
  let testPlayerCardsArray = [four, five];
  // TEST CARDS FOR PLAYER

  this.roundObject.playerCards = testPlayerCardsArray;
  PubSub.publish("Game:player-cards-ready", this.roundObject.playerCards);
  const playerTotal = this.getHandTotal(this.roundObject.playerCards);
  PubSub.publish("Game:player-total", playerTotal);
  this.blackJackChecker(this.roundObject);
};

// an actor draws one card into their card array
Game.prototype.drawOneCard = function (array, actor) {
  // TEST CARD DRAW FOR PLAYER
  array.push(six);
  // TEST CARD DRAW FOR PLAYER

  const playerTotal = this.getHandTotal(this.roundObject.playerCards)
  PubSub.publish("Game:player-total", playerTotal);
  PubSub.publish(`Game:${ actor }-drawn-card-ready`, array);
  this.bustChecker(this.roundObject);

  if (actor == `dealer`) {
    this.renderDealerAction(array)
  }
};

// triggered after player 'sticks' and recurrs if condition true
Game.prototype.renderDealerAction = function (array) {
  const dealerTotal = this.getHandTotal(this.roundObject.dealerCards)
  PubSub.publish("Game:dealer-total", dealerTotal);

  if (this.getHandTotal(array) <= 16) {
    this.drawOneCard(array, `dealer`)
  }
  else{
  this.getResult(this.roundObject)};
};

// converts picture cards and ace values as cards dealt/drawn
Game.prototype.convert = function (drawnCards) {
  drawnCards.forEach((cardObject) => {
    if ((cardObject.value === "JACK") || (cardObject.value === "QUEEN") || (cardObject.value === "KING")) {
      cardObject.value = "10";
    }
    else if (cardObject.value === "ACE") {
      cardObject.value = "11";
    }
  });
};

// determines win/draw/bust and publishes result
Game.prototype.getResult = function (roundObject) {
  const playerTotal = this.getHandTotal(roundObject.playerCards)
  const dealerTotal = this.getHandTotal(roundObject.dealerCards)

  PubSub.publish("Game:player-total", playerTotal);
  PubSub.publish("Game:dealer-total", dealerTotal);

  whoWon = "";

  if (playerTotal > 21) {
    whoWon = "You went Bust! Dealer wins!"
  }
  else if (dealerTotal > 21) {
    whoWon = "Dealer went Bust! You win!"
  }
  else if (dealerTotal > playerTotal) {
    whoWon = "Dealer wins!"
  }
  else if (playerTotal > dealerTotal) {
    whoWon = "You win!";
  }
  else {
    whoWon = "It's a draw!"
  }

  PubSub.publish("Game:result-loaded", whoWon);
};

Game.prototype.getHandTotal = function (array) {
  total = 0;
  array.forEach((card) => {
    total += Number(card.value)
  });
  return total;
};

// checks for Blackjack upon initial deal
Game.prototype.blackJackChecker = function (roundObject) {
  const playerTotal = this.getHandTotal(roundObject.playerCards)
  const dealerTotal = this.getHandTotal(roundObject.dealerCards)
  if ((playerTotal == 21) || (dealerTotal == 21)) {

    PubSub.publish("Game:dealer-total", dealerTotal);
    this.getResult(roundObject);
    // show dealer's hidden card if anyone has Blackjack:
    PubSub.publish(`Game:dealer-drawn-card-ready`, this.roundObject.dealerCards);
  }
  else {
    this.renderChoice(roundObject);
  }
};

// if no Blackjack, player given choice to hit/stick
Game.prototype.renderChoice = function (roundObject) {
  PubSub.publish("Game:choice-loaded");
}

// triggered each time card drawn:
Game.prototype.bustChecker = function (roundObject) {
  if (this.getHandTotal(roundObject.playerCards) > 21) {
    this.checkForEleven(roundObject.playerCards);
  }
  else if (this.getHandTotal(roundObject.dealerCards) > 21) {
    this.checkForEleven(roundObject.dealerCards);
  }
};

// handling ace value being 1 or 11:
Game.prototype.checkForEleven = function (cards) {

  const elevenCard = cards.find( card => card.value == "11");
  if (elevenCard != undefined) {
    elevenCard.value = "1"
    const playerTotal = this.getHandTotal(this.roundObject.playerCards);
    PubSub.publish("Game:player-total", playerTotal);
  }
  else {
    PubSub.publish(`Game:dealer-drawn-card-ready`, this.roundObject.dealerCards);
    this.getResult(this.roundObject);
  };
};


module.exports = Game;
