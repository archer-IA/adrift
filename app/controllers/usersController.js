var express = require('express'),
     router = express.Router(),
     User   = require('../models/user.js'),
     bcrypt = require('bcrypt');


// index
router.get('/', function(req,res){
  User.find({}, function(err, users){
    res.json(users);
  });
});

// show 
router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    if (err){
      res.json({status: 'failure'});
    } else {
      res.json({user: user, status: 'success'});
    }
  });
});

// create
router.post('.:format?/', function(req,res){
  var format = req.params.format;
  var password = req.body.user.password;
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      req.body.user.password = hash;
      User.create(req.body.user, function(err, user){
        if (err){
          if(format === 'json'){
            res.json({status: 'failure'});
          }else{
            res.redirect('/');
          }
        } else {
          req.session.currentUser = user;
          if(format === 'json'){
            res.json({user: user, status: 'success'});
          }else{
            res.redirect('/adrift');
          }
        }
      });
    })
  })
});

// update
router.patch('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, req.body.user,{new: true}, function(err, user){
    if(err){
      res.json({status: 'failure'});
    } else {
      res.json({user: user, status: 'success'});
    }
  })
})

// destroy
router.delete('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {active: false}, function(err){
    if(err){
      res.json({status: 'failure'});
    } else {
      req.session.currentUser = null;
      res.json({status: 'success'});
    }
  })
})

module.exports = router;