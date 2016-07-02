angular.module('wisboo').controller(
  'BookListController', ['$scope', 'Book', 'configuration', function ($scope, Book, configuration) {
    $scope.books = [];

    function init () {
      $scope.defaultImage = configuration.defaultImage;
      Book.query().then(
          function (resp) {
            $scope.books = resp.data.results;
          },
          function () {}
        );
    }

    init();
  }]);
