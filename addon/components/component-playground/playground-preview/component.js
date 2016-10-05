import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, getOwner, HTMLBars } = Ember;

/**
 * This component is responsible for displaying the compiled output of the text
 * entered into the component playground's code editor field.
 *
 * It watches for changes to its attributes, and upon receiving updates to the
 * value of the code attribute, runs the template string through the Ember.HTMLBars
 * template compiler, so that you can see your output in real time.
 *
 * The component will also display inline compiler errors so that if something
 * went wrong/you placed some bad input into the code editor, you can see what
 * the compiler error was.
 *
 * @class Component.ComonentPlayground.PlaygroundPreview
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Props
  // ---------------------------------------------------------------------------

  /**
   * A hash of actions from the parent instance of the `ComponentPlayground`
   * component. These are automatically passed into the preview based on what
   * the user has defined for a specific instance of the `ComponentPlayground`.
   *
   * @property contextActions
   * @type {Object}
   */
  contextActions: {},

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Placeholder for errors output from the template compiler; used for displaying
   * compiler errors to the user so they can debug issues with their code in
   * the playground's code editor.
   *
   * @property compilerError
   * @type {string}
   */
  compilerError: '',
  /**
   * The name of the registered template partial to display as the playground's
   * output.
   *
   * @property partialName
   * @type {string}
   */
  partialName: '',
  /**
   * The component's internal `classNames` property. Used to apply classes for
   * styling purposes.
   *
   * @property classNames
   * @type {Array}
   */
  classNames: ['preview-wrapper'],
  /**
   * The component's internal `layout` property; allows us to dynamically set
   * the component's template so that it includes the compiled output from the
   * playground's code editor.
   *
   * @property layout
   * @type {Function|String}
   */
  layout: hbs`
    <div class="partial-wrapper">
      {{partial partialName}}
    </div>
    <div class="compiler-error">
      <p class="error-message">{{compilerError}}</p>
    </div>
  `,

  // Methods
  // ---------------------------------------------------------------------------


  /**
   * Looks through the passed-in template string and checks for action helpers;
   * when it finds some, it checks for the actions referenced and registers no-ops
   * for them on this component's context so that the application doesn't explode
   * when trying to reference a non-existent action.
   *
   * @method _checkActionRefs
   * @param {String} templateString The template string to run the check for action matches on
   * @return {undefined}
   */
  _checkActionRefs(templateString) {

    if (!templateString) { return; }

    const firstFilter = /action\s"(\w*?)"/gim;
    const secondFilter = /\'(.*?)\'/gi;
    let matchedActions = templateString.match(firstFilter);

    if (!matchedActions) { return; }

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
  /**
   * Grabs the input from the parent instance's code editor, compiles it into a
   * real-live HTMLBars template, registers it on the container as a partial
   * and makes it available as output for the preview component's template to
   * render.
   *
   * New partials are created for every change, using a date string as the
   * partial name to avoid collisions.
   *
   * @method _updatePreview
   * @param {[type]} templateString [description]
   * @return {[type]}
   */
  _updatePreview(templateString) {
    try {
      let timestamp = Date.now();

      // Ensure non-existant passed in actions don't cause the app to explode
      this._checkActionRefs(templateString);

      // Compile the string into a template and register it on the container
      getOwner(this).register(`template:partials/playground-${timestamp}`, HTMLBars.compile(templateString));
      // Update the reference of the preview's partialName to match the newly generated partial
      this.set('partialName', `partials/playground-${timestamp}`);
      this.set('compilerError', '');
    } catch(ex) {
      this.set('compilerError', ex);
    }
  },

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * The component's default `init` hook. Allows us to map the contextActions
   * to real actions on the preview components' actions hash to ensure they're
   * available at compile time.
   *
   * @method init
   * @return {unefined}
   */
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
   * The component's native `didReceiveAttrs` hook. Used to send debounced
   * requests to the `_updatePreview` method for rendering an updated template
   * partial based on the parent's code editor input.
   *
   * @event didReceiveAttrs
   * @param {[type]} { newAttrs } [description]
   * @return {[type]}
   */
  didReceiveAttrs({ newAttrs }) {
    if (!newAttrs.code.value) { newAttrs.code.value = ''; }
    Ember.run.debounce(this, '_updatePreview', newAttrs.code.value, 500);
  },

  // Actions
  // ---------------------------------------------------------------------------

  /**
   * The component actions hash; to be filled in by the parent context, and/or
   * by failsafe action detection
   *
   * @property actions
   * @type {Object}
   */
  actions: {}
});
