/* global Game, game, Phaser, user1 */
'use strict';

Game.FinishedCombat = function(){
  this.game = game;
};


Game.FinishedCombat.prototype = {
  preload: function(){
    // this.game.load.image('chest', '/img/assets/loot/closedChest.jpeg');
    // this.game.load.image('gold', '/img/assets/loot/gold.png');
    // this.game.load.image('loot', '/img/assets/loot/lootGained.png');
    // this.game.load.image('xGold', '/img/assets/loot/xGold.png');
    // this.game.load.spritesheet('number', '/img/assets/loot/numberSheet.png', 8, 8);
  },

  create: function(){
    this.chest = this.game.add.sprite(350, 100, 'chest');
    this.chest.anchor.setTo(0.5, 0.5);
    this.chest.scale.setTo(0.5, 0.5);
    this.gold = this.game.add.sprite(50, 200, 'gold');
    this.gold.scale.setTo(1.2, 1.2);

    this.lootText = this.game.add.sprite(400, 200, 'loot');
    this.lootText.scale.setTo(3, 3);
    this.goldText = this.game.add.sprite(425, 250, 'xGold');
    this.goldText.scale.setTo(2,2);

    this.startRoll();

    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.game.time.events.add(Phaser.Timer.SECOND * 3, this.stateChange, this);
    }
  },

  render: function(){
    this.game.debug.body(this.number);
  },

  slowYourRoll: function(){
    this.number.animations.stop('scroll', true);
    this.number.frame = 0;
    this.number2.animations.stop('scroll', true);
    this.number2.frame = this.game.rnd.integerInRange(5,9);
    user1.gold += this.number2.frame;
  },

  startRoll: function(){
    this.number = this.game.add.sprite(450, 250, 'number');
    this.number.scale.setTo(2,2);
    this.number.frame = 5;
    this.number.animations.add('scroll', [9,0,4,2,3,1,5,7,6,8]);
    this.number.animations.play('scroll', 30, true);

    this.number2 = this.game.add.sprite(465, 250, 'number');
    this.number2.scale.setTo(2,2);
    this.number2.frame = 6;
    this.number2.animations.add('scroll', [5,2,3,7,4,8,9,1,0,6]);
    this.number2.animations.play('scroll', 30, true);
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.slowYourRoll, this);
  },

  stateChange: function(){
    user1.dungeonBeat = true;
    this.game.state.start('play');
  }
};
