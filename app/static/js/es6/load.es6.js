/* global Game, game */
'use strict';

var menu;

Game.Load = function(){
  this.game = game;
  this.counter = 0;
};

Game.Load.prototype = {
  preload: function(){
    this.game.load.image('menu', '/img/assets/tilemaps/menu.png');
    this.game.load.image('new', '/img/assets/tilemaps/newGame.png');
    this.game.load.image('load', '/img/assets/tilemaps/loadGame.png');
  },

  create: function(){
    menu = this.game.add.image(0, 0, 'menu');
    menu.scale.setTo(2,2);

    var newG = this.game.add.button(200, 400, 'new', this.newGame, this, 2);
    newG.scale.setTo(1.5,1.5);

    var loadG = this.game.add.button(400, 400, 'load', this.loadGame, this, 2);
    loadG.scale.setTo(1.5,1.5);
  },

  newGame: function(){
    alert('new');
    this.game.state.start('play');
  },

  loadGame: function(){
    alert('load');
    this.game.state.start('play');
  }
};
