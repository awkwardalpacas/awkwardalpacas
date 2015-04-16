var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    bcrypt = require('bcrypt-nodejs'),
    Q = require('q');

var db = mongoose.createConnection("mongodb://localhost:8000/corgi"); //connects to database called corgi

autoIncrement.initialize(db);  // required to get the tables to auto-increment for each new record (user or event)

var UserSchema = new Schema({
    userID : { type: Number, ref: 'userID'},
    name : String,
    password : String,
    eventIDs: [],
    salt: String
});

UserSchema.plugin(autoIncrement.plugin, 'userID');  // extends the UserSchema to include the auto-increment

var User = db.model('User', UserSchema);

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

UserSchema.pre('save', function (next) {  ///pre??
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) { //hard coded SALT_WORK_FACTOR to 10
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});


exports.User = mongoose.model('users', UserSchema);

/*
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
*/
