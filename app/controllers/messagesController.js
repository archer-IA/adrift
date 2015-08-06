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
      console.log(err);
      res.json({status: 'error'});
    }else{
      if(user.hasPendingMessage){
        res.json({message: user.pendingMessage[0]});
      }else{
        var topic = user.sampleTopics(function(err, topic){;
          if(err){
            res.json({status: 'error'});
          }else{
            var message = topic.sampleMessage();
            res.json({message: message});
          }
        });
      }
      
    }
  })
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