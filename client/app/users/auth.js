'use strict';

angular.module('lunchCorgi.signup', ['ngRoute'])

.directive('modalDialog2', function() {
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

.controller('SignUpCtrl', function ($scope, $window, $location, $sce, Users, Events) {
  $scope.attendees = true;

  $scope.event = {}

  $scope.modalShown = false;

  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };

  $scope.user = {};

  $scope.signedIn = function() {
    return !!$window.localStorage['com.corgi']
  };

  $scope.signin = function () {
    localStorage.setItem('username', $scope.user.username)
    Users.signin($scope.user)
    .then(function (token) {
      var obj={
        token: token,
        username: $scope.user.username
      }
      localStorage.setItem('com.corgi', JSON.stringify(obj));
      $location.path('/');
    })
    .catch(function (error) {
      if (error.status === 401) {
        $scope.loginError = true;
      }
      console.error(error);
    });
  };

  $scope.signup = function() {
    
    localStorage.setItem('username', $scope.user.username)
    Users.signup($scope.user)
    .then(function(token){
      var obj={
        token: token,
        username: $scope.user.username
      }
      localStorage.setItem('com.corgi', JSON.stringify(obj));
      $location.path('/');
    })
    .catch(function (error) {
      if (error.status === 401) {
        $scope.signupError = true;
      }
      console.error(error);
    });
  };

  $scope.signout = function() {
    localStorage.removeItem('com.corgi');
    $location.path('/signin');
  }

  $scope.profile = function() {
    var user = {user : localStorage.getItem('username')}
    Users.getProfile(JSON.stringify(user))
    .then(function(data){
      $scope.userEventsList = data;
      $scope.username = user.user;
    })
  }

  $scope.renderMap = function(location){
    $scope.map = $sce.trustAsHtml('<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q='+location+'&key=AIzaSyDLun535FCG-VEepOE94GqSvWZqsBMw0zM"></iframe>')
  };
  $scope.profile();

});




