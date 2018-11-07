
// require the relevant files n stuff
const PlayerView = require("./views/player_view.js");
const DealerView = require("./views/dealer_view.js");
const ResultView = require("./views/result_view.js");
const Game = require("./models/test_game.js");

// listener for dom content loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  // document query selector for container - player
  const playerContainer = document.querySelector( 'div#player_container' );
  // create new instance of player view  (container)
  const playerView = new PlayerView(playerContainer);
  //call bind events on player view
  playerView.bindEvents();
  // renderButton?

  // document query selector for container - dealer
  const dealerContainer = document.querySelector( 'div#dealer_container' );
  // create new instance of dealer view  (container)
  const dealerView = new DealerView(dealerContainer);
  //call bind events on dealer view
  dealerView.bindEvents();

  // document query selector for container - result
  const resultContainer = document.querySelector(  'div#result_container' );
  // create new instance of result view  (container)
  const resultView = new ResultView(resultContainer);
  //call bind events on result view
  resultView.bindEvents();


  // new instance of model
  const game = new Game();
  // call model bind events
  game.bindEvents();
  // call model get data
  game.getShuffledDeck(); // TODO decide when model gets data and what kind of data
});
