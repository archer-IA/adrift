var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Message = require('./message.js');


var locationSchema = new Schema({
  name: String,
  messages: [Message]
})



module.exports = mongoose.model('Location', locationSchema);
