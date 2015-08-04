var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    messageSchema = require('./schemas/message.js');


var locationSchema = new Schema({
  name: {type: String, require: true, unique: true},
  messages: [messageSchema]
})



module.exports = mongoose.model('Location', locationSchema);
