var app = angular.module('treeApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'treeCtrl'
    })
    .when('/index', {
      templateUrl: 'index.html',
      controller: 'treeCtrl'
    })
    .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

app.controller('treeCtrl', function($scope, $http, $route) {
  var app = this;
  var homeUrl = 'http://localhost:4050';
  var indexUrl = 'http://localhost:4050/index';
  $scope.treesFromMongo = [];

// if triggered, will change this tree's form elements to show
// refactor this with css rules
  $scope.turnOnEditElements = function(tree) {
    document.getElementById('edit-name' + tree._id).style.display = 'block';
    document.getElementById('edit-age' + tree._id).style.display = 'block';
    document.getElementById('edit-address' + tree._id).style.display = 'block';
    document.getElementById('begin-edit' + tree._id).style.display = 'none';
    document.getElementById('submit-edit' + tree._id).style.display = 'block';
    document.getElementById('submit-edit' + tree._id).style.display = 'inline';
    // }
  };

  $scope.submitEdit = function(tree, eName, eAge, eAddress) {
    console.log('i need to work on how to edit the db');
    $scope.turnOffEditElements(tree);
  };

  $scope.turnOffEditElements = function(tree) {
    document.getElementById('begin-edit' + tree._id).style.display = 'block';
    document.getElementById('begin-edit' + tree._id).style.display = 'inline';
    document.getElementById('submit-edit' + tree._id).style.display = 'none';
    document.getElementById('edit-name' + tree._id).style.display = 'none';
    document.getElementById('edit-age' + tree._id).style.display = 'none';
    document.getElementById('edit-address' + tree._id).style.display = 'none';


    // var thisTree = $scope.trees.find(x => x._id === tree._id)

    // thisTree.name = eName || thisTree.name;
    // thisTree.age = eAge || thisTree.age;
    // thisTree.address = eAddress || thisTree.address; 
  };

// only works after reload!?
  $scope.show = function() {
    $http.get(indexUrl).success(function(trees) {
      for ( i = 0; i < trees.length; i++ ) {
        $scope.treesFromMongo.push(trees[i]); 
      }
    }).error(function(error) {
      console.log('error');
    });
  };

  $scope.delete = function(tree) {
    var thisTree = $scope.trees.find(x => x.id === tree.id)
    var confirmed = confirm("Are you sure you want to delete this tree?");

    if (confirmed === true) {
      console.log("deleting " + tree.name);

      // delete this tree from array and using cookies
    }   
  };

  $scope.newTree = function(nName, nAge, nAddress) {

    $http.post(homeUrl + '/new', {name: nName, age: nAge, address: nAddress});

    $scope.nName = null;
    $scope.nAge = null;
    $scope.nAddress = null;
  }; 

  window.$scope = $scope;
});