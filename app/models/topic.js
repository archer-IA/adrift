var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    messageSchema = require('./schemas/message.js');


var TopicSchema = new Schema({
  name: {type: String, required: true, unique: true},
  messages: {type: [messageSchema], select: false}
})

TopicSchema.methods.sampleMessage = function(user, next){
  var length = this.messages.length;
  var that = this;
  if(length > 0){
    var index = Math.floor(Math.random() * length);
    user.pendingMessage = this.messages[index];
    user.recieved_last = Date.now();
    user.save(function(err, user){
      if(err){
        next(err);
      }else{
        var message = that.messages.splice(index, 1)[0];
        that.save(function(err, topic){
          if(err){
            next(err);
          }else{
            next(null, message);
          }
        })
      }
    })
  }else{
    next({error: "no messages in this topic"});
  }
}



module.exports = mongoose.model('Topic', TopicSchema);
