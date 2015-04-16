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
      when('/', {
        templateUrl: 'client/app/events/eventsPage.html',
        controller: 'EventsController'
    }).
      when('/signup', {
        templateUrl: 'users/signup.html',
        controller: 'SignUpCtrl'
    }).
      when('/signin', {
        templateUrl: 'users/signin.html',
        controller: 'SignUpCtrl'
    }).otherwise({
        redirectTo: '/'
    });
}]);

