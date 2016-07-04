angular.module('wisboo').controller(
  'BookShowController', ['Book', '$stateParams', function (Book, $stateParams) {
    const self = this;
    function init () {  
      Book.get($stateParams.bookId).then(
        function (book) {
          self.book = book;
        }
      );
    }

    init();
  }]
);
