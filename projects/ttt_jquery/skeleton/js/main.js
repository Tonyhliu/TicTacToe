const View = require("./ttt-view.js")
const Game = require("./game.js")

$( () => {
  const rootEl = $('.ttt');
  const game = new Game();
  new View(game, rootEl);
});
