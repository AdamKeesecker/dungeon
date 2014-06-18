/* global Phaser, Game */
'use strict';

  var cursors;
  var player;
  var map;
  var layer;
  var game;
  var inDialog= false;

  Game.Play = function(){
    this.game = game;
  };

  Game.Play.prototype={
    preload: function(){
      this.game.load.tilemap('block', '/img/assets/tilemaps/blocks.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('pkmn', '/img/assets/tilemaps/pkmnTileset2.png');

      this.game.load.spritesheet('player1', '/img/assets/sprites/player/MainWarrior.png', 32, 34);
      this.game.load.image('map', '/img/assets/tilemaps/map.png');
      this.game.load.image('overlay', '/img/assets/tilemaps/mapOverlay.png');
      this.game.load.image('underbridge', '/img/assets/tilemaps/underbridge.png');

      this.game.load.spritesheet('guard', '/img/assets/sprites/player/Characters3.png', 32, 34);

      this.game.load.image('chatBox', '/img/assets/tilemaps/chatSquare.png');
    },

    create: function(){
      this.map = map;
      this.map = this.game.add.tilemap('block');
      this.map.enableBody = true;
      this.map.addTilesetImage('pkmn');
      this.map.setCollision(523, true);


      this.layer = layer;
      this.layer = this.map.createLayer('blocks');
      this.layer.enableBody = true;
      this.layer.immovable = true;



      this.game.physics.startSystem(Phaser.Physics.ARCADE);



      this.game.add.tileSprite(0, 0, 1600, 1600, 'map');
      this.player = player;
      this.player = this.game.add.sprite(340, 200, 'player1');
      this.game.add.tileSprite(0, 0, 1600, 1600, 'overlay');
      this.game.add.tileSprite(0, 0, 1600, 1600, 'underbridge');

      this.game.world.setBounds(0, 0, 1600, 1600);

      this.player.frame = 0;
      this.player.animations.add('down', [0, 1, 2], 10, true);
      this.player.animations.add('left', [3, 4, 5], 10, true);
      this.player.animations.add('right', [6, 7, 8], 10, true);
      this.player.animations.add('up', [9, 10, 11], 10, true);
      this.player.anchor.set(0.5);

      this.cursors = cursors;
      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.game.camera.follow(this.player);

      this.guard = this.game.add.sprite(385, 520, 'guard');
      this.game.physics.arcade.enable(this.guard);
      this.guard.frame = 7;
      this.guard.body.immovable = true;

      this.guard2 = this.game.add.sprite(1175, 580, 'guard');
      this.game.physics.arcade.enable(this.guard2);
      this.guard2.frame = 7;
      this.guard2.body.immovable = true;

      this.game.physics.arcade.enable(this.player);
      this.game.physics.arcade.enable(this.layer);
    },

    update: function(){

      //  Collision
      this.game.physics.arcade.collide(this.layer, this.player);
      this.game.physics.arcade.collide(this.guard, this.player);
      this.game.physics.arcade.collide(this.guard2, this.player);

      //  Reset the players velocity (movement)
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;


      if (this.cursors.left.isDown && !inDialog)
      {
          //  Move to the left
          this.player.body.velocity.x = -150;

          this.player.animations.play('left');
      }
      else if (this.cursors.right.isDown && !inDialog)
      {
          //  Move to the right
          this.player.body.velocity.x = 150;

          this.player.animations.play('right');
      }
      else if (this.cursors.up.isDown && !inDialog)
      {
          //  Move up
          this.player.body.velocity.y = -150;

          this.player.animations.play('up');
      }
      else if (this.cursors.down.isDown && !inDialog)
      {
          //  Move down
          this.player.body.velocity.y = 150;

          this.player.animations.play('down');
      }
      else
      {
          //  Stand still
          this.player.animations.stop();
      }

      if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (this.player.body.touching.up || this.player.body.touching.left || this.player.body.touching.right || this.player.body.touching.down)){
        this.showMessage();
      }
    },

    render: function(){
      // this.game.debug.body(player);
      // this.game.debug.body(map);
      // this.game.debug.body(layer);
      // this.game.debug.cameraInfo(game.camera, 32, 32);
      this.game.debug.spriteCoords(this.player, 32, 122);
    },

    showMessage: function(){
      inDialog = true;

      this.chatBox = this.game.add.image(50, 375, 'chatBox');
      this.chatBox.scale.setTo(1.5,1.5);
      this.chatBox.fixedToCamera = true;

      
    }
  };
