angular.module('wisboo').factory(
  'User', ['$http', '$localStorage', 'configuration', function ($http, $localStorage, configuration) {
    const factory = {};
    factory.doLogin = function (credentials) {
      return $http.get(configuration.endpoint.login, {
        params: {
          username: credentials.username,
          password: credentials.password
        }
      })
      .then(function (resp) {
        $localStorage._wbooks_user = resp.data;
      });
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
      let data;
      if (user.password) {
        data = {password: user.password};
      } else {
        data = {
          name: user.name,
          lastname: user.lastname,
          username: user.username
        };
      }
      return $http.put(configuration.endpoint.users + '/' + user.objectId, data).then(
        function () {
          if (data.password) {
            delete $localStorage._wbooks_user;
            factory.doLogin({username: user.username, password: data.password});
          } else {
            let editedUser = $localStorage._wbooks_user;
            angular.extend(editedUser, data);
            $localStorage._wbooks_user = editedUser;
          }
        }
      );
    };

    return factory;
  }]
);
