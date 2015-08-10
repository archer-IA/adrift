// User Controllers

var userControllers = angular.module('userControllers', []);

userControllers.controller('UserIndexCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('users/').success(function(data) {
      console.log(data);
    });
  }]);

userControllers.controller('UserCollectionCtrl', ['$scope', '$http', '$interval', 
  function($scope, $http, $interval) {

    $scope.checkForMessage = function(){
      $http.get('users/current').success(function(data) {
        if(data.currentUser.pendingMessage){
          $scope.pendingMessage = data.currentUser.pendingMessage;
          $scope.decision ='Accept';
          console.log('Checking for Message...')
        }
      });
    };

    $interval($scope.checkForMessage, 1000);

    $http.get('users/current').success(function(data) {
      if(data.currentUser.messages[0]){
        $scope.messages = data.currentUser.messages;
      };
      if(data.currentUser.pendingMessage){
        $scope.pendingMessage = data.currentUser.pendingMessage;
        $scope.decision ='Accept';
      }
    });

    $scope.acceptMessage = function(){
      $scope.keep = true;
      $scope.keepMessage($scope.keep);
    };

    $scope.releaseMessage = function(){
      $scope.keep = false;
      $scope.keepMessage($scope.keep);
    };

    $scope.keepMessage = function(decision){
      $http.post('/messages/decision', {keep: decision}).success(function(data){
        if(data.status != "failure"){
          if($scope.keep == true){
            $scope.messages.push($scope.pendingMessage);
          }
          $scope.pendingMessage = null;
        }
      })
    }
  }]);

userControllers.controller('UserSettingsCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http) {
    $http.get('users/current').success(function(data) {
      $scope.user = data.currentUser;
    });
  }]);