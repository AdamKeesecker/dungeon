/* global Phaser, Game, game, user1, _ */
'use strict';

var map;
var layer;
var inDialog= false;
var transitionTimer = 0;

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

    this.game.load.spritesheet('shopKeep', '/img/assets/sprites/player/Characters4.png', 32, 34);

    this.game.load.image('longsword', '/img/assets/battle/longSword.gif');
    this.game.load.image('mastersword', '/img/assets/battle/masterSword.gif');
    this.game.load.image('giantsword', '/img/assets/battle/sword.png');

    this.game.load.image('weaponArrow', '/img/assets/battle/arrow.png');

    this.game.load.image('5', '/img/assets/shop/5g.png');
    this.game.load.image('10', '/img/assets/shop/10g.png');
    this.game.load.image('15', '/img/assets/shop/15g.png');

    this.game.load.image('bag', '/img/assets/shop/goldBag.png');

    this.game.load.image('0', '/img/assets/shop/00.png');
    this.game.load.image('1', '/img/assets/shop/01.png');
    this.game.load.image('2', '/img/assets/shop/02.png');
    this.game.load.image('3', '/img/assets/shop/03.png');
    this.game.load.image('4', '/img/assets/shop/04.png');
    this.game.load.image('5', '/img/assets/shop/05.png');
    this.game.load.image('6', '/img/assets/shop/06.png');
    this.game.load.image('7', '/img/assets/shop/07.png');
    this.game.load.image('8', '/img/assets/shop/08.png');
    this.game.load.image('9', '/img/assets/shop/09.png');
    this.game.load.image('10', '/img/assets/shop/10.png');
    this.game.load.image('11', '/img/assets/shop/11.png');
    this.game.load.image('12', '/img/assets/shop/12.png');
    this.game.load.image('13', '/img/assets/shop/13.png');
    this.game.load.image('14', '/img/assets/shop/14.png');
    this.game.load.image('15', '/img/assets/shop/15.png');
    this.game.load.image('16', '/img/assets/shop/16.png');
    this.game.load.image('17', '/img/assets/shop/17.png');
    this.game.load.image('18', '/img/assets/shop/18.png');
    this.game.load.image('19', '/img/assets/shop/19.png');
    this.game.load.image('20', '/img/assets/shop/20.png');
  },

  create: function(){
    // -----------------------------------------------------------------------------------------------------------
    //REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE
    // user1.dungeonBeat = true;
    // user1.gold = 100;
    //REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE
    // -----------------------------------------------------------------------------------------------------------

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

    this.game.add.tileSprite(0, 0, 1660, 1040, 'map');
    this.game.add.tileSprite(0, 0, 1660, 1040, 'underbridge');

    if(user1.dungeonBeat){
      inDialog = false;
      transitionTimer = 0;
      this.cursors2 = this.game.input.keyboard.createCursorKeys();
      this.cursors = this.cursors2;
      this.player3 = this.game.add.sprite(1325, 750, 'player1');
      this.player = this.player3;
      this.player.frame = 0;
      this.game.add.tileSprite(0, 0, 1600, 1600, 'overlay');
      this.shopKeep = this.game.add.sprite(410, 750, 'shopKeep');
      this.game.physics.arcade.enable(this.shopKeep);
      this.shopKeep.body.immovable = true;

      this.price5 = this.game.add.sprite(385, 715, '5');
      this.price10 = this.game.add.sprite(425, 715, '10');
      this.price15 = this.game.add.sprite(475, 715, '15');

      this.longSword = this.game.add.sprite(345, 650, 'longsword');
      this.longSword.scale.setTo(0.4, 0.4);
      this.masterSword = this.game.add.sprite(425, 670, 'mastersword');
      this.masterSword.scale.setTo(0.3, 0.3);
      this.giantSword = this.game.add.sprite(475, 675, 'giantsword');
      this.giantSword.scale.setTo(0.2, 0.2);
    }
    else{
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.player = this.game.add.sprite(340, 200, 'player1');
      this.game.add.tileSprite(0, 0, 1600, 1600, 'overlay');
    }



    this.game.world.setBounds(0, 0, 1600, 1600);

    this.player.frame = 0;
    this.player.animations.add('down', [0, 1, 2], 10, true);
    this.player.animations.add('left', [3, 4, 5], 10, true);
    this.player.animations.add('right', [6, 7, 8], 10, true);
    this.player.animations.add('up', [9, 10, 11], 10, true);
    this.player.anchor.set(0.5, 0.5);


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

    this.chatBox = this.game.add.image(50, 375, 'chatBox');
    this.chatBox.scale.setTo(1.5,1.5);
    this.chatBox.fixedToCamera = true;
    this.chatBox.visible = false;

    this.text = this.game.add.text(70, 400);
    this.text.visible = false;
    this.text.scale.setTo(0.5, 0.5);
    this.text.fixedToCamera = true;

    this.inShop = true;

    this.weaponArrow = this.game.add.sprite(415, 650, 'weaponArrow');
    this.weaponArrow.visible = false;
    this.weaponArrow.scale.setTo(1.5,1.5);
    this.weaponArrow.angle = 90;

    this.leftGoRight  = _.debounce(this.leftRight, 250);
    this.rightGoLeft  = _.debounce(this.rightLeft, 250);
    this.buySomething = _.debounce(this.priceCheck, 250);

    this.goldCheck();

    if(user1.dungeonBeat === true){
      this.transitionTimer = 0;
    }
  },

  update: function(){
    //  Collision
    this.game.physics.arcade.collide(this.layer, this.player);
    this.game.physics.arcade.collide(this.guard, this.player);
    this.game.physics.arcade.collide(this.guard2, this.player);
    this.game.physics.arcade.collide(this.shopKeep, this.player);

    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;


    if (this.cursors.left.isDown && !inDialog){
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

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.X) && inDialog === true){
      this.killMessage();
    }

    if(this.player.position.x > 1310 && this.player.position.x < 1330 && this.player.position.y > 670 && this.player.position.y < 680){
      inDialog=true;
      transitionTimer++;

      if(transitionTimer === 1){
        this.t1 = this.game.add.sprite(0, 0, 'tran1');
        this.t1.fixedToCamera = true;
      }
      else if(transitionTimer === 6){
        this.t2 = this.game.add.sprite(0, 0, 'tran2');
        this.t2.fixedToCamera = true;
      }
      else if(transitionTimer === 12){
        this.t3 = this.game.add.sprite(0, 0, 'tran3');
        this.t3.fixedToCamera = true;
      }
      else if(transitionTimer === 18){
        this.t4 = this.game.add.sprite(0, 0, 'tran4');
        this.t4.fixedToCamera = true;
      }
      else if(transitionTimer === 24){
        this.t5 = this.game.add.sprite(0, 0, 'tran5');
        this.t5.fixedToCamera = true;
      }
      else if(transitionTimer === 30){
        this.t6 = this.game.add.sprite(0, 0, 'tran6');
        this.t6.fixedToCamera = true;
      }
      else if(transitionTimer === 36){
        this.t7 = this.game.add.sprite(0, 0, 'tran7');
        this.t7.fixedToCamera = true;
      }
      else if(transitionTimer === 42){
        this.t8 = this.game.add.sprite(0, 0, 'tran8');
        this.t8.fixedToCamera = true;
      }
      else if(transitionTimer === 48){
        this.t9 = this.game.add.sprite(0, 0, 'tran9');
        this.t9.fixedToCamera = true;
      }
      else if(transitionTimer === 54){
        this.t10 = this.game.add.sprite(0, 0, 'tran10');
        this.t10.fixedToCamera = true;
      }
      else if(transitionTimer === 60){
        this.t11 = this.game.add.sprite(0, 0, 'tran11');
        this.t11.fixedToCamera = true;
      }
      else if(transitionTimer === 66){
        this.t12 = this.game.add.sprite(0, 0, 'tran12');
        this.t12.fixedToCamera = true;
      }
      else if(transitionTimer === 72){
        this.t13 = this.game.add.sprite(0, 0, 'tran13');
        this.t13.fixedToCamera = true;
      }
      else if(transitionTimer === 80){
        this.game.state.start('dungeon');
      }
    }
    if(inDialog && this.cursors.right.isDown  && this.inShop){
      this.leftGoRight();
    }
    else if(inDialog && this.cursors.left.isDown && this.inShop){
      this.rightGoLeft();
    }

    if(inDialog && this.inShop && this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
      this.buySomething();
    }
  },

  render: function(){
    // this.game.debug.body(this.player);
    // this.game.debug.body(map);
    // this.game.debug.body(layer);
    // this.game.debug.cameraInfo(game.camera, 32, 32);
    // this.game.debug.spriteCoords(this.player, 32, 32);
    // this.game.debug.spriteCoords(this.t1);
  },

  showMessage: function(){
    inDialog = true;
    this.chatBox.visible = true;
    if(this.player.position.x > 395 && this.player.position.x < 434 && this.player.position.y > 540 && this.player.position.y < 580){
      this.text.setText('This is the great plaza. We have fought hard to keep it safe from bandits. Just for you! \n(Press X to close)');
    }
    else if(this.player.position.x > 1180 && this.player.position.x < 1230 && this.player.position.y > 590 && this.player.position.y < 635){
      this.text.setText('Careful! I heard a bandit ran into this dungeon. Make sure you are prepared for combat!');
    }
    else{
      this.inShop = true;
      this.text.setText('Hey! I just set up shop here!\nBuy some weapons! Seriously... You are like the ONLY adventurer here...\n(Press Left or Right to choose. Enter to Buy!)');
      this.weaponArrow.visible = true;
    }

    this.text.visible = true;
  },

  killMessage: function(){
    inDialog = false;
    this.goldCheck();
    this.chatBox.visible = false;
    this.text.visible = false;
    this.weaponArrow.visible = false;
  },

  leftRight: function(){
    if(this.weaponArrow.position.x === 415){
      this.weaponArrow.position.x = 460;
    }
    else if(this.weaponArrow.position.x === 460){
      this.weaponArrow.position.x = 510;
    }
    else if(this.weaponArrow.position.x === 510){
      this.weaponArrow.position.x = 415;
    }
  },

  rightLeft: function(){
    if(this.weaponArrow.position.x === 510){
      this.weaponArrow.position.x = 460;
    }
    else if(this.weaponArrow.position.x === 460){
      this.weaponArrow.position.x = 415;
    }
    else if(this.weaponArrow.position.x === 415){
      this.weaponArrow.position.x = 510;
    }
  },

  priceCheck: function(){
    if(this.weaponArrow.position.x === 415){
      if(user1.gold > 4){
        user1.weapon = 'longsword';
        user1.gold -= 5;
        this.text.setText('Thanks... Now I can afford to go to college...');
        this.currentGold.destroy();
      }
      else{
        this.text.setText('Not enough cash stranger...');
      }
    }
    else if(this.weaponArrow.position.x === 460){
      if(user1.gold > 9){
        user1.weapon = 'mastersword';
        user1.gold -= 10;
        this.text.setText('Woo! Ill take your gold now...');
        this.currentGold.destroy();
      }
      else{
        this.text.setText(`You only have ${user1.gold} gold!`);
      }
    }
    else if(this.weaponArrow.position.x === 510){
      if(user1.gold > 14){
        user1.weapon = 'giantsword';
        user1.gold -= 15;
        this.text.setText('Awww yeah! Go get em :)');
        this.currentGold.destroy();
      }
      else{
        this.text.setText(`${user1.gold} gold? Sheesh....`);
      }
    }
    this.goldCheck();
  },

  goldCheck: function(){
    if(user1.gold > -1){
      this.gold = this.game.add.sprite(600, 450, 'bag');
      this.gold.fixedToCamera = true;
      this.gold.scale.setTo(0.2, 0.2);

      var goldNumber = user1.gold;
      this.currentGold = this.game.add.sprite(650, 465, goldNumber.toString());
      this.currentGold.scale.setTo(2.3, 2.5);
      this.currentGold.fixedToCamera = true;
    }
  }
};
