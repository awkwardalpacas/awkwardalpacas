var mongo = require('mongodb').MongoClient
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser  = require('body-parser');
var CronJob = require('cron').CronJob;
var text = require('mtextbelt');
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
  var user = req.body.user,
      eventname=req.body.eventName
      cronTime = req.body.cronTime

  console.log('user', user)
  console.log('cronTime', cronTime)

  var found = DB.collection('corgiuser').find({name:user})

  found.on('data', function(user){
    var phoneNumber = user.phone;

    var job = new CronJob(cronTime, function() {
      console.log(phoneNumber)
      text.send(phoneNumber, "Reminder: your event '"+eventname+"' is starting in one hour!", function(err) {
        if (err) console.log(err);
      });

    }, null, true, "America/Chicago"); // Time zone of this job. 
  })
})

require('./middleware.js')(app, express);

app.listen(process.env.PORT || 8000);




