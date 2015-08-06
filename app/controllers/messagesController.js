var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js'),
    isCurrentUser = require('../../lib/middleware/is_current_user.js'),
    Topic = require('../models/topic.js');

router.use(isCurrentUser);

// show
router.get('/', function(req, res, next){
  var id = req.session.currentUser._id;
  console.log('def in here');
  User.findById(id, function(err, user){
    if(err){
      console.log(err);
      res.json({status: 'error'});
    }else{
      console.log('checking for pendning');
      if(user.hasPendingMessage()){
        console.log('sending pending message');
        res.json({message: user.pendingMessage[0]});
      }else{
        var topic = user.sampleTopics(function(err, topic){;
          console.log('topic');  
          if(err){
            res.json({status: 'error'});
          }else{
            var message = topic.sampleMessage(user, function(err, message){
              if(err){
                res.json({status: 'error'});
              }else{
                res.json({message: message});
              }
            });
          }
        });
      }
    }
  })
})

router.post('/decision', function(req, res, next){
  var id = req.session.currentUser._id;
  User.findById(id, function(err, user){
    if(err){
      console.log('user find error');
      res.json({status: 'error'});
    }else{
      if(user.hasPendingMessage()){
        var message = user.pendingMessage.splice(0,1);
        if(req.body.response === 'yes'){
          user.messages.push(message[0]);
        }
        user.save(function(err, user){
          if(err){
            console.log(err);
            res.json({status: 'error'});
          }else{
            if(req.body.response !== 'yes'){
              Topic.findByIdAndUpdate({_id: message._topic}, {$push: {messages: message}}, function(err,topic){
                if(err){
                  res.json({status: 'error'});
                }else{
                  res.json({status: 'success', message: message})
                }
              });
            }else{
              res.json({status: 'success', message: message})
            }
          }
        })
      }else{
        res.json({status: 'error'});
      }
    }
  });
  
})

router.post('/', function(req, res, next){
  var message = req.body.message;
  message._user = req.session.currentUser._id;
  Topic.findByIdAndUpdate(message._topic, { $push: { messages: message} }, function(err, topic){
    if(err){
      res.json({status: 'failure', error: '500'});
    }else if(topic){
      res.json({topic: topic, status:'success'});
    } else{
      res.json({status: 'failure', error: 'could not find topic'})
    }
  })
})


module.exports = router;