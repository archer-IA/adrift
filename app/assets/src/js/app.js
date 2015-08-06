var adriftApp = angular.module('adriftApp', [
  'ngRoute',
  'sessionController',
  'userControllers',
  'topicControllers'
]);

adriftApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
      when('/user/logout', {
        controller: 'SessionLogoutCtrl'
      }).
      when('/locations', {
        templateUrl: 'partials/topics/index.html',
        controller: 'TopicIndexCtrl'
      }).
      when('/settings/:userId', {
        templateUrl: 'partials/users/settings.html',
        controller: 'UserShowCtrl'
      }).
      when('/collection/:userId', {
        templateUrl: 'partials/users/collection.html',
        controller: 'UserShowCtrl'
      }).
      when('/locations/:topicId', {
        templateUrl: 'partials/topics/show.html',
        controller: 'TopicShowCtrl'
      }).
      otherwise({
        redirectTo: '/locations'
      });
  }]);