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
    this.game.input.keyboard.createCursorKeys();
    this.spaceCheck = _.debounce(this.spaceDown, 200);
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
    if(user1.ready === true){
      this.game.state.start('play');
    }
  }

  // newGame: function(){
  //   this.game.state.start('play');
  // },
  //
  // loadGame: function(){
  //   this.game.state.start('play');
  // }
};
