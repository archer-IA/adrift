var express = require('express'),
     router = express.Router(),
     User   = require('../models/user.js'),
     bcrypt = requite('bcrypt');


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
router.post('/', function(req,res){
  console.log(req.body);
  User.create(req.body, function(err, user){
    if (err){
      res.json({status: 'failure'});
    } else {
      res.json({user: user, status: 'success'});
    }
  });
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