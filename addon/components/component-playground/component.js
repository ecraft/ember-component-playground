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
 * @class Component.ComponentPlayground
 * @property contextActions
 * @type {Object}
 */
export default Component.extend(ActionHandler, {

  // Passed Props
  // ---------------------------------------------------------------------------

  /**
   * A hash of actions to be supplied to the playground; useful for demoing
   * components that require passed actions to function correctly.
   *
   * @property contextActions
   * @type {Object}
   */
  contextActions: {},

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * The component's native `classNames` property. Used to set CSS classes for
   * styling.
   * @property classNames
   * @type {Array}
   */
  classNames: ['ember-component-playground'],
  /**
   * The code string entered into the code mirror editor. Passed into the child
   * preview component so it can be rendered as an hbs template partial.
   *
   * @property code
   * @type {string}
   */
  code: '',
  /**
   * The component's native `layout` property. Allows us to set up a dynamic
   * template completely within the context of the component's JS file.
   * @property layout
   * @type {Function|String}
   */
  layout: hbs`
    <div class="playground-preview">
      {{component-playground.playground-preview
        code=code
        contextActions=contextActions}}
    </div>

    <div class="playground-code">
      {{ivy-codemirror classNames="code-mirror"
        value=code
        options=(hash lineNumbers=true mode="handlebars" theme="monokai")
        valueUpdated=(action "codeChange")}}
    </div>
  `,

  // Actions
  // ---------------------------------------------------------------------------

  /**
   * The component's actions hash
   *
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * Sent by the codemirror instance to alert the playground that the text
     * entered into the component's editor has changed.
     *
     * @method codeChange
     * @param {String} code The code entered into the codemirror editor, to be rendered as an hbs template
     * @return {undefined}
     */
    codeChange(code) {
      this.set('code', code);
    }
  }
});
