'use strict';

module.exports = {
  name: 'ember-component-playground',

  /*
   * Pull in template compiler and set default codemirror configurations for
   * consuming app.
   */
  included: function(app) {
    this._super.included.apply(this, arguments);
    this.ui.writeLine('Configuring ember-component-playground');

    let codemirrorConfig = ((this.project.config(process.env.EMBER_ENV) || {}).codemirror || {});

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    // Set resources on Addon instances
    this.app = app;

    // Required to compile templates at runtime
    app.import('bower_components/ember/ember-template-compiler.js');

    // Provide default codemirror configuration
    if (!codemirrorConfig.modes) { codemirrorConfig.modes = ['handlebars']; }
    if (!codemirrorConfig.themes) { codemirrorConfig.themes = ['panda-syntax']; }
  }
};
