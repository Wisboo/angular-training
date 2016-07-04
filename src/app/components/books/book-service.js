angular.module('wisboo').factory(
  'Book', ['$http', 'configuration', 'User', function ($http, configuration, User) {
    const factory = {};
    const rentDays = 15;

    factory.query = function () {
      return $http.get(configuration.endpoint.books);
    };

    factory.get = function (bookId) {
      return $http.get(configuration.endpoint.books + '/' + bookId).then(
        function (resp) {
          return resp.data;
        }
      );
    };

    factory.rent = function (bookId) {
      const fromDate = new Date(), 
            toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + rentDays);
      const data = {
        user: {
          __type: 'Pointer',
          className: '_User',
          objectId: User.getUser().objectId
        },
        book: {
          __type: 'Pointer',
          className: 'Book',
          objectId: bookId
        },
        from: {
          __type: 'Date',
          iso: fromDate.toISOString()
        },
        to: {
          __type: 'Date',
          iso: toDate.toISOString()
        }
      };
      return $http.post(configuration.endpoint.rent, data);
    };

    factory.addToWishlist = function (bookId) {
      const data = {
        user: {
          __type: 'Pointer',
          className: '_User',
          objectId: User.getUser().objectId
        },
        book: {
          __type: 'Pointer',
          className: 'Book',
          objectId: bookId
        }
      };
      return $http.post(configuration.endpoint.wishlist, data);
    };

    factory.checkIfAvailable = function (bookId) {
      const current = new Date();
      const condition = {
        book: {
          __type: 'Pointer',
          className: 'Book',
          objectId: bookId
        },
        from: {
          iso: {
            '$lte': current.toISOString()
          }
        },
        to: {
          iso: {
            '$gte': current.toISOString()
          }
        }
      };
      return $http.get(configuration.endpoint.rent, {
        params: {
          where: condition
        }
      }).then(function (res) {
        return res.data.results.length > 0 ? res.data.results[0] : false;
      });
    };
    return factory;
  }]
);
