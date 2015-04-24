var mongo = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var jwt  = require('jwt-simple');

var DB;

mongo.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db
  console.log('connected')
})

module.exports = {
	allEvents: function(req, res) {
    var events = [],
        cursorCount = 0,
        iso = (new Date()).toISOString();
    
    var options = { 'sort' : {'datetime': 1}, 'limit': 10}
    var getEvents = DB.collection('corgievent').find({ 'datetime': { $gt: iso}})
      //var getEvents = DB.collection('corgievent').find({ 'datetime': { $gt: iso}},options)
      .sort({ datetime: 1 }) // then sort time by ascending so we can get the events happening next...
      .limit( 10 )  // then limit the response to only ten.
      .skip ( 10*(+req.query.pageNum) )
      .stream(); // Results streamed

    // number of items returned; used in if statement further down.
    getEvents.count(function(err, count) {
      cursorCount = count
    })

    getEvents.on('data', function(doc) {
      // creator ID - so there should only be one result
      var foundUser = DB.collection('corgiuser').find({ _id: ObjectID(doc.creatorID) }).stream()
      foundUser.on('data', function(user) {
        // we set this doc's creator to the name of the user that we found
        doc.creator = user.name
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
    var event = req.body.event,
        userToken = req.body.token,
        username = jwt.decode(userToken, 'secret'),
        foundUser = DB.collection('corgiuser').find( {name: username} );

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
	},

  joinEvent: function(req, res) {
    var eventID = req.body.event._id,
        userToken = req.body.token,
        username = jwt.decode(userToken, 'secret'),
        foundUser = DB.collection('corgiuser').find( {name: username} );

    foundUser.on('data', function (user) {
      console.log('user: ', user);

      if (user.eventIDs && user.eventIDs.indexOf(eventID) > -1){ //if user eventID's include 
        DB.collection('corgiuser').update({name: username}, 
          { $pull: {eventIDs: eventID} } )
          console.log('removing event')
      } else {
        DB.collection('corgievent').update({_id: ObjectID(eventID)}, { $addToSet: {attendeeIDs: {username: user.name} } });      
        DB.collection('corgiuser').update({name: username}, { $addToSet: {eventIDs: eventID} });
      }     
      res.end();
    });
  }
}








