'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'signup/signup.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function($scope) {

  $scope.signup = function() {
    // User
  };

}]);