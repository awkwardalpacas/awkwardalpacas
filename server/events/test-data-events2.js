
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
	b. "load("/data/db/scripts/corgievents.js")"  <--- this loads the events data into a corgievents table (collection)
	c. "load("/data/db/scripts/corgiusers.js")"  <---this loads the events data into a corgiuser table (collection)
	d. rejoice in a full database
*/


conn = new Mongo();
db = conn.getDB("corgi");

db.corgievent.insert([
	{
		eventID :22,
		description : "Lunch at Subway on Congress",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T18:30:27+00:00",
		creatorID : 5,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

		{
		eventID : 23,
		description : "Get a bite at Chipotle",
		location : "802 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T18:30:27+00:00",
		creatorID : 5,
		attendeeIDs : [{username: "Voldemort"}, {username: "Dagoth Ur"}]
	},

		{
		eventID :24,
		description : "Sandwiches at Jimmy John's",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T18:30:27+00:00",
		creatorID : 5,
		attendeeIDs : [{username: "Link"}, {username: "Zelda"}]
	},

	{
		eventID : 25,
		description : "Murphy's nosh",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T17:30:27+00:00",
		creatorID : 4,
		attendeeIDs : [{username: "Strong Sad"}, {username: "The Cheat"}, {username: "Homestar"}]
	},

	{
		eventID : 26,
		description : "Coffee for lunch",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T17:30:27+00:00",
		creatorID : 3,
		attendeeIDs : [{username: "Gehn"}, {username: "Atrus"}, {username: "Catherine"}, {username: "Tiana"}]
	},

	{
		eventID : 27,
		description : "Beer for lunch",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T17:30:27+00:00",
		creatorID : 2,
		attendeeIDs : [{username: "Moby Dick"}, {username: "War and Peace"}, {username: "Great Expectations"}]
	},

	{
		eventID : 28,
		description : "Meet for Murphy's",
		location : "722 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T17:15:27+00:00",
		creatorID : 1,
		attendeeIDs : [{username: "Alan Alda"}, {username: "Radar"}, {username: "Margaret Hoolihan"}, {username: "Colonel Potter"}]
	},

	{
		eventID : 29,
		description : "Athenian Grill gyros",
		location : "200 West 7th Street, Austin, TX 78701",
		datetime: "2015-04-22T17:15:27+00:00",
		creatorID : 2,
		attendeeIDs : [{username: "adam"}, {username: "stephanie"}, {username: "justjosh"}, {username: "karmakettle"}]
	},

	{
		eventID : 30,
		description : "Lunch at Subway on Congress",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T17:15:27+00:00",
		creatorID : 3,
		attendeeIDs : [{username: "Tara"}, {username: "Locke"}, {username: "Celes"}, {username: "Cyan"}]
	},

	{
		eventID : 40,
		description : "Lunch at Subway on Congress",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T20:15:27+00:00",
		creatorID : 4,
		attendeeIDs : [{username: "Dracula"}, {username: "Cryptkeeper"}, {username: "Beetlejuice"}]
	},

	{
		eventID : 41,
		description : "Lunch at Subway on Congress",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-23T20:15:27+00:00",
		creatorID : 4,
		attendeeIDs : [{username: "Mulder"}, {username: "Scully"}, {username: "Old Smoking Man"}]
	},

	{
		eventID : 42,
		description : "Lunch at Subway on Congress",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-24T20:15:27+00:00",
		creatorID : 4,
		attendeeIDs : [{username: "Totoro"}, {username: "Kiki"}, {username: "Nausicaa"}, {username: "Mononoke"}]
	},

	{
		eventID : 43,
		description : "Lunch at Subway on Congress",
		location : "850 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-25T20:15:27+00:00",
		creatorID : 5,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 44,
		description : "Lunch at Subway on Congress",
		location : "850 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-22T19:15:27+00:00",
		creatorID : 6,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 45,
		description : "Jo Black's sliders",
		location : "1200 West 6th Street, Austin, TX 78701",
		datetime: "2015-04-22T19:30:27+00:00",
		creatorID : 7,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 46,
		description : "Mama Fu's",
		location : "100 Ceasar Chavez, Austin, TX 78701",
		datetime: "2015-04-22T19:45:27+00:00",
		creatorID : 8,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 47,
		description : "Starbuck's cheese tray",
		location : "610 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-24T18:15:27+00:00",
		creatorID : 9,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 48,
		description : "P. Terry's shakes",
		location : "100 West 6th Street, Austin, TX 78701",
		datetime: "2015-04-21T19:15:27+00:00",
		creatorID : 10,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 49,
		description : "Liquid Lunch on Colorado (Perry's)",
		location : "200 West 7th Street, Austin, TX 78701",
		datetime: "2015-04-22T19:30:27+00:00",
		creatorID : 7,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 50,
		description : "Athenian Grill",
		location : "200 West 6th Street, Austin, TX 78701",
		datetime: "2015-04-21T18:30:27+00:00",
		creatorID : 2,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	},

	{
		eventID : 501,
		description : "Lunch at Subway on Congress",
		location : "822 Congress Avenue, Austin, TX 78701",
		datetime: "2015-04-21T18:30:27+00:00",
		creatorID : 5,
		attendeeIDs : [{username: "Gus"}, {username: "Candy"}, {username: "Gabe"}, {username: "Asdf"}]
	}
])