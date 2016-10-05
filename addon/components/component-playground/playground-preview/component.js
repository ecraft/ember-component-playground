import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, getOwner, HTMLBars } = Ember;

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
    const yellAboutIt = (thang) => { console.log(`${thang} called`); };

    for (let action in actions) {

      if (!(actions.hasOwnProperty(action))) { return; }
      if (this.get(`actions.${action}`)) { return; } // already set, do less

      if (typeof actions[action] === 'function') {
        this.set(`actions.${action}`, action);
      } else {
        this.set(`actions.${action}`, yellAboutIt(action));
      }
    }
  },

  /**
   * Looks through the passed-in template string and checks for action helpers;
   * when it finds some, it checks for the actions referenced and registers no-ops
   * for them on this component's context so that the application doesn't explode
   * when trying to reference a non-existent action.
   *
   * @method checkActionRefs
   * @param {String} templateString The template string to run the check for action matches on
   * @return {undefined}
   */
  checkActionRefs(templateString) {

    if (!templateString) { return; }

    const firstFilter = /action\s"(\w*?)"/gim;
    const secondFilter = /\'(.*?)\'/gi;
    let matchedActions = templateString.match(firstFilter);
    let actionNames = matchedActions.map(item => {
      return item.replace(/\"/g, '\'').match(secondFilter)[0].replace(/\'/g, '');
    });

    // Loop through the list of actions and set up no-ops on the local context
    // so that the test app doesn't explode
    actionNames.forEach(action => {
      if (!this.get(`actions.${action}`)) {
        this.set(`actions.${action}`, function() {});
        console.log(`Setting up a no-op for action name of ${action}`);
      }
    });
  },

  didReceiveAttrs({ newAttrs }) {
    if (!newAttrs.code.value) { newAttrs.code.value = ''; }

    try {
      let timestamp = Date.now();

      // Ensure non-existant passed in actions don't cause the app to explode
      this.checkActionRefs(newAttrs.code.value);

      getOwner(this).register(`template:partials/playground-${timestamp}`, HTMLBars.compile(newAttrs.code.value));
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
