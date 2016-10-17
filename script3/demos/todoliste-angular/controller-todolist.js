angular.module('Todo', [])
.controller('ctrl', $scope => {
    
    $scope.myList = new TodoList();

    $scope.add = () => {
        $scope.myList.add($scope.newTodo);
        $scope.newTodo = "";
    };
});