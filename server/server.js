var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
// we just assign the port in the connection in each controller
app.use(express.static(__dirname + '/..')); 

app.get("/", function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/../client/app'});
});

app.get('/api/reminder', function(req, res){
	res.end("hello")
})

require('./middleware.js')(app, express);

app.listen(process.env.PORT || 8000);
