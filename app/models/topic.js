var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    messageSchema = require('./schemas/message.js'),
    Rubbish = require('./rubbish.js'),
    chances = require('../../lib/helpers/chances.js');


var TopicSchema = new Schema({
  name: {type: String, required: true, unique: true},
  messages: {type: [messageSchema], select: false}
})

TopicSchema.methods.getMessage = function(next){
  var length = this.messages.length;
  if(length && chances.doesNotGetRubbish()){
    var index = Math.floor(Math.random() * length);
    this.removeMessage(index, function(err, message){
      if(err){
        next(err);
      }else{
        next(null, message);
      }
    })
  }else{
    Rubbish.findOne({}, function(err, rubbish){
      if(err){
        next({status: "failure", error: "could not get rubbish"});
      }else{
        next(null, rubbish);
      }
    })
  }
}

TopicSchema.methods.sampleMessage = function(user, next){
  this.getMessage(function(err, message){
    console.log(message);
    user.setPendingMessage(message, function(err, user){
      if(err){
        next(err);
      }else{
        next(null, message);
      }
    })
  })
}

TopicSchema.methods.removeMessage = function(index, next){
  var message = this.messages.splice(index, 1)[0];
  this.save(function(err, topic){
    if(err){
      next(err);
    }else{
      next(null, message);
    }
  })
}



module.exports = mongoose.model('Topic', TopicSchema);
