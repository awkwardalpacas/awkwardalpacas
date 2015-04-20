![lunchcorgi](/client/assets/lunchcorgi.jpg)

awkwardalpacas - LunchCorgi
===========================

Contributers
------------

Adam Guerra 
Karen Lewis
Josh Benson
Stephanie Foskitt


Stack
-----
 
Mongo, Express, Angular, Node

 - NOTE -
The project does not use Mongoose for purposes of ORM, however there are some methods in the project which do use Mongoose so the references and 'requires' are still in there.

Database
--------
 
 ## DB ##
> Stores Users in 'corgiuser' collection, and Events in 'corgievent'. Users have an id, name, password, and eventids from events document. Events have an id, description, location, a creatorID, and a list of attendeeIDs.
 
To get started with the database, there must be at least one user and one event.  Start by using the "Sign Up" to add one user then create one or more events. 
 
Unless the project is upgraded to be used with Gulp or Grunt, the Mongo server must be started before the Node.js server is started.  Otherwise, Node.js server will produce 'process.nextTick()' error.

Server
------

Start the Node.js server with 'npm start' or with 'nodemon server/server.js'.
 
Views
-----

Sign up, sign in, events view.  There are no users' views, but this is an excellent area for expansion.
