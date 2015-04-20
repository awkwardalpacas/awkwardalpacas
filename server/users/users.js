var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    bcrypt = require('bcrypt-nodejs'),
    Q = require('q'),
    jwt  = require('jwt-simple');

var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi

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

UserSchema.methods.comparePasswords = function (password, savedPassword, res) {
  console.log("in comparePasswords; password, savedPassword: ", password, savedPassword);

  bcrypt.compare(password, savedPassword, function (err, isMatch) {
    if (err) {
      res.status(404).send('No user');
    }
    console.log("isMatch: ", isMatch);

    var token = jwt.encode(savedPassword, 'secret');
    res.json({token: token});
  });
};

module.exports = mongoose.model('User', UserSchema);
