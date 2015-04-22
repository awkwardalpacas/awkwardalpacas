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
// test comment
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