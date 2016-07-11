angular.module('wisboo').factory(
  'Comment', ['$http', 'configuration', 'User', ($http, configuration, User) => {
    const factory = {};
    factory.queryByBook = (bookId) => {
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
        (res) => {
          return res.data.results;
        }
      );
    };

    factory.queryByUser = (userId) => {
      const condition = {
        user: {
          __type: 'Pointer',
          className: '_User',
          objectId: userId
        }
      };

      return $http.get(configuration.endpoint.comments, {
        params: {
          where: condition,
          include: 'book'
        }
      }).then(
        (res) => {
          return res.data.results;
        }
      );
    };

    factory.save = (comment, bookId) => {
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
