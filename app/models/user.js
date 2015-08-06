var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    MessageSchema = require('./schemas/message.js');
    Topic = require('./topic.js');


var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  email: {type: String, required: true, unique: true, select: false},
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
    Topic.findById(this.topics[index]).select('+messages').exec(function(err, topic){
      if(err){
        next(err);
      }else{
        next(null, topic)
      }
    });
  }else{
    next({error: "User has no topics"});
  }
}

UserSchema.methods.hasPendingMessage = function(){
  return this.pendingMessage.length > 0;
}

UserSchema.methods.switchMessage = function(response, next){
  if(this.hasPendingMessage()){
    var message = this.pendingMessage.splice(0,1)[0];
    if(response === 'yes'){
      this.messages.push(message);
    }
    this.save(function(err, user){
      if(err){
        next(err, {status: 'error', error: 'could not save user after adding message'});
      }else{
        if(response !== 'yes'){
          Topic.findByIdAndUpdate({_id: message._topic}, {$push: {messages: message}}, function(err,topic){
            if(err){
              next(err, {status: 'error', error: 'could not save topic when puting message back'});
            }else{
              next(null, {status: 'success', message: message});
            }
          });
        }else{
          next(null, {status: 'success', message: message});
        }
      }
    })
  }else{
    next({error: 'user has no pending messages'}, {status: 'error', error: 'user has no pending messages'});
  }
}


module.exports = mongoose.model('User', UserSchema);