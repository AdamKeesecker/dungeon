'use strict';
var game;
var inDialog = false;
var transitionTimer = 0;
Game.Play2 = function() {
  this.game = game;
};
Game.Play2.prototype = {
  preload: function() {
    this.game.load.tilemap('block', '/img/assets/tilemaps/blocks.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('pkmn', '/img/assets/tilemaps/pkmnTileset2.png');
    this.game.load.spritesheet('player1', '/img/assets/sprites/player/MainWarrior.png', 32, 34);
    this.game.load.image('map', '/img/assets/tilemaps/map.png');
    this.game.load.image('overlay', '/img/assets/tilemaps/mapOverlay.png');
    this.game.load.image('underbridge', '/img/assets/tilemaps/underbridge.png');
    this.game.load.spritesheet('guard', '/img/assets/sprites/player/Characters3.png', 32, 34);
    this.game.load.image('chatBox', '/img/assets/tilemaps/chatSquare.png');
    this.game.load.bitmapFont('textFont', '/img/assets/font/font.png', '/img/assets/font/font.fnt');
    this.game.load.image('tran1', '/img/assets/transitions/transition1.png');
    this.game.load.image('tran2', '/img/assets/transitions/transition2.png');
    this.game.load.image('tran3', '/img/assets/transitions/transition3.png');
    this.game.load.image('tran4', '/img/assets/transitions/transition4.png');
    this.game.load.image('tran5', '/img/assets/transitions/transition5.png');
    this.game.load.image('tran6', '/img/assets/transitions/transition6.png');
    this.game.load.image('tran7', '/img/assets/transitions/transition7.png');
    this.game.load.image('tran8', '/img/assets/transitions/transition8.png');
    this.game.load.image('tran9', '/img/assets/transitions/transition9.png');
    this.game.load.image('tran10', '/img/assets/transitions/transition10.png');
    this.game.load.image('tran11', '/img/assets/transitions/transition11.png');
    this.game.load.image('tran12', '/img/assets/transitions/transition12.png');
    this.game.load.image('tran13', '/img/assets/transitions/transition13.png');
  },
  create: function() {
    this.map2 = this.game.add.tilemap('block');
    this.map2.enableBody = true;
    this.map2.addTilesetImage('pkmn');
    this.map2.setCollision(523, true);
    this.layer2 = this.map2.createLayer('blocks');
    this.layer2.enableBody = true;
    this.layer2.immovable = true;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.tileSprite(0, 0, 1600, 1600, 'map');
    this.player2 = this.game.add.sprite(340, 200, 'player1');
    this.game.add.tileSprite(0, 0, 1600, 1600, 'overlay');
    this.game.add.tileSprite(0, 0, 1600, 1600, 'underbridge');
    this.game.world.setBounds(0, 0, 1600, 1600);
    this.player2.frame = 0;
    this.player2.animations.add('down', [0, 1, 2], 10, true);
    this.player2.animations.add('left', [3, 4, 5], 10, true);
    this.player2.animations.add('right', [6, 7, 8], 10, true);
    this.player2.animations.add('up', [9, 10, 11], 10, true);
    this.player2.anchor.set(0.5, 0.5);
    this.cursors2 = this.game.input.keyboard.createCursorKeys();
    this.game.camera.follow(this.player2);
    this.guard = this.game.add.sprite(385, 520, 'guard');
    this.game.physics.arcade.enable(this.guard);
    this.guard.frame = 7;
    this.guard.body.immovable = true;
    this.guard2 = this.game.add.sprite(1175, 580, 'guard');
    this.game.physics.arcade.enable(this.guard2);
    this.guard2.frame = 7;
    this.guard2.body.immovable = true;
    this.game.physics.arcade.enable(this.player2);
    this.game.physics.arcade.enable(this.layer2);
    this.chatBox = this.game.add.image(50, 375, 'chatBox');
    this.chatBox.scale.setTo(1.5, 1.5);
    this.chatBox.fixedToCamera = true;
    this.chatBox.visible = false;
    this.text = this.game.add.text(70, 400);
    this.text.visible = false;
    this.text.scale.setTo(0.5, 0.5);
    this.text.fixedToCamera = true;
  },
  update: function() {
    this.game.physics.arcade.collide(this.layer2, this.player2);
    this.game.physics.arcade.collide(this.guard, this.player2);
    this.game.physics.arcade.collide(this.guard2, this.player2);
    this.player2.body.velocity.x = 0;
    this.player2.body.velocity.y = 0;
    if (this.cursors2.left.isDown && !inDialog) {
      this.player2.body.velocity.x = -150;
      this.player2.animations.play('left');
    } else if (this.cursors2.right.isDown && !inDialog) {
      this.player2.body.velocity.x = 150;
      this.player2.animations.play('right');
    } else if (this.cursors2.up.isDown && !inDialog) {
      this.player2.body.velocity.y = -150;
      this.player2.animations.play('up');
    } else if (this.cursors2.down.isDown && !inDialog) {
      this.player2.body.velocity.y = 150;
      this.player2.animations.play('down');
    } else {
      this.player2.animations.stop();
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (this.player2.body.touching.up || this.player2.body.touching.left || this.player2.body.touching.right || this.player2.body.touching.down)) {
      this.showMessage();
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.X) && inDialog === true) {
      this.killMessage();
    }
    if (this.player2.position.x > 1310 && this.player2.position.x < 1330 && this.player2.position.y > 670 && this.player2.position.y < 680) {
      inDialog = true;
      transitionTimer++;
      if (transitionTimer === 1) {
        this.t1 = this.game.add.sprite(0, 0, 'tran1');
        this.t1.fixedToCamera = true;
      } else if (transitionTimer === 6) {
        this.t2 = this.game.add.sprite(0, 0, 'tran2');
        this.t2.fixedToCamera = true;
      } else if (transitionTimer === 12) {
        this.t3 = this.game.add.sprite(0, 0, 'tran3');
        this.t3.fixedToCamera = true;
      } else if (transitionTimer === 18) {
        this.t4 = this.game.add.sprite(0, 0, 'tran4');
        this.t4.fixedToCamera = true;
      } else if (transitionTimer === 24) {
        this.t5 = this.game.add.sprite(0, 0, 'tran5');
        this.t5.fixedToCamera = true;
      } else if (transitionTimer === 30) {
        this.t6 = this.game.add.sprite(0, 0, 'tran6');
        this.t6.fixedToCamera = true;
      } else if (transitionTimer === 36) {
        this.t7 = this.game.add.sprite(0, 0, 'tran7');
        this.t7.fixedToCamera = true;
      } else if (transitionTimer === 42) {
        this.t8 = this.game.add.sprite(0, 0, 'tran8');
        this.t8.fixedToCamera = true;
      } else if (transitionTimer === 48) {
        this.t9 = this.game.add.sprite(0, 0, 'tran9');
        this.t9.fixedToCamera = true;
      } else if (transitionTimer === 54) {
        this.t10 = this.game.add.sprite(0, 0, 'tran10');
        this.t10.fixedToCamera = true;
      } else if (transitionTimer === 60) {
        this.t11 = this.game.add.sprite(0, 0, 'tran11');
        this.t11.fixedToCamera = true;
      } else if (transitionTimer === 66) {
        this.t12 = this.game.add.sprite(0, 0, 'tran12');
        this.t12.fixedToCamera = true;
      } else if (transitionTimer === 72) {
        this.t13 = this.game.add.sprite(0, 0, 'tran13');
        this.t13.fixedToCamera = true;
      } else if (transitionTimer === 80) {
        this.game.state.start('dungeon');
      }
    }
  },
  render: function() {},
  showMessage: function() {
    inDialog = true;
    this.chatBox.visible = true;
    if (this.player2.position.x > 395 && this.player2.position.x < 434 && this.player2.position.y > 540 && this.player2.position.y < 580) {
      this.text.setText('This is the great plaza. We have fought hard to keep it safe from monsters. Just for you! \n(Press X to close)');
    } else if (this.player2.position.x > 1180 && this.player2.position.x < 1230 && this.player2.position.y > 590 && this.player2.position.y < 635) {
      this.text.setText('Careful! This dungeon has many monsters. Make sure you are prepared for combat!');
    } else {
      this.text.setText('Else');
    }
    this.text.visible = true;
  },
  killMessage: function() {
    inDialog = false;
    this.chatBox.visible = false;
    this.text.visible = false;
  }
};

//# sourceMappingURL=play2.map
