var fs = require('fs');

var files = fs.readdirSync(__dirname + '/../../app/models');

var models = {};

files.forEach(function(file){
  if(file.slice(file.length-3) === '.js'){
    var modelName = file.replace(".js", "");
    models[modelName] = require(__dirname + '/../../app/models/' + file);
  }
})

module.exports = models;

