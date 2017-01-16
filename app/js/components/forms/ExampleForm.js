import $ from 'jquery';

export default class ExampleForm {
  constructor(options = {}) {

    // Options
    this.options = $.extend({
      el: 'body'
    }, options);

    // Scope
    this.$scope = $(this.options.el);

    // Firebase
    this.database = firebase.database();
    this.formRef = 'form_submissions';
    this.formSubmissions = this.database.ref(this.formRef);

    // Fields
    this.$name = $('[data-form-text-name]', this.$scope);
    this.$email = $('[data-form-email-email]', this.$scope);
    this.$notes = $('[data-form-textarea-notes]', this.$scope);
    this.$submit = $('[data-test-form-submit]', this.$scope);

    // Entries
    this.$entries = $('[data-form-entries]', this.$scope);

    this._bindEvents();
  }

  // Events
  _bindEvents() {

    // Entry submission
    this.$submit.on('click', () => {
      this._submitForm();
    });

    // Submission listener
    this.formSubmissions.on('child_added', (entry) => {
      this._entryAdded(entry);
    });

    // Entry removal
    this.$scope.on('click', '[data-delete-entry]', (event) => {
      const entry = $(event.currentTarget).data('entry-id');

      this._deleteFormEntry(entry);
    });

    // Removal listener
    this.formSubmissions.on('child_removed', (entry) => {
      const $removed_entry = $(`#${entry.key}`);

      console.log(`${entry.val().info.name} was removed.`);

      $removed_entry.fadeOut(() => {
        $removed_entry.remove();
      });
    });
  }

  _submitForm() {
    // Push entry to DB
    this.formSubmissions.push({
       info: {
          name: this.$name.val(),
          email: this.$email.val(),
          notes: this.$notes.val(),
       }
    });

    // Reset form
    this.$scope[0].reset();
  }

  _entryAdded(entry) {
    const name = entry.val().info.name;
    const email = entry.val().info.email;
    const notes = entry.val().info.notes;

    // Inject entry into DOM
    this.$entries.append(`
      <div
        class="form__entry"
        id="${entry.key}">
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Notes: ${notes}</p>
        <button
          type="button"
          data-entry-id="${entry.key}"
          data-delete-entry>
          Delete entry
        </button>
        <p>––––––––––––––––</p>
      </div>
    `);
  }

  _deleteFormEntry(entry) {
    // Remove entry from DB
    this.database.ref(`${this.formRef}/${entry}`).remove();
  }
}
