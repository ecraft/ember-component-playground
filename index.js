/* eslint-env node */
'use strict';

const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-component-playground',

  /*
   * Pull in template compiler and set required codemirror configurations for
   * consuming app.
   */
  included: function(app) {
    this._super.included.apply(this, arguments);
    // this.ui.writeLine('Configuring ember-component-playground');

    const vendor = this.treePaths.vendor;
    const checker = new VersionChecker(this);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    // Find the parent app by crawling addon tree
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    // Validate options object exists
    if (!app.options) { app.options = {}; }


    // Validate required codemirror configurations for code editor
    // ---------------------------------------------------------------------------
    let codemirrorConfig = app.options.codemirror || {};

    // Most apps won't have a codemirror config which is fine, but we need to safely
    // make sure we have the following codemirror assets pulled in. This addon
    // uses the `ember-cli-codemirror-shim` package to handle pulling in codemirror
    // assets and shimming the package
    codemirrorConfig.addons = codemirrorConfig.addons || [];
    codemirrorConfig.modes = codemirrorConfig.modes || [];

    // If a theme isn't specified you GOTTA go with panda-syntax!!!
    if (!codemirrorConfig.themes) { codemirrorConfig.themes = ['panda-syntax']; }

    // Required addons
    if (codemirrorConfig.addons.indexOf('mode/simple.js') === -1) { codemirrorConfig.addons.push('mode/simple.js'); }
    if (codemirrorConfig.addons.indexOf('mode/multiplex.js') === -1) { codemirrorConfig.addons.push('mode/multiplex.js'); }

    // Required modes
    if (codemirrorConfig.modes.indexOf('xml') === -1) { codemirrorConfig.modes.push('xml'); }
    if (codemirrorConfig.modes.indexOf('javascript') === -1) { codemirrorConfig.modes.push('javascript'); }
    if (codemirrorConfig.modes.indexOf('handlebars') === -1) { codemirrorConfig.modes.push('handlebars'); }
    if (codemirrorConfig.modes.indexOf('htmlmixed') === -1) { codemirrorConfig.modes.push('htmlmixed'); }
    if (codemirrorConfig.modes.indexOf('css') === -1) { codemirrorConfig.modes.push('css'); }


    // Update consuming application asset imports and options
    // ---------------------------------------------------------------------------

    // Set codemirror options on consuming application
    app.options.codemirror = codemirrorConfig;

    // Required to compile templates at runtime
    if (checker.forEmber().satisfies('>= 2.11.0')) {
      app.import('vendor/ember/ember-template-compiler.js');
    } else {
      app.import('bower_components/ember/ember-template-compiler.js');
    }
    // Required for ember template highlighting
    app.import(`${vendor}/htmlhandlebars.js`);
    // Structural styles for the playground
    app.import(`${vendor}/ember-component-playground/styles.css`);
  }
};
