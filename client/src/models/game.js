const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require("../helpers/pub_sub.js");

const Game = function () {
  this.newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
  this.requestDeck = new RequestHelper(this.newDeckUrl);
  this.roundObject = {};

}

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
}

Game.prototype.dealCards = function (deckId) {
  this.requestCards = new RequestHelper(this.newCardsUrl);
  this.requestCards.get()
    .then((drawnCards) => {
      this.convert(drawnCards.cards)
      this.roundObject.playerCards = drawnCards.cards;
      PubSub.publish("Game:player-cards-ready", this.roundObject.playerCards);
      const playerTotal = this.getHandTotal(this.roundObject.playerCards);
      PubSub.publish("Game:player-total", playerTotal);
    })
    .then(() => {
      this.requestCards.get()
        .then((drawnCards) => {
          this.convert(drawnCards.cards)
          this.roundObject.dealerCards = drawnCards.cards;

          PubSub.publish("Game:dealer-cards-ready", this.roundObject.dealerCards);
          this.blackJackChecker(this.roundObject);

        });
    })
};

Game.prototype.drawOneCard = function (array, actor) {
  this.drawOneUrl = `https://deckofcardsapi.com/api/deck/${ this.deckId }/draw/?count=1`;
  this.requestOneCard = new RequestHelper(this.drawOneUrl);
  this.requestOneCard.get()
    .then((cardObject) => {
      this.convert(cardObject.cards);
      array.push(cardObject.cards[0]);



      const playerTotal = this.getHandTotal(this.roundObject.playerCards)
      const ceeerds = this.getHandTotal(cardObject.cards);
      PubSub.publish("Game:player-total", playerTotal);
      console.log('playercards:',playerTotal);
      console.log('cerds:',ceeerds);
      PubSub.publish(`Game:${ actor }-drawn-card-ready`, array);
      this.bustChecker(this.roundObject);
      return array;
    })
    .then((array) => {
      if (actor == `dealer`) {
        this.renderDealerAction(array)
      }
    })
};

Game.prototype.renderDealerAction = function (array) {
  const dealerTotal = this.getHandTotal(this.roundObject.dealerCards)
  PubSub.publish("Game:dealer-total", dealerTotal);

  if (this.getHandTotal(array) <= 16) {
    this.drawOneCard(array, `dealer`)
  }
  else{
  this.getResult(this.roundObject)};
};

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

Game.prototype.getResult = function (roundObject) {
  const playerTotal = this.getHandTotal(roundObject.playerCards)
  const dealerTotal = this.getHandTotal(roundObject.dealerCards)

  PubSub.publish("Game:player-total", playerTotal);
  PubSub.publish("Game:dealer-total", dealerTotal);

  whoWon = "";

  if (playerTotal > 21) {
    whoWon = "You went Bust!"
  }
  else if (dealerTotal > 21) {
    whoWon = "Dealer went Bust!"
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

Game.prototype.blackJackChecker = function (roundObject) {
  const playerTotal = this.getHandTotal(roundObject.playerCards)
  const dealerTotal = this.getHandTotal(roundObject.dealerCards)
  if ((playerTotal == 21) || (dealerTotal == 21)) {

    PubSub.publish("Game:dealer-total", dealerTotal);
    this.getResult(roundObject);
    PubSub.publish(`Game:dealer-drawn-card-ready`, this.roundObject.dealerCards);
  }
  else {
    this.renderChoice(roundObject);
  }
};

Game.prototype.renderChoice = function (roundObject) {
  PubSub.publish("Game:choice-loaded");
}

Game.prototype.bustChecker = function (roundObject) {
  if (this.getHandTotal(roundObject.playerCards) > 21) {
    this.checkForEleven(roundObject.playerCards);
  }
  else if (this.getHandTotal(roundObject.dealerCards) > 21) {
    this.checkForEleven(roundObject.dealerCards);
  }

};

Game.prototype.checkForEleven = function (cards) {

  const elevenCard = cards.find( card => card.value == "11");
  if (elevenCard != undefined) {
    elevenCard.value = "1"
    const playerTotal = this.getHandTotal(this.roundObject.playerCards);
    PubSub.publish("Game:player-total", playerTotal);
  }
  else {
    this.getResult(this.roundObject);
  };
};


module.exports = Game;
