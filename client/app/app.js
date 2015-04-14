'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.signup',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignUpCtrl'
    }).
  $routeProvider.otherwise({redirectTo: '/signup'});
}]);
