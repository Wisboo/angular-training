angular.module('wisboo').controller(
  'ProfileController', ['User', '$translate', 'growl', function (User, $translate, growl) {
    User.checkout().then( (user) => {
      this.user = user;
    });

    this.enableEditing = () => {
      this.editing = true;
      this.oldData = angular.copy(this.user);
    };

    this.isEditingEnabled = () => {
      return this.editing;
    };

    this.saveChanges = (user) => {
      this.savingErrorMsg = undefined;
      User.edit(user).then(
        () => {
          this.editing = false;
          this.oldData = undefined;
          $translate('PROFILE_CHANGE_SUCCESS').then( (text) => {
            growl.success(text);
          });
        },
        (resp) => {
          if (resp.data.code === 202) {
            $translate('USERNAME_TAKEN_ERROR').then( (text) => {
              this.savingErrorMsg = text;
            });
          } else {
            $translate('GENERAL_SAVING_ERROR').then( (text) => {
              this.savingErrorMsg = text;
            });
          }
        }
      );
    };

    this.changePassword = (newPassword) => {
      this.user.password = newPassword;
      this.savingPassErrorMsg = undefined;
      User.edit(this.user).then(
        () => {
          this.newPassword = '';
          this.passwordConfirm = '';
          $translate('PASSWORD_CHANGE_SUCCESS').then( (text) => {
            growl.success(text);
          });
        },
        () => {
          $translate('GENERAL_SAVING_ERROR').then( (text) => {
            this.savingPassErrorMsg = text;
          });
        }
      );
    };

    this.cancelEditing = () => {
      this.editing = false;
      this.user = this.oldData;
      this.oldData = undefined;
    };
  }]
);
