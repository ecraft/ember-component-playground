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
  /**
   * Optional debounce for rerendering
   * @param debounceRate
   * @type {number}
   */
  debounceRate: 0,
  /**
   * The codemirror syntax mode. Note that the assets for the mode must be
   * imported during the build process. You can do this by creating a
   * `codemirror` configuration in you ember-cli-build.
   * @type {string}
   */
  mode: 'handlebars',
  /**
   * The codemirror theme. Note that the stylesheet must be imported during the
   * build process for the theme to work. You can do this by creating a
   * `codemirror` configuration in your `ember-cli-build`.
   * @property theme
   * @type {string}
   * @default panda-syntax
   */
  theme: 'panda-syntax',

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
      {{ivy-codemirror classNames="code-mirror"
        value=code
        options=(hash lineNumbers=true mode=mode theme=theme)
        valueUpdated=(action "codeChange")}}
    </div>
  `
});
