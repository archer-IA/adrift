var express        = require('express'),
    app            = express(),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    fs             = require('fs'),
    paramsChecker  = require('./lib/middleware/params_checker'),
    session        = require('express-session'),
    ejs            = require('ejs'),
    bcrypt         = require('bcrypt');

// Declaring all middlewares needed
app.use(morgan('short'));
app.use(express.static(__dirname + '/app/assets'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(paramsChecker);
app.use(session({
  secret: process.env.ADRIFT_SECRET,
  resave: true,
  saveUninitialized: false
}));


// Declaring all options to set for the server
app.set('views', __dirname + '/app/views');
app.set("view engine", "ejs");
app.set('layout', 'layout/layout.ejs');

// Declaring all controllers to use


// Sessions
var sessionsController = require(__dirname + '/app/controllers/sessionsController.js');
app.use('/sessions', sessionsController);

// Users
var usersController = require(__dirname + '/app/controllers/usersController.js');
app.use('/users', usersController);

// Topics
var topicsController = require(__dirname + '/app/controllers/topicsController.js');
app.use('/topics', topicsController);

// Messages
var messagesController = require(__dirname + '/app/controllers/messagesController.js')
app.use('/messages', messagesController)

// Static
var staticController = require(__dirname + '/app/controllers/staticController.js');
app.use('/', staticController);

// 404 message
app.use(function(req, res, next){
  res.send('404: not found');
})



module.exports = app;