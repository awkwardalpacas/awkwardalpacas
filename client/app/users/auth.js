'use strict';

angular.module('lunchCorgi.signup', ['ngRoute'])

.controller('SignUpCtrl', function ($scope, $window, $location, Users) {
  $scope.user = {};
  $scope.signedIn = false;

  $scope.signin = function () {
    Users.signin($scope.user)
      .then(function (token) {
        $scope.signedIn = true;
        $window.localStorage.setItem('com.corgi', token);
        $location.path('/');  
      })
      .catch(function (error) {
        if(error.status === 401){
        alert("Incorrect Username or Password.")
        }
        console.error(error);
      });
  };

  $scope.signup = function() {
    Users.signup($scope.user)
      .then(function(token){
        $window.localStorage.setItem('com.corgi', token);
        $scope.signedIn = true;
        $location.path('/');
        })
      .catch(function(error){
        console.log(error);
    });
  };


  $scope.signout = function() {
    $scope.signedIn = false;
    $window.localStorage.setItem('com.corgi','');
    $location.path('/');
  }

});

