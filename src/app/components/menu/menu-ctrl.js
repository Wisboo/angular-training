angular.module('wisboo').controller(
  'MenuController', ['$translate', 'User', '$state', '$uibModal', 'growl', 
  function ($translate, User, $state, $uibModal, growl) {
    this.authenticatedUser = User.getUser();

    this.changeLanguage = (langKey) => {
      $translate.use(langKey);
    };

    this.logout = () => {
      User.doLogout().then(
        () => {
          $state.go('sign-in');
        }
      );
    };

    this.openSuggestionModal = () => {
      const modalInstance = $uibModal.open({
        templateUrl: 'app/components/suggestions/suggest-book.html',
        controller: 'SuggestionController'
      });

      modalInstance.result.then(
        () => {
          $translate('SUGGESTION_SUCCESS').then( (text) => {
            growl.success(text);
          });
        }
      );
    };

    this.init = () => {

    };

    this.init();
  }]
);
