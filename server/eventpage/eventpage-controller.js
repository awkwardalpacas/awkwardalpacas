var mongo = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var jwt  = require('jwt-simple');

var DB;

mongo.connect(process.env.MONGOLAB.URI, function(err, db) {
  if (err) throw err;
  // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
  DB = db

  // I added some console logs throughout this file to make it easier to debug; remove them whenever you want.
  console.log('connected')
})

module.exports ={
 getchats:function(req,res){
  var event=req.query
  var eventID = event._id;
  var allchats =[];
  var getChats = DB.collection('corgievent').find({_id: ObjectID(eventID)});
  getChats.on('data',function (room){
    var tosend = room.chat
    res.json(tosend);
    res.end()
  })
console.log("no error")
 },
 postchats:function(req,res){
  console.log(req.body)
  var eventID = req.body.event._id;
  var userToken = req.body.token;
  var username = jwt.decode(userToken, 'secret');
  var foundUser = DB.collection('corgiuser').find( {name: username} );
  foundUser.on('data',function (user){
  var chat = {username:user.name, messagekey:req.body.message}
    DB.collection('corgievent').update({_id: ObjectID(eventID)},{$addToSet:{chat:chat}})
    console.log('got user data',user.name)
    res.end('posted chats')
  })

 }

};

