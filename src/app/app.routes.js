angular.module('wisboo').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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
      })
      .state('dashboard', {
        url: '/dashboard',
        views: {
          main: {
            templateUrl: 'app/components/books/index.html',
            controller: 'BookListController'
          }
        }
      });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push([ 'configuration', function (configuration) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          config.headers['X-Parse-Application-Id'] = configuration.credentials.applicationId;
          config.headers['X-Parse-REST-API-Key'] = configuration.credentials.restApiId;
          return config;
        }
      };
    }]);
  }
]);
