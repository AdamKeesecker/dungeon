'use strict';
Game.Dead = function() {
  this.game = game;
};
Game.Dead.prototype = {
  preload: function() {},
  create: function() {
    this.skull = this.game.add.sprite(350, 150, 'skull');
    this.skull.anchor.setTo(0.5, 0.5);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.game.state.start('load');
    }
  }
};

//# sourceMappingURL=dead.map
