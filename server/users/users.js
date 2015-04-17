var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi

autoIncrement.initialize(connection);  // required to get the tables to auto-increment for each new record (user or event)


var UserSchema = new Schema({
    userID : { type: Number, ref: 'userID'},
    name : String,
    password : String,
    eventIDs: []
});

userSchema.plugin(autoIncrement.plugin, 'userID');  // extends the UserSchema to include the auto-increment
var User = db.model('User', UserSchema);

exports.User = mongoose.model('users', UserSchema);

/*
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
*/
