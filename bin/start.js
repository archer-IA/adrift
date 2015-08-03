var app        = require('../app.js'),
    mongoose   = require('mongoose'),
    db         = require('../config/db'),
    env        = process.argv[2];

var uri = db.URI(env);

console.log(uri);

app.listen(3000);