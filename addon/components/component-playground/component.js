import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component } = Ember;

export default Component.extend({

  classNames: ['ember-component-playground'],

  layout: hbs`
    {{textarea value=code classNames="u-full-width"}}

    {{component-playground.playground-preview code=code}}
  `
});
