var mongoose = require('mongoose');
// var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi
// var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var jwt  = require('jwt-simple');
var User = require('./users.js').User;

var mongo = require('mongodb').MongoClient

var DB;

// this is a little weird - we're using the mongodb node module (in line 2), not the straight-up regular mongoDB stuff.  So just because a
// command works in the mongo shell, doesn't mean it will work here.  It looks like these are the correct docs:
// http://mongodb.github.io/node-mongodb-native/2.0/api/
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db;

  // I added some console logs throughout this file to make it easier to debug; remove them whenever you want.
  console.log('connected')
})

// need to adjust this to match the connection, etc. in the events-controller file

module.exports = {
	signin: function(req, res) {
	  var username = req.body.username,
        password = req.body.password;

    var foundUser = DB.collection('corgiuser').find({name: username});

    if ( foundUser.count() === 0 ) {
      res.status(404).send('User does not exist');
    } else {
      var match = User.schema.methods.comparePasswords(username, password);
        
      if (match) {
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      } else {
        res.status(404).send('No user');
      }
    }

	},

	signup: function(req, res, next) {
		var username  = req.body.username,
        password  = req.body.password,
        newUser;

    var response = res;

    console.log("this is the user in the users-controller: ", req.body);

    DB.collection('corgiuser').findOne({name: username}, function(err, result){
      if (err) { new ERROR();};
      // check to see if user already exists
      if (result) {
        next(new Error('User already exists!'));
      } else {

        // make a new user if not one
        var newUser = new User({
          name: username,
          password: password
        });

        User.create(newUser, function (err, user) {
          if (err) {
            response.status(404).send('user was not saved!');
          }
          // create token to send back for auth
          var token = jwt.encode(password, 'secret');
          response.json({token: token});
        });

      }
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
