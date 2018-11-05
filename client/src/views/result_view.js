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
};

ResultView.prototype.renderResult = function (result) {
  // render result
  const paragraph = document.createElement('p');
  paragraph.textContent = result;
  this.container.appendChild(paragraph);
};

module.exports = ResultView;
