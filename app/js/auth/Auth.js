import $ from 'jquery';
import PageManager from '../PageManager';

export default class Auth extends PageManager {
  constructor(options = {}) {
    super();

    // Options
    this.options = $.extend({
      el: 'body'
    }, options);

    // Scope
    this.$scope = $(this.options.el);

    // Forms
    this.$form_registration = $('[data-registration-form]', this.$scope);
    this.$form_login = $('[data-login-form]', this.$scope);
    this.$form_logout = $('[data-logout-button]', this.$scope);
    this.$form_messages = $('[data-auth-form-message]', this.$scope);

    this._bindEvents();
    this._accountStatus();
  }

  // Events
  _bindEvents() {
    $('[data-input-submit]', this.$form_registration).on('click', (event) => {
      this._registerAccount(event);
    });

    $('[data-input-submit]', this.$form_login).on('click', (event) => {
      this._accountLogin(event);
    });

    this.$form_logout.on('click', (event) => {
      this._accountLogout(event);
    });
  }

  // Status
  _accountStatus() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is logged in: ', user.email);
      } else {
        console.log('No one is logged in yet, homeslice.');
      }
    });
  }

  // Registration
  _registerAccount(event) {
    const $submit = $(event.currentTarget);
    const email = $('[data-input-email]', this.$form_registration).val();
    const password = $('[data-input-password]', this.$form_registration).val();

    this.$form_registration.submit(event => {
      event.preventDefault();
    });

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      const code = 'successful registration';
      const message = 'Neat, welcome to the bananarama!';

      this._authMessage(code, message);
    }, error => {
      const code = error.code;
      const message = error.message;

      this._authMessage(code, message);
    });
  }

  // Login
  _accountLogin(event) {
    const $submit = $(event.currentTarget);
    const email = $('[data-input-email]', this.$form_login).val();
    const password = $('[data-input-password]', this.$form_login).val();

    this.$form_login.submit(event => {
      event.preventDefault();
    });

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      const code = 'successful login';
      const message = 'Congratulations, you\'re logged in !';

      this._authMessage(code, message);
    }, error => {
      const code = error.code;
      const message = error.message;

      this._authMessage(code, message);
    });
  }

  // Logout
  _accountLogout() {
    firebase.auth().signOut().then(() => {
      const code = 'successful logout';
      const message = 'Well, you\'re all logged out :(';

      this._authMessage(code, message);
    }, error => {
      const code = error.code;
      const message = error.message;

      this._authMessage(code, message);
    });
  }

  // Messages
  _authMessage(code, message) {
    this.$form_messages.html('');
    this.$form_messages.append(`<p>${message}</p>`);
    console.log('Response code: ', code);
  }

  loaded(next) {
    next();
  }
}
