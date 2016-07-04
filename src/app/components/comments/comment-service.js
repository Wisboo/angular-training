angular.module('wisboo').factory(
  'Comment', ['$http', 'configuration', 'User', function ($http, configuration, User) {
    const factory = {};
    factory.query = function (bookId) {
      const condition = {
        book: {
          __type: 'Pointer',
          className: 'Book',
          objectId: bookId
        }
      };

      return $http.get(configuration.endpoint.comments, {
        params: {
          where: condition,
          include: 'user'
        }
      }).then(
        function (res) {
          return res.data.results;
        }
      );
    };

    factory.save = function (comment, bookId) {
      const data = {};
      data.book = {
        __type: 'Pointer',
        className: 'Book',
        objectId: bookId
      };
      data.user = {
        __type: 'Pointer',
        className: '_User',
        objectId: User.getUser().objectId
      };
      data.comment = comment;
      return $http.post(configuration.endpoint.comments, data);
    };
    return factory;
  }]
);
