const PubSub = require('../helpers/pub_sub.js');

const Dealerview = function (container) {
  this.container = container;
};


DealerView.prototype.bindEvents = function () {
  //subscribe to the game broadcast (cards)
  this.render(event.detail);
};



DealverView.prototype.render = function (cards) {
  cards.forEach( (card) =>
  const cardImage = document.createElement('img');
  cardImage.src = card.image;
  this.container.appendChild(cardImage);
)};


module.exports = DealerView;
