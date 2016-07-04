angular.module('wisboo').controller(
  'SuggestionController', ['$scope', '$uibModalInstance', 'Suggestion', '$translate', function ($scope, $uibModalInstance, Suggestion, $translate) {
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.saveSuggestion = function (suggestion) {
      Suggestion.save(suggestion).then(
        function () {
          $uibModalInstance.close();
        },
        function () {
          $translate('SUGGESTION_ERROR').then(function (text) {
            self.savingErrorMsg = text;
          });
        }
      );
    };
  }]
);
