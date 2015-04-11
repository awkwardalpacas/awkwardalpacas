var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 8000; //dynamic port assignment for deployment purposes

app.use(express.static(__dirname)); //serve assets with express

mongoose.connect('mongodb://localhost:8000/db'); 

require('./middleware.js')(app, express);

app.listen(port);