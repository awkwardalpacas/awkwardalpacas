angular.module('lunchCorgi.event', [])

.controller('eventController', function($scope, Event, Events){
  $scope.event = {};

  $scope.loadEvent = function(){
    Event.loadEvent($scope)
  }

  $scope.loadEvent();



});
