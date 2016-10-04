import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component } = Ember;

export default Component.extend({
  layout: hbs`
    {{textarea value=code classNames="u-full-width"}}

    {{playground-rendered code=code}}
  `
});
