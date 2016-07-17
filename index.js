var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// var cookieParser = require('cookie-parser');

var app = express();


app.use(express.static(__dirname + '/public'));
app.use('/angular_route_script', express.static(__dirname + '/node_modules/angular-route/'));

// app.use(cookieParser());
app.use(cors());
app.use(bodyParser());

app.connect('mongodb://localhost/trees');

var treeModel = mongoose.model('tree', {
  name: String,
  age: Number,
  address: String
});

app.get("/", function(request, response) {
  var poop = treeModel.find(function(error, trees) {
    if (error) return console.error(error);
    response.send(trees);
    return trees;
  });
  console.log(poop);
  response.sendFile(path.join( __dirname + "/views/index.html"));
});

app.post("/new", function(request, response) {
  var tree = request.body;
  var treeDoc = new treeModel({name: tree.name, age: tree.age, address: tree.address});
  treeDoc.save(function() {
    response.send("tree");
    console.log("tree saved!");
  });
});

app.delete("/delete/:id", function(request, response) {
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
