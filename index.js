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

app.get("/index", function(request, response) {
    treeModel.find(function(error, trees) {
    if (error) return console.error(error);
    response.send(trees);
    return trees;
  });
});

app.get("/", function(request, response) {
  response.sendFile(path.join( __dirname + "/views/index.html"));
});

app.post("/new", function(request, response) {
  var tree = request.body;
  var treeDoc = new treeModel({name: tree.name, age: tree.age, address: tree.address});
  treeDoc.save(function(error, savedTree) {
    response.send(tree);
  });
});

app.put("/edit", function(request, response) {
  var treeInput = request.body;
  var treeToEdit = treeModel.findById(treeInput._id, function(error, tree) {
    tree.name = treeInput.name || tree.name;
    tree.age = treeInput.age || tree.name;
    tree.address = treeInput.address || tree.address;

    tree.save(function(error) {
      if (error) response.send(error);
    });
  });
  // 303 turns off default 'put' redirect 
  response.redirect(303, '/');
});

app.delete("/delete/:id", function(request, response) {
  response.end("You wanna destroy a tree?!");  
});

app.get("*", function(request, response) {
  response.end("Touched Admin Page");  
});

var server = app.listen(4050, function() {
  var host = server.address().address;
  var port = server.address().port;
})
