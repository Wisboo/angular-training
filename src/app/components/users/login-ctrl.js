angular.module('wisboo').controller(
  'LoginController', ['User', '$state', '$translate', function (User, $state, $translate) {
    this.login = (credentials) => {
      User.doLogin(credentials).then(
        () => {
          $state.go('dashboard');
        },
        (resp) => {
          if (resp.data.code === 101) {
            $translate('INVALID_CREDENTIALS_ERROR').then( (text) => {
              this.errorMsg = text;
            });
          } else {
            $translate('GENERAL_LOGIN_ERROR').then( (text) => {
              this.errorMsg = text;
            });
          }
        }
      );
    };
  }]
);
