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
          menu: {
            templateUrl: 'app/components/menu/menu.html',
            controller: 'MenuController',
            controllerAs: 'menu'
          },
          main: {
            templateUrl: 'app/components/books/index.html',
            controller: 'BookListController',
            controllerAs: 'ctrl'
          }
        },
        access: 'only-signin'
      })
      .state('me', {
        url: '/me',
        views: {
          menu: {
            templateUrl: 'app/components/menu/menu.html',
            controller: 'MenuController',
            controllerAs: 'menu'
          },
          main: {
            templateUrl: 'app/components/users/profile.html',
            controller: 'ProfileController',
            controllerAs: 'ctrl'
          }
        },
        access: 'only-signin'
      })
      .state('register', {
        url: '/register',
        views: {
          menu: {
            templateUrl: 'app/components/menu/menu.html',
            controller: 'MenuController',
            controllerAs: 'menu'
          },
          main: {
            templateUrl: 'app/components/users/new.html',
            controller: 'CreateAccountController',
            controllerAs: 'ctrl'
          }
        },
        access: 'only-anon'
      })
      .state('sign-in', {
        url: '/sign-in',
        views: {
          main: {
            templateUrl: 'app/components/users/login.html',
            controller: 'LoginController',
            controllerAs: 'ctrl'
          }
        },
        access: 'only-anon'
      });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push([ 'configuration', '$injector', function (configuration, $injector) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          config.headers['X-Parse-Application-Id'] = configuration.credentials.applicationId;
          config.headers['X-Parse-REST-API-Key'] = configuration.credentials.restApiId;

          const UserService = $injector.get('User');
          if (UserService.getUser() !== undefined) {
            config.headers['X-Parse-Session-Token'] = UserService.getUser().sessionToken;
          }

          return config;
        }
      };
    }]);
  }
])
.run(['$rootScope', 'User', '$state', function ($rootScope, User, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.access === 'only-signin' && !User.getUser()) {
      $state.go('sign-in');
      event.preventDefault();
    } else if (toState.access === 'only-anon' && User.getUser()) {
      $state.go('dashboard');
      event.preventDefault();
    }
  });
}]);
