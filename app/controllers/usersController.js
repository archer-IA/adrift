var express = require('express'),
     router = express.Router(),
     User   = require('../models/user.js'),
     isCurrentUser = require('../../lib/middleware/is_current_user.js'),
     bcrypt = require('bcrypt');


// index
router.get('/', isCurrentUser, function(req,res){
  User.find({}, function(err, users){
    res.json(users);
  });
});

router.get('/current', isCurrentUser, function(req,res){
  console.log('in /users/current');
  User.findOne({_id: req.session.currentUser}).select('+email').exec(function(err, user){
    res.json({currentUser: user});
  });
});

// show 
router.get('/:id', isCurrentUser, function(req, res){
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

// subscriptions
router.patch('/topics/:topicName', isCurrentUser, function(req, res){
  User.findByIdAndUpdate(req.session.currentUser._id, {$push: {topics: req.params.topicName}},{new: true}, function(err, user){
    if(err){
      res.json({status: 'failure'});
    } else {
      res.json({user: user, status: 'success'});
    }
  })
})

router.delete('/topics/:topicName', isCurrentUser, function(req, res){
  User.findByIdAndUpdate(req.session.currentUser._id, {$pull: {topics: req.params.topicName}},{new: true}, function(err, user){
    if(err){
      res.json({status: 'failure'});
    } else {
      res.json({user: user, status: 'success'});
    }
  })
})

// update
router.patch('/', isCurrentUser, function(req, res){
  User.findByIdAndUpdate(req.session.currentUser._id, req.body.user,{new: true}, function(err, user){
    if(err){
      res.json({status: 'failure'});
    } else {
      res.json({user: user, status: 'success'});
    }
  })
})

// destroy
router.delete('/:id', isCurrentUser, function(req, res){
  User.findByIdAndUpdate(req.session.currentUser._id, {active: false}, function(err){
    if(err){
      res.json({status: 'failure'});
    } else {
      req.session.currentUser = null;
      res.json({status: 'success'});
    }
  })
})

module.exports = router;