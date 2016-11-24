import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, ActionHandler } = Ember;

/**
 * A totally rad component that allows you to enter text into a codemirror
 * editor and see the output compiled and rendered in realtime.
 *
 * The primary intent of this component is to be used in documentation scenarios
 * so that live examples of components can be provided within their documentation
 * context, also allowing users to experiment with a component's settings in real
 * time (where applicable).
 *
 * @TODO: Document high level how it works with configuration, and contextActions
 *
 * @class ComponentPlayground
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend(ActionHandler, {

  // Configurations
  // ---------------------------------------------------------------------------

  /**
   * The configuration object passed to the CodeMirror editor component. Override
   * an editor's configs here.
   * @property configuration
   * @type {Object}
   * @default { mode: 'htmlhandlebars', theme: 'panda-syntax', lineNumbers: true }
   */
  configuration: {
    mode: 'htmlhandlebars',
    theme: 'panda-syntax',
    lineNumbers: true
  },
  /**
   * A hash of actions to be supplied to the playground; useful for demoing
   * components that require passed actions to function correctly.
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
   * You can prefill the editor with code by passing it in this prop. The
   * component will handle calling an initial update to render what was passed.
   * @property code
   * @type {string}
   */
  code: '',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bind `ember-component-playground` to component
   * @property classNames
   * @type {Array}
   */
  classNames: ['ember-component-playground'],

  // Actions
  // ---------------------------------------------------------------------------
  actions: {
    /**
     * Action closure passed to CodeMirror editor component to handle DDAU
     * updates of editor value
     * @method actions.codeChange
     * @param {String} code The code entered into the codemirror editor, to be rendered as an hbs template
     */
    codeChange(code) {
      this.set('code', code);
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{! Wrapping element: <div class="ember-component-playground"> }}
    <div class="playground-preview">
      {{component-playground.playground-preview
        code=code
        debounceRate=debounceRate
        contextActions=contextActions}}
    </div>

    <div class="playground-code">
      {{code-mirror
        classNames="code-mirror"
        value=code
        configuration=configuration
        valueUpdated=(action "codeChange")}}
    </div>
  `
});
