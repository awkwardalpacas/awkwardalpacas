var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db

  // I added some console logs throughout this file to make it easier to debug; remove them whenever you want.
  console.log('connected')
})
var bcrypt = require('bcrypt')

// need to adjust this to match the connection, etc. in the events-controller file

module.exports = {
	signin: function(req, res) {
		var user = db.users.find({ name: req.body.username })
		bcrypt.compare(user.password, req.body.password, function(err, res) {
			if (err) throw err;
			console.log('logged in')

			// Need to figure out what to do about sessions here.  Probably will use express-sessions, or jwt.encode to generate token.
			// res.json({token: token})
		})
	},

	signup: function(req, res) {
    // console.log(req);
		var user = req.body 
    console.log(user);
		// auto-generate salt and hash password
		bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        // Store hash in user object. 
	        user.password = hash
					   DB.collection('users').insert(user)
          console.log(DB);
					// signin(user)
		    });
		});

	},

	// this will be used to view events that a user has already joined
	userEvents: function(req, res) {
		var eventIDs = db.users.find({ name: req.data.user.username }).eventIDs
		var events = []
		eventIDs.forEach(function(evID) {
			events.push(db.events.find({ eventID: evID }))
		})
		res.json(events)
	}
}
