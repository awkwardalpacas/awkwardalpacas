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
})


.controller('chatCtrl',function($scope, $window, Event){

  $scope.loadchats = function(){

    Event.getChat(
      function(value){$scope.chats =value.data;
    });

  }
  $scope.init =function(){
    $scope.loadchats()
    setInterval($scope.loadchats,5000)
  }
  $scope.sendmessage =function(){
    var text =$scope.textinput
    $scope.textinput =""
    var userToken = $window.localStorage.getItem('com.corgi')
    Event.sendChat(userToken,text,function(){
      $scope.loadchats();
    })
  }
  $scope.init()
})