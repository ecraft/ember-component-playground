import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component } = Ember;

export default Component.extend({

  classNames: ['ember-component-playground'],

  layout: hbs`
    <div class="playground-preview">
      {{component-playground.playground-preview code=code}}
    </div>

    <div class="playground-code">
      {{textarea value=code classNames="code-input"}}
    </div>
  `
});
