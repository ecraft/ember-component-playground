import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component } = Ember;

export default Component.extend({
  layout: hbs`<h1>RENDER-TESTER</h1>{{yield}}`
});
