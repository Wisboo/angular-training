angular.module('wisboo').controller(
  'SuggestionController', ['$scope', '$uibModalInstance', 'Suggestion', '$translate', function ($scope, $uibModalInstance, Suggestion, $translate) {
    $scope.cancel = () => {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.saveSuggestion = (suggestion) => {
      Suggestion.save(suggestion).then(
        () => {
          $uibModalInstance.close();
        },
        () => {
          $translate('SUGGESTION_ERROR').then( (text) => {
            self.savingErrorMsg = text;
          });
        }
      );
    };
  }]
);
