var app = angular.module('treeApp', []);

app.controller('treeCtrl', function($scope, $http) {

// this tree should be in a fake database to edit
  $scope.trees = [{
    // dynamically change id
    'id': '1',
    'name': 'American Sycamore',
    // convert to datetime... subtract in years from today
    'age': 1,
    'address': '3227 W Le Moyne',
  }];

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

    $http.get('/tree/edit/' + tree.id).then(function(response) {
      console.log(response);
      // send finput object to create this tree
    }, function(error) {
      console.log(error);
    });    

    thisTree.name = eName || thisTree.name;
    thisTree.age = eAge || thisTree.age;
    thisTree.address = eAddress || thisTree.address; 
  };

  $scope.delete = function(tree) {
    var thisTree = $scope.trees.find(x => x.id === tree.id)
    var confirmed = confirm("Are you sure you want to delete this tree?");

    if (confirmed === true) {
      console.log("deleting " + tree.name);

      $http.get('/tree/delete/' + tree.id).then(function(response) {
        console.log(response);
        // send thisTree
      }, function(error) {
        console.log(error);
      });

      // delete this tree from array and using cookies
    }   
  };

  $scope.newTree = function(nName, nAge, nAddress) {
    $scope.finput = {
      'id': '1',
      'name': nName,
      'age': nAge,
      'address': nAddress
    };

    $http.post('/tree/new', $scope.finput).then(function(response) {
      console.log('send this ' + JSON.stringify($scope.finput));
      // send finput object to create this tree
    }, function(error) {
      console.log(error);
    });

    $scope.trees.push($scope.finput);
    $scope.nName = null;
    $scope.nAge = null;
    $scope.nAddress = null;
  }; 

  window.$scope = $scope;
});