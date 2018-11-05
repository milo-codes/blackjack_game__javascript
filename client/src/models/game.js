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
    this.dealCards(this.deckId);
  });

  const drawOneButton = document.querySelector("#draw-one");
  drawOneButton.addEventListener("click", () => {
    this.drawOneCard(this.roundObject.playerCards)
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
    })
    .then(() => {
      this.requestCards.get()
        .then((drawnCards) => {
          this.convert(drawnCards.cards)
          this.roundObject.dealerCards = drawnCards.cards;
          PubSub.publish("Game:dealer-cards-ready", this.roundObject.dealerCards);
          this.getResult(this.roundObject);
        });
    })
};

Game.prototype.drawOneCard = function (array) {
  this.drawOneUrl = `https://deckofcardsapi.com/api/deck/${ this.deckId }/draw/?count=1`;
  this.requestOneCard = new RequestHelper(this.drawOneUrl);
  this.requestOneCard.get()
    .then((cardObject) => {
      this.convert(cardObject.cards);
      array.push(cardObject.cards[0]);
      console.log(array);
      PubSub.publish("Game:player-cards-ready", array);
    })
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
  playerTotal = 0;
  dealerTotal = 0;
  roundObject.dealerCards.forEach((card) => {
    dealerTotal += Number(card.value)
  });
  roundObject.playerCards.forEach((card) => {
    playerTotal += Number(card.value)
  });

  whoWon = "";

  if (playerTotal > dealerTotal) {
    whoWon = "You win!";
  }
  else if (dealerTotal > playerTotal) {
    whoWon = "Dealer wins!"
  }
  else {
    whoWon = "It's a draw!"
  }

  PubSub.publish("Game:result-loaded", whoWon);
};



//ia the array length 2?
//if yes, go to method A
//if no, go to method B

//method A  - Blackjack checker
//is your total or dealer total 21? < dealer blackjack is checked here
//if yes -> check against dealer hand
//trigger result - win or draw
//if no, go to method B

//method B
// are you > 21?
//if yes -> go to ace checker
//if no, go to method c

//ace checker:
//is there an ace?
//change value of ace
//proceed to method C 

//method C
//render the hit/stick button
//add listeners
//do you want another hit?
//if no -> go to dealer logic to see who;s actually won....
//if yes, go to get card method, and return to top of logic chart

//dealer logic
//if dealer total <= 16 { draw another card}
//else proceed to total checker

//check who's hand is highest
//trigger result


module.exports = Game;
