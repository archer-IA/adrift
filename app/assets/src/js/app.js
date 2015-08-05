var adriftApp = angular.module('adriftApp', [
  'ngRoute',
  'staticControllers',
  'userControllers',
  'topicControllers'
]);

adriftApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
      when('/welcome', {
        templateUrl: 'partials/static/welcome.html',
        controller: 'StaticWelcomeCtrl'
      }).
      when('/drifters', {
        templateUrl: 'partials/users/index.html',
        controller: 'UserIndexCtrl'
      }).
      when('/drifters/:userId', {
        templateUrl: 'partials/users/show.html',
        controller: 'UserShowCtrl'
      }).
      when('/locations', {
        templateUrl: 'partials/topics/index.html',
        controller: 'TopicIndexCtrl'
      }).
      when('/locations/:topicId', {
        templateUrl: 'partials/topics/show.html',
        controller: 'TopicShowCtrl'
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);