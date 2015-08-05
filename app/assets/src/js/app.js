var adriftApp = angular.module('adriftApp', [
  'ngRoute',
  'userControllers'
]);

adriftApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/welcome', {
        templateUrl: 'partials/static/welcome.html',
        controller: 'StaticCtrl'
      }).
      when('/users', {
        templateUrl: 'partials/users/index.html',
        controller: 'UserIndexCtrl'
      }).
      when('/users/:userId', {
        templateUrl: 'partials/users/show.html',
        controller: 'UserShowCtrl'
      }).
      when('/topics', {
        templateUrl: 'partials/topics/index.html',
        controller: 'TopicIndexCtrl'
      }).
      when('/topics/:topicId', {
        templateUrl: 'partials/topics/show.html',
        controller: 'TopicShowCtrl'
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);