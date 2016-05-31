var app = angular.module('treeApp', []);

app.controller('treeCtrl', function($scope) {

// this tree should be in a fake database to edit
  $scope.trees = [{
    // dynamically change id
    'id': '1',
    'name': 'American Sycamore',
    // convert to datetime... subtract in years from today
    'age': 1,
    'address': '3227 W Le Moyne',
  }];

  $scope.Edit = function(tree, eName, eAge, eAddress) {
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

    // console.log($scope.trees);  
  }

  $scope.newTree = function(nName, nAge, nAddress) {
    $scope.finput = {
      'id': 'some id',
      'name': nName,
      'age': nAge,
      'address': nAddress
    };

    $scope.trees.push($scope.finput);
    $scope.nName = null;
    $scope.nAge = null;
    $scope.nAddress = null;
  };

  window.$scope = $scope;
});