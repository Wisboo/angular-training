angular.module('wisboo').config([
  '$translateProvider', 'esTranslations', 'enTranslations',
  function ($translateProvider, esTranslations, enTranslations)  {
    $translateProvider.translations('es', esTranslations);
    $translateProvider.translations('en', enTranslations);

    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useCookieStorage();
  }
]);
