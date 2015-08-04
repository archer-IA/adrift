var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js'),
    isCurrentUser = require('../../lib/middleware/is_current_user.js'),
    Topic = require('../models/topic.js');

router.use(isCurrentUser);

// show
router.get('/', function(req, res, next){
  var id = req.session.currentUser._id;
  console.log(id);
  User.findById(id, function(err, user){
    if(err){
      console.log(err);
      res.json({status: 'error'});
    }else{
      var topic = user.sampleTopics(function(err, topic){;
        var message = topic.sampleMessage();
        res.json({message: message})
      });
    }
  })
})

module.exports = router;