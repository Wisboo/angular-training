angular.module('wisboo').controller(
  'CreateAccountController', ['$scope', '$http', 'configuration', '$state',
  function ($scope, $http, configuration, $state) {
    const self = this;

    self.registerUser = function (user) {
      $http.post(configuration.endpoint.users, user).then(
        function (resp) {
          $state.go('dashboard');
        },
        function (resp) {
          self.error_msg = resp.data.error;
        }
      );
    };
  }]);
