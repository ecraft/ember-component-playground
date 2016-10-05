import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, getOwner } = Ember;

export default Component.extend({

  // Passed Props
  // ---------------------------------------------------------------------------
  contextActions: {},

  // Properties
  // ---------------------------------------------------------------------------

  compilerError: '',
  partialName: '',

  classNames: ['preview-wrapper'],

  layout: hbs`
    <div class="partial-wrapper">
      {{partial partialName}}
    </div>
    <div class="compiler-error">
      <p class="error-message">{{compilerError}}</p>
    </div>
  `,

  // Hooks
  // ---------------------------------------------------------------------------

  init() {
    this._super(...arguments);

    const actions = this.get('contextActions');

    for (let action in actions) {

      if (!(actions.hasOwnProperty(action))) { return; }
      if (this.get(`actions.${action}`)) { return; } // already set, do less

      if (typeof actions[action] === 'function') {
        this.set(`actions.${action}`, action);
      } else {
        this.set(`actions.${action}`, function() { console.log(`${action} called`); });
      }
    }
  },

  didReceiveAttrs({ newAttrs }) {
    if (!newAttrs.code.value) { newAttrs.code.value = ''; }

    try {
      let timestamp = Date.now();

      getOwner(this).register(`template:partials/playground-${timestamp}`, Ember.HTMLBars.compile(newAttrs.code.value));
      this.set('partialName', `partials/playground-${timestamp}`);
      this.set('compilerError', '');
    } catch(ex) {
      this.set('compilerError', ex);
    }
  },

  // Actions
  // ---------------------------------------------------------------------------

  actions: {}
});
