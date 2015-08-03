var express    = require('express'),
    app        = express();
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    fs         = require('fs'),
    ejs        = require('ejs');

app.use(morgan('short'));


module.exports = app;