angular.module('wisboo').controller(
  'MenuController', ['$translate', 'User', '$state', function ($translate, User, $state) {
    const self = this;
    self.authenticatedUser = User.getUser();

    self.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };

    self.logout = function () {
      User.doLogout().then(
        function () {
          $state.go('sign-in');
        }
      );
    };
  }]
);
