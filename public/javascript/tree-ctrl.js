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
  var editUrl = 'http://localhost:4050/edit';
  var deleteUrl = 'http://localhost:4050/delete';
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
  };

  $scope.submitEdit = function(tree, eName, eAge, eAddress) {
    $http.put(editUrl, {_id: tree._id, name: eName, age: eAge, address: eAddress});
    location.reload();
  };

  $scope.show = function() {
    $http.get(indexUrl).success(function(trees) {
      for ( i = 0; i < trees.length; i++ ) {
        $scope.treesFromMongo.push(trees[i]); 
      }
    }).error(function(error) {
      console.log(error);
    });
  };

  $scope.delete = function(tree) {
    var confirmed = confirm("Are you sure you want to delete this tree?");
    // angular doesn't allow body on $http.delete method. hence this solution
    var config = {
      method: "DELETE",
      url: deleteUrl,
      data: tree,
      headers: {"Content-Type": "application/json;charset=utf-8"}
    };

    if (confirmed === true) {
      $http(config);
      location.reload();
      console.log("deleting " + tree.name);
    }   
  };

  $scope.newTree = function(nName, nAge, nAddress) {

    $http.post(homeUrl + '/new', {name: nName, age: nAge, address: nAddress});

    $scope.nName = null;
    $scope.nAge = null;
    $scope.nAddress = null;
    location.reload();
  }; 

  window.$scope = $scope;
});