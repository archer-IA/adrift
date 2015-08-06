var adriftApp = angular.module('adriftApp', [
  'ngRoute',
  'customFilters',
  'userControllers',
  'topicControllers'
]);

adriftApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.

      when('/adrift/locations', {
        templateUrl: 'partials/topics/index.html',
        controller: 'TopicIndexCtrl'
      }).
      when('/adrift/settings', {
        templateUrl: 'partials/users/settings.html',
        controller: 'UserSettingsCtrl'
      }).
      when('/adrift/collection', {
        templateUrl: 'partials/users/collection.html',
        controller: 'UserCollectionCtrl'
      }).
      when('/adrift/locations/:topicId', {
        templateUrl: 'partials/topics/show.html',
        controller: 'TopicShowCtrl'
      }).
      otherwise({
        redirectTo: '/adrift/locations'
      });
  }]);