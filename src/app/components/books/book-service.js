angular.module('wisboo').factory(
  'Book', ['$http', 'configuration', function ($http, configuration) {
    const factory = {};
    
    factory.query = function () {
      return $http.get(configuration.endpoint.books);
    };

    factory.get = function (bookId) {
      return $http.get(configuration.endpoint.books + '/' + bookId).then(
        function (resp) {
          return resp.data;
        }
      );
    };

    return factory;
  }]
);
