var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var messageSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  anonymous: {type: Boolean, default: true},
  content: [{type: String, required: true, maxlength: 400}],
  topicName: {type: String, required: true},
  finders: [{type: Schema.Types.ObjectId, ref: 'User'}],
  flagged: {type: Boolean, default: false}
})

messageSchema.path('content').validate(function(value){
  return value.length;
}, 'content cannot be empty');

module.exports = messageSchema;