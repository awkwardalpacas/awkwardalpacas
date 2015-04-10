angular.module('lunchCorgi.events', [])

.controller('eventsController', function($scope, Events) {

	$scope.event = {}

	$scope.addEvent = function() {
		Events.addEvent($scope.event.url)
		.then(function(newEvent) {
			$scope.event = newEvent
		})
	}

})