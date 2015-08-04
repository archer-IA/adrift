var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    MessageSchema = require('./schemas/message.js');
    Topic = require('./topic.js');


var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  topics: [{type: Schema.Types.ObjectId}],
  pendingMessage: [MessageSchema],
  messages: [MessageSchema],
  active: {type: Boolean, default: true},
  created_at: {type:Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})

UserSchema.methods.sampleTopics = function(next){
  var length = this.topics.length;
  if( length > 0){
    var index = Math.floor(Math.random() * length);
    Topic.findById(this.topics[index], function(err, topic){
      next(null, topic)
    });
  }else{
    next({error: "User has no topics"});
  }
}


module.exports = mongoose.model('User', UserSchema);