angular.module('lunchCorgi.event', [])

.controller('eventController', function($scope, $location, Event, Events){
  $scope.event = {};

  $scope.loadEvent = function(){
    Event.loadEvent($scope)
  }

  $scope.loadEvents = function() {
    $location.path('/')
  }

  $scope.loadEvent();

  $scope.createMap = function(){
    // fake data
    // return Event.createMap(30.2958, -97.8101, "map-canvas", $scope)
    // real data will look something like this
    return Event.createMap($scope.newEvent.lat, $scope.newEvent.lgn, "map-canvas", $scope)
  }

  $scope.createMap();
});
