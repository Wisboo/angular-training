angular.module('wisboo').controller(
  'LoginController', ['User', '$state', '$translate', function (User, $state, $translate) {
    const self = this;

    self.login = function (credentials) {
      User.doLogin(credentials).then(
        function () {
          $state.go('dashboard');
        },
        function (resp) {
          if (resp.data.code === 101) {
            $translate('INVALID_CREDENTIALS_ERROR').then(function (text) {
              self.errorMsg = text;
            });
          } else {
            $translate('GENERAL_LOGIN_ERROR').then(function (text) {
              self.errorMsg = text;
            });
          }
        }
      );
    };
  }]
);
