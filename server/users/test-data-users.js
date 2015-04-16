
/*
pwd is joe for all
hash is $2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2
^^^  based on Bcrypt hashed password https://www.dailycred.com/blog/12/bcrypt-calculator

1. open a new terminal
2. type "mongod" to start the mongo server
3. open a new terminal
4. type "mongo" (no "d") to start the mongo shell
5. save this document to /data/db/scripts
6. type or paste the following into the mongo terminal:
	a. "use corgi"  <--- this sets the database or creates if it doesn't exist
	b. "load("/data/db/scripts/test-data-events.js")"  <--- this loads the events data into a corgievents table (collection)
	c. "load("/data/db/scripts/test-data-users.js")"  <---this loads the events data into a corgiuser table (collection)
	d. rejoice in a full database
*/

conn = new Mongo();
db = conn.getDB("corgi");

db.corgiuser.insert([
	{
	  userID : 1,
	  name : "Joe",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 1}, {eventID: 7}, {eventID: 9}, {eventID: 16}]
	},

	{
	  userID : 2,
	  name : "Gabe",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 1}, {eventID: 3}, {eventID: 6}, {eventID: 7}, {eventID: 8}, {eventID: 13}, {eventID: 14}, {eventID: 16}, {eventID: 17}, {eventID: 18}, {eventID: 20}]
	},

	{
	  userID : 3,
	  name : "Mark",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 3}, {eventID: 4}, {eventID: 3}, {eventID: 8}, {eventID: 9}, {eventID: 10}]
	},

	{
	  userID : 4,
	  name : "Dan",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 4}, {eventID: 8}, {eventID: 9}, {eventID: 10}, {eventID: 11}, {eventID: 4}]
	},

	{
	  userID : 5,
	  name : "Gus",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [ {eventID: 1}, {eventID: 2}, {eventID: 3}, {eventID: 13}, {eventID: 21}]
	},

	{
	  userID : 6,
	  name : "Candy",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 4}, {eventID: 14}, {eventID: 15}]
	},

	{
	  userID : 7,
	  name : "Pink",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 1}, {eventID: 2}, {eventID: 3}, {eventID: 6}, {eventID: 10}, {eventID: 13}, {eventID: 15}, {eventID: 17}, {eventID: 18}, {eventID: 19} ]
	},

	{
	  userID : 8,
	  name : "Black",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 11}, {eventID: 16}]
	},

	{
	  userID : 9,
	  name : "Blue",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 10}, {eventID: 17}]
	},

	{
	  userID : 10,
	  name : "Asdf",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 18}]
	},

	{
	  userID : 11,
	  name : "Jill",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{}]
	},

	{
	  userID : 12,
	  name : "Jane",
	  hashedpwd : "$2a$10$mihH2NO2fSKmhZCQdr5OFOJ7eY6W5QlLSxAn.O7sj2z0OuecefsZ2",
	  eventIDs: [{eventID: 7}, {eventID: 11}, {eventID: 12}]
	}

])


