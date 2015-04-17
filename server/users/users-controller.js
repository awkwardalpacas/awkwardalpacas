var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi
var bcrypt = require('bcrypt')

// need to adjust this to match the connection, etc. in the events-controller file

module.exports = {
	signin: function(req, res) {
		var user = db.users.find({ name: req.data.user.username })
		bcrypt.compare(user.password, req.data.user.password, function(err, res) {
			if (err) throw err;
			console.log('logged in')

			// Need to figure out what to do about sessions here.  Probably will use express-sessions, or jwt.encode to generate token.
			// res.json({token: token})
		})
	},

	signup: function(req, res) {
		var user = req.data.user 

		// auto-generate salt and hash password
		bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        // Store hash in user object. 
	        user.password = hash
					db.users.save(user)
					signin(user)
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
