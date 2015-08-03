module.exports = {
  
  dev: 3000,
  production: 80,

  port: function(env){
    var port = this[env];
    return port || this.dev;
  }

}