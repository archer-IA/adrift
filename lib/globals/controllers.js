var fs = require('fs');

var files = fs.readdirSync(__dirname + '/../../app/controllers');

var controllers = {};

files.forEach(function(file){
  var controllerName = file.replace(".js", "");
  controllers[controllerName] = require(__dirname + '/../../app/controllers/' + file);
})

console.log(controllers);

module.exports = controllers;