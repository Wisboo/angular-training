angular.module('wisboo').directive('match',
	['$parse', function ($parse) {
    return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				function customValidator (ngModelValue) {
          if(!ctrl || !attrs.match) {
            return;
          }

          let match = $parse(attrs.match); 
          if (match(scope) === ngModelValue) {
            ctrl.$setValidity('match', true);
          } else {
            ctrl.$setValidity('match', false);
          }
					return ngModelValue;
				}
				ctrl.$parsers.push(customValidator);
			}
		};
	}]);
