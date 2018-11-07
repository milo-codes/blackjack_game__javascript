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
  });
  PubSub.subscribe("Game:dealer-total", (total) => {
    this.renderTotal(total);
  });
  PubSub.subscribe("Game:dealer_win_count", (winCount) => {
    this.renderWinCount(winCount.detail);
  });
};

DealerView.prototype.renderHidden = function (cards) {
  this.container.innerHTML = "";

  cards.forEach( (card, index) => {
    // hide first dealer card:
    if (index == 0) {
      const hiddenCardImage = document.createElement('img');
      hiddenCardImage.src = "/css/hidden-card-NEW2.png";
      hiddenCardImage.classList.add('card_image');
      this.container.appendChild(hiddenCardImage);
    }
    else {
      const cardImage = document.createElement('img');
      cardImage.src = card.image;
      cardImage.classList.add('card_image');
      this.container.appendChild(cardImage);
    }
})};

DealerView.prototype.renderRevealed = function (cards) {
  this.container.innerHTML = "";
  cards.forEach( (card) => {
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.classList.add('card_image');
    this.container.appendChild(cardImage);
  });
};

DealerView.prototype.renderTotal = function (total) {
  const box = document.querySelector('div#dealer_total');
  box.innerHTML = "";
  const totalCounter = document.createElement('p');
  totalCounter.textContent = total.detail;
  box.appendChild(totalCounter);
};

DealerView.prototype.renderWinCount = function (number) {
  const containerDiv = document.querySelector('div#dealer_win_count_container');
  containerDiv.innerHTML = "";
  const winCountBox = document.createElement('p');
  winCountBox.textContent = `Number of wins: ${number}`;
  containerDiv.appendChild(winCountBox)

};


module.exports = DealerView;
