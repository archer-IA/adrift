
angular.module('adriftApp', [])
.controller('TemplateCtrl', ['$scope', function($scope) {
  $scope.templates =
    [{ name: 'welcome', url: 'partials/_welcome.html'}];
  $scope.template = $scope.templates[0];
}]);