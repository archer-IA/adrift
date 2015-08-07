var bcrypt = require('bcrypt');

module.exports = function(models, close){

  // data goes here...

  var salt = bcrypt.genSaltSync(10);
  var pass = bcrypt.hashSync('pwd123', salt)

  var user = new models.user({
    username: 'alex',
    password: pass,
    email: 'blah'
  })

  var user2 = new models.user({
    username: "remina",
    password: pass,
    email: "blahToThe@max.com"
  })

  var topic1 = new models.topic({
    name: 'sadness'
  })
  topic2 = new models.topic({
    name: 'joy'
  })

  user.topics.push(topic1.name)
  user.topics.push(topic2.name)

  user2.topics.push(topic1.name)

  user2.messages.push({
    _user: user._id,
    topicName: topic1.name,
    content: 'I belong to user 2'
  })

  topic1.messages.push({
    _user: user._id,
    topicName: topic1.name,
    content: 'Hi'
  })
  topic1.messages.push({
    _user: user._id,
    topicName: topic1.name,
    content: 'Blah'
  })

  topic2.messages.push({
    _user: user._id,
    topicName: topic1.name,
    content: 'Im in topic 2'
  })

  topic2.messages.push({
    _user: user._id,
    topicName: topic1.name,
    content: 'Duuuuuuuude'
  })

  user.save()
    .then(function(){
    return user2.save()
  }).then(function(){
    return topic1.save()
  }).then(function(){
    return topic2.save();
  }).then(function(){
    close();
  })

}