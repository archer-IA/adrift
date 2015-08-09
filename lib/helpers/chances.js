var config = require('../../config/config.js');

var chances = {
  rubbishChance: config.rubbishChance,

  doesNotGetRubbish: function(){
    return Math.random() > this.rubbishChance;
  }
}


module.exports = chances;

