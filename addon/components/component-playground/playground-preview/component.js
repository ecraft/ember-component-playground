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
 * The component will attempt to validate the template before compiling and
 * rendering by checking for actions inside the string. If it finds an action
 * without a matching action in the `contextActions` it will create a no-op for
 * you.
 *
 * ### contextActions
 * You can pass contextActions to this component that are mounted in the actions
 * hash. Pass actual functions if needed. No ops will be assigned to passed
 * action names. This is helpful if you just need to prevent compile
 * errors from happening.
 *
 * @class ComonentPlayground.PlaygroundPreview
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Configurations
  // ---------------------------------------------------------------------------

  /**
   * A hash of actions from the parent instance of the `ComponentPlayground`
   * component. These are automatically passed into the preview based on what
   * the user has defined for a specific instance of the `ComponentPlayground`.
   * @property contextActions
   * @type {Object}
   */
  contextActions: {},
  /**
   * Optional debounce for rerendering
   * @param debounceRate
   * @type {number}
   * @default 0
   */
  debounceRate: 0,

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bind `data-test` attributes
   *
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],
  /**
   * Placeholder for errors output from the template compiler; used for displaying
   * compiler errors to the user so they can debug issues with their code in
   * the playground's code editor.
   * @property compilerError
   * @type {string}
   */
  compilerError: '',
  /**
   * The name of the registered template partial to display as the playground's
   * output.
   * @property partialName
   * @type {string}
   */
  partialName: '',
  /**
   * Bind class `preview-wrapper`
   * @property classNames
   * @type {Array}
   */
  classNames: ['preview-wrapper'],

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Looks through the passed-in template string and checks for action helpers;
   * when it finds some, it checks for the actions referenced and registers no-ops
   * for them on this component's context so that the application doesn't explode
   * when trying to reference a non-existent action.
   * @method _checkActionRefs
   * @param {String} templateString The template string to run the check for action matches on
   * @return {undefined}
   */
  _checkActionRefs(templateString) {
    // Do less without a template
    if (!templateString) { return; }
    // Action regexes
    const firstFilter = /action\s"(\w*?)"/gim;
    const secondFilter = /\'(.*?)\'/gi;
    // Match on all actions
    let matchedActions = templateString.match(firstFilter);

    if (!matchedActions) { return; }

    // Build map of action names only
    let actionNames = matchedActions.map(item => {
      return item.replace(/\"/g, '\'').match(secondFilter)[0].replace(/\'/g, '');
    });

    // Loop through the list of actions and set up no-ops for missing actions
    // on the local context so that the test app doesn't explode
    actionNames.forEach(action => {
      if (!this.get(`actions.${action}`)) {
        this.set(`actions.${action}`, function() { console.log(`${action} called`); });
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
   * @TODO We should probably clean out old partials for to keep memory usage down
   * @method _updatePreview
   * @param {string} templateString Editor value to use as the template contents
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
   */
  init() {
    this._super(...arguments);

    const contextActions = this.get('contextActions');
    const yellAboutIt = thang => { console.log(`${thang} called`); };

    for (let action in contextActions) {
      if (!(contextActions.hasOwnProperty(action))) { return; }
      // Do less if already set
      if (this.get(`actions.${action}`)) { return; }

      // If an actual function is passed in, mount it, otherwise mount a helpful
      // logging event for that action (can be used for passing action names only)
      if (typeof contextActions[action] === 'function') {
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
    if (!newAttrs.code || !newAttrs.code.value) { newAttrs.code.value = ''; }

    if (this.get('debounceRate')) {
      Ember.run.debounce(this, '_updatePreview', newAttrs.code.value, this.get('debounceRate'));
    } else {
      this._updatePreview(newAttrs.code.value);
    }
  },

  // Actions
  // ---------------------------------------------------------------------------
  actions: {},

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{! Wrapping element: <div class="playground-preview"> }}
    <div class="partial-wrapper">
      {{partial partialName}}
    </div>
    <div class="compiler-error">
      <p class="error-message" data-test="{{data-test}}-error-message">{{compilerError}}</p>
    </div>
  `
});
