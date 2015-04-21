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

module.exports = {
  signin: function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    // find user in collection based on login name
    var foundUser = DB.collection('corgiuser').find({name: username});

    // this required a callback, etc. - didn't work when we just used !foundUser.count().
    foundUser.count(function(err,count) {
      // accounts for both 0 results or 'undefined'
      if(!count) {
        res.status(401).send('User does not exist')
      } else {
        foundUser.forEach(function (user) {
          // using the function from the user model, this is the only reason we haven't totally deleted mongoose - we could
          // easily use bcrypt compare instead.
          User.schema.methods.comparePasswords(password, user.password, res, user);
        });
      }
    })
  },

  signup: function(req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        newUser;

    // same exact logic as signin to check for existing users, but using different methods
    DB.collection('corgiuser').findOne({name: username}, function(err, result){
      // check to see if user already exists
      if (result) {
        res.status(401).send('User already exists!');
      } else {

        bcrypt.genSalt(10, function(err, salt) { //hard coded SALT_WORK_FACTOR to 10
          if (err) {
            res.status(404).send('error in genSalt: ', err);
          }

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

            DB.collection('corgiuser').insert(newUser);

            // on success, create token to send back for auth
            var token = jwt.encode(username, 'secret');
            res.json({token: token});
          });
        });
      }
    });
  },

	// this will eventually be used to view events that a user has already joined
	userEvents: function(req, res) {
		var eventIDs = db.users.find({ name: req.data.user.username }).eventIDs
		var events = []
		eventIDs.forEach(function(evID) {
			events.push(db.events.find({ eventID: evID }))
		})
		res.json(events)
	}
}
