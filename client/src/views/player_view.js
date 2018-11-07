const PubSub = require("../helpers/pub_sub.js")

const PlayerView = function (container) {
  this.container = container;
}

PlayerView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:player-cards-ready", (event) => {
    this.render(event.detail);
  });
  PubSub.subscribe("Game:player-drawn-card-ready", (event) => {
    this.render(event.detail);
  });
  PubSub.subscribe("Game:player-total", (total) => {
    this.renderTotal(total);
  });
  PubSub.subscribe("Game:player_win_count", (winCount) => {
    this.renderWinCount(winCount.detail);
  });

};

// define the render method
PlayerView.prototype.render = function (cards) {
  this.container.innerHTML = "";
  cards.forEach ((card) => {
  // card.image
  const cardImage = document.createElement("img");
  cardImage.src = card.image;
  cardImage.classList.add('card_image');
  this.container.appendChild(cardImage);
})};

PlayerView.prototype.renderTotal = function (total) {
  const box = document.querySelector('div#player_total');
  box.innerHTML = "";
  const totalCounter = document.createElement('p');
  totalCounter.textContent = total.detail;
  box.appendChild(totalCounter);
};

PlayerView.prototype.renderWinCount = function (number) {
  const containerDiv = document.querySelector('div#player_win_count_container');
  containerDiv.innerHTML = "";
  const winCountBox = document.createElement('p');
  winCountBox.textContent = `Number of wins: ${number}`;
  winCountBox.classList.add('win_counter');
  containerDiv.appendChild(winCountBox)
};

module.exports = PlayerView;
