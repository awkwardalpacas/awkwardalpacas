var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    bcrypt = require('bcrypt-nodejs'),
    Q = require('q'),
    jwt  = require('jwt-simple');

var db = mongoose.createConnection('mongodb://localhost:27017/corgi'); //connects to database called corgi

autoIncrement.initialize(db);  // required to get the tables to auto-increment for each new record (user or event)

var UserSchema = new mongoose.Schema({
    userID : { type: Number, ref: 'userID'},
    name : String,
    password : String,
    eventIDs: [],
    salt: String
});

UserSchema.plugin(autoIncrement.plugin, 'userID');  // extends the UserSchema to include the auto-increment

var User = db.model('User', UserSchema);

UserSchema.methods.comparePasswords = function (password, savedPassword, res, user) {

  bcrypt.compare(password, savedPassword, function (err, isMatch) {
    if (err || !isMatch) {
      res.status(401).send('No user');
    }
    if ( isMatch ) {
      var token = jwt.encode(user.name, 'secret');
      res.json({token: token});
    } else {
      res.status(401).send('Incorrect password.');
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
