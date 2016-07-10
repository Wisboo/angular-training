angular.module('wisboo').filter('wisbooDaysTo', function () {
  return function (input) {
    const from = moment(input);
    const to = moment(new Date());
    return from.diff(to, 'days');
  };
});
