const RequestHelper = require('../helpers/request_helper.js');

const Game = function () {
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
    });
  // this.newCardsUrl = `https://deckofcardsapi.com/api/deck/${ this.deckId }/draw/?count=2`;
  // this.drawTwoCards();
  // console.log(this.deckId);
  // console.log(this.newCardsUrl);
};

Game.prototype.drawTwoCards = function () {
  this.requestCards = new RequestHelper(this.newCardsUrl);
  this.requestCards.get()
    .then((drawnCards) => {
      console.log(drawnCards.cards);
    })
};

module.exports = Game;
