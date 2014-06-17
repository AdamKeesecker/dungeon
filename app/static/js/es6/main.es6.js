/* global Phaser */


(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    initPhaser();
  }

  var cursors;
  var player;
  var map;
  var layer;
  var game;

  function initPhaser(){
    game = new Phaser.Game(700, 500, Phaser.AUTO, 'game', {preload:preload, create:create, update:update, render:render});


    function preload(){
      game.load.tilemap('block', '/img/assets/tilemaps/blocks.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.image('pkmn', '/img/assets/tilemaps/pkmnTileset2.png');


      game.load.spritesheet('player1', '/img/assets/sprites/player/MainWarrior.png', 32, 34);
      game.load.image('map', '/img/assets/tilemaps/map.png');
      game.load.image('overlay', '/img/assets/tilemaps/mapOverlay.png');
      game.load.image('underbridge', '/img/assets/tilemaps/underbridge.png');
    }



    function create(){
      map = game.add.tilemap('block');
      map.enableBody = true;
      map.addTilesetImage('pkmn');
      map.setCollision(523, true);


      layer = map.createLayer('blocks');
      layer.enableBody = true;
      layer.immovable = true;



      game.physics.startSystem(Phaser.Physics.ARCADE);



      game.add.tileSprite(0, 0, 1600, 1600, 'map');
      player = game.add.sprite(340, 200, 'player1');
      game.add.tileSprite(0, 0, 1600, 1600, 'overlay');
      game.add.tileSprite(0, 0, 1600, 1600, 'underbridge');

      game.world.setBounds(0, 0, 1600, 1600);



      player.frame = 0;
      player.animations.add('down', [0, 1, 2], 10, true);
      player.animations.add('left', [3, 4, 5], 10, true);
      player.animations.add('right', [6, 7, 8], 10, true);
      player.animations.add('up', [9, 10, 11], 10, true);
      player.anchor.set(0.5);
      cursors = game.input.keyboard.createCursorKeys();




      game.camera.follow(player);

      game.physics.arcade.enable(player);
      game.physics.arcade.enable(layer);

    }

    function update(){

      //  Collision
      // game.physics.arcade.collide(block, player);
      game.physics.arcade.collide(layer, player);
      // game.physics.arcade.collide(walls, player);

      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;


      if (cursors.left.isDown)
      {
          //  Move to the left
          player.body.velocity.x = -150;
          player.animations.play('left');
      }
      else if (cursors.right.isDown)
      {
          //  Move to the right
          player.body.velocity.x = 150;
          player.animations.play('right');
      }
      else if (cursors.up.isDown)
      {
          //  Move up
          player.body.velocity.y = -150;

          player.animations.play('up');
      }
      else if (cursors.down.isDown)
      {
          //  Move down
          player.body.velocity.y = 150;

          player.animations.play('down');
      }
      else
      {
          //  Stand still
          player.animations.stop();
      }





    }

  function render(){
    // game.debug.body(player);
    // game.debug.body(map);
    // game.debug.body(layer);
    // game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.spriteCoords(player, 32, 122);
  }






  }
})();
