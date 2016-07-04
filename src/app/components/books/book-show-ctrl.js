angular.module('wisboo').controller(
  'BookShowController', ['Book', '$stateParams', 'Comment', '$translate', 'User',
  function (Book, $stateParams, Comment, $translate, User) {
    const self = this;

    self.saveComment = function (comment) {
      self.savingErrorMsg = undefined;
      const old_comments = angular.copy(self.comments);
      const new_comment = {
        comment: comment,
        createdAt: new Date(),
        user: User.getUser()
      };
      self.comments.push(new_comment);

      Comment.save(comment, $stateParams.bookId).then(
        function (resp) {
          ctrl.comment = '';
        },
        function () {
          $translate('COMMENT_SAVING_ERROR').then(function (text) {
            self.savingErrorMsg = text;
          });
          self.comments = old_comments;
        }
      );
    };

    function init () {
      Book.get($stateParams.bookId).then(
        function (book) {
          self.book = book;
        }
      );
      Comment.query($stateParams.bookId).then(
        function (comments) {
          self.comments = comments;
        }
      );
    }

    init();
  }]
);
