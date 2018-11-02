const PubSub = require("../helpers/pub_sub.js");

const ResultView = function (container) {
  this.container = container;
};

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:result-loaded", (event) => {
    // render payload:
    this.renderResult(  TODO  );
  });
};

ResultView.prototype.renderResult = function (result) {
  // render result
};

module.exports = ResultView;
