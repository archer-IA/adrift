var adriftApp = angular.module('adriftApp', [
  'ngRoute',
  'userControllers',
  'topicControllers'
]);

adriftApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
      when('/adrift/user/logout', {
        controller: 'SessionLogoutCtrl'
      }).
      when('/adrift/locations', {
        templateUrl: 'partials/topics/index.html',
        controller: 'TopicIndexCtrl'
      }).
      when('/adrift/settings/:userId', {
        templateUrl: 'partials/users/settings.html',
        controller: 'UserShowCtrl'
      }).
      when('/adrift/collection/:userId', {
        templateUrl: 'partials/users/collection.html',
        controller: 'UserShowCtrl'
      }).
      when('/adrift/locations/:topicId', {
        templateUrl: 'partials/topics/show.html',
        controller: 'TopicShowCtrl'
      }).
      otherwise({
        redirectTo: '/adrift/locations'
      });
  }]);