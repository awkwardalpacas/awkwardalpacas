angular.module('lunchCorgi.events', [])

.controller('eventController', function($scope, Event, Events){
  $scope.event = {};

  $scope.loadEvent = function(){
    Event.loadEvent($scope)
  }

  $scope.loadEvent();



});
