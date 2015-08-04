var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js'),
    isCurrentUser = require('../../lib/middleware/is_current_user.js'),
    Topic = require('../models/topic.js');

// make sure they are signed in
router.use(isCurrentUser);

// index
router.get('/', function(req, res, next){
  Topic.find({}, function(err, topics){
    if(err){
      res.json({
        status: 'failure'
      });
    } else {
      res.json({
        topics: topics,
        status: 'success'
      });
    }
  })
})

// show
router.get('/:id', function(req, res, next){
  Topic.findById(req.params.id, function(err, topic){
    if(err){
      res.json({status: 'failure'});
    }else{
      res.json({
        topic: topic,
        status: 'success'
      })
    }
  })
})

// create
router.post('/', function(req, res, next){
  Topic.create(req.body.topic, function(err, topic){
    if(err){
      res.json({status: 'failure'});
    }else{
      res.json({topic: topic, status: 'success'});
    }
  })
})


// update
router.patch('/:id', function(req, res, next){
  var message = req.body.topic.message;
  message._author = req.session.currentUser._id;
  message._topic = req.params.id;
  Topic.findByIdAndUpdate(req.params.id, { $push: { messages: message} }, function(err, topic){
    if(err){
      res.json({status: 'failure'});
    }else{
      res.json({topic: topic, status:'success'});
    }
  })
})

// delete
router.delete('/:id', function(req, res, next){
  Topic.findByIdAndUpdate(req, params.id, {active: false}, function(err, topic){
    if(err){
      res.json({status: 'failure'})
    }else{
      res.json({topic: topic, status: 'success'})
    }
  })
})

module.exports = router;