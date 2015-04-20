angular.module('lunchCorgi.events', [])

.controller('EventsController', function($scope, Events) {

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
    // need to add a check to make sure user is logged in
    if ($scope.newEvent.description !== "" &&
        $scope.newEvent.location !== "" &&
        $scope.newEvent.datetime !== "" ) {
          $scope.invalid = false
          Events.addEvent($scope.newEvent)
          .then(function(newEvent) {
            // return to defaults - might put this all in an init() function
            $scope.newEvent = {}
            $scope.newEvent.description = 'Describe the event.'
            $scope.newEvent.location = 'Where is the event?'
            $scope.newEvent.time = (new Date()).toTimeString().substr(0,5)
            $scope.newEvent.date = (new Date()).toISOString().substr(0,10)
          })
        } else {
          $scope.invalid = true
        }     
  }

  // first page of events is page number 0; when more events are viewed, the page number is increased
  $scope.pageNumber = 0

  // eventsList is an array used in the template (with ng-repeat) to populate the list of events.
  $scope.eventsList = {}
  $scope.newEvent = {}
  $scope.newEvent.description = 'Describe the event.'
  $scope.newEvent.location = 'Where is the event?'
  $scope.newEvent.time = (new Date()).toTimeString().substr(0,5)
  $scope.newEvent.date = (new Date()).toISOString().substr(0,10)

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
