var eventsController = require('./events-controller.js');

module.exports = function (app) {
  app.route('/')
    .get(eventsController.allEvents)
    .post(eventsController.newEvent)
    .put(eventsController.joinEvent);
};
