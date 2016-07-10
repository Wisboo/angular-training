angular.module('wisboo').controller(
  'BookShowController', ['Book', 'Rent', '$stateParams', 'Comment', '$translate', 'User', '$filter', 'growl',
  function (Book, Rent, $stateParams, Comment, $translate, User, $filter, growl) {
    this.saveComment = (comment) => {
      this.savingErrorMsg = undefined;
      const oldComments = angular.copy(this.comments);
      const newComment = {
        comment: comment,
        createdAt: new Date(),
        user: User.getUser()
      };
      this.comments.push(newComment);

      Comment.save(comment, $stateParams.bookId).then(
        () => {
          ctrl.comment = '';
        },
        () => {
          $translate('COMMENT_SAVING_ERROR').then( (text) => {
            this.savingErrorMsg = text;
          });
          this.comments = oldComments;
        }
      );
    };

    this.rentBook = () => {
      Rent.save($stateParams.bookId).then(
        () => {
          this.alreadyRented = true;
          $translate('RENT_SUCCESS', {book_name: this.book.name}).then( (text) => {
            growl.success(text);
          });
          $translate('RETURN_MSG', { date: $filter('date')(new Date().toISOString(), 'shortDate') })
          .then( (text) => {
            this.statusMsg = text;
          });
        },
        () => {
          $translate('RENT_ERROR').then( (text) => {
            growl.error(text);
          });
        }
      );
    };

    this.addToWishlist = () => {
      Book.addToWishlist($stateParams.bookId).then(
        () => {
          $translate('WISHLIST_SUCCESS', {book_name: this.book.name}).then( (text) => {
            growl.success(text);
          });
        },
        () => {
          $translate('WISHLIST_ERROR').then( (text) => {
            growl.error(text);
          });
        }
      );
    };
    this.init = () => {
      this.alreadyRented = true;
      Book.get($stateParams.bookId).then(
        (book) => {
          this.book = book;
        }
      );
      Book.checkIfAvailable($stateParams.bookId).then(
        (rent) => {
          if (rent) {
            this.alreadyRented = rent.user.objectId;
            if (rent.user.objectId === User.getUser().objectId) {
              $translate('RETURN_MSG', { date: $filter('date')(rent.to.iso, 'shortDate') }).then( (text) => {
                this.statusMsg = text;
              });
            } else {
              $translate('NOT_AVAILABLE_MSG').then( (text) => {
                this.statusMsg = text;
              });
            }
          } else {
            this.alreadyRented = false;
          }
        }
      );

      Comment.query($stateParams.bookId).then(
        (comments) => {
          this.comments = comments;
        }
      );
    };

    this.init();
  }]
);
