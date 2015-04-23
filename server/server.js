var mongo = require('mongodb').MongoClient
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser  = require('body-parser');
var DB;
var plivo = require('plivo-node')

var api = plivo.RestAPI({
  authId: process.env.authId,
  authToken: process.env.authToken
});


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
  var eventname=req.body.eventName
	console.log('user', user)

  var found = DB.collection('corgiuser').find({name:user})
  
  found.on('data', function(user){
    var phoneNumber = user.phone;

    var params = {
      'src': '19192751649', // Caller Id
      'dst' : '1' + phoneNumber, // User Number to Call
      'text' : "Hi, don't forget your event: "+eventnameg+"!",
      'type' : "sms"
    };

    api.send_message(params, function (status, response) {
      console.log('Status: ', status);
      console.log(params.dst)
      console.log('API Response:\n', response);
    });

  })

 })

require('./middleware.js')(app, express);

app.listen(process.env.PORT || 8000);
