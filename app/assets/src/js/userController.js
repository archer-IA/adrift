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
      };
      if(data.currentUser.pendingMessage[0]){
        $scope.pendingMessage = data.currentUser.pendingMessage[0];
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
              $scope.pendingMessage = data.message;
            }
        });
        $scope.request = 'Requested'; 
        $scope.requested = true;
      } else if ($scope.requested == true) {
        console.log('already requested');
      };
    };
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