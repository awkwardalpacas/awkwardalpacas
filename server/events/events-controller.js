var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient
// mongoose.connect("mongodb://localhost:27017/corgi"); //connects to database called corgi
// var db = mongoose.connection
// db.once('open', function() {
//   console.log('open')
//   console.log(db.collections)
// })

// var db = connect('localhost:27017/corgi')
// var db = new mongo.getDB('corgi')
var Cevents;
var Cusers;
var db;
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  Cevents = db.collection('corgievent');
  Cusers = db.collection('corgiuser');
  db.collection('corgievent').find().toArray(function(err, items) {console.log(items)})
})

module.exports = {
	allEvents: function(req, res) {
    // console.log('db',DB)
    console.log('event',Cevents)
    console.log('user',Cusers)
    var events = Cevents.find({ datetime: { $gt: Date.now() } })
      // then sorts time by ascending so we can get the events happening next...
      .sort({ datetime: 1 })
      // then limits the response to only ten.
      .limit( 10 )
      // If there is an argument passed from events.js, it's to specify the "page," 
      // so we might skip over some events to look at the next ten, for example.
      .skip ( 10*req.data.pageNum )
      // Results are returned as an array for use in angular ng-repeat in the template.
      .toArray(
        // function() {console.log('stuff')}
        )

    events.forEach(function(ev) {
      // this makes the time and date into a friendly, localized string.  Instead of showing milliseconds, it shows "8:00 P.M."
      ev.time = ev.datetime.toLocaleTimeString()
      ev.date = ev.datetime.toLocaleDateString()
      // MongoDB doesn't have a join query, so we have to use the event's creatorID to do a lookup on the user collection.
      // That lookup returns a single object, and we use its name property.
      ev.creator = Cusers.find({ userID: ev.creatorID }).name
    })

    res.json(events)
	},

	newEvent: function(req, res) {
		// save event object passed in with http request from services.js
		Cevents.save(req.data.event)
	}


}

