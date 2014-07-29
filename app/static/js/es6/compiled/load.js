'use strict';
function ajax(url, type) {
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}
var menu;
var user1;
Game.Load = function() {
  this.game = game;
  this.counter = 0;
};
Game.Load.prototype = {
  preload: function() {},
  create: function() {
    menu = this.game.add.image(0, 0, 'menu');
    menu.scale.setTo(2, 2);
    this.game.input.keyboard.createCursorKeys();
    this.spaceCheck = _.debounce(this.spaceDown, 200);
  },
  update: function() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.spaceCheck();
    }
  },
  spaceDown: function() {
    ajax('/create', 'post', null, (function(user) {
      user1 = user.user;
    }), 'json');
    this.game.state.start('play');
  }
};

//# sourceMappingURL=load.map