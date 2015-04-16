var userController = require('./users-controller.js');

module.exports = function (app) {
  // app === eventsRouter injected from middleware.js

  // app.param will hijack any request with a 'code' parameter on in
  // like line 16 below. That code will actually be the shortned url
  // so the real URL will be pre fetched from mongo and attached to
  // req.navLink before it reaches line 16.

// what do we want to happen for POST and GET in the users section
  // app.route('/signin') 
  //   .get(userController.userEvents)  // signin, but then maybe get events created and/or attended by user??
    // .post(userController.newUser);  // signup - changed this to a post to the /signup path - AG

  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
};
