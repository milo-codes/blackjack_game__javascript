const PubSub = require('../helpers/pub_sub.js');

const DealerView = function (container) {
  this.container = container;
};


DealerView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:dealer-cards-ready", (event) => {
    this.renderHidden(event.detail);
  });
  PubSub.subscribe("Game:dealer-drawn-card-ready", (event) => {
    this.renderRevealed(event.detail);
  })
};

DealerView.prototype.renderHidden = function (cards) {
  this.container.innerHTML = "";

  cards.forEach( (card, index) => {
    // hide first dealer card:
    if (index == 0) {
      const hiddenCardImage = document.createElement('img');
      hiddenCardImage.src = "/css/hidden_card.png";
      this.container.appendChild(hiddenCardImage);
    }
    else {
      const cardImage = document.createElement('img');
      cardImage.src = card.image;
      this.container.appendChild(cardImage);
    }
})};

DealerView.prototype.renderRevealed = function (cards) {
  this.container.innerHTML = "";
  cards.forEach( (card) => {
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    this.container.appendChild(cardImage);
  });
};

//pubsub subscribe "stick" click.
//when clicked the card index 0 is revealed

module.exports = DealerView;
