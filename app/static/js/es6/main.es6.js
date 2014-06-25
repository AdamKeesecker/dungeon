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

    game.state.add('splash', Game.Splash);    //MY LOGO
    game.state.add('load', Game.Load);        //MENU
    game.state.add('play', Game.Play);        //TEH GAMEZZZ
    game.state.add('dungeon', Game.Dungeon);  //DUNGEON
    game.state.add('combat', Game.Combat);    //COMBAT
    game.state.add('dead', Game.Dead);        //DEATH SCREEN (CHAO)
    game.state.add('finishedCombat', Game.FinishedCombat); //LOOT SCREEN
    // game.state.add('play2', Game.Play2);      //RETURN TO CITY



    game.state.start('splash');
  }
})();
/*


  BUGS:
    enemy in dungeon1 slides while moving
    still can see in dungeon (sight distance)
    sometimes crashes
    attack, defend, & arrow off center in combat phase


  SONG CHOICES:
    Bark








*/
