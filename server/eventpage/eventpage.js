var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
     autoIncrement = require('mongoose-auto-increment');

var db = mongoose.createConnection("mongodb://heroku_app36102509:m3ei2epf1460981rpihk0egjsd@ds041377.mongolab.com:41377/heroku_app36102509"); //connects to database called corgi



ChatroomSchema.plugin(autoIncrement.plugin,'roomID');
var Chats = db.model('chatroom',ChatroomSchema);

exports.Chats=mongoose.model('chatroom',ChatroomSchema);