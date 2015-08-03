var app        = require('../app.js'),
    mongoose   = require('mongoose'),
    db         = require('../config/db'),
    getPort    = require('../config/port'),
    env        = process.argv[2];

// build the uri for the db depending on environment
var uri  = db.URI(env);
var port = getPort.port(env);

// connect to the database and if successful, start server
mongoose.connect(uri, function(err){
  console.log('db connected at ' + uri);
  app.listen(port, function(){
    console.log('server listening on port: ' + port);
  });
})

