angular.module('lunchCorgi.services', [])

.factory('Events', function($http) {
	var getEvents = function() {};

	var addEvent = function(event) {
	    return $http({
    		method: 'POST',
    		url: '/api/events', //this route may need to be changed once routes are created
    		data: {event: event}
    	})
    	.then(function (resp) {
    	return resp.statusCode;
    	});
	}


	return {
		getEvents : getEvents,
		addEvent : addEvent
	}

})