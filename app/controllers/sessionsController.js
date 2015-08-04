var express = require('express'),
     router = express.Router(),
     User   = require('../models/user.js');

// login
router.post('/login', function(req, res){
  User.findOne({username: req.body.user}, function(err, user){
    if(user && user.password === req.body.user.password){
      req.session.currentUser = user;
      res.json({status: 'success'});
    } else {
      res.json({status: 'failure'});
    }
  });
});

// logout
router.post('logout', function(req, res){
  req.session.currentUser = null;
  res.json({status: 'success'});
})