var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.get("/", function(request, response, next) {
  response.sendFile(path.join( __dirname + "/views/index.html"));
});

// change get to new. can't use id
app.post("/tree/new", function(request, response) {
  response.cookie('tree', request.params.id, {expire: new Date() + 9999}).send(request.cookies.tree);
});

// resetting cookie
app.get('/reset', function(request, response) {
  response.clearCookie('tree').send(request.cookies.tree);
});

app.delete("/tree/delete/:id", function(request, response) {
  response.end("You wanna destroy a tree?!");  
});

app.get("*", function(request, response) {
  response.end("404?!");  
});

var server = app.listen(4050, function() {
  // host: accepting connections on any IPv6 address (::) since I didn't specify
  var host = server.address().address;
  var port = server.address().port;

  // console.log('Host: ' + host + '. Port: ' + port);
})
