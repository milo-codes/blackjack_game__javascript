const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require("../helpers/pub_sub.js");

const Game = function () {
  this.newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
  this.requestDeck = new RequestHelper(this.newDeckUrl);
}

Game.prototype.bindEvents = function () {
  // will later need to listen for player Play Again button click --> trigger draw more cards from same deck

};

Game.prototype.getShuffledDeck = function () {
  this.requestDeck.get()
    .then((shuffledDeck) => {
      this.newCardsUrl = `https://deckofcardsapi.com/api/deck/${ shuffledDeck.deck_id }/draw/?count=2`;
      return shuffledDeck.deck_id;
    })
    .then((deckId) => {
      this.dealCards(deckId);
    })
};

Game.prototype.dealCards = function (deckId) {
  const roundObject = {};
  this.requestCards = new RequestHelper(this.newCardsUrl);
  this.requestCards.get()
    .then((drawnCards) => {
      this.convert(drawnCards.cards)
      console.log(drawnCards.cards);
      roundObject.playerCards = drawnCards.cards;
      PubSub.publish("Game:player-cards-ready", roundObject.playerCards);
    })
    .then(() => {
      this.requestCards.get()
        .then((drawnCards) => {
          this.convert(drawnCards.cards)
          roundObject.dealerCards = drawnCards.cards;
          PubSub.publish("Game:dealer-cards-ready", roundObject.dealerCards);
          this.getResult(roundObject);
        });
    })
};

Game.prototype.convert = function (drawnCards) {
  drawnCards.forEach((cardObject) => {
    // decide where we want the values re-assigned:
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
};

// Game.prototype.dealPlayerTwoCards = function () {
//   this.requestCards = new RequestHelper(this.newCardsUrl);
//   this.requestCards.get()
//     .then((drawnCards) => {
//       this.playerCards = drawnCards.cards;
//       PubSub.publish("Game:player-cards-ready", this.playerCards);
//       return this.playerCards;
//     })
//     .then(() => {
//       this.playerCards.forEach((cardObject) => {
//         // decide where we want the values re-assigned:
//         if (cardObject.value === "JACK") {
//           cardObject.value = "10";
//         }
//         else if (cardObject.value === "QUEEN") {
//           cardObject.value = "10";
//         }
//         else if (cardObject.value === "KING") {
//           cardObject.value = "10";
//         }
//         else if (cardObject.value === "ACE") {
//           cardObject.value = "11";
//         }
//       });
//       return this.playerCards;
//     })
// };
//
// Game.prototype.dealDealerTwoCards = function () {
//   this.requestCards = new RequestHelper(this.newCardsUrl);
//   this.requestCards.get()
//     .then((drawnCards) => {
//       this.dealerCards = drawnCards.cards;
//       PubSub.publish("Game:dealer-cards-ready", this.dealerCards);
//     })
//     .then(() => {
//       this.dealerCards.forEach((cardObject) => {
//         if (cardObject.value === "JACK") {
//           cardObject.value = "10";
//         }
//         else if (cardObject.value === "QUEEN") {
//           cardObject.value = "10";
//         }
//         else if (cardObject.value === "KING") {
//           cardObject.value = "10";
//         }
//         else if (cardObject.value === "ACE") {
//           cardObject.value = "11";
//         }
//       });
//     })
// };

Game.prototype.getResult = function (roundObject) {
  console.log(roundObject);
  // this.getPlayerTotal();
  // this.getDealerTotal();
  // TODO calc who wins
};

// Game.prototype.getPlayerTotal = function () {
//   console.log(this.playerCards); // --> CURRENTLY EMPTY ARRAY - check order of functions being called
//
// };

module.exports = Game;
