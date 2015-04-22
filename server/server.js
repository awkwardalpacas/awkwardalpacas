var mongo = require('mongodb').MongoClient
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var http = require('http')
var DB;

mongo.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/corgi', function(err, db) {
    if (err) throw err;
      DB = db;
    })

var app = express();
// we just assign the port in the connection in each controller
app.use(express.static(__dirname + '/..')); 

app.get("/", function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/../client/app'});
});

app.get('/api/reminder', function(req,res){

    var found = DB.collection('corgiuser').find({name:"benita"})

    found.on('data', function(user){
      res.send(user.phone)
    })

 })

require('./middleware.js')(app, express);

app.listen(process.env.PORT || 8000);
