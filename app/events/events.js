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

	// first page of events is page number 0; when more events are viewed, the page number is increased
	$scope.pageNumber = 0

	// eventsList is an array used in the template (with ng-repeat) to populate the list of events.
	$scope.eventsList = {}

	$scope.viewAllEvents = function() {
		$scope.eventsList = Events.getEvents($scope.pageNumber)
		$scope.pageNumber++
	}

	$scope.viewAllEvents()
})