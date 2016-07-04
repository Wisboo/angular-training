angular.module('wisboo').factory(
  'Suggestion', ['$http', 'configuration', function ($http, configuration) {
    const factory = {};
    factory.save = function (suggestion) {
      return $http.post(configuration.endpoint.suggestions, suggestion);
    };
    return factory;
  }]
);
