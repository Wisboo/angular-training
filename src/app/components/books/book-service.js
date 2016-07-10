angular.module('wisboo').factory(
  'Book', ['$http', 'configuration', 'User', ($http, configuration, User) => {
    const factory = {};
    const rentDays = 15;

    factory.query = () => {
      return $http.get(configuration.endpoint.books);
    };

    factory.get = (bookId) => {
      return $http.get(configuration.endpoint.books + '/' + bookId).then(
        (resp) => {
          return resp.data;
        }
      );
    };

    factory.rent = (bookId) => {
      const fromDate = new Date();
      const toDate = new Date(fromDate);
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

    factory.addToWishlist = (bookId) => {
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

    factory.checkIfAvailable = (bookId) => {
      const current = new Date();
      const condition = {
        book: {
          __type: 'Pointer',
          className: 'Book',
          objectId: bookId
        },
        from: {
          iso: {
            '$gte': current.toISOString()
          }
        },
        to: {
          iso: {
            '$lte': current.toISOString()
          }
        }
      };
      return $http.get(configuration.endpoint.rent, {
        params: {
          where: condition
        }
      }).then( (res) => {
        return res.data.results.length > 0 ? res.data.results[0] : false;
      });
    };

    factory.rentsForUser = () => {
      const condition = {
        user: {
          __type: 'Pointer',
          className: '_User',
          objectId: User.getUser().objectId
        }
      }

      return $http.get(configuration.endpoint.rent, {
          params: {
            where: condition
          }
        }
      );
    };
    return factory;
  }]
);
