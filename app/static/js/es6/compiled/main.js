(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    initPhaser();
  }
  var game;
  function initPhaser() {
    game = new Phaser.Game(700, 500, Phaser.AUTO, 'game');
    game.state.add('realLoad', Game.realLoad);
    game.state.add('splash', Game.Splash);
    game.state.add('load', Game.Load);
    game.state.add('play', Game.Play);
    game.state.add('dungeon', Game.Dungeon);
    game.state.add('combat', Game.Combat);
    game.state.add('dead', Game.Dead);
    game.state.add('finishedCombat', Game.FinishedCombat);
    game.state.start('realLoad');
  }
})();

//# sourceMappingURL=main.map
