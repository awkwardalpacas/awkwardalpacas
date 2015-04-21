var eventsController= require('./eventpage-controller.js');

module.exports = function(app){
<<<<<<< HEAD
  app.get('/',eventsController.getchats),
  app.post('/chats',eventsController.postchats)
  
=======
  app.get('/chats',eventsController.getchats),
  app.post('/chats',eventsController.postchats)
>>>>>>> 5e7f8803f22c1c40536de33eb381e43b2a4da048
}