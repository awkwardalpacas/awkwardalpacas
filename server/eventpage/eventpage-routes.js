var eventsController= require('./eventpage-controller.js');

module.exports = function(app){
  app.get('/',eventsController.getchats),
  app.post('/chats',eventsController.postchats)
  
}