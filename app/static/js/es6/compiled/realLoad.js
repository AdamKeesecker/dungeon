'use strict';
var Game = {};
Game.realLoad = function() {
  this.game = game;
  this.asset = null;
  this.ready = false;
};
Game.realLoad.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
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
    this.game.load.image('healthP', '/img/assets/battle/healthbarPclean.png');
    this.game.load.image('healthE', '/img/assets/battle/healthbarEclean.png');
    this.game.load.image('1Dmg', '/img/assets/battle/1.png');
    this.game.load.image('2Dmg', '/img/assets/battle/2.png');
    this.game.load.image('3Dmg', '/img/assets/battle/3.png');
    this.game.load.image('4Dmg', '/img/assets/battle/4.png');
    this.game.load.image('5Dmg', '/img/assets/battle/5.png');
    this.game.load.image('6Dmg', '/img/assets/battle/6.png');
    this.game.load.image('7Dmg', '/img/assets/battle/7.png');
    this.game.load.image('8Dmg', '/img/assets/battle/8.png');
    this.game.load.image('9Dmg', '/img/assets/battle/9.png');
    this.game.load.image('10Dmg', '/img/assets/battle/10.png');
    this.game.load.image('bar', '/img/assets/battle/singleBar.png');
    this.game.load.image('defUp', '/img/assets/battle/defUp.png');
    this.game.load.image('longswordC', '/img/assets/battle/longSword.gif');
    this.game.load.image('masterswordC', '/img/assets/battle/masterSword.gif');
    this.game.load.image('giantswordC', '/img/assets/battle/sword.png');
    this.game.load.image('skull', '/img/assets/dead/skull.png');
    this.game.load.image('map1', '/img/assets/cave/Dungeon1.png');
    this.game.load.spritesheet('player1', '/img/assets/sprites/player/MainWarrior.png', 32, 34);
    this.game.load.tilemap('caveBlock', '/img/assets/cave/caveBlock.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('blocked', '/img/assets/tilemaps/logoStuff.png');
    this.game.load.spritesheet('enemy', '/img/assets/sprites/player/characters2.png', 32, 34);
    this.game.load.image('chest', '/img/assets/loot/closedChest.jpeg');
    this.game.load.image('gold', '/img/assets/loot/gold.png');
    this.game.load.image('loot', '/img/assets/loot/lootGained.png');
    this.game.load.image('xGold', '/img/assets/loot/xGold.png');
    this.game.load.spritesheet('number', '/img/assets/loot/numberSheet.png', 8, 8);
    this.game.load.image('menu', '/img/assets/tilemaps/menu.png');
    this.game.load.image('new', '/img/assets/tilemaps/newGame.png');
    this.game.load.image('load', '/img/assets/tilemaps/loadGame.png');
    this.game.load.tilemap('logo', '/img/assets/tilemaps/logo.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('logoStuff', '/img/assets/tilemaps/logoStuff.png');
  },
  update: function() {
    if (this.ready === true) {
      this.game.state.start('splash');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

//# sourceMappingURL=realLoad.map
