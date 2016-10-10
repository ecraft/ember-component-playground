/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-component-playground',

  // Include hook used to pull in template compiler
  included: function(app, parentAddon) {
    this._super(...arguments);
    var target = (app || parentAddon);

    // Required to compile templates at runtime
    target.import('bower_components/ember/ember-template-compiler.js');

    // @TODO Is there a way to provide default codemirror options
  }
};
