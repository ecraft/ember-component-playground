import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, getOwner } = Ember;

export default Component.extend({

  compilerError: '',
  partialName: '',

  layout: hbs`
    {{partial partialName}}
    {{compilerError}}
  `,

  didReceiveAttrs(attrs) {
    if (!attrs.newAttrs.code.value) { attrs.newAttrs.code.value = ''; }

    try {
      let timestamp = Date.now();

      getOwner(this).register(`template:partials/playground-${timestamp}`, Ember.HTMLBars.compile(attrs.newAttrs.code.value));
      this.set('partialName', `partials/playground-${timestamp}`);
      this.set('compilerError', '');
    } catch(ex) {
      this.set('compilerError', ex);
    }
  }
});
