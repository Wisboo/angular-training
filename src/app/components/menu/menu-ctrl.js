angular.module('wisboo').controller(
  'MenuController', ['$translate', function ($translate) {
    const self = this;
    self.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
  }]
);