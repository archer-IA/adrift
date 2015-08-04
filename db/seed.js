module.exports = function(models, close){

  // data goes here...

  var user = new models.user({
    username: 'alex',
    password: 'pwd123',
    email: 'blah'
  })


  var location = new models.location({
    name: 'Awesome'
  })
  location.messages.push({
      content: 'Hey',
      location: location._id,
      _author: user._id
  })
  user.save(function(err){
    location.save(function(err){
      console.log(location);
      console.log(location.messages);
      close()
    })
  })
  




  // models.location.create({
  //   name: 'Awesome',
  // }, function(err, loc){
  //   console.log(err);
  //   console.log(loc);
  //   loc.messages.push({
  //     content: 'Hey',
  //     location: 'the best place'
  //   });
  //   console.log(loc);
  //   close();
  //   // loc.save(function(err){
  //   //   console.log(err);
  //   //   console.log(loc);
  //   //   close();
  //   // })
    
  // })


  // models.message.create({
  //   content: 'Hey',
  //   location: 'the best place'  
  // }, function(err, model){
  //   models.location.create({
  //     name: 'Awesome',
  //     messages: [model]
  //   }, function(err, location){
  //     console.log(err);
  //     console.log(location);
  //     close();
  //   })
  // })




  // models.message.create(me)
  //   .then(function(){

  //   return models.users.create(me);

  // }).then(function(){

  //   return models.users.create(me);

  // }).then(function(){
    
  //   close();
  
  // })


}