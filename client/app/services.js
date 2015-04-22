angular.module('lunchCorgi.services', [])

.factory('Events', function($http) {
  // these factory functions can be tested in the console with the following syntax (and similar stuff):
  // var e = angular.element(document.body).injector().get('Events'); -> because the name of the factory is 'Events'
  // e.addEvent(newEv)
  // e.getEvents(1)

  // this function finds events with time greater than now (that's what Date.now is)...
  var getEvents = function(pageNum) {
    return $http({
      method: 'GET',
      url: '/api/events',
      params: {pageNum: pageNum}
    })
    .then(function(res) {
      return res.data
    })

  };

  var joinEvent = function(event, userToken, cb) {
  //var joinEvent = function(event, userToken) {  
      return $http({
        method: 'PUT',
        url: '/api/events',
        data: {event: event, token: userToken}
      })
      .then(function (resp) {
        //probably superfluous, but maybe handy for debugging for now - 04/16/2015 - saf
        //alert("You were added to event ", event.description)
        cb();
        return resp.statusCode; 
      });
  }

  var addEvent = function(event, userToken) {
      var datetime = new Date(event.date + ' ' + event.time);
      var gmt = datetime.toISOString();
      event.datetime = gmt;
      return $http({
        method: 'POST',
        url: '/api/events',
        data: {event: event, token: userToken}
      })
      .then(function (res) {
        return res.data
      });
  }

  // return all of our methods as an object, so we can use them in our controllers
  return {
    getEvents : getEvents,
    joinEvent: joinEvent,
    addEvent : addEvent
  }

})
.factory('Event', function($http){
  var event;
  var mapOptions = {
    zoom: 10,
    center: {}
  }
  var eventDetails = function(evt){
    event = evt;
  }

  var loadEvent = function($scope){
    $scope.event = event;
  }

  var createMap = function(latitude, longitude){
    var coords = new google.maps.LatLng(latitude, longitude);
    mapOptions.center = coords;
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({position: coords, map: map});
  }

  return {
    eventDetails: eventDetails,
    loadEvent: loadEvent,
    createMap: createMap
  }
})
.factory('Users', function($http){
  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    }).then(function (resp) {
      return resp.data.token;
    });
  }

  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    }).then(function (resp) {
      return resp.data.token;
    });
  }

  return {
    signup: signup,
    signin: signin
  }
})
/* This custom Angular filter should produce our datetime object in the "from now" format
popular in other apps */
  .filter('fromNow', function() {
    return function(dateString) {
      return moment(dateString).fromNow()
    };
  });
