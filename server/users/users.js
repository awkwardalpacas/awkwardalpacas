var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    bcrypt = require('bcrypt-nodejs'),
    Q = require('q');

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

UserSchema.methods.comparePasswords = function (username, candidatePassword) {
  console.log("We're in comparePasswords, woo!");

  var foundUser = db.collection('corgiuser').find({name: username}).limit(1);

  foundUser.on('data', function (user) {
    var savedPassword = user.hashedpassword;
    console.log("candidatePassword, savedPassword: ", candidatePassword, savedPassword);

    var match;

    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        console.log(err);
      } else {
        console.log(isMatch);
      }
    });

  return match;
  });
};

module.exports = mongoose.model('User', UserSchema);
