var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = mongoose.createConnection(process.env.MONGOLAB_URI || "mongodb://localhost/corgi"); //connects to database called corgi

autoIncrement.initialize(connection);  // required to get the tables to auto-increment for each new record (user or event)

var EventSchema = new Schema ({
	eventID : { type: Number, ref: 'eventID'},
	description : String,
  	number: Number,
	location : String,
	datetime: Date,
	creatorID : Number,
	attendeeIDs : []
});

EventSchema.plugin(autoIncrement.plugin, 'eventID');  // extends the EventSchema to include the auto-increment
var Event = db.model('Event', EventSchema)
exports.Event = mongoose.model('events', EventSchema);
