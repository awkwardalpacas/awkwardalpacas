'use strict';

angular.module('lunchcorgi.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignUpCtrl'
  });
}])

.controller('SignUpCtrl', [function($scope) {
  $scope.user = {};

  $scope.signup = function() {
    Users.signup($scope.user)
      .then(function(token){
        $window.localStorage.setItem('com.myApp', token);
        $location.path('/links');
      })
      .catch(function(error){
        console.log(error);
      });
  };

}]);