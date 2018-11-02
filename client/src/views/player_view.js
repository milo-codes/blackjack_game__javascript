const PubSub = require("../helpers/pub_sub.js")

const PlayerView = function (container) {
  this.container = container;
}

PlayerView.prototype.bindEvents = function () {
//subscribe to model(2 cards)
// render method
  this.render(event.detail);
};

// define the render method
PlayerView.prototype.render = function (cards) {
  cards.forEach ((card) =>
  // card.image
  const cardImage = document.createElement("img");
  cardImage.src = card.image;
  this.container.appendChild(cardImage);
)};

module.exports = PlayerView;
