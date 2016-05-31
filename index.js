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

// testing cookie sending
app.get("/user/:user", function(request, response) {
  response.cookie('name', request.params.user).send('<p>Cookie Set: <a href="/user">View Here</a>');
});

// resetting cookie
app.get('/user', function(request, response) {
  response.clearCookie('name').send(request.cookies.name);
});

app.patch("/update", function(request, response) {
  response.end("What do you want to change about this tree?"); 
});

app.delete("/delete", function(request, response) {
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
