angular.module('wisboo').controller(
  'BookListController', ['$scope', '$http', 'configuration', function ($scope, $http, configuration) {
    $scope.books = [];

    function init () {
      $scope.defaultImage = configuration.defaultImage;
      $http.get(configuration.endpoint).then(
          function (resp) {
            $scope.books = resp.data.results;
          },
          function () {}
        );
    }

    init();
  }]);
