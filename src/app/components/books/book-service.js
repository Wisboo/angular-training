angular.module('wisboo').factory(
  'Book', ['$http', 'configuration', function ($http, configuration) {
    const factory = {};
    factory.query = function () {
      return $http.get(configuration.endpoint.books);
    };
    return factory;
  }]
);
