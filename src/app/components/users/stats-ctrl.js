angular.module('wisboo').controller(
  'StatsController', [ 'User', 'Book', 'Rent', 'Comment', 'Wishlist', function (User, Book, Rent, Comment, Wishlist) {
    this.user = angular.copy(User.getUser());
    Rent.query().then((res) => {
      this.user.books = res.data.results;
    });
    Wishlist.query().then((res) => {
      this.user.wishlist = res.data.results;
    });
    Comment.queryByUser(this.user.objectId).then((res) => {
      this.user.comments = res;
    });
  }]
);