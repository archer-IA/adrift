var bcrypt = require('bcrypt');

module.exports = function(models, close){

  // data goes here...

  var salt = bcrypt.genSaltSync(10);
  var pass = bcrypt.hashSync('pwd123', salt)

  var rubbish1 = new models.rubbish({
    content: 'I am rubbish, how are you doing?'
  })

  var rubbish2 = new models.rubbish({
    content: 'To live is the rarest thing in the world. Most people exist, that is all.'
  })

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
    name: 'sadness',
    desc: 'The country is grey and brown and white in trees, snows and skies of laughter, always diminshing, less funny not just darker, not just grey'
  })
  topic2 = new models.topic({
    name: 'joy',
    desc: 'Puppies'
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
    content: "One is the loneliest number that you'll ever see"
  })
  topic1.messages.push({
    _user: user._id,
    topicName: topic1.name,
    content: 'My heart is as black and deep as the depths of the ocean...'
  })

  topic2.messages.push({
    _user: user._id,
    topicName: topic2.name,
    content: 'EVERYTHING IS AWESOME!'
  })

  topic2.messages.push({
    _user: user._id,
    topicName: topic2.name,
    content: 'Happy Birthday!'
  })

  user.save()
    .then(function(){
    return user2.save()
  })
  .then(function(){
    return topic1.save()
  })
  .then(function(){
    return topic2.save();
  })
  .then(function(){
    return rubbish1.save();
  })
  .then(function(){
    return rubbish2.save();
  })
  .then(function(){
    close();
  })

}