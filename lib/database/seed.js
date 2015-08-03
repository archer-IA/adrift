var env      = process.argv[3],
    uri      = require('../../config/db').URI(env),
    mongoose = require('mongoose'),
    seed     = require('../../db/seed'),
    models   = require('../globals/models');


mongoose.connect(uri, function(err){
  seed(models);
  mongoose.connection.close();
});