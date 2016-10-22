"use strict";

angular.module('Todo', []).controller('ctrl', ($scope, $http) => {

    let refresh = () =>{
      $http.get("/todos").success(data =>{
        $scope.myList = data;
      });
    };

    $scope.add = () => {
      $http.post("/todos", $scope.newTodo);
      $scope.newTodo = "";
      refresh();
    };

    $scope.update = ix => {
      $http.put("/todos/" + ix, $scope.myList.list[ix]);
    };

    $scope.clean = () => {
      $http.delete('/todos');
      refresh();
    };

    $scope.dump = () =>{
      console.log($scope.myList);
    };
    refresh();
    console.log("Angular Up and running!");
});
