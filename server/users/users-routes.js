var userController = require('./users-controller.js');

module.exports = function (app) {
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/profile', userController.userEvents);
};
