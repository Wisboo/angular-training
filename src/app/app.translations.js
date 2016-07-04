angular.module('wisboo').config([
  '$translateProvider',
  function ($translateProvider)  {

    $translateProvider.translations('es', {
      HOME: 'Inicio',
      CREATE_ACCOUNT: 'Crear cuenta',
      NAME: 'Nombre',
      LASTNAME: 'Apellido',
      USERNAME: 'Nombre de usuario',
      EMAIL: 'Correo electrónico',
      PASSWORD: 'Contraseña',
      CONFIRM_PASSWORD: 'Confirmar contraseña',
      REQUIRED_ERROR: 'Debes ingresar tu {{field}}.',
      INVALID_EMAIL_ERROR: 'El correo electrónico ingresado es inválido.',
      SHORT_PASSWORD_ERROR: 'Tu contraseña debe tener al menos 8 caracteres.',
      LETTERS_AND_NUMBERS_ERROR: 'Tu contraseña debe tener letras y números.',
      UNCONFIRMED_PASSWORD_ERROR: 'Debes reingresar tu contraseña',
      UNEQUAL_ERROR: 'Las contraseñas ingresadas no coinciden.',
      SELECT_FILTER: 'Selecciona un filtro',
      SEARCH: 'Buscar',
      CHANGE_LANG: 'Cambiar idioma',
      SPANISH: 'Español',
      ENGLISH: 'Inglés',
      LOGIN: 'Iniciar sesión',
      LOGOUT: 'Salir',
      WELCOME: 'Bienvenido',
      INVALID_CREDENTIALS_ERROR: 'Tu contraseña y/o nombre de usuario es incorrecto.',
      GENERAL_LOGIN_ERROR: 'Ocurrió un error al intentar iniciar sesión.',
      NO_ACCOUNT_MSG: '¿No tienes una cuenta?',
      HELLO: 'Hola',
      PROFILE: 'Perfil',
      MY_ACCOUNT: 'Mi cuenta',
      EDIT: 'Editar',
      SAVE: 'Guardar',
      CANCEL: 'Cancelar',
      MEMBER_SINCE: 'Miembro desde',
      CHANGE_PASSWORD: 'Cambiar contraseña',
      USERNAME_TAKEN_ERROR: 'El nombre de usuario ya está en uso.',
      GENERAL_SAVING_ERROR: 'Ocurrió un error al intentar guardar los cambios.'
    });

    $translateProvider.translations('en', {
      HOME: 'Home',
      CREATE_ACCOUNT: 'Create account',
      NAME: 'Name',
      LASTNAME: 'Lastname',
      USERNAME: 'Username',
      EMAIL: 'Email',
      PASSWORD: 'Password',
      CONFIRM_PASSWORD: 'Confirm password',
      REQUIRED_ERROR: 'You must enter your {{field}}.',
      INVALID_EMAIL_ERROR: 'Your email is invalid.',
      SHORT_PASSWORD_ERROR: 'Your password should have at least 8 characters.',
      LETTERS_AND_NUMBERS_ERROR: 'Your password should contain letters and numbers.',
      UNCONFIRMED_PASSWORD_ERROR: 'You must re-enter your password.',
      UNEQUAL_ERROR: 'The passwords don\'t match.',
      SELECT_FILTER: 'Select filter',
      SEARCH: 'Search',
      CHANGE_LANG: 'Change language',
      SPANISH: 'Spanish',
      ENGLISH: 'English',
      LOGIN: 'Sign in',
      LOGOUT: 'Sign out',
      WELCOME: 'Welcome back',
      INVALID_CREDENTIALS_ERROR: 'Your password and/or username is incorrect.',
      GENERAL_LOGIN_ERROR: 'An error ocurred while trying to sign you in.',
      NO_ACCOUNT_MSG: 'Don\'t have an account?',
      HELLO: 'Hello',
      PROFILE: 'Profile',
      MY_ACCOUNT: 'My account',
      EDIT: 'Edit',
      SAVE: 'Save',
      CANCEL: 'Cancel',
      MEMBER_SINCE: 'Member since',
      CHANGE_PASSWORD: 'Change password',
      USERNAME_TAKEN_ERROR: 'This username is already taken.',
      GENERAL_SAVING_ERROR: 'An error ocurred while saving your changes.'
    });

    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useCookieStorage();
  }
]);
