angular.module('lunchCorgi.events', [])

.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
})

.controller('EventsController', function ($scope, $window, $location, $sce, Events, $http) {

  $scope.attendees = true;
  $scope.event = {}
  $scope.modalShown = false;

  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
  //if $scope.invalid is true, it will display an error message in the view
  // $scope.invalid = false

  $scope.remind=function(event){
    var description = event.description,
        date = new Date(),
        orig_time = new Date(event.datetime),        
        newTime = new Date(orig_time.setHours(orig_time.getHours()-1)),
        cronTime = '0 ',
        month = newTime.getMonth(),
        day = newTime.getDate(),
        hours = newTime.getHours(),
        min = newTime.getMinutes();

    cronTime += min + ' ' + hours + ' ' + day + ' ' + month + ' *'

    $http({
      method: 'POST',
      url:'/api/reminder',
      data: {user:localStorage.getItem("username"),
      eventName: description, cronTime: cronTime}
    }).then(function(res){ console.log('post results : ', res.data) })  
  }

  $scope.joinEvent = function(evt) {
    $scope.event = evt;
    var userToken = localStorage.getItem('token');
    Events.joinEvent(evt, userToken);
    $scope.viewAllEvents();
  }

  $scope.addEvent = function() {
    if ($scope.newEvent.description !== "" && $scope.newEvent.location !== "" && $scope.newEvent.date !== "" && $scope.newEvent.time !== "" ){
      $scope.invalid = false;
      var userToken = localStorage.getItem('token');

      Events.addEvent($scope.newEvent, userToken)
      .then(function(newEvent) {
        $scope.valid = true;
        $scope.viewAllEvents();
        $scope.initNewEventForm();
      });
    } else {
      $scope.invalid = true;
    }     
  }

  // first page of events is page number 0; when more events are viewed, the page number is increased
  $scope.pageNumber = 0;
  // eventsList is an array used in the template (with ng-repeat) to populate the list of events.
  $scope.eventsList = {};

  $scope.initNewEventForm = function() {
    $scope.newEvent = {};
    $scope.newEvent.description = '';
    $scope.newEvent.location = '';
    $scope.newEvent.time = '';
    $scope.newEvent.date = '';
  }

  $scope.viewAllEvents = function() {
    if (localStorage.getItem('token')) {
      Events.getEvents($scope.pageNumber)
      .then(function(data) {
        $scope.eventsList = data;
      });
    } else {
      $location.path('/signin');
    }
  };

  $scope.nextPage = function() {
    $scope.pageNumber++
    $scope.viewAllEvents()
  };
  
  $scope.prevPage = function() {
    if ($scope.pageNumber > 0) {
      $scope.pageNumber--
      $scope.viewAllEvents()
    }
  };

  $scope.renderMap = function(location){
    $scope.map = $sce.trustAsHtml('<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q='+location+'&key=AIzaSyDLun535FCG-VEepOE94GqSvWZqsBMw0zM"></iframe>')
    console.log(location)
  };
  
  // show events when the page is first loaded.
  $scope.viewAllEvents()
  // populate new event form with default values
  $scope.initNewEventForm()
})





