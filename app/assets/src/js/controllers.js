// User Controllers

var userControllers = angular.module('userControllers', []);

userControllers.controller('UserIndexCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('users/').success(function(data) {
      console.log(data);
    });
  }]);

userControllers.controller('UserCollectionCtrl', ['$scope', '$http', 
  function($scope, $http) {
    $scope.request = 'Request';
    $scope.requested = false;
    $http.get('users/current').success(function(data) {
      if(data.currentUser.messages[0]){
        $scope.messages = data.currentUser.messages;
        $scope.messages.forEach(function(message){
          $http.get('/topics/id/' + message._topic).success(function(data){
            console.log(data);
          })
        });
      }
      if(data.currentUser.pendingMessage[0]){
        $scope.pendingMessageContent = data.currentUser.pendingMessage[0].content[0];
        $scope.request = 'Requested';
        $scope.requested = true;
        $scope.decision ='Accept';
      }
    });
    $scope.requestMessage = function(){
      if($scope.requested == false){ 
        $http.get('messages/').
          success(function(data, status) {
            if(data.message){
              $scope.pendingMessageContent = data.message.content[0];
            }
        });
        $scope.request = 'Requested'; 
        $scope.requested = true;
      } else if ($scope.requested == true) {
        console.log('already requested');
      };
    };
  }]);

userControllers.controller('UserSettingsCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http) {
    $http.get('users/current').success(function(data) {
      console.log(data);
    });
  }]);

// Topics Controllers

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
              console.log(data);
          });
          $scope.subscription = 'Subscribed'; 
          $scope.subscribed = true;
        } else if ($scope.subscribed == true) {
          $http.delete('users/topics/' + $routeParams.topicId).
            success(function(data, status) {
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

