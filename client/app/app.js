'use strict';

// Declare app level module which depends on views, and components
var lunchCorgi = angular.module('lunchCorgi', [
  'ngRoute',
  'lunchCorgi.services',
  'lunchCorgi.events',
  'lunchCorgi.signup'
  ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/signup', {
        templateUrl: 'users/signup.html',
        controller: 'SignUpCtrl'
    }).
      when('/events', {
        templateUrl: 'events/addEvent.html',
        controller: 'EventsController'
    }).otherwise({
        redirectTo: '/signin'
    });
}]);

