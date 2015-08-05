var express = require('express'),
     router = express.Router(),
     User   = require('../models/user.js'),
     bcrypt = require('bcrypt');

// login
router.post('/login.:format?', function(req, res){
  var password = req.body.user.password;
  var format = req.params.format;
  User.findOne({username: req.body.user.username}).select('+password').exec( function(err, user){
    if(user){
      bcrypt.compare(password, user.password, function(err, check){
        if(check){
          req.session.currentUser = user;
          if(format === 'json'){
            res.json({status: 'success'});
          }else{
            res.redirect('/adrift');
          }
        }else{
          if(format === 'json'){
            res.json({status: 'failure', message:"wrong username/password"});
          }else{
            res.redirect('/');
          }
        }
      })
    }else{
      if(format === 'json'){
        res.json({status: 'failure', message:"wrong username/password"});
      }else{
        res.redirect('/');
      }
    }
  });
});

// logout
router.delete('/logout.:format?', function(req, res){
  var format = req.params.format;
  if(req.session.currentUser){
    req.session.currentUser = null;
    if(format === 'json'){
        res.json({status: 'success'});
    }else{
      res.redirect('/');
    }
  }else{
    if(format === 'json'){
      res.json({status: 'failure', message: 'Not signed in'});
    }else{
      res.redirect('/');
    }
  }
})

module.exports = router;