'use strict';

angular.module('lunchCorgi.signup', ['ngRoute'])

.controller('SignUpCtrl', function ($scope, $window, $location, Users, Events, Username) {
  $scope.user = {};

  $scope.signedIn = function() {
    return !!$window.localStorage['com.corgi']
  };

  $scope.signin = function () {
    Username.user = $scope.user.username
    Users.signin($scope.user)
      // .then(function(){
      //   Username.user=$scope.user.username
      // })
      .then(function (token) {
        $window.localStorage.setItem('com.corgi', token);
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
    Username.user=$scope.user.username
    Users.signup($scope.user)
      .then(function(token){
        $window.localStorage.setItem('com.corgi', token);
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
    $window.localStorage.removeItem('com.corgi');
    $location.path('/signin');
  }

  $scope.profile = function() {
    Users.getProfile($scope.user)
      .then(function(data){
        console.log(data)
      })
  }

});




