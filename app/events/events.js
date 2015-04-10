angular.module('lunchCorgi.events', [])

.controller('eventsController', function($scope, Events) {

	$scope.event = {}
	
	//if $scope.invalid is true, it will display an error message in the view
	$scope.invalid = false

	$scope.addEvent = function() {
		// check that all fields in the events.html form are filled out
		if ($scope.event.location !== "" &&
				$scope.event.date !== "" &&
				$scope.event.time!== "" ) {
					$scope.invalid = false
					Events.addEvent($scope.event)
					.then(function(newEvent) {
						$scope.event = newEvent
					})
				} else {
					$scope.invalid = true
				}			
	}
})