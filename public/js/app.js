angular.module('todoApp', [

]); //this is the setter syntax, you are creating an application using this one


angular.module('todoApp') //this is the getter syntax, we can use this so we don't have to make a variable to store our angular application; YAYYY no globals
      .controller('TodoController', TodoController);

TodoController.$inject = ['$scope', '$http'];

function TodoController($scope, $http){
  $scope.todos = [];
  initTodos();

//Create a new todo
  $scope.saveTodo = function(){
    $http.post('/api/todos', $scope.newTodo)
      .then(function(response){
        initTodos();
        $scope.newTodo = {};
      })
      .catch(function(err){
        console.err(err);
      });
  }
  $scope.deleteTodo = function(todo){
    var id = todo._id;
    $http.delete('/api/todos/'+id)
    .then(function(response){
      initTodos();
    })
    .catch(function(err){
      console.err(err);
    });
  }

  $scope.editTodo = function(todo){
    $scope.isEditing = !$scope.isEditing;
    $scope.editingTodo = todo;
  }

  $scope.updateTodo = function(todo){
    $http.put('/api/todos'+todo._id, todo)
      .then(function(response){
        $scope.isEditing = false;
        initTodos();
      })
      .catch(function(err){
        console.log(err);
      });
  }
  function initTodos(){
      $http.get('/api/todos')
        .then(function(response){
          $scope.todos = response.data;
        })
        .catch(function(err){
          console.err(err);
        });
  }

}
