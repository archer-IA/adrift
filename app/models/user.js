var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    MessageSchema = require('./schemas/message.js'),
    Topic = require('./topic.js'),
    TimeCheck = require('../../lib/helpers/check_time.js');



var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  email: {type: String, required: true, unique: true, select: false},
  topics: [{type: String}],
  pendingMessage: {type: {}, default: null},
  messages: [MessageSchema],
  active: {type: Boolean, default: true},
  created_at: {type:Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  attempted_last: {type: Date, default: Date.now},
  received_last: {type: Date, default: Date.now}
})

UserSchema.methods.canGetMessage = function(){
  var checker = new TimeCheck(this.attempted_last);
  console.log(checker.canGetMessage());
  return checker.canGetMessage();
}

UserSchema.methods.doesGetMessage = function(){
  var checker = new TimeCheck(this.received_last);
  var chance = checker.getChance();
  var roll = Math.random();
  return roll < chance;
}

UserSchema.methods.sampleTopics = function(next){
  var length = this.topics.length;
  if( length > 0){
    var index = Math.floor(Math.random() * length);
    Topic.findOne({name: this.topics[index]}).select('+messages').exec(function(err, topic){
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

UserSchema.methods.setPendingMessage = function(message, next){
  this.pendingMessage = message;
  this.received_last = Date.now();
  this.save(function(err, user){
    if(err){
      next(err);
    }else{
      next(null, user)
    }
  })
}

UserSchema.methods.hasPendingMessage = function(){
  return this.pendingMessage !== null;
}

UserSchema.methods.switchMessage = function(keep, next){
  if(this.hasPendingMessage()){
    var message = this.pendingMessage;
    this.pendingMessage = null;
    if(keep && message.topicName !== "Rubbish"){
      this.messages.push(message);
    }
    this.save(function(err, user){
      if(err){
        next(err, {status: 'error', error: 'could not save user after adding message'});
      }else{
        if(!keep){
          Topic.findOneAndUpdate({name: message.topicName}, {$push: {messages: message}}, function(err, topic){
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