var express = require('express'),
     router = express.Router(),
     User   = require('../models/user.js'),
     bcrypt = require('bcrypt');

// login
router.post('/login', function(req, res){
  var password = req.body.user.password;
  User.findOne({username: req.body.user.username}, function(err, user){
    if(user){
      bcrypt.compare(password, user.password, function(err, check){
        if(check){
          req.session.currentUser = user;
          res.json({status: 'success'});
        }
      })
    }else{
      res.json({status: 'failure'});
    }
  });
});

// logout
router.delete('/logout', function(req, res){
  if(req.session.currentUser){
    req.session.currentUser = null;
    res.json({status: 'success'});
  }else{
    res.json({status: 'failure', message: 'Not signed in'});
  }
  
})

module.exports = router;