var bcrypt = require('bcrypt-nodejs'),
    Q = require('q'),
    User = require('./users.js'),
    jwt  = require('jwt-simple'),
    ObjectID = require('mongodb').ObjectID,
    mongo = require('mongodb').MongoClient,
    DB;

mongo.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/corgi', function(err, db) {
  if (err) throw err;
  DB = db;
})

module.exports = {
  signin: function(req, res) {
    var username = req.body.username,
        password = req.body.password,
        foundUser = DB.collection('corgiuser').find({name: username});

    foundUser.count(function(err,user) {
      if(!user) {
        res.status(401).send('User does not exist')
      } else {
        foundUser.forEach(function (user) {
          User.schema.methods.comparePasswords(password, user.password, res, user);
        });
      }
    })
  },

  signup: function(req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        phone = req.body.phone,
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

          // hash the password along with our new salt
          bcrypt.hash(password, salt, null, function(err, hash) {
            if (err) {
              res.status(404).send('Error in hash fcn: ', err);
            }

            // override the cleartext password with the hashed one
            newUser = ({
              name: username,
              password: hash,
              phone: phone,
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

	userEvents: function(req, res) {
    var username = req.body.user,
        found = DB.collection('corgiuser').find({name: username});

    found.on('data', function(user){
      console.log(user);
      var events = [];
      if(user.eventIDs){
        user.eventIDs.map(function(evID) {
          var find = DB.collection('corgievent').find({"_id" : ObjectID(evID)});
          find.on('data', function(ev){
            events.push(ev);
            if(events.length === user.eventIDs.length){
              res.send(events)
            }
          });
        });
      }
       else {
        // silently end response for users with no saved events
        res.end();
      }
    });       
	}

}






