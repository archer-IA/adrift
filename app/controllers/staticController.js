var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js'),
    isCurrentUser = require('../../lib/middleware/is_current_user.js'),
    Topic = require('../models/topic.js');

router.get('/', function(req, res, next){

})

router.use(isCurrentUser);

router.get('/adrift'. function(req, res, next){
  
})