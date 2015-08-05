// Static Controller

var staticControllers = angular.module('staticControllers', []);

staticControllers.controller('StaticWelcomeCtrl', ['$scope',
  function ($scope) {

  }]);

// User Controller

var userControllers = angular.module('userControllers', []);

userControllers.controller('UserIndexCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('users').success(function(data) {
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
      console.log(data);
    });
  }]);

topicControllers.controller('TopicShowCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('topics/' + $routeParams.userId).success(function(data) {
      console.log(data);
    });
  }]);