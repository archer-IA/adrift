var express        = require('express'),
    app            = express(),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    fs             = require('fs'),
    ejs            = require('ejs'),
    expressLayouts = require('express-ejs-layouts'),
    paramsChecker  = require('./lib/middleware/params_checker'),
    session        = require('express-session'),
    bcrypt         = require('bcrypt');

// Declaring all middlewares needed
app.use(morgan('short'));
app.use(express.static(__dirname + '/app/assets'));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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




// 404 message
server.use(function(req, res, next){
  res.send('404: not found');
})



module.exports = app;