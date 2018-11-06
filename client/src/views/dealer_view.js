const PubSub = require('../helpers/pub_sub.js');

const DealerView = function (container) {
  this.container = container;
};


DealerView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:dealer-cards-ready", (event) => {
    this.render(event.detail);
  });
};



DealerView.prototype.render = function (cards) {
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


module.exports = DealerView;
