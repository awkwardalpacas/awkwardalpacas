'use strict';

// Declare app level module which depends on views, and components
var lunchCorgi = angular.module('lunchCorgi', [
  'ngRoute',
  'lunchCorgi.services',
  'lunchCorgi.events',
  'lunchCorgi.event',
  'lunchCorgi.signup'
  ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {
        templateUrl: 'client/app/events/eventsPage.html',
        controller: 'EventsController'
    }).
      when('/signup', {
        templateUrl: 'client/app/users/signup.html',
        controller: 'SignUpCtrl'
    }).
      when('/signin', {
        templateUrl: 'client/app/users/signin.html',
        controller: 'SignUpCtrl'
    }).
      when('/event', {
        templateUrl: 'client/app/event/event.html',
        controller: 'eventController'
    }).otherwise({
        redirectTo: '/'
    });
}]);

