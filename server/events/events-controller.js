var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:8000/corgi"); //connects to database called corgi

module.exports = {
	allEvents: function(req, res) {
    var events = db.corgievent.find({ datetime: { $gt: Date.now() } })
      // then sorts time by ascending so we can get the events happening next...
      .sort({ datetime: 1 })
      // then limits the response to only ten.
      .limit( 10 )
      // If there is an argument passed from events.js, it's to specify the "page," 
      // so we might skip over some events to look at the next ten, for example.
      .skip ( 10*req.data.pageNum )
      // Results are returned as an array for use in angular ng-repeat in the template.
      .toArray()

    events.forEach(function(ev) {
      // this makes the time and date into a friendly, localized string.  Instead of showing milliseconds, it shows "8:00 P.M."
      ev.time = ev.datetime.toLocaleTimeString()
      ev.date = ev.datetime.toLocaleDateString()
      // MongoDB doesn't have a join query, so we have to use the event's creatorID to do a lookup on the user collection.
      // That lookup returns a single object, and we use its name property.
      ev.creator = db.corgiuser.find({ userID: ev.creatorID }).name
    })

    res.json(events)
	},

	newEvent: function(req, res) {
		// save event object passed in with http request from services.js
		db.corgievent.save(req.data.event)
	}


}

