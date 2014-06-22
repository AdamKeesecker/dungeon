/* global Game, game, Phaser, _ */
'use strict';

Game.Combat = function(){
  this.game = game;
};

var myTurn = true;
var isEnemySwipe = false;
var firstCreate = true;
var firstCreate2 = true;
var attackAllowed = true;
var timer = 0;
var timer2 = 0;
var swings;
var swings2;
var swing1, swing2, swing3, swing4, swing5, swing6;

Game.Combat.prototype = {
  preload: function(){
    this.game.load.image('bg', '/img/assets/battle/emptyBattle.png');
    this.game.load.spritesheet('player', '/img/assets/sprites/player/MainWarrior.png', 32, 34);
    this.game.load.spritesheet('enemy', '/img/assets/sprites/player/characters2.png', 32, 34);
    this.game.load.spritesheet('dagger', '/img/assets/battle/attackSheet.png', 16, 32);
    this.game.load.image('stick', '/img/assets/battle/stick.gif');
    this.game.load.image('attack', '/img/assets/battle/attack.png');
    this.game.load.image('defend', '/img/assets/battle/defend.png');
    this.game.load.image('magic', '/img/assets/battle/magic.png');
    this.game.load.image('potion', '/img/assets/battle/potion.png');
    this.game.load.image('enemyTurn', '/img/assets/battle/enemyTurn.png');
    this.game.load.image('yourTurn', '/img/assets/battle/yourTurn.png');
    this.game.load.image('cursor', '/img/assets/battle/arrow.png');
    this.game.load.image('swing1', '/img/assets/battle/swipe1.png');
    this.game.load.image('swing2', '/img/assets/battle/swing2.png');
    this.game.load.image('swing3', '/img/assets/battle/swipe3.png');
    this.game.load.image('swing4', '/img/assets/battle/swipe1.png');
    this.game.load.image('swing5', '/img/assets/battle/swing2.png');
    this.game.load.image('swing6', '/img/assets/battle/swipe3.png');
  },

  create: function(){
    this.bg = this.game.add.sprite(-150, -120, 'bg');
    this.bg.scale.setTo(1.5, 1.5);

    this.selects = this.game.add.group();
    this.selects.create(225, 400, 'attack');
    this.selects.create(225, 450, 'defend');
    this.selects.create(355, 400, 'magic');
    this.selects.create(355, 450, 'potion');
    this.selects.setAll('scale.x', 2);
    this.selects.setAll('scale.y', 2);
    this.selects.visible = true;

    this.cursor = this.selects.create(210, 400, 'cursor');

    this.player = this.game.add.sprite(120, 245, 'player');
    this.player.scale.setTo(1.5, 1.5);
    this.player.frame = 7;

    this.myWeapon = this.game.add.sprite(122, 242, 'stick');
    this.myWeapon.scale.setTo(0.3,0.3);


    this.enemy = this.game.add.sprite(545, 245, 'enemy');
    this.enemy.scale.setTo(1.5, 1.5);
    this.enemy.frame = 70;

    this.enemyWeapon = this.game.add.sprite(550, 255, 'dagger');
    this.enemyWeapon.frame = 0;
    this.enemyWeapon.scale.setTo(2, 2);
    this.enemyWeapon.scale.x = -1.5;
    this.enemyWeapon.angle = 320;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.attackStop = _.debounce(this.attackPhase, 200);
    this.defendStop = _.debounce(this.defendPhase, 200);
    this.magicStop = _.debounce(this.magicPhase, 200);
    this.potionStop = _.debounce(this.usePotion, 200);

    this.turnSwap = _.debounce(this.flipTurn, 200);


    this.swings = this.game.add.group();
    this.swings.scale.set(0.5, 0.5);
    swings = this.swings;

    this.swings2 = this.game.add.group();
    this.swings2.scale.set(0.5, 0.5);
    swings2 = this.swings2;
  },

  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && attackAllowed){
      if(this.cursor.position.x === 210 && this.cursor.position.y === 400){
        this.attackStop();
      }
      else if(this.cursor.position.x === 210 && this.cursor.position.y === 450){
        this.defendStop();
      }
      else if(this.cursor.position.x === 340 && this.cursor.position.y === 400){
        //CHECK IF USER KNOWS MAGIC SPELLS
        //ELSE ('NO SPELLS')
        this.magicStop();
      }
      else if(this.cursor.position.x === 340 && this.cursor.position.y === 450){
        this.potionStop();
      }
    }

    if(this.cursors.left.isDown && myTurn && this.cursor.position.x === 340){
      this.cursor.position.x = 210;
    }
    else if(this.cursors.right.isDown && myTurn && this.cursor.position.x === 210){
      this.cursor.position.x = 340;
    }
    else if(this.cursors.down.isDown && myTurn && this.cursor.position.y === 400){
      this.cursor.position.y = 450;
    }
    else if(this.cursors.up.isDown && myTurn && this.cursor.position.y === 450){
      this.cursor.position.y = 400;
    }
  },

  render: function(){
    // this.game.debug.spriteCoords(this.cursor, 50, 50);
  },

  showTurn: function(){
    if(myTurn){
      if(this.turn){
        this.turn.destroy();
      }
      this.turn = this.game.add.sprite(this.game.world.centerX, 200, 'yourTurn');
      this.selects.visible = true;
    }
    else if(!myTurn){
      if(this.turn){
        this.turn.destroy();
      }
      this.turn = this.game.add.sprite(this.game.world.centerX, 200, 'enemyTurn');
      this.selects.visible = false;
    }
    this.turn.scale.setTo(3,3);
    this.turn.anchor.setTo(0.5,0.5);
    // this.turn.alpha = 0;
    this.game.add.tween(this.turn).to({alpha:1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.killTurnMessage, this.turn);
    if(!myTurn){
      this.enemyPhase();
    }
    if(myTurn){
      this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.allowAttack, this);
    }
  },

  killTurnMessage: function(){
    this.destroy();
  },

  attackPhase: function(){
    attackAllowed = false;
    timer = 0;
    isEnemySwipe = false;
    this.selects.visible = false;
    this.timer = setInterval(this.swipeTimer, 100);
    this.timer = timer;
    this.dealDamage();
    this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.killSwing, this.swing3);
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.flipTurn, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.clearTimer, this);
  },

  defendPhase: function(){

    myTurn = !myTurn;
  },

  magicPhase: function(){

    myTurn = !myTurn;
  },

  usePotion: function(){

    myTurn = !myTurn;
  },

  killSwing: function(){
    if(isEnemySwipe){
      swing6.kill();
    }
    if(!isEnemySwipe){
      swing3.kill();
    }

  },

  swipeTimer: function(){
    this.swings = swings;
    this.timer = timer;
    timer++;
    if(!firstCreate){
      if(timer === 1){
        this.swing1.revive();
        swing1 = this.swing1;
      }
      else if(timer === 2){
        this.swing1.kill();
        this.swing2.revive();
        swing2 = this.swing2;
      }
      else if(timer === 3){
        this.swing2.kill();
        this.swing3.revive();
        swing3 = this.swing3;
      }
    }
    if(firstCreate){
      if(timer === 1){
        this.swing1 = this.swings.create(275, 410, 'swing1');
        swing1 = this.swing1;
      }
      else if(timer === 2){
        this.swing1.kill();
        this.swing2 = this.swings.create(275, 410, 'swing2');
        swing2 = this.swing2;
      }
      else if(timer === 3){
        this.swing2.kill();
        this.swing3 = this.swings.create(265, 410, 'swing3');
        swing3 = this.swing3;
        firstCreate = false;
      }
    }
  },

  enemySwipe: function(){
    this.swings2 = swings2;
    this.timer2 = timer2;
    timer2++;
    if(!firstCreate2){
      if(timer2 === 1){
        this.swing4.revive();
        this.swing4.scale.x = -1;
        swing4 = this.swing4;
      }
      else if(timer2 === 2){
        this.swing4.kill();
        this.swing5.revive();
        this.swing5.scale.x = -1;
        swing5 = this.swing5;
      }
      else if(timer2 === 3){
        this.swing5.kill();
        this.swing6.revive();
        this.swing6.scale.x = -1;
        swing6 = this.swing6;
      }
    }
    if(firstCreate2){
      console.log('happen once');
      if(timer2 === 1){
        this.swing4 = this.swings2.create(1175, 410, 'swing4');
        this.swing4.scale.x = -1;
        swing4 = this.swing4;
      }
      else if(timer2 === 2){
        this.swing4.kill();
        this.swing5 = this.swings2.create(1175, 410, 'swing5');
        this.swing5.scale.x = -1;
        swing5 = this.swing5;
      }
      else if(timer2 === 3){
        this.swing5.kill();
        this.swing6 = this.swings2.create(1165, 410, 'swing6');
        this.swing6.scale.x = -1;
        swing6 = this.swing6;
        firstCreate2 = false;
      }
    }
  },

  flipTurn: function(){
    myTurn = !myTurn;
    this.showTurn();
  },

  enemyPhase: function(){
    isEnemySwipe = true;
    timer2 = 0;
    this.timer2 = setInterval(this.enemySwipe, 100);
    this.dealDamage();
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.clearTimer, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.killSwing, this.swing6);
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.flipTurn, this);
  },

  clearTimer: function () {
    clearInterval(this.timer);
    clearInterval(this.timer2);
  },

  allowAttack: function(){
    attackAllowed = true;
  },

  dealDamage: function(){
    if(myTurn){
      console.log('-');
    }
  }
};


/*
  hp & hp bars at top    pokemon? FF?
  show HP loss in red above whoever lost hp
  show player loss



*/