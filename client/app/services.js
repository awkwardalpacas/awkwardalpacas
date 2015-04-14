angular.module('lunchCorgi.services', [])

.factory('Events', function($http) { //when routes are created, we might not use the $http stuff - TBD
	
  // need to figure out how this will point to the correct MongoDB path.  
  // this function finds events with time greater than now (that's what Date.now is)...
  var getEvents = function(pageNum) {
    var events = db.events.find({ time: { $gt: Date.now() } })
      // then sorts time by ascending so we can get the events happening next...
      .sort({ time: 1 })
      // then limits the response to only ten.
      .limit( 10 )
      // If there is an argument passed from events.js, it's to specify the "page," 
      // so we might skip over some events to look at the next ten, for example.
      .skip ( 10*pageNum )
      // Results are returned as an array for use in angular ng-repeat in the template.
      .toArray()

    events.forEach(function(ev) {
      // this makes the time and date into a friendly, localized string.  Instead of showing milliseconds, it shows "8:00 P.M."
      ev.time = ev.datetime.toLocaleTimeString()
      ev.date = ev.datetime.toLocaleDateString()
      // MongoDB doesn't have a join query, so we have to use the event's creatorID to do a lookup on the user collection.
      // That lookup returns a single object, and we use its name property.
      ev.creator = db.users.find({ userID: ev.creatorID }).name
    })

    return events
  };

	var addEvent = function(event) {
	    return $http({
    		method: 'POST',
    		url: '/api/events', //this route may need to be changed once routes are created
    		data: {event: event}
    	})
    	.then(function (resp) {
	    	//we don't really need to return anything here, but maybe we'll redirect to the newly created event page or something
    		return resp.statusCode; 
    	});
	}

	// return all of our methods as an object, so we can use them in our controllers
	return {
		getEvents : getEvents,
		addEvent : addEvent
	}

})
.factory('Users', function($http){
  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    }).then(function (resp) {
      return resp.data.token;
    });
  }

  return {
    signup: signup
  }
})