var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var messageSchema = new Schema({
  _author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  anonymous: {type: Boolean, default: true},
  content: [{type: String, require: true}],
  location: {type: Schema.Types.ObjectId, required: true},
  finders: [{type: Schema.Types.ObjectId, ref: 'User'}],
  flagged: {type: Boolean, default: false}
})

module.exports = messageSchema;