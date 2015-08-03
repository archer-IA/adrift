var env = process.argv[3],
    uri = require('../config/db').URI(env),
    mongoose = require('mongoose');

mongoose.connect(uri, function(err){