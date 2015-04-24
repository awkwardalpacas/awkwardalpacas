var mongo = require('mongodb').MongoClient,
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser  = require('body-parser'),
    CronJob = require('cron').CronJob,
    text = require('mtextbelt'),
    DB;

mongo.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  DB = db;
})

var app = express();
app.use(express.static(__dirname + '/..')); 
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/../client/app'});
});

//when remind is called it sends user data which 
//sets up a cron job calling textbelt to send them a text reminder
app.post('/api/reminder', function(req,res){
  var user = req.body.user,
      eventname = req.body.eventName,
      cronTime = req.body.cronTime,
      found = DB.collection('corgiuser').find({name:user})

  found.on('data', function(user){
    var phoneNumber = user.phone;

    //cron job and text reminder: 
    var job = new CronJob(cronTime, function() {
      text.send(phoneNumber, "Reminder: your event '"+eventname+"' is starting in one hour!", function(err) {
        if (err) console.log(err);
      });
    }, null, true, "America/Chicago"); //time zone of cron job 
  })
})

require('./middleware.js')(app, express);
app.listen(process.env.PORT || 8000);




