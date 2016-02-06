angular.module('lunchCorgi.services', [])


.factory('Events', function($http) {
 
  // getEvents finds future events
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

  var joinEvent = function(event, userToken) {
    return $http({
      method: 'PUT',
      url: '/api/events', 
      data: {event: event, token: userToken}
    })
    .then(function (resp) {
      console.log("You were added to event: ", event.description)
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

  return {
    getEvents : getEvents,
    joinEvent: joinEvent,
    addEvent : addEvent
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

  var getProfile = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/profile',
      data: user
    }).then(function (resp) {
      return resp.data;
    });    
  }

  return {
    signup: signup,
    signin: signin,
    getProfile: getProfile
  }
})

/* This custom Angular filter should produce our datetime object in the "from now" format
popular in other apps */
.filter('fromNow', function() {
  return function(dateString) {
    return moment(dateString).fromNow()
  };
});
