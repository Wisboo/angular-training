angular.module('wisboo').constant('configuration', {
  endpoint: {
    books: 'https://api.parse.com/1/classes/Book',
    users: 'https://api.parse.com/1/users',
    comments: 'https://api.parse.com/1/classes/Comment',
    login: 'https://api.parse.com/1/login',
    logout: 'https://api.parse.com/1/logout',
    suggestions: 'https://api.parse.com/1/classes/BookSuggestion',
    rent: 'https://api.parse.com/1/classes/Rent',
    wishlist: 'https://api.parse.com/1/classes/Wishlist'
  },
  credentials: {
    applicationId: 'DfYLYMHIcC80ykwZFbQet4a3YqYkOD92hcXIMIfA',
    restApiId: '0HlB6mmcrPMbu6UTyrnLnBJ4abOasv9TPrK6JYkE'
  },
  defaultImage: 'assets/images/default-image.png'
});
