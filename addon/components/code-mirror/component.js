import Ember from 'ember';
import CodeMirror from 'codemirror';

const { Component, run } = Ember;

/**
 * Transforms a lowly `<textarea>` into a magical in browser editor using the
 * very rad CodeMirror library.
 *
 * ### Configuration
 * Each instance is preloaded with default configurations, but they can be
 * overridden by passing in an object `configuration` like so:
 * ```handlebars
 * {{code-mirror configuration=(hash mode="javascript" lineNumbers=false)}}
 * ```
 *
 * Configuration | Default | Description
 * --- | --- | ---
 * `mode` | htmlhandlebars | Syntax highlighting mode, eg `javascript` or `css`
 * `theme` | panda-syntax | Sets styles that should apply to editor
 * `lineNumbers` | true | Show/hide editor line numbers
 *
 * ### Initial Value
 * You can prefill the editor with any text by passing it in the `value` property.
 *
 * ### Dev Overview
 * This component works by:
 * 1. Validating editor configurations during `init`
 * 2. When we know element is in DOM (`didInsertElement`) we call the CodeMirror
 *    method `fromTextArea` and pass it this component's element and the configs.
 *    CodeMirror magically transforms this component into an editor!
 * 3. Attach a listener to the editor, it will dispatch a change event, which we
 *    use to handle call the passed action closure `valueUpdated` with the
 *    change data
 * 4. On render, we check that the passed in value still matches the editor value,
 *    if it doesn't we got out of sync somehow and update the editor with that
 *    value
 * 5. On destroy we remove the event listener and delete the editor instance
 *
 * @class CodeMirror
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Configurations
  // ---------------------------------------------------------------------------

  /**
   * The configuration object passed to the editor created in `didInsertElement`
   * is created with defaults in the `init` hook to prevent multiple component
   * instances on the same page inheriting the same configs object due to
   * prototype inheritance.
   * @property configuration
   * @type {Object}
   * @default { mode: 'htmlhandlebars', theme: 'panda-syntax', lineNumbers: true }
   */
  /**
   * Allows for passing a starting value that is set in the editor inside
   * `didInsertElement` hook
   * @property value
   * @type {string}
   * @default ''
   */
  value: '',
  /**
   * Action closure that will be called anytime the editor changes. Use this to
   * handle DDAU udpate of the editor value.
   * @property valueUpdated
   * @type {function}
   */
  valueUpdated: null,

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Using a tagname prop makes it really easy to call `CodeMirror.fromTextArea`
   * in the `didInsertElement` hook to make this component an editor.
   * @property tagName
   * @type {string}
   * @default textarea
   */
  tagName: 'textarea',
  /**
   * Private reference to the CodeMirror editor instance returned by the
   * `CodeMirror.fromTextArea` call. Used to interact with the editor from within
   * this component
   * @property _codeMirrorEditor
   * @type {Object}
   */
  _codeMirrorEditor: null,

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Method for use with scheduling a `run.once`. Handle dispatching valueUpdated
   * action.
   * @method _handleEditorChanged
   * @param {Object} codeMirror The CodeMirror instance
   * @param {Object} changeObj  Hash of changes to editor
   */
  _handleEditorChanged(codeMirror, changeObj) {
    this.get('valueUpdated')(codeMirror.getValue(), codeMirror, changeObj);
  },
  /**
   * Callback bound to this CodeMirror instance's change event. Schedule an aciton
   * dispatch once per render to notify consuming component of change.
   * @method handleEditorChanged
   * @param {Object} codeMirror The CodeMirror instance
   * @param {Object} changeObj  Hash of changes to editor
   */
  handleEditorChanged(...args) {
    run.once(this, '_handleEditorChanged', ...args);
  },

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * On init check for a configuration and if one is not present set default
   * values for CodeMirror instance
   * @method init
   */
  init() {
    this._super(...arguments);

    // Bind callbacks for editor events
    this.handleEditorChanged = this.handleEditorChanged.bind(this);

    // Handle default configuration validation
    const configuration = this.get('configuration');
    const defaultConfiguration = {
      mode: 'htmlhandlebars',
      theme: 'panda-syntax',
      lineNumbers: true
    };

    // Finally create not prototype inheritable options object with defaults
    if (!configuration) { return this.set('configuration', defaultConfiguration); }

    // If a configuration was passed in, validate existence of each option
    if (!configuration.mode) { this.set('configuration.mode', 'htmlhandlebars'); }
    if (!configuration.theme) { this.set('configuration.theme', 'panda-syntax'); }
    if (configuration.lineNumbers === undefined) { this.set('configuration.lineNumbers', true); }
  },
  /**
   * When this element has been inserted into the DOM, use the Codemirror
   * `fromTextArea` to transform this ugly duckling into a beautiful CodeMirror
   * editor.
   * @event didInsertElement
   */
  didInsertElement() {
    // LET THE GAMES BEGIN!! Create and store ref to new editor using nifty from text area and passing configs
    this.set('_codeMirrorEditor', CodeMirror.fromTextArea(this.get('element'), this.get('configuration')));

    // If a starting value was passed in to this component, set it on the editor
    if (this.get('value')) {
      this.get('_codeMirrorEditor').setValue(this.get('value'));
    }

    // Bind listener to codemirror for update events
    this.get('_codeMirrorEditor').on('change', this.handleEditorChanged);
  },
  /**
   * On render of this component, check that the editor value matches what is
   * passed in, update the editor if out of syn
   * @event didRender
   */
  didRender() {
    if (this.get('value') !== this.get('_codeMirrorEditor').getValue()) {
      this.get('_codeMirrorEditor').setValue(this.get('value') || '');
    }
  },
  /**
   * Clean up event listeners and ensure garbage collection
   * @event willDestroyElement
   */
  willDestroyElement() {
    this.get('_codeMirrorEditor').off('change', this.handleEditorChanged);
    // @TODO: Is this necessary or does garbage collection get this?
    delete this._codeMirror;
  }
});
