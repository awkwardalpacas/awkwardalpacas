var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
// we just assign the port in the connection in each controller
var port = /*process.env.PORT || */ 8000; //dynamic port assignment for deployment purposes
var __
app.use(express.static(__dirname + '/..'));

app.get("/", function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/../client/app'});
});

require('./middleware.js')(app, express);

var server = app.listen(port)
//   process.env.PORT, function () {

  var host = server.address().address;
//   var port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);

// });
