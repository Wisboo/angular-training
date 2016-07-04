angular.module('wisboo').controller(
  'ProfileController', ['User', function (User) {
    const self = this;

    User.checkout().then(function (user) {
      self.user = user;
    });

    self.enableEditing = function () {
      self.editing = true;
      self.oldData = angular.copy(self.user);
    };

    self.isEditingEnabled = function () {
      return self.editing;
    };

    self.saveChanges = function (user) {
      User.edit(user).then(
        function () {
          self.editing = false;
          self.oldData = undefined;
        },
        function () {}
      );
    };

    self.cancelEditing = function () {
      self.editing = false;
      self.user = self.oldData;
      self.oldData = undefined;
    };
  }]
);