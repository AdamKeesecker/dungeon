/* global Game, game, Phaser, _, user1 */
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
  },

  create: function(){
    this.bg = this.game.add.sprite(-150, -120, 'bg');
    this.bg.scale.setTo(1.5, 1.5);

    this.selects = this.game.add.group();
    this.selects.create(245, 400, 'attack');
    this.selects.create(375, 400, 'defend');
    // this.selects.create(355, 400, 'magic');
    // this.selects.create(355, 450, 'potion');
    this.selects.setAll('scale.x', 2);
    this.selects.setAll('scale.y', 2);
    this.selects.visible = true;

    this.cursor = this.selects.create(230, 400, 'cursor');


    this.player = this.game.add.sprite(120, 245, 'player');
    this.cursors = this.game.input.keyboard.createCursorKeys();


    this.player.scale.setTo(1.5, 1.5);
    this.player.frame = 7;
    this.player.health = 10;
    this.player.defense = 0;

    this.enemy = this.game.add.sprite(545, 245, 'enemy');
    this.enemy.scale.setTo(1.5, 1.5);
    this.enemy.frame = 70;
    this.enemy.health = 10;

    this.enemyWeapon = this.game.add.sprite(550, 255, 'dagger');
    this.enemyWeapon.frame = 0;
    this.enemyWeapon.scale.setTo(2, 2);
    this.enemyWeapon.scale.x = -1.5;
    this.enemyWeapon.angle = 320;

    this.attackStop = _.debounce(this.attackPhase, 500);
    this.defendStop = _.debounce(this.defendPhase, 500);
    // this.magicStop = _.debounce(this.magicPhase, 200);
    // this.potionStop = _.debounce(this.usePotion, 200);

    this.turnSwap = _.debounce(this.flipTurn, 500);


    this.swings = this.game.add.group();
    this.swings.scale.set(0.5, 0.5);
    swings = this.swings;

    this.swings2 = this.game.add.group();
    this.swings2.scale.set(0.5, 0.5);
    swings2 = this.swings2;

    this.health = this.game.add.image(25, 25, 'healthP');
    this.health.scale.setTo(0.9, 1);
    this.healthE = this.game.add.image(475, 30, 'healthE');
    this.healthE.scale.setTo(0.9, 1);

    this.weaponCheck();


    this.healthBar = this.game.add.group();
    for(var i = 0; i < this.player.health; i++){
      var space = i * 15;
      this.healthBar.create(30 + space, 45, 'bar').scale.setTo(2,1);
    }
    this.healthBarEnemy = this.game.add.group();
    for(var j = 0; j < this.enemy.health; j++){
      var space2 = j * 15;
      this.healthBarEnemy.create(640 - space2, 48, 'bar').scale.setTo(2,1);
    }

    if(user1.dungeonBeat === true){
      firstCreate2 = true;
      attackAllowed = true;
      isEnemySwipe = false;
      firstCreate = true;
      myTurn = true;
      timer = 0;
      timer2 = 0;
    }
  },

  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && attackAllowed){
      if(this.cursor.position.x === 230 && this.cursor.position.y === 400){
        this.attackStop();
      }
      else if(this.cursor.position.x === 360 && this.cursor.position.y === 400){
        this.defendStop();
      }
      // else if(this.cursor.position.x === 340 && this.cursor.position.y === 400){
      //   //CHECK IF USER KNOWS MAGIC SPELLS
      //   //ELSE ('NO SPELLS')
      //   this.magicStop();
      // }
      // else if(this.cursor.position.x === 340 && this.cursor.position.y === 450){
      //   this.potionStop();
      // }
    }

    if(this.cursors.left.isDown && myTurn && this.cursor.position.x === 360){
      this.cursor.position.x = 230;
    }
    else if(this.cursors.right.isDown && myTurn && this.cursor.position.x === 230){
      this.cursor.position.x = 360;
    }
    // else if(this.cursors.down.isDown && myTurn && this.cursor.position.y === 400){
    //   this.cursor.position.y = 450;
    // }
    // else if(this.cursors.up.isDown && myTurn && this.cursor.position.y === 450){
    //   this.cursor.position.y = 400;
    // }

    this.checkDead();
  },

  render: function(){
    // this.game.debug.spriteCoords(this.cursor, 50, 50);
  },

  showTurn: function(){
    if(myTurn){
      if(this.turn){
        this.turn.destroy();
      }
      this.turn = this.game.add.sprite(350, 200, 'yourTurn');
      this.selects.visible = true;
    }
    else if(!myTurn && this.enemy.health > 0){
      if(this.turn){
        this.turn.destroy();
      }
      this.turn = this.game.add.sprite(350, 200, 'enemyTurn');
      this.selects.visible = false;
    }
    this.turn.scale.setTo(3,3);
    this.turn.anchor.setTo(0.5,0.5);
    this.game.add.tween(this.turn).to({alpha:1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.killTurnMessage, this.turn);
    if(!myTurn && this.enemy.health > 0){
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
    this.player.defense += 1;
    this.def = this.game.add.sprite(100, 200, 'defUp');
    this.def.scale.setTo(2,2);
    this.game.add.tween(this.def).to({y: 100}, 3000, Phaser.Easing.Cubic.Out, true);
    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.flipTurn, this);
  },

  // magicPhase: function(){

    // myTurn = !myTurn;
  // },

  // usePotion: function(){

    // myTurn = !myTurn;
  // },

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
    if(this.enemy.health > 0){
      isEnemySwipe = true;
      timer2 = 0;
      this.timer2 = setInterval(this.enemySwipe, 100);
      this.dealDamage();
      this.game.time.events.add(Phaser.Timer.SECOND * 1, this.clearTimer, this);
      this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.killSwing, this.swing6);
      this.game.time.events.add(Phaser.Timer.SECOND * 1, this.flipTurn, this);
    }
  },

  clearTimer: function () {
    clearInterval(this.timer);
    clearInterval(this.timer2);
  },

  allowAttack: function(){
    attackAllowed = true;
  },

  dealDamage: function(){
    var number;
    if(myTurn){
        if(user1.weapon === 'stick'){
          this.weapon.damage = this.game.rnd.integerInRange(1, 5);
        }
        else if(user1.weapon === 'longsword'){
          this.weapon.damage = this.game.rnd.integerInRange(2, 7);
        }
        else if(user1.weapon === 'mastersword'){
          this.weapon.damage = this.game.rnd.integerInRange(3, 8);
        }
        else if(user1.weapon === 'giantsword'){
          this.weapon.damage = this.game.rnd.integerInRange(5, 10);
        }
      number = this.weapon.damage.toString();
      this.dmg = this.game.add.image(550, 150, number +'Dmg');
      this.dmg.scale.setTo(2, 2);
      this.enemy.health -= number;
      this.game.time.events.add(Phaser.Timer.SECOND * 1, this.killNum, this);
      this.updateHealthBars();
    }
    else if(!myTurn){
      this.enemy.weaponDmg = this.game.rnd.integerInRange(1,3);
      number = this.enemy.weaponDmg.toString();
      var realDmgE = number - this.player.defense;
      if(realDmgE < 1){
        realDmgE = 1;
      }
      this.dmg = this.game.add.image(120, 150, realDmgE +'Dmg');
      this.dmg.scale.setTo(2, 2);
      this.player.health -= realDmgE;
      this.game.time.events.add(Phaser.Timer.SECOND * 1, this.killNum, this);
      this.updateHealthBars();
    }
  },

  weaponCheck: function(){
    if(user1){
      console.log(user1);
      if(user1.weapon === 'stick'){
        this.weapon = this.game.add.sprite(135, 250, 'stick');
        this.weapon.scale.setTo(0.2, 0.2);
      }
      else if(user1.weapon === 'longsword'){
        this.weapon = this.game.add.sprite(120, 240, 'longswordC');
        this.weapon.scale.setTo(0.3, 0.3);
      }
      else if(user1.weapon === 'mastersword'){
        this.weapon = this.game.add.sprite(150, 250, 'masterswordC');
        this.weapon.scale.setTo(0.3, 0.3);
        this.weapon.angle = 15;
      }
      else if(user1.weapon === 'giantsword'){
        this.weapon = this.game.add.sprite(145, 250, 'giantswordC');
        this.weapon.scale.setTo(0.2, 0.2);
      }
    }
  },

  killNum: function(){
    this.dmg.destroy();
  },

  updateHealthBars: function(){
    if(!myTurn){
      this.healthBar.destroy();
      this.healthBar = this.game.add.group();
      for(var i = 0; i < this.player.health; i++){
        var space = i * 15;
        this.healthBar.create(30 + space, 45, 'bar').scale.setTo(2,1);
      }
    }
    if(myTurn){
      this.healthBarEnemy.destroy();
      this.healthBarEnemy = this.game.add.group();
      for(var j = 0; j < this.enemy.health; j++){
        var space2 = j * 15;
        this.healthBarEnemy.create(640 - space2, 48, 'bar').scale.setTo(2,1);
      }
    }
  },

  checkDead: function(){
    if(this.player.health < 1){
      this.game.state.start('dead');
    }
    if(this.enemy.health < 1){
      this.game.time.events.add(Phaser.Timer.SECOND * 3, this.startLoot, this);
    }
  },

  startLoot: function(){
    this.game.state.start('finishedCombat');
  }
};
