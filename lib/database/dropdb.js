var env = process.argv[3],
    uri = require('../../config/db').URI(env),
    mongoose = require('mongoose');

mongoose.connect(uri, function(err){
  if(err){throw err};

  mongoose.connection.db.dropDatabase();  
  mongoose.connection.close();
})

