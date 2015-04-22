var mongo = require('mongodb').MongoClient
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser  = require('body-parser');
var DB;


mongo.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/corgi', function(err, db) {
    if (err) throw err;
      DB = db;
    })

var app = express();
// we just assign the port in the connection in each controller
app.use(express.static(__dirname + '/..')); 
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/../client/app'});
});

app.post('/api/reminder', function(req,res){
	var user = req.body.user
	console.log(user)
    var found = DB.collection('corgiuser').find({name:user})

    found.on('data', function(user){
      res.send(user.phone)
    })

 })

require('./middleware.js')(app, express);

app.listen(process.env.PORT || 8000);
