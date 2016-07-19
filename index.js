var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/angular_route_script', express.static(__dirname + '/node_modules/angular-route/'));

app.use(bodyParser());

mongoose.connect('mongodb://localhost/trees');

var treeModel = mongoose.model('tree', {
  name: String,
  age: Number,
  address: String
});

app.get("/", function(request, response) {
  treeModel.find(function(error, trees) {
    if (error) return console.error(error);
  });
  response.sendFile(path.join( __dirname + "/views/index.html"));
});

app.post("/new", function(request, response) {
  var tree = request.body;
  var treeDoc = new treeModel({name: tree.name, age: tree.age, address: tree.address});
  // DOESN'T SAVE BUT NO ERROR. WILL SEND ERRORS FOR VALIDATION PROBLEMS
  treeDoc.save(function(error, savedTree) {
    response.send(tree);
    console.log(savedTree);
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
