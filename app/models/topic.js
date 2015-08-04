var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    messageSchema = require('./schemas/message.js');


var TopicSchema = new Schema({
  name: {type: String, required: true, unique: true},
  messages: [messageSchema]
})

TopicSchema.methods.sampleMessage = function(){
  var length = this.messages.length;
  if(length > 0){
    var index = Math.floor(Math.random() * length);
    return this.messages[index];
  }else{
    return null;
  }
}



module.exports = mongoose.model('Topic', TopicSchema);
