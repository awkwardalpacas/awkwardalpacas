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

UserSchema.pre('save', function (next) {  ///pre??
  console.log('pre-hashing gets called, oh boy');
  var user = this;
  console.log("user in pre-hashing: ", user);
  // console.log("user.isModified: ", user.isModified('hashedpassword'));

  // // only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) {
  //   return next();
  // }

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) { //hard coded SALT_WORK_FACTOR to 10
    if (err) {
      console.log('error in genSalt: ', err);
    }

    console.log("this is the salt: ", salt);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        console.log('error in hash fcn: ', err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      console.log("what user looks like at the end of bcrypt hash:", user);
    });

    console.log("we're at the end of this crazy function called genSalt");
  });

  console.log("we're at the end of the pre save function");
});


module.exports.User = mongoose.model('users', UserSchema);

/*
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
*/
