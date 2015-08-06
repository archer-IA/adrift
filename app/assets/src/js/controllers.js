// User Controller

var userControllers = angular.module('userControllers', []);

userControllers.controller('UserIndexCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('users/').success(function(data) {
      console.log(data);
    });
  }]);

userControllers.controller('UserShowCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('users/' + $routeParams.userId).success(function(data) {
      console.log(data);
    });
  }]);

// Topics Controller

var topicControllers = angular.module('topicControllers', []);

topicControllers.controller('TopicIndexCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('topics/').success(function(data) {
      $scope.topics = data.topics;
    });
  }]);

topicControllers.controller('TopicShowCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('topics/' + $routeParams.topicId).success(function(data) {
      $scope.topic = data.topic;
    });
  }]);

topicControllers.controller('TopicSubscribeCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('users/current').success(function(data) {
      $scope.currentUser = data.currentUser;

      if($scope.currentUser.topics.indexOf($routeParams.topicId) != -1){
        $scope.subscription = 'Subscribed';
        $scope.subscribed = true;
      } else {
        $scope.subscription = 'Subscribe';
        $scope.subscribed = false;
      };

      $scope.locationSubscribe = function(){
        if($scope.subscribed == false){ 
        $http.patch('users/topics/' + $routeParams.topicId).
        success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data;
            console.log(data);
        });
        $scope.subscription = 'Subscribed'; 
        $scope.subscribed = true;
        } else if ($scope.subscribed == true) {
          $http.delete('users/topics/' + $routeParams.topicId).
            success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data;
            console.log(data);
        });
        $scope.subscription = 'Subscribe'; 
        $scope.subscribed = false;
        };
      };
    });
  }]);

topicControllers.controller('TopicMessageCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams){
    $scope.message = {_topic: $routeParams.topicId};

    $scope.addMessage = function(message){
      $scope.messageCopy = angular.copy($scope.message);
      $http.post('messages/', {'message': $scope.messageCopy}).
      success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
          $scope.result = data;
      }); 
      $scope.message.content = '';   
    }; 
  }]);