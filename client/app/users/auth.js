'use strict';

angular.module('lunchCorgi.signup', ['ngRoute'])

.controller('SignUpCtrl', function ($scope, $window, $location, Users) {
  $scope.user = {};

  $scope.signin = function () {
    Users.signin($scope.user)
      .then(function (token) {
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
        $location.path('/');
      })
      .catch(function(error){
        console.log(error);
      });
  };

});