var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient

var DB;

// this is a little weird - we're using the mongodb node module (in line 2), not the straight-up regular mongoDB stuff.  So just because a
// command works in the mongo shell, doesn't mean it will work here.  It looks like these are the correct docs:
// http://mongodb.github.io/node-mongodb-native/2.0/api/
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;

  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db
})

module.exports = {
	allEvents: function(req, res) {
    var events = []
    // this is the real first line, where only events happening in the future are fetched, but...
    // var getEvents = DB.collection('corgievent').find({ datetime: { $gt: Date.now() } })
    
    // ...for testing, we're just fetching everything.
    var getEvents = DB.collection('corgievent').find()
      // then sort time by ascending so we can get the events happening next...
      .sort({ datetime: 1 })
      // then limit the response to only ten.
      .limit( 10 )
      // If there is an argument passed from events.js, it's to specify the "page," 
      // so we might skip over some events to look at the next ten, for example.
      .skip ( 10*req.body.pageNum )
      // Results are streamed.
      .stream();

    // turns out we can use the collection.find stuff as a stream, just like any readstream or writestream in node.
    // http://mongodb.github.io/node-mongodb-native/2.0/tutorials/streams/
    getEvents.on('data', function(doc) {
      // we need another smaller stream to find the corresponding user from the corgiuser collection, using this event's 
      // creator ID - so there should only be one result
      var foundUser = DB.collection('corgiuser').find({ userID: doc.creatorID }).stream()
      foundUser.on('data', function(user) {
        // we set this doc's creator to the name of the user that we found
        doc.creator = user.name

        //these logs might eventually be used to get a separate date and time from the mongo datetime object.
        //date
        console.log(doc.datetime.slice(0,10))
        //time
        console.log(doc.datetime.slice(11))

        // here we push to the events array, which is returned in res.json.
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
    // return the event that was added; this makes for easy debugging in the console, where we can see the Network -> Response tabs
    res.json(req.body.event)
	}


}

