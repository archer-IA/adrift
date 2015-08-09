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
        if(data.currentUser.pendingMessage[0]){
          $scope.pendingMessage = data.currentUser.pendingMessage[0];
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
      if(data.currentUser.pendingMessage[0]){
        $scope.pendingMessage = data.currentUser.pendingMessage[0];
        $scope.decision ='Accept';
      }
    });

    $scope.acceptMessage = function(){
      $scope.keepMessage(true);
    };

    $scope.releaseMessage = function(){
      $scope.keepMessage(false);
    };

    $scope.keepMessage = function(decision){
      $http.post('/messages/decision', {keep: decision}).success(function(data){
        if(data.status != "failure"){
          $scope.messages.push($scope.pendingMessage);
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