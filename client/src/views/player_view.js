const PubSub = require("../helpers/pub_sub.js")

const PlayerView = function (container) {
  this.container = container;
}

PlayerView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:player-cards-ready", (event) => {
    this.render(event.detail);
  });
//subscribe to model(2 cards)
// render method
};

// define the render method
PlayerView.prototype.render = function (cards) {
  cards.forEach ((card) => {
  // card.image
  const cardImage = document.createElement("img");
  cardImage.src = card.image;
  this.container.appendChild(cardImage);
})};

module.exports = PlayerView;
