module.exports = function(models, close){

  // data goes here...

  var user = new models.user({
    username: 'alex',
    password: 'pwd123',
    email: 'blah'
  })

  var user2 = new models.user({
    username: "remina",
    password: "pwd123",
    email: "blahToThe@max.com"
  })

  var topic1 = new models.topic({
    name: 'Sadness'
  })
  topic2 = new models.topic({
    name: 'Joy'
  })

  user.topics.push(topic1._id)
  user.topics.push(topic2._id)

  user2.topics.push(topic1._id)

  user2.messages.push({
    _user: user._id,
    _topic: topic1._id,
    content: 'I belong to user 2'
  })

  topic1.messages.push({
    _user: user._id,
    _topic: topic1._id,
    content: 'Hi'
  })
  topic1.messages.push({
    _user: user._id,
    _topic: topic1._id,
    content: 'Blah'
  })

  topic2.messages.push({
    _user: user._id,
    _topic: topic1._id,
    content: 'Im in topic 2'
  })

  topic2.messages.push({
    _user: user._id,
    _topic: topic1._id,
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