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
    return Event.createMap($scope.event.lat, $scope.event.lng, "map-canvas", $scope)
  }

  $scope.createMap();
});


.controller('chatCtrl',function($scope,Event){
  $scope.chats=[];
  $scope.init =function(){
    loadchats()
  
  }
  $scope.loadchats = function(){
    Event.loadEvent($scope);
    $scope.chat = Event.getChat($scope.event);
    setTimeout({console.log($scope.chats)},100);
  }
  $scope.init()
})