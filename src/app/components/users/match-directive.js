angular.module('wisboo').directive('wisbooMatch',
  ['$parse', ($parse) => {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: (scope, element, attrs, ctrl) => {
        function customValidator (ngModelValue) {
          if (!ctrl || !attrs.wisbooMatch) {
            return;
          }

          const match = $parse(attrs.wisbooMatch);
          if (match(scope) === ngModelValue) {
            ctrl.$setValidity('wisboo-match', true);
          } else {
            ctrl.$setValidity('wisboo-match', false);
          }
          return ngModelValue;
        }
        ctrl.$parsers.push(customValidator);
      }
    };
  }]);
