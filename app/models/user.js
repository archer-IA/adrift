var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  locations: [{type: Schema.Types.ObjectId, ref: 'Location'}],
  messages: [{}],
  created_at: {type:Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})


module.exports = mongoose.model('User', userSchema);