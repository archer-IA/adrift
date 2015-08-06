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
router.get('/:name', function(req, res, next){
  Topic.findOne({ name: req.params.name}, function(err, topic){
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

router.get('/id/:id', function(req, res, next){
  Topic.findOne({ _id: req.params.id}, function(err, topic){
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