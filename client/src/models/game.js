const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require("../helpers/pub_sub.js");

const Game = function () {
  this.playerCards = [];
  this.dealerCards = [];
  // this.remainingCards = 0
  this.newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
  // second url for draw?

  this.requestDeck = new RequestHelper(this.newDeckUrl);
}

Game.prototype.bindEvents = function () {
  // will later need to listen for player Play Again button click --> trigger draw more cards from same deck

};

Game.prototype.getShuffledDeck = function () {
  this.requestDeck.get()
    .then((shuffledDeck) => {
      this.deckId = shuffledDeck.deck_id;
      this.newCardsUrl = `https://deckofcardsapi.com/api/deck/${ this.deckId }/draw/?count=2`;
    })
    .then(() => {
      this.dealPlayerTwoCards();
    })
    .then(() => {
      this.dealDealerTwoCards();
    })
  // this.newCardsUrl = `https://deckofcardsapi.com/api/deck/${ this.deckId }/draw/?count=2`;
  // this.drawTwoCards();
  // console.log(this.deckId);
  // console.log(this.newCardsUrl);
};

Game.prototype.dealPlayerTwoCards = function () {
  this.requestCards = new RequestHelper(this.newCardsUrl);
  this.requestCards.get()
    .then((drawnCards) => {
      this.playerCards = drawnCards.cards;
      PubSub.publish("Game:player-cards-ready", this.playerCards);
    })
};

Game.prototype.dealDealerTwoCards = function () {
  this.requestCards = new RequestHelper(this.newCardsUrl);
  this.requestCards.get()
    .then((drawnCards) => {
      this.dealerCards = drawnCards.cards;
      PubSub.publish("Game:dealer-cards-ready", this.dealerCards);
    })
};

module.exports = Game;
