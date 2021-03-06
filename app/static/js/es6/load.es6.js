/* global Game, game, Phaser, _ */
'use strict';

function ajax(url, type, data={}, success= r => console.log(r), dataType='html', async = false){
  $.ajax({
    url:url,
    type:type,
    dataType:dataType,
    data:data,
    success:success,
    async:async
  });
}

var menu;
var user1;
var space;

Game.Load = function(){
  this.game = game;
  this.counter = 0;
};

Game.Load.prototype = {
  preload: function(){
  },

  create: function(){
    menu = this.game.add.image(0, 0, 'menu');
    menu.scale.setTo(2,2);
    space = this.game.add.image(240, 300, 'space');
    space.scale.setTo(2.5,2.5);
    this.game.input.keyboard.createCursorKeys();
    this.spaceCheck = _.debounce(this.spaceDown, 200);
    ajax('/create', 'post', null, user=>{
      user1 = user.user;
    }, 'json');
  },

  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.spaceCheck();
    }
  },

  spaceDown: function(){
    this.game.state.start('play');
  }
};
