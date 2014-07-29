'use strict';
Game.Dungeon = function() {
  this.game = game;
};
var inDialog = false;
Game.Dungeon.prototype = {
  preload: function() {
    this.game.load.image('map', '/img/assets/cave/Dungeon1.png');
    this.game.load.spritesheet('player1', '/img/assets/sprites/player/MainWarrior.png', 32, 34);
  },
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = this.game.add.tileSprite(0, 0, 700, 500, 'map');
    this.player = this.game.add.sprite(340, 200, 'player1');
    this.player.animations.add('down', [0, 1, 2], 10, true);
    this.player.animations.add('left', [3, 4, 5], 10, true);
    this.player.animations.add('right', [6, 7, 8], 10, true);
    this.player.animations.add('up', [9, 10, 11], 10, true);
    this.player.frame = 0;
    this.player.anchor.set(0.5, 0.5);
    this.player.enableBody = true;
    this.game.physics.arcade.enable(this.player);
    this.game.camera.follow(this.player);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    if (this.cursors.left.isDown && !inDialog) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown && !inDialog) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
    } else if (this.cursors.up.isDown && !inDialog) {
      this.player.body.velocity.y = -150;
      this.player.animations.play('up');
    } else if (this.cursors.down.isDown && !inDialog) {
      this.player.body.velocity.y = 150;
      this.player.animations.play('down');
    } else {
      this.player.animations.stop();
    }
  }
};

//# sourceMappingURL=transition.map
