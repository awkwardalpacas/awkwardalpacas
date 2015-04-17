var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient

var DB;

// this is a little weird - we're using the mongodb node module, not the straight-up regular mongoDB stuff.  So just because a
// command works in the mongo shell, doesn't mean it will work here.  It looks like these are the correct docs:
// http://mongodb.github.io/node-mongodb-native/2.0/api/
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  DB = db
})

module.exports = {
	allEvents: function(req, res) {
    var events = []
    // this is the real first line, but line 33 is being used for testing
    // var getEvents = DB.collection('corgievent').find({ datetime: { $gt: Date.now() } })
    var getEvents = DB.collection('corgievent').find({ eventID: { $gt: 3 } })
      // then sorts time by ascending so we can get the events happening next...
      .sort({ datetime: 1 })
      // then limits the response to only ten.
      .limit( 10 )
      // If there is an argument passed from events.js, it's to specify the "page," 
      // so we might skip over some events to look at the next ten, for example.
      .skip ( 0 /*10*req.body.pageNum*/ )
      // Results are streamed.
      .stream();

    // turns out we can use the collection.find stuff as a stream, just like any readstream or writestream in node.
    // http://mongodb.github.io/node-mongodb-native/2.0/tutorials/streams/
    getEvents.on('data', function(doc) {
      // we need to find the corresponding user from the corgiuser collection, using this event's creator ID
      var foundUser = DB.collection('corgiuser').find({ userID: doc.creatorID }).stream()
      foundUser.on('data', function(user) {
        // we set this doc's creator to the name of the user that we found
        doc.creator = user.name
        events.push(doc)
        if (events.length === 10) { //this only makes sense if we're always returning 10 items.  you can do a fancy version with the cursor.count method.
          res.json(events)
        }
      })
    })
	},

	newEvent: function(req, res) {
		// save event object passed in with http request from services.js
		DB.collection('corgievent').insert(req.body.event)
    res.end(req.body.event)
	}


}

