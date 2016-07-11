angular.module('wisboo').controller(
  'CreateAccountController', ['$scope', 'User', '$state',
  function ($scope, User, $state) {
    this.registerUser = (user) => {
      User.registerUser(user).then(
        () => {
          $state.go('dashboard');
        },
        (resp) => {
          this.error_msg = resp.data.error;
        }
      );
    };
  }]);
