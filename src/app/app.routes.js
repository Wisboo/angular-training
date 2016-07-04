angular.module('wisboo').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise( ($injector) => {
      $injector.get('$state').go('404');
    });

    $stateProvider
      .state('404', {
        url: '/not-found',
        views: {
          main: {
            templateUrl: '../static/404.html'
          }
        }
      })
      .state('landing', {
        url: '/landing',
        views: {
          main: {
            templateUrl: 'app/components/landing/landing.html'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
