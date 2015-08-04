var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    messageSchema = require('./schemas/message.js');


var topicSchema = new Schema({
  name: {type: String, required: true, unique: true},
  messages: [messageSchema]
})



module.exports = mongoose.model('Topic', topicSchema);
