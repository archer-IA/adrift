var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var messageSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  anonymous: {type: Boolean, default: true},
  content: [{type: String, required: true}],
  _topic: {type: Schema.Types.ObjectId, required: true},
  finders: [{type: Schema.Types.ObjectId, ref: 'User'}],
  flagged: {type: Boolean, default: false}
})

module.exports = messageSchema;