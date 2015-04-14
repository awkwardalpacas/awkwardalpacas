'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.signup'/*,
  'myApp.events'*/
  ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignUpCtrl'
    })/*.
  $routeProvider.otherwise({redirectTo: '/signup'});*/
}]);

