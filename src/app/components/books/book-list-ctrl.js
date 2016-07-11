angular.module('wisboo').controller(
  'BookListController', ['$scope', 'Book', 'configuration', function ($scope, Book, configuration) {
    this.defaultImage = configuration.defaultImage;
    Book.query().then(
      (resp) => {
        this.books = resp.data.results;
      },
      () => {}
    );
  }]);
