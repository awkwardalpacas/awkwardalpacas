![lunchcorgi](/client/assets/lunchcorgi.jpg)

# awkwardalpacas
 ## Stack ##
 > Mongo, Express, Angular, Node - 
 - NOTE -
 We are not actually using Mongoose, however there are some legacy methods in the project which do use Mongoose so the references and requires are still in there.
 
 ## DB ##
> Stores Users in 'corgiuser' collection, and Events in 'corgievent'. Users have an id, name, password, and eventids from events document. Events have an id, description, location, a creatorID, and a list of attendeeIDs.
 
To get started with the database, there must be at least one user and one event.  Start by using the "Sign Up" to add one user then create one or more events. 
 
Unless the dependencies are upgraded to be used with Gulp or Grunt, the Mongo server must be started before Node.js server is started.  Otherwise, Node.js server will produce 'process.nextTick()' error.

## SERVER ##

Start the Node.js server with 'npm start' or with 'nodemon server/server.js'.
 
 ## Views ##
 > Sign up, sign in, events view
