var express        = require('express'),
    app            = express(),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    fs             = require('fs'),
    ejs            = require('ejs'),
    expressLayouts = require('express-ejs-layouts');
    paramsChecker  = require('./lib/middleware/params_checker'),

app.use(morgan('short'));
app.use(express.static(__dirname + '/app/assets'));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(paramsChecker);



app.set('views', __dirname + '/app/views');
app.set("view engine", "ejs");
app.set('layout', 'layout/layout.ejs');




module.exports = app;