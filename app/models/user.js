var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    messageSchema = require('./schemas/message.js');


var userSchema = new Schema({
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  email: {type: String, require: true, unique: true},
  locations: [{type: Schema.Types.ObjectId}],
  messages: [messageSchema],
  active: {type: Boolean, default: true},
  created_at: {type:Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})


module.exports = mongoose.model('User', userSchema);