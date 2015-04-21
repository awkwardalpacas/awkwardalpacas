var eventsController= require('./eventpage-controller.js');

module.exports = function(app){
<<<<<<< HEAD

  app.get('/',eventsController.getchats),
  app.post('/chats',eventsController.postchats)
  

=======
  app.get('/chats',eventsController.getchats),
  app.post('/chats',eventsController.postchats)
>>>>>>> added chatroom for mongodb
}