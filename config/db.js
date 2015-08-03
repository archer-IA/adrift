module.exports = {

  dev: 'adrift_dev',
  production: 'adrift_production',
  
  URI: function(env){
    var db = this[env] || this.dev;
    return "mongodb://localhost/" + db;
  }
}