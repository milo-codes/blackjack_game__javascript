//this is result_view.js



const PubSub = require("../helpers/pub_sub.js");

const ResultView = function (container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:result-loaded", (event) => {
    // render payload:
    this.renderResult(event.detail);
  });
  PubSub.subscribe("Game:choice-loaded", () => {
    this.renderChoice();
  });
};

ResultView.prototype.renderResult = function (result) {
  this.container.innerHTML = "";
  // render result
  const paragraph = document.createElement('p');
  paragraph.textContent = result;
  this.container.appendChild(paragraph);
};

ResultView.prototype.renderChoice = function () {
  this.container.innerHTML = "";

  const hitButton = document.createElement("button");
  hitButton.classList.add("player-choice-button");
  hitButton.textContent = "Hit";
  this.container.appendChild(hitButton);
  hitButton.addEventListener("click", () => {
    PubSub.publish("ResultView:hit-button-click")
  });

  const stickButton = document.createElement("button");
  stickButton.classList.add("player-choice-button");
  stickButton.textContent = "Stick";
  this.container.appendChild(stickButton);
  stickButton.addEventListener("click", () => {
    PubSub.publish("ResultView:stick-button-click")
  });
};

module.exports = ResultView;
