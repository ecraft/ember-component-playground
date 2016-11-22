import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, ActionHandler } = Ember;

/**
 * A totally rad component that allows you to enter text into a codemirror
 * editor, and see the output compiled and rendered in realtime.
 *
 * The primary intent of this component is to be used in documentation scenarios
 * so that live examples of components can be provided within their documentation
 * context, also allowing users to experiment with a component's settings in real
 * time (where applicable).
 *
 * @class ComponentPlayground
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend(ActionHandler, {

  // Configurations
  // ---------------------------------------------------------------------------

  /**
   * A hash of actions to be supplied to the playground; useful for demoing
   * components that require passed actions to function correctly.
   *
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
  /**
   * The code string entered into the code mirror editor. Passed into the child
   * preview component so it can be rendered as an hbs template partial.
   *
   * @property code
   * @type {string}
   */
  code: '',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * The component's native `classNames` property. Used to set CSS classes for
   * styling.
   * @property classNames
   * @type {Array}
   */
  classNames: ['ember-component-playground'],

  // Actions
  // ---------------------------------------------------------------------------
  actions: {
    /**
     * Sent by the codemirror instance to alert the playground that the text
     * entered into the component's editor has changed.
     *
     * @method actions.codeChange
     * @param {String} code The code entered into the codemirror editor, to be rendered as an hbs template
     * @return {undefined}
     */
    codeChange(code) {
      this.set('code', code);
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    <div class="playground-preview">
      {{component-playground.playground-preview
        code=code
        debounceRate=debounceRate
        contextActions=contextActions}}
    </div>

    <div class="playground-code">
      {{code-mirror classNames="code-mirror" value=code valueUpdated=(action "codeChange")}}
    </div>
  `
});
