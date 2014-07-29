/* global Game, game, Phaser, _ */
'use strict';

function ajax(url, type, data={}, success= r => console.log(r), dataType='html'){
  $.ajax({
    url:url,
    type:type,
    dataType:dataType,
    data:data,
    success:success
  });
}

var menu;
var user1;

Game.Load = function(){
  this.game = game;
  this.counter = 0;
};

Game.Load.prototype = {
  preload: function(){
    // this.game.load.image('menu', '/img/assets/tilemaps/menu.png');
    // this.game.load.image('new', '/img/assets/tilemaps/newGame.png');
    // this.game.load.image('load', '/img/assets/tilemaps/loadGame.png');
  },

  create: function(){
    menu = this.game.add.image(0, 0, 'menu');
    menu.scale.setTo(2,2);

    this.game.input.keyboard.createCursorKeys();

    this.spaceCheck = _.debounce(this.spaceDown, 200);


    // var newG = this.game.add.button(200, 400, 'new', this.newGame, this, 2);
    // newG.scale.setTo(1.5,1.5);

    // var loadG = this.game.add.button(400, 400, 'load', this.loadGame, this, 2);
    // loadG.scale.setTo(1.5,1.5);
  },

  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.spaceCheck();
    }
  },

  spaceDown: function(){
    debugger;
    ajax('/create', 'post', null, user=>{
      user1 = user.user;
    }, 'json');
    this.game.state.start('play');
  }

  // newGame: function(){
  //   this.game.state.start('play');
  // },
  //
  // loadGame: function(){
  //   this.game.state.start('play');
  // }
};
