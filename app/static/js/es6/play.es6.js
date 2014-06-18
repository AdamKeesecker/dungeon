/* global Phaser, Game */
'use strict';

  var cursors;
  var player;
  var map;
  var layer;
  var game;

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

      this.game.physics.arcade.enable(this.player);
      this.game.physics.arcade.enable(this.layer);
    },

    update: function(){

      //  Collision
      // game.physics.arcade.collide(block, player);
      this.game.physics.arcade.collide(this.layer, this.player);
      // game.physics.arcade.collide(walls, player);

      //  Reset the players velocity (movement)
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;


      if (this.cursors.left.isDown)
      {
          //  Move to the left
          this.player.body.velocity.x = -150;
          this.player.animations.play('left');
      }
      else if (this.cursors.right.isDown)
      {
          //  Move to the right
          this.player.body.velocity.x = 150;
          this.player.animations.play('right');
      }
      else if (this.cursors.up.isDown)
      {
          //  Move up
          this.player.body.velocity.y = -150;

          this.player.animations.play('up');
      }
      else if (this.cursors.down.isDown)
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
    },

    render: function(){
      // game.debug.body(player);
      // game.debug.body(map);
      // game.debug.body(layer);
      // game.debug.cameraInfo(game.camera, 32, 32);
      // game.debug.spriteCoords(player, 32, 122);
    }
  };
