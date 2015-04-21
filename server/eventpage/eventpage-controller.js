var mongo = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var jwt  = require('jwt-simple');

var DB;

mongo.connect('mongodb://heroku_app36102509:m3ei2epf1460981rpihk0egjsd@ds041377.mongolab.com:41377/heroku_app36102509', function(err, db) {
  if (err) throw err;
  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db

  // I added some console logs throughout this file to make it easier to debug; remove them whenever you want.
  console.log('connected')
})

module.exports ={
 getchats:function(req,res){
  var eventID = req.body.event._id; 
  var allchats =[];
  var getChats = DB.collections('corgievent').find({_id: ObjectID(eventID)});
  getChats.on('data',function (room){
    res.end(room.chat);
  })

 },
 postchats:function(req,res){
  var eventID = req.body.event._id;
  var userToken = req.body.token;
  var username = jwt.decode(userToken, 'secret');
  var foundUser = DB.collection('corgiuser').find( {name: username} );
  foundUser.on('data',function (user){
  var chat = {username:user.name,message:req.body.message}
    DB.collection('eventChat').find({_id: ObjectID(eventID)},{$push:{chat:chat}})
    res.end('posted chats')
  })

 }
 
}

