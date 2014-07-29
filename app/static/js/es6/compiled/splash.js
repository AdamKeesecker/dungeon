'use strict';
var map;
Game.Splash = function() {
  this.game = game;
  this.counter = 0;
};
Game.Splash.prototype = {
  preload: function() {},
  create: function() {
    this.map = map;
    this.map = this.game.add.tilemap('logo');
    this.map.addTilesetImage('logoStuff');
    this.logo = this.map.createLayer('Logo');
    this.logo.scale.setTo(2, 2);
  },
  update: function() {
    this.counter += 5;
    if (this.counter > 0 && this.counter < 50) {
      this.counterCount1();
    }
    if (this.counter >= 50 && this.counter < 100) {
      this.counterCount2();
    }
    if (this.counter >= 100 && this.counter < 150) {
      this.counterCount3();
    }
    if (this.counter >= 150 && this.counter < 200) {
      this.counterCount4();
    }
    if (this.counter >= 200 && this.counter < 250) {
      this.counterCount5();
    }
    if (this.counter >= 250 && this.counter < 300) {
      this.counterCount1();
    }
    if (this.counter >= 300 && this.counter < 350) {
      this.counterCount2();
    }
    if (this.counter >= 350 && this.counter < 400) {
      this.counterCount3();
    }
    if (this.counter >= 400 && this.counter < 450) {
      this.counterCount4();
    }
    if (this.counter >= 450 && this.counter < 500) {
      this.counterCount5();
    }
    if (this.counter >= 500 && this.counter < 550) {
      this.counterCount1();
    }
    if (this.counter >= 550 && this.counter < 600) {
      this.counterCount2();
    }
    if (this.counter > 700) {
      this.game.state.start('load');
    }
  },
  counterCount1: function() {
    this.layer1 = this.map.createLayer('Noise');
    this.layer1.scale.setTo(2, 2);
    this.logo = this.map.createLayer('Logo');
    this.logo.scale.setTo(2, 2);
  },
  counterCount2: function() {
    this.layer2 = this.map.createLayer('Noise2');
    this.layer2.scale.setTo(2, 2);
    this.logo = this.map.createLayer('Logo');
    this.logo.scale.setTo(2, 2);
  },
  counterCount3: function() {
    this.layer3 = this.map.createLayer('Noise3');
    this.layer3.scale.setTo(2, 2);
    this.logo = this.map.createLayer('Logo');
    this.logo.scale.setTo(2, 2);
  },
  counterCount4: function() {
    this.layer4 = this.map.createLayer('Noise4');
    this.layer4.scale.setTo(2, 2);
    this.logo = this.map.createLayer('Logo');
    this.logo.scale.setTo(2, 2);
  },
  counterCount5: function() {
    this.layer5 = this.map.createLayer('Noise5');
    this.layer5.scale.setTo(2, 2);
    this.logo = this.map.createLayer('Logo');
    this.logo.scale.setTo(2, 2);
  }
};

//# sourceMappingURL=splash.map
