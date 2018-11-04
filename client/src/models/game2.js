const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Game = function (url) {
  this.url = 'http://localhost:3000/api/game';
  this.request = new RequestHelper(this.url);
};

List.prototype.bindEvents = function () {
  PubSub.subscribe('PlayerView:cards-ready', (evt) => {
    this.loadCards(evt.detail);
  });


  PubSub.subscribe('DealerView:cards-ready', (evt) =>{
    this.loadCards(evt.detail);
  })

  PubSub.subscribe('Game:result-loaded', (evt) =>{
    this.gameResult(evt.detail);
  })

};

// not sure on the views.
Game.prototype.getData = function () {
  this.request.get()
    .then((cards) => {
      PubSub.publish('PlayerView:cards-ready', cards)
      PubSub.publish('DealerView:cards-ready', cards)
    })
    .catch(console.error);
};

Game.prototype.gameResult = function (cards){
  // can figure this out with the api.
}

// not sure on the views.
Game.prototype.loadCards = function (cards){
  const request = new RequestHelper(this.url);
  request.post(cards)
  .then((cards) =>{
    PubSub.publish('PlayerView:cards-ready', cards)
    PubSub.publish('DealerView:cards-ready', cards)
  })
  .catch(console.error);
};




module.exports = Game;
