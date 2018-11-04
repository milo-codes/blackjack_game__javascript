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
      this.dealPlayerTwoCards()
    })
    .then(() => {
      this.dealDealerTwoCards()
    })
    // .then(() => {
    //   this.getResult()
    // });
};

Game.prototype.dealPlayerTwoCards = function () {
  this.requestCards = new RequestHelper(this.newCardsUrl);
  this.requestCards.get()
    .then((drawnCards) => {
      this.playerCards = drawnCards.cards;
      PubSub.publish("Game:player-cards-ready", this.playerCards);
      return this.playerCards;
    })
    .then(() => {
      this.playerCards.forEach((cardObject) => {
        if (cardObject.value === "JACK") {
          cardObject.value = "10";
        }
        else if (cardObject.value === "QUEEN") {
          cardObject.value = "10";
        }
        else if (cardObject.value === "KING") {
          cardObject.value = "10";
        }
        else if (cardObject.value === "ACE") {
          cardObject.value = "11";
        }
      });
    })
};

Game.prototype.dealDealerTwoCards = function () {
  this.requestCards = new RequestHelper(this.newCardsUrl);
  this.requestCards.get()
    .then((drawnCards) => {
      this.dealerCards = drawnCards.cards;
      PubSub.publish("Game:dealer-cards-ready", this.dealerCards);
    })
    .then(() => {
      this.dealerCards.forEach((cardObject) => {
        if (cardObject.value === "JACK") {
          cardObject.value = "10";
        }
        else if (cardObject.value === "QUEEN") {
          cardObject.value = "10";
        }
        else if (cardObject.value === "KING") {
          cardObject.value = "10";
        }
        else if (cardObject.value === "ACE") {
          cardObject.value = "11";
        }
      });
    })
};

Game.prototype.getResult = function () {
  this.getPlayerTotal();
  // this.getDealerTotal();
  // TODO calc
};

Game.prototype.getPlayerTotal = function () {
  console.log(this.playerCards); // --> CURRENTLY EMPTY ARRAY - check order of functions being called
  
  // this.playerTotal = 0;
  // this.playerCards.forEach((cardObject) => {
  //   console.log("NUMERIC?", Number(cardObject.value));
  // });
  // console.log(this.playerTotal);
};

module.exports = Game;
