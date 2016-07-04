angular.module('wisboo').controller(
  'BookShowController', ['Book', '$stateParams', 'Comment', '$translate', 'User', '$filter',
  function (Book, $stateParams, Comment, $translate, User, $filter) {
    const self = this;

    self.saveComment = function (comment) {
      self.savingErrorMsg = undefined;
      const oldComments = angular.copy(self.comments);
      const newComment = {
        comment: comment,
        createdAt: new Date(),
        user: User.getUser()
      };
      self.comments.push(newComment);

      Comment.save(comment, $stateParams.bookId).then(
        function () {
          ctrl.comment = '';
        },
        function () {
          $translate('COMMENT_SAVING_ERROR').then(function (text) {
            self.savingErrorMsg = text;
          });
          self.comments = oldComments;
        }
      );
    };

    self.rentBook = function () {
      Book.rent($stateParams.bookId).then(
        function() {
          self.alreadyRented = true;
          $translate('RETURN_MSG', { date: $filter.date(new Date().toISOString(), 'shortDate') })
          .then(function (text) {
            self.statusMsg = text;
          });
        },
        function() {}
      );
    };

    self.addToWishlist = function () {
      Book.addToWishlist($stateParams.bookId).then(
        function () {},
        function () {}
      );
    };
    function init () {
      self.alreadyRented = true;
      Book.get($stateParams.bookId).then(
        function (book) {
          self.book = book;
        }
      );
      Book.checkIfAvailable($stateParams.bookId).then(
        function (rent) {
          if (rent) {
            self.alreadyRented = rent.user.objectId;
            if (rent.user.objectId === User.getUser().objectId) {
              $translate('RETURN_MSG', { date: $filter.date(rent.to.iso, 'shortDate') }).then(function (text) {
                self.statusMsg = text;
              });
            } else {
              $translate('NOT_AVAILABLE_MSG').then(function (text) {
                self.statusMsg = text;
              });
            } 
          } else {
            self.alreadyRented = false;
          }
      });
      Comment.query($stateParams.bookId).then(
        function (comments) {
          self.comments = comments;
        }
      );
    }

    init();
  }]
);
