var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js'),
    isCurrentUser = require('../../lib/middleware/is_current_user.js'),
    Topic = require('../models/topic.js');

router.use(isCurrentUser);

// show
router.get('/', function(req, res, next){
  var id = req.session.currentUser._id;
  User.findById(id, function(err, user){
    if(err){
      res.json({status: 'error', error: 'user find error'});
    }else{
      if(user.hasPendingMessage()){
        res.json({message: user.pendingMessage[0]});
      }else{
        var topic = user.sampleTopics(function(err, topic){;
          if(err){
            res.json({status: 'error', error: 'topic error'});
          }else{
            var message = topic.sampleMessage(user, function(err, message){
              if(err){
                res.json({status: 'error', error: 'message error'});
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
      res.json({status: 'error', message: 'could not find user'});
    }else{
      if(user.hasPendingMessage()){
        var message = user.pendingMessage.splice(0,1)[0];
        if(req.body.response === 'yes'){
          user.messages.push(message[0]);
        }
        user.save(function(err, user){
          if(err){
            console.log(err);
            res.json({status: 'error', error: 'could not save user after adding message'});
          }else{
            if(req.body.response !== 'yes'){
              console.log(message);
              Topic.findByIdAndUpdate({_id: message._topic}, {$push: {messages: message}}, function(err,topic){
                if(err){
                  console.log(err);
                  res.json({status: 'error', error: 'could not save topic when puting message back'});
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
        res.json({status: 'error', error: 'user has no pending messages'});
      }
    }
  });
  
})

router.post('/', function(req, res, next){
  var message = req.body.message;
  message._user = req.session.currentUser._id;
  message.original_content = message.content || null;
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