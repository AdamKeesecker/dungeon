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

    game.state.add('realLoad', Game.realLoad);//LOADING SCREEN
    game.state.add('splash', Game.Splash);    //MY LOGO
    game.state.add('load', Game.Load);        //MENU
    game.state.add('play', Game.Play);        //TEH GAMEZZZ
    game.state.add('dungeon', Game.Dungeon);  //DUNGEON
    game.state.add('combat', Game.Combat);    //COMBAT
    game.state.add('dead', Game.Dead);        //DEATH SCREEN (CHAO)
    game.state.add('finishedCombat', Game.FinishedCombat); //LOOT SCREEN



    game.state.start('realLoad');
  }
})();
