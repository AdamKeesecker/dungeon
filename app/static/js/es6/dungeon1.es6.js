/* global Game, game, Phaser */
'use strict';

Game.Dungeon = function(){
  this.game = game;
};

var inCombat = false;

Game.Dungeon.prototype={
  preload: function(){
    this.game.load.image('map1', '/img/assets/cave/Dungeon1.png');
    // this.game.load.spritesheet('player1', '/img/assets/sprites/player/MainWarrior.png', 32, 34);

    this.game.load.tilemap('caveBlock', '/img/assets/cave/caveBlock.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('blocked', '/img/assets/tilemaps/logoStuff.png');

    this.game.load.spritesheet('enemy', '/img/assets/sprites/player/characters2.png', 32, 34);

    // this.game.load.image('tran1', '/img/assets/transitions/transition1.png');
    // this.game.load.image('tran2', '/img/assets/transitions/transition2.png');
    // this.game.load.image('tran3', '/img/assets/transitions/transition3.png');
    // this.game.load.image('tran4', '/img/assets/transitions/transition4.png');
    // this.game.load.image('tran5', '/img/assets/transitions/transition5.png');
    // this.game.load.image('tran6', '/img/assets/transitions/transition6.png');
    // this.game.load.image('tran7', '/img/assets/transitions/transition7.png');
    // this.game.load.image('tran8', '/img/assets/transitions/transition8.png');
    // this.game.load.image('tran9', '/img/assets/transitions/transition9.png');
    // this.game.load.image('tran10', '/img/assets/transitions/transition10.png');
    // this.game.load.image('tran11', '/img/assets/transitions/transition11.png');
    // this.game.load.image('tran12', '/img/assets/transitions/transition12.png');
    // this.game.load.image('tran13', '/img/assets/transitions/transition13.png');
  },

  create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.map = this.game.add.tilemap('caveBlock');
    this.map.enableBody = true;
    this.map.addTilesetImage('blocked');
    this.map.setCollisionBetween(15, 16);

    this.layer = this.map.createLayer('Tile Layer 1');
    this.game.physics.arcade.enable(this.layer);
    this.layer.enableBody = true;
    this.layer.immovable = true;


    this.game.add.tileSprite(0, 0, 1200, 1200, 'map1');
    this.game.world.setBounds(0, 0, 1600, 1600);

    this.player = this.game.add.sprite(337, 75, 'player1');
    this.player.animations.add('down', [0, 1, 2], 10, true);
    this.player.animations.add('left', [3, 4, 5], 10, true);
    this.player.animations.add('right', [6, 7, 8], 10, true);
    this.player.animations.add('up', [9, 10, 11], 10, true);
    this.player.enableBody = true;
    this.player.anchor.set(0.5, 0.5);
    this.player.frame = 0;


    this.game.physics.arcade.enable(this.player);

    this.game.camera.follow(this.player);

    this.enemy1 = this.game.add.sprite(360, 440, 'enemy');
    this.game.physics.arcade.enable(this.enemy1);
    this.enemy1.enableBody = true;
    this.enemy1.frame = 58;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.inDialog = false;

    this.transitionTimer = 0;
    this.hasReset = false;
  },

  update: function(){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if(this.cursors.left.isDown && !this.inDialog){
      //  Move to the left
      this.player.body.velocity.x = -150;

      this.player.animations.play('left');
    }
    else if(this.cursors.right.isDown && !this.inDialog){
      //  Move to the right
      this.player.body.velocity.x = 150;

      this.player.animations.play('right');
    }
    else if(this.cursors.up.isDown && !this.inDialog){
      //  Move up
      this.player.body.velocity.y = -150;

      this.player.animations.play('up');
    }
    else if(this.cursors.down.isDown && !this.inDialog){
      //  Move down
      this.player.body.velocity.y = 150;

      this.player.animations.play('down');
    }
    else{
      //  Stand still
      this.player.animations.stop();
    }



    if(this.player.position.x - this.enemy1.position.x > 0){
      // player to the right of enemy

      if(this.player.position.y - this.enemy1.position.y > 0){
        //player to the bottom right of enemy
        if((this.player.position.x - this.enemy1.position.x < 100) && (this.player.position.y - this.enemy1.position.y < 100)){
          //player within 100px bottom right
          this.game.physics.arcade.moveToObject(this.enemy1, this.player, 100);
        }
        else{
          this.enemy1.body.speed = 0;
          this.enemy1.body.velocity.x = 0;
          this.enemy1.body.velocity.y = 0;
        }
      }

      else if(this.enemy1.position.y - this.player.position.y > 0){
        //player to the top right of enemy
        if((this.player.position.x - this.enemy1.position.x < 100) && (this.enemy1.position.y - this.player.position.y < 100)){
          //player within 100px top right
          this.game.physics.arcade.moveToObject(this.enemy1, this.player, 100);
        }
        else{
          this.enemy1.body.speed = 0;
          this.enemy1.body.velocity.x = 0;
          this.enemy1.body.velocity.y = 0;
        }
      }
    }


    else if(this.enemy1.position.x - this.player.position.x > 0){
      //player to the left of enemy

      if(this.player.position.y - this.enemy1.position.y > 0){
        //player to the bottom left of enemy
        if((this.enemy1.position.x - this.player.position.x < 100) && (this.player.position.y - this.enemy1.position.y < 100)){
          //player within 100px bottom left
          this.game.physics.arcade.moveToObject(this.enemy1, this.player, 100);
        }
        else{
          this.enemy1.body.speed = 0;
          this.enemy1.body.velocity.x = 0;
          this.enemy1.body.velocity.y = 0;
        }
      }
      else if(this.enemy1.position.y - this.player.position.y > 0){
        //player to the top left of enemy
        if((this.enemy1.position.x - this.player.position.x < 100) && (this.enemy1.position.y - this.player.position.y < 100)){
          //player within 100 px top left
          this.game.physics.arcade.moveToObject(this.enemy1, this.player, 100);
        }
        else{
          this.enemy1.body.speed = 0;
          this.enemy1.body.velocity.x = 0;
          this.enemy1.body.velocity.y = 0;
        }
      }
    }




    this.game.physics.arcade.collide(this.enemy1, this.layer);
    this.game.physics.arcade.collide(this.player, this.layer);
    this.game.physics.arcade.collide(this.player, this.enemy1, this.combat, null, this);






    if(inCombat){
      this.transitionTimer += 1;
    }

  },

  render: function(){
    // this.game.debug.body(this.enemy1);
    // this.game.debug.body(this.player);
    // this.game.debug.spriteCoords(this.player, 32, 32);
    // this.game.debug.spriteCoords(this.enemy1, 32, 94);
  },

  combat: function(){
    if(!this.hasReset){
      this.transitionTimer = 0;
      this.hasReset = true;
    }
    this.inDialog = true;
    inCombat = true;
    this.player.immovable = true;
    this.enemy1.immovable = true;

    if(this.transitionTimer < 1){
      this.t1 = this.game.add.sprite(0, 0, 'tran1');
      this.t1.fixedToCamera = true;
    }
    else if(this.transitionTimer < 6){
      this.t2 = this.game.add.sprite(0, 0, 'tran2');
      this.t2.fixedToCamera = true;
    }
    else if(this.transitionTimer < 12){
      this.t3 = this.game.add.sprite(0, 0, 'tran3');
      this.t3.fixedToCamera = true;
    }
    else if(this.transitionTimer < 18){
      this.t4 = this.game.add.sprite(0, 0, 'tran4');
      this.t4.fixedToCamera = true;
    }
    else if(this.transitionTimer < 24){
      this.t5 = this.game.add.sprite(0, 0, 'tran5');
      this.t5.fixedToCamera = true;
    }
    else if(this.transitionTimer < 30){
      this.t6 = this.game.add.sprite(0, 0, 'tran6');
      this.t6.fixedToCamera = true;
    }
    else if(this.transitionTimer < 36){
      this.t7 = this.game.add.sprite(0, 0, 'tran7');
      this.t7.fixedToCamera = true;
    }
    else if(this.transitionTimer < 42){
      this.t8 = this.game.add.sprite(0, 0, 'tran8');
      this.t8.fixedToCamera = true;
    }
    else if(this.transitionTimer < 48){
      this.t9 = this.game.add.sprite(0, 0, 'tran9');
      this.t9.fixedToCamera = true;
    }
    else if(this.transitionTimer < 54){
      this.t10 = this.game.add.sprite(0, 0, 'tran10');
      this.t10.fixedToCamera = true;
    }
    else if(this.transitionTimer < 60){
      this.t11 = this.game.add.sprite(0, 0, 'tran11');
      this.t11.fixedToCamera = true;
    }
    else if(this.transitionTimer < 66){
      this.t12 = this.game.add.sprite(0, 0, 'tran12');
      this.t12.fixedToCamera = true;
    }
    else if(this.transitionTimer < 72){
      this.t13 = this.game.add.sprite(0, 0, 'tran13');
      this.t13.fixedToCamera = true;
    }
    else if(this.transitionTimer < 80){
      this.game.state.start('combat');
    }
  }
};
