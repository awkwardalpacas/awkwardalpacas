angular.module('lunchCorgi.events', [])

.controller('EventsController', function($scope, $window, Events) {

  $scope.event = {}
  
  //if $scope.invalid is true, it will display an error message in the view
  $scope.invalid = false

  $scope.joinEvent = function(evt) {
    $scope.event = evt;
    console.log($scope.event);
    Events.joinEvent(evt);
  }

  $scope.addEvent = function() {
    // check that all fields in the events.html form are filled out
    if ($scope.event.description !== "" &&
        $scope.event.location !== "" &&
        $scope.event.datetime !== "" ) {
          $scope.invalid = false
        $scope.event.creator = $window.localStorage['com.corgi'];
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
    // send request to services.js, which in turn sends the actual http request to events-controller in the server.
    console.log($scope.pageNumber)
    Events.getEvents($scope.pageNumber)
    .then(function(data) {
      // set $scope.eventsList equal to the data we get back from our http request - that's how we 
      // populate the actual event views in the template.
      $scope.eventsList = data
    })
  }

  $scope.nextPage = function() {
    // need some way to limit how many pages people can go forward; it seems to get messed up if people 
    // navigate past where there are no more results to show.
    $scope.pageNumber++
    $scope.viewAllEvents()
  }
  
  $scope.prevPage = function() {
    // only go back a page if the page number is greater than 0
    if ($scope.pageNumber > 0) {
      $scope.pageNumber--
      $scope.viewAllEvents()
    }
  }
  
  // show events when the page is first loaded.
  $scope.viewAllEvents()
})
