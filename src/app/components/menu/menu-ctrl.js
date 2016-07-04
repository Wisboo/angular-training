angular.module('wisboo').controller(
  'MenuController', ['$translate', 'User', '$state', '$uibModal', function ($translate, User, $state, $uibModal) {
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

    self.openSuggestionModal = function () {
      const modalInstance = $uibModal.open({
        templateUrl: 'app/components/suggestions/suggest-book.html',
        controller: 'SuggestionController'
      });

      modalInstance.result.then(
        function () {},
        function () {}
      );
    };
  }]
);
