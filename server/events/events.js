var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var db = mongoose.createConnection("mongodb://heroku_app36102509:m3ei2epf1460981rpihk0egjsd@ds041377.mongolab.com:41377/heroku_app36102509"); //connects to database called corgi

autoIncrement.initialize(connection);  // required to get the tables to auto-increment for each new record (user or event)


var EventSchema = new Schema ({
	eventID : { type: Number, ref: 'eventID'},
	description : String,
	location : String,
	datetime: Date,
	creatorID : Number,
	attendeeIDs : [],
  lat: Double,
  lng: Double
});

EventSchema.plugin(autoIncrement.plugin, 'eventID');  // extends the EventSchema to include the auto-increment
var Event = db.model('Event', EventSchema)

exports.Event = mongoose.model('events', EventSchema);
