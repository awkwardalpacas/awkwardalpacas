var mongo = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var jwt  = require('jwt-simple');

var DB;

// this is a little weird - we're using the mongodb node module (in line 2), not the straight-up regular mongoDB stuff.  So just because a
// command works in the mongo shell, doesn't mean it will work here.  It looks like these are the correct docs:
// http://mongodb.github.io/node-mongodb-native/2.0/api/
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db

  // I added some console logs throughout this file to make it easier to debug; remove them whenever you want.
  console.log('connected')
})

module.exports = {
  allEvents: function(req, res) {
    var events = []

    var cursorCount = 0
    // this is the real first line, where only events happening in the future are fetched, but...
    // var getEvents = DB.collection('corgievent').find({ datetime: { $gt: Date.now() } })

    var iso = new Date();
    iso.setMinutes(iso.getMinutes()-30)
    iso = iso.toISOString();

    // ...for testing, we're just fetching everything.
    var options = { 'sort' : {'datetime': 1}}
    var getEvents = DB.collection('corgievent').find({ 'datetime': { $gt: iso}})
    // var getEvents = DB.collection('corgievent').find({ 'datetime': { $gt: iso}},options)
      // then sort time by ascending so we can get the events happening next...
      .sort({ datetime: 1 })
      // then limit the response to only ten.
      // If there is an argument passed from events.js, it's to specify the "page,"
      // so we might skip over some events to look at the next ten, for example.
      // get requests require passing stuff using the params header, so we have to parse the page number here.
     // Results are streamed.
      .stream();

    // number of items returned; used in if statement further down.
    getEvents.count(function(err, count) {
      cursorCount = count
    })

    // turns out we can use the collection.find stuff as a stream, just like any readstream or writestream in node.
    // http://mongodb.github.io/node-mongodb-native/2.0/tutorials/streams/
    getEvents.on('data', function(doc) {
      // we need another smaller stream to find the corresponding user from the corgiuser collection, using this event's

      // creator ID - so there should only be one result
      var foundUser = DB.collection('corgiuser').find({ _id: ObjectID(doc.creatorID) }).stream()
      // !!!!!!!! EXTREMELY IMPORTANT - THIS COST ME A LOT OF TIME !!!!!!!!
      // This logic only works if all of the events have a creatorID, and all creatorIDs correspond to the corgiuser collection.
      // If that is not the case - which happened to me when I was testing writing to the database - this next part will not work,
      // and your view will not be populated with any data whatsoever (unless you hard-code in a number in place of cursorCount in
      // the if-statement below).  It started working again when I deleted my test data from mongo.
      foundUser.on('data', function(user) {
        // we set this doc's creator to the name of the user that we found
        doc.creator = user.name

        //these logs might eventually be used to get a separate date and time from the mongo datetime object.
        //date
        // console.log(doc.datetime.slice(0,10))
        //time
        // console.log(doc.datetime.slice(11))

        // here we push to the events array, which is returned in res.json.
        events.push(doc)

        // if all found items are now in the events array, we can return the events.
        if (events.length === cursorCount) {
          res.json(events)
          console.log('check passed')
        }

        })

      })
  },

  newEvent: function(req, res) {
    var event = req.body.event;
    var userToken = req.body.token;
    event.chat=[{username:'test',messagekey: "this is a message"}]
    var username = jwt.decode(userToken, 'secret');

    var foundUser = DB.collection('corgiuser').find( {name: username} );

    foundUser.on('data', function (user) {
      // update creatorID and attendee list for event, then add to db
      var userInfo = {
        username: user.name
      };
      event.creatorID = user._id.toString();
      event.attendeeIDs = [userInfo];
      DB.collection('corgievent').insert(event);
      // return the event that was added; this makes for easy debugging in the console, where we can see the Network -> Response tabs
      res.json(event);
    });

    // save event object passed in with http request from services.js
  },

  joinEvent: function(req, res) {
    var eventID = req.body.event._id;
    var userToken = req.body.token;

    console.log('eventID: ', eventID);

    // decode userToken to get username
    var username = jwt.decode(userToken, 'secret');

    // look up user by username--could just add the name directly right now,
    // but keeping this code in case we want to store other user info later
    // such as a photo
    var foundUser = DB.collection('corgiuser').find( {name: username} );

    foundUser.on('data', function (user) {
      // var id = user._id.toString();
      /*TODO : check if already attending, and if true NO OP */
      DB.collection('corgievent').update({_id: ObjectID(eventID)}, { $addToSet: {attendeeIDs: {username: user.name} } });
      res.end();
    });

  }
}
