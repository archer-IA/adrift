var express       = require('express'),
    router        = express.Router(),
    User          = require('../models/user.js'),
    isCurrentUser = require('../../lib/middleware/is_current_user.js'),
    Rubbish       = require('../models/rubbish.js'),
    Topic         = require('../models/topic.js');

router.use(isCurrentUser);

// show
router.get('/', function(req, res, next){
  var id = req.session.currentUser._id;
  User.findById(id, function(err, user){
    if(err){
      res.json({status: 'failure', error: 'user find error'});
    }else if(user.hasPendingMessage()){
      res.json({message: user.pendingMessage});
    }else if(user.canGetMessage()){
      user.attempted_last = Date.now();
      user.save(function(err, user){
        if(err){
          res.json({status: 'failure', error: 'attempted_last update error'});
        }else if(user.doesGetMessage()){
          user.sampleTopics(function(err, topic){;
            console.log("error: " + err);
            console.log(topic);
            if(err){
              console.log(err);
              res.json({status: 'failure', error: 'topic error'});
            }else{
              var message = topic.sampleMessage(user, function(err, message){
                if(err){
                  console.log(err);
                  res.json({status: 'failure', error: 'message error'});
                }else{
                  res.json({message: message});
                }
              });
            }
          });
        }else{
          res.json({status: 'failure', error: 'no bottles were found on the eternal sea that is the interwebz'})
        }
      })
    }else{
      res.json({status: 'failure', error: 'can only attempt to get a message once in a while'})
    }
  })
})


router.post('/decision', function(req, res, next){
  var id = req.session.currentUser._id;
  User.findById(id, function(err, user){
    if(err){
      res.json({status: 'failure', message: 'could not find user'});
    }else{
      user.switchMessage(req.body.keep, function(err, response){
        res.json(response);
      })
    }
  });
})

router.post('/', function(req, res, next){
  var message = req.body.message;
  message._user = req.session.currentUser._id;
  Topic.findOneAndUpdate({name: message.topicName}, { $push: { messages: message} }, function(err, topic){
    if(err){
      res.json({status: 'failure', error: '500'});
    }else if(topic){
      res.json({topic: topic, status:'success'});
    } else{
      res.json({status: 'failure', error: 'could not find topic'})
    }
  })
})

router.patch('/:id', function(req, res, next){
  var id = req.params.id;
  User.findById(req.session.currentUser._id, function(err, user){
    if(err){
      res.json({status: 'failure', message: 'could not find user'});
    }else{
      user.updateMessage(id, req.body.newContent, function(err, response){
        res.json({status: 'success'});
      })
    }
  });
})


module.exports = router;