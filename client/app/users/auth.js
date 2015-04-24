'use strict';

angular.module('lunchCorgi.signup', ['ngRoute'])

.controller('SignUpCtrl', function ($scope, $window, $location, $sce, Users, Events) {
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




