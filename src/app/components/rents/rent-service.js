angular.module('wisboo').factory(
  'Rent', ['$http', 'configuration', 'User', ($http, configuration, User) => {
    const factory = {};
    const rentDays = 15;

    factory.query = () => {
      const condition = {
        user: {
          __type: 'Pointer',
          className: '_User',
          objectId: User.getUser().objectId
        }/*,
        to: {
          iso: {
            '$gt': new Date().toISOString()
          }
        }*/
      };
      return $http.get(configuration.endpoint.rent, {
        params: {
          where: condition,
          include: 'book'
        }
      });
    };

    factory.save = (bookId) => {
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
  
    return factory;
  }]
);
