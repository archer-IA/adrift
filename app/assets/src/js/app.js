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

adriftApp.controller('MessageRequestCtrl', ['$scope', '$http', '$interval', 
  function($scope, $http, $interval) {
    angular.element(document).ready(function () {

      $scope.requestMessage = function(){
        $http.get('/messages').success(function(data) {
          console.log('Getting Messages...')
        });
      };

      $interval($scope.requestMessage, 1000);

    });
}]);