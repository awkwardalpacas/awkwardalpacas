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
    // return Event.createMap($scope.event.latitude, $scope.event.longitude)
    return Event.createMap(30.2958, -97.8101)
  }

  $scope.createMap();
});
