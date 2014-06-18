/* global Game, Phaser */


(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    initPhaser();
  }

  var game;

  function initPhaser(){
    game = new Phaser.Game(700, 500, Phaser.AUTO, 'game');

    game.state.add('splash', Game.Splash); //MY LOGO
    game.state.add('load', Game.Load);   //PRELOAD ALL ASSETS
    game.state.add('menu', Game.Menu);   //START MENU
    game.state.add('play', Game.Play);   //TEH GAMEZZZ


    game.state.start('splash');
  }
})();
