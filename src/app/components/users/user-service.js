angular.module('wisboo').factory(
  'User', ['$http', '$localStorage', 'configuration', function ($http, $localStorage, configuration) {
    const factory = {};
    factory.doLogin = function (credentials) {
      return $http.get(configuration.endpoint.login + '/?username=' +
        credentials.username + '&password=' + credentials.password).then(function (resp) {
          $localStorage._wbooks_user = resp.data;
        }
      );
    };

    factory.doLogout = function () {
      return $http.post(configuration.endpoint.logout).then(
        function () {
          delete $localStorage._wbooks_user;
        }
      );
    };

    factory.registerUser = function (user) {
      return $http.post(configuration.endpoint.users, user);
    };

    factory.getUser = function () {
      return $localStorage._wbooks_user;
    };

    factory.checkout = function () {
      return $http.get(configuration.endpoint.users + '/me').then(
        function (resp) {
          return resp.data;
        }
      );
    };

    factory.edit = function (user) {

    };

    return factory;
  }]
);
