var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js'),
    isCurrentUser = require('../../lib/middleware/is_current_user.js'),
    Topic = require('../models/topic.js');

router.get('/', function(req, res, next){
  res.render('splash', {});
})


router.get('/adrift*', isCurrentUser, function(req, res, next){
  res.render('app', {currentUser: req.session.currentUser});
})




module. exports = router;