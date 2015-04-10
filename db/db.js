
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var db = mongoose.createConnection("mongodb://localhost:8000/db");

autoIncrement.initialize(connection);  // required to get the tables to auto-increment for each new record (user or event)


var UserSchema = new Schema({
    userID : Number,
    name : String,
    password : Number,
    eventIDs: []
});

var EventSchema = new Schema ({
	eventID : Number,
	description : String,
	location : String,
	time : String, 
	creatorID : Number,
	attendeeIDs : []
});

userSchema.plugin(autoIncrement.plugin, 'userID');  // extends the UserSchema to include the auto-increment
var User = db.model('User', UserSchema);

EventSchema.plugin(autoIncrement.plugin, 'eventID');  // extends the EventSchema to include the auto-increment
var Event = db.model('Event', EventSchema)

exports.User = mongoose.model('users', UserSchema);
exports.Event = mongoose.model('events', EventSchema);

/*
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
*/