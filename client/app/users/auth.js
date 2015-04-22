'use strict';

angular.module('lunchCorgi.signup', ['ngRoute', ])

.controller('SignUpCtrl', function ($scope, $window, $location, Users, Events) {
  $scope.user = {};

  $scope.signedIn = function() {
    return !!$window.localStorage['com.corgi']
  };

  $scope.signin = function () {
    Users.signin($scope.user)
      // .then(function(){
      //   Username.user=$scope.user.username
      // })
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
    Users.getProfile($scope.user)
      .then(function(data){
        console.log(data)
      })
  }

});




