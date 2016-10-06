/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-component-playground'

  // Commenting this out until we figure out what the correct Ember spells we
  // need to cast here are
  // included: function(app, parentAddon) {
    // var target = (app || parentAddon);

    // Required to compile templates at runtime
    // target.import('bower_components/ember/ember-template-compiler.js');

    // Provide default codemirror options
    // if (!target.options && !target.options.codemirror) {
    //   target.options.codemirror = {
    //     modes: ['handlebars'],
    //     themes: ['monokai']
    //   };
    // }
  // }
};
