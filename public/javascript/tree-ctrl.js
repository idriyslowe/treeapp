var app = angular.module('treeApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'index.html',
    controller: 'treeCtrl'
  }).otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);

app.controller('treeCtrl', function($scope, $http) {
  var app = this;
  var url = 'http://localhost:4050';
  $scope.treesFromMongo = [];

// EDIT FUNCTIONS WILL NEED _ID INSTEAD OF ID
  $scope.edit = function(tree, eName, eAge, eAddress) {
    if ($scope.treeEdit === false) {
      $scope.treeEdit = true;
      document.getElementById('edit-button' + tree.id).innerHTML = "Submit";      
    } else {
      $scope.submitEdit(tree, eName, eAge, eAddress);
      $scope.treeEdit = false;
      document.getElementById('edit-button' + tree.id).innerHTML = "Edit";  
    }
  };

  $scope.submitEdit = function(tree, eName, eAge, eAddress) {
    var thisTree = $scope.trees.find(x => x.id === tree.id)

    thisTree.name = eName || thisTree.name;
    thisTree.age = eAge || thisTree.age;
    thisTree.address = eAddress || thisTree.address; 
  };

  $scope.show = function() {
    $http.get(url).success(function(trees) {
      $scope.treesFromMongo.push(trees);
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

    $http.post(url + '/new', {name: nName, age: nAge, address: nAddress});

    $scope.nName = null;
    $scope.nAge = null;
    $scope.nAddress = null;
  }; 

  window.$scope = $scope;
});