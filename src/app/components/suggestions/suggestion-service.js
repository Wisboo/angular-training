angular.module('wisboo').factory(
  'Suggestion', ['$http', 'configuration', ($http, configuration) => {
    const factory = {};
    factory.save = (suggestion) => {
      return $http.post(configuration.endpoint.suggestions, suggestion);
    };
    return factory;
  }]
);
