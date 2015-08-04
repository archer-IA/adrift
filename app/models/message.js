var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var messageSchema = new Schema({
  _author: {type: Schema.Types.ObjectId, ref: 'User'},
  content: [{type: String}],
  location: String,
  finders: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Message', messageSchema);