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
      data: {pageNum: pageNum}
    })
    .then(function(res) {
      return res.data
    })

  };

  var joinEvent = function(event) {
      return $http({
        method: 'POST',
        url: '/api/events', 
        data: {event: event.attendeeIDs.push(userID)}
      })
      .then(function (resp) {
        //probably superfluous, but maybe handy for debugging for now - 04/16/2015 - saf
        alert("You were added to event ", event.description)
        return resp.statusCode; 
      });
  }  

  var addEvent = function(event) {
      return $http({
        method: 'POST',
        url: '/api/events',
        data: {event: event}
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
.factory('Users', function($http){
  var signup = function(user){
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    }).then(function (resp) {
      return resp.data.token;
    });
  }

  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/signin',
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