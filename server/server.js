var mongo = require('mongodb').MongoClient,
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser  = require('body-parser'),
    plivo = require('plivo-node'),
    CronJob = require('cron').CronJob,
    DB;

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
      var params = {
        'src': '19192751649', // Caller Id
        'dst' : '1' + phoneNumber, // User Number to Call
        'text' : "Reminder: your event '"+eventname+"' is starting in one hour!",
        'type' : "sms"
      };

      api.send_message(params, function (status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);
      });

      }, 
      null,
      true, // Start the job right now 
      "America/Chicago" // Time zone of this job. 
    );


    // var params = {
    //   'src': '19192751649', // Caller Id
    //   'dst' : '1' + phoneNumber, // User Number to Call
    //   'text' : "Hi, don't forget your event: "+eventnameg+"!",
    //   'type' : "sms"
    // };

    // api.send_message(params, function (status, response) {
    //   console.log('Status: ', status);
    //   console.log('API Response:\n', response);
    // });

  })

 })

require('./middleware.js')(app, express);

app.listen(process.env.PORT || 8000);




