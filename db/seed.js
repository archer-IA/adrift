module.exports = function(models, close){

  // data goes here...

  var me = {username: 'alex', password_digest: 'pwd123'};
  console.log(models);
  models.message.create({
    content: 'Hey',
    location: 'the best place'  
  }, function(err, model){
    console.log(err);
    console.log(model);

  }).then(function(){
    console.log('here');
    close();
  })




  // models.message.create(me)
  //   .then(function(){

  //   return models.users.create(me);

  // }).then(function(){

  //   return models.users.create(me);

  // }).then(function(){
    
  //   close();
  
  // })


}