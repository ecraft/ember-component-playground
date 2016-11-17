/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-component-playground',

  /*
   * Pull in template compiler and set default codemirror configurations for
   * consuming app.
   * TODO: Does this work when this is a nested addon?
   */
  included: function(app) {
    this._super.included.apply(this, arguments);

    // Required to compile templates at runtime
    if (app.import) {
      app.import('bower_components/ember/ember-template-compiler.js');
    }

    // Provide default codemirror configuration
    if (app.options && (!app.options.codemirror || !app.options.codemirror.modes)) {
      app.options.codemirror = {
        modes: ['handlebars']
      };
    }
  }
};
