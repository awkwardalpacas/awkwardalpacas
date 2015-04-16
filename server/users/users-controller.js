var mongoose = require('mongoose');
// var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi
// var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var jwt  = require('jwt-simple');
var User = require('./users.js');

module.exports = {
	signin: function(req, res) {
	  var username = req.data.username,
        password = req.data.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
	},

	signup: function(req, res) {  //looks in req.data.user to get user password and name
		// var user = req.data.user 
		var username  = req.data.username,
        password  = req.data.password,
        create,
        newUser;

	    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        // next(error);
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
