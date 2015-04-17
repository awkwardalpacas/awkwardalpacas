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
var events;
var users;
var DB;

// this is a little weird - we're using the mongodb node module, not the straight-up regular mongoDB stuff.  So just because a
// command works in the mongo shell, doesn't mean it will work here.  It looks like these are the correct docs:
// http://mongodb.github.io/node-mongodb-native/2.0/api/
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  DB = db
  events = db.collection('corgievent');
  users = db.collection('corgiuser');
  // events.find({eventID:1}).toArray(function(err, items) {console.log('user',items)})
  // users.find({userID:1}).toArray(function(err, items) {console.log('event',items)})
})

module.exports = {
	allEvents: function(req, res) {
    var events = []
    // this is the real first line, but line 33 is being used for testing
    // DB.collection('corgievent').find({ datetime: { $gt: Date.now() } })
    DB.collection('corgievent').find({ eventID: { $gt: 3 } })
      // then sorts time by ascending so we can get the events happening next...
      .sort({ datetime: 1 })
      // then limits the response to only ten.
      .limit( 10 )
      // If there is an argument passed from events.js, it's to specify the "page," 
      // so we might skip over some events to look at the next ten, for example.
      .skip ( 0/*10*req.data.pageNum*/ )
      // Results are returned as an array for use in angular ng-repeat in the template.
      .toArray(
        function(err, items) {
          events = items
          events.forEach(function(ev) {
            // this makes the time and date into a friendly, localized string.  Instead of showing milliseconds, it shows "8:00 P.M."
            // ev.time = ev.datetime.toLocaleTimeString()
            // ev.date = ev.datetime.toLocaleDateString()
            // MongoDB doesn't have a join query, so we have to use the event's creatorID to do a lookup on the user collection.
            // That lookup returns a single object, and we use its name property.
            ev.creator = DB.collection('users').find({ userID: ev.creatorID }).name
          })

          
          // events.push(items)
          // console.log('items',items)
          console.log('event',events)}
        )


    res.json(events)
	},

	newEvent: function(req, res) {
		// save event object passed in with http request from services.js
		Cevents.save(req.data.event)
	}


}

