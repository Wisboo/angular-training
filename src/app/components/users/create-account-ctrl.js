angular.module('wisboo').controller(
  'CreateAccountController', ['$scope', 'User', '$state',
  function ($scope, User, $state) {
    const self = this;

    self.registerUser = function (user) {
      User.registerUser(user).then(
        function (resp) {
          $state.go('dashboard');
        },
        function (resp) {
          self.error_msg = resp.data.error;
        }
      );
    };
  }]);
