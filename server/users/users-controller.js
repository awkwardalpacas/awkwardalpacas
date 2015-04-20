var mongoose = require('mongoose');
// var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi
// var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var User = require('./users.js');
var jwt  = require('jwt-simple');

var mongo = require('mongodb').MongoClient

var DB;

// this is a little weird - we're using the mongodb node module (in line 2), not the straight-up regular mongoDB stuff.  So just because a
// command works in the mongo shell, doesn't mean it will work here.  It looks like these are the correct docs:
// http://mongodb.github.io/node-mongodb-native/2.0/api/
mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db;

})

// need to adjust this to match the connection, etc. in the events-controller file

module.exports = {
  signin: function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    var foundUser = DB.collection('corgiuser').find({name: username});

    if ( foundUser.count() === 0 ) {
      res.status(401).send('User does not exist');
    } else {

      foundUser.forEach(function (user) {
        User.schema.methods.comparePasswords(password, user.password, res);
      });
    }
  },

  signup: function(req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        newUser;

    DB.collection('corgiuser').findOne({name: username}, function(err, result){
      // check to see if user already exists
      if (result) {
        res.status(401).send('User already exists!');
      } else {

        bcrypt.genSalt(10, function(err, salt) { //hard coded SALT_WORK_FACTOR to 10          
          if (err) {
            res.status(404).send('error in genSalt: ', err);
          }

          console.log("this is the salt: ", salt);
          // hash the password along with our new salt
          bcrypt.hash(password, salt, null, function(err, hash) {
            if (err) {
              res.status(404).send('Error in hash fcn: ', err);
            }

            // override the cleartext password with the hashed one
            newUser = ({
              name: username,
              password: hash,
              salt: salt
            });

            console.log("what newUser looks like at the end of bcrypt hash:", newUser);
            // make a new user if not one

            // User.create(user, function (err, user) {
            //   console.log("inside User.create function!");
            //   if (err) {
            //     response.status(404).send('User was not saved!');
            //   }
            //   // on success, create token to send back for auth
            //   var token = jwt.encode(password, 'secret');
            //   response.json({token: token});
            // });

            DB.collection('corgiuser').insert(newUser);

            // on success, create token to send back for auth
            var token = jwt.encode(password, 'secret');
            res.json({token: token});
          });
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
