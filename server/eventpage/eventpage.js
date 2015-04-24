var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
     autoIncrement = require('mongoose-auto-increment');

var db = mongoose.createConnection(process.env.MONGOLAB_URI); //connects to database called corgi



ChatroomSchema.plugin(autoIncrement.plugin,'roomID');
var Chats = db.model('chatroom',ChatroomSchema);

exports.Chats=mongoose.model('chatroom',ChatroomSchema);