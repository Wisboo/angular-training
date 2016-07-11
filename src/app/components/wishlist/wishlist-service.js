angular.module('wisboo').factory(
  'Wishlist', ['$http', 'User', 'configuration', function ($http, User, configuration) {
    const factory = {};

    factory.query = function () {
      const condition = {
        user: {
          __type: 'Pointer',
          className: '_User',
          objectId: User.getUser().objectId
        }
      };
      return $http.get(configuration.endpoint.wishlist, {
        params: {
          where: condition,
          include: 'book'
        }
      });
    };

    factory.add = (bookId) => {
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
    return factory;
  }]
);