var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js'),
    Topic = require('../models/topic.js');

// show
router.get('/', function(req, res, next){
  User.find(req.sessions.currentUser, function(err, user){
    var topic_id = user.sampleTopics;
    Topic.findById(topic_id, function(err, topic){
      
    });
  })
})