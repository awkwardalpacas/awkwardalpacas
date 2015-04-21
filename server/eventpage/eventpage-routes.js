var eventsController= require('./eventpage-controller.js');

module.exports = function(app){
  app.get('/chats',eventsController.getchats),
  app.post('/chats',eventsController.postchats)
}