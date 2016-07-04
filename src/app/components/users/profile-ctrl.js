angular.module('wisboo').controller(
  'ProfileController', ['User', '$translate', function (User, $translate) {
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
      self.savingErrorMsg = undefined;
      User.edit(user).then(
        function () {
          self.editing = false;
          self.oldData = undefined;
        },
        function (resp) {
          if (resp.data.code === 202) {
            $translate('USERNAME_TAKEN_ERROR').then(function (text) {
              self.savingErrorMsg = text;
            });
          } else {
            $translate('GENERAL_SAVING_ERROR').then(function (text) {
              self.savingErrorMsg = text;
            });
          }
        }
      );
    };

    self.changePassword = function (newPassword) {
      self.user.password = newPassword;
      self.savingPassErrorMsg = undefined;
      User.edit(self.user).then(
        function () {
          self.newPassword = '';
          self.passwordConfirm = '';
        },
        function () {
          $translate('GENERAL_SAVING_ERROR').then(function (text) {
            self.savingPassErrorMsg = text;
          });
        }
      );
    };

    self.cancelEditing = function () {
      self.editing = false;
      self.user = self.oldData;
      self.oldData = undefined;
    };
  }]
);
