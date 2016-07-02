angular.module('wisboo').controller(
  'BookListController', ['$scope', 'Book', 'configuration', function ($scope, Book, configuration) {
    const self = this;

    function init () {
      self.defaultImage = configuration.defaultImage;
      Book.query().then(
          function (resp) {
            self.books = resp.data.results;
          },
          function () {}
        );
    }

    init();
  }]);
