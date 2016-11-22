import Ember from 'ember';
import CodeMirror from 'codemirror';

const { Component } = Ember;

export default Component.extend({

  // Configurations
  // ---------------------------------------------------------------------------

  /**
   * Pass a `mode` to configure the editor instance's highlighting mode. Defaults
   * to `htmlhandlebars` because that's all you need for the component playground,
   * but you could use this component for other schemes if you want.
   * @property mode
   * @type {string}
   * @default htmlhandlebars
   */
  mode: 'htmlhandlebars',
  /**
   * Pass a `theme` to configure the editor instance's theme. Defaults
   * to `panda-syntax` because it's the most beautiful theme in the internet.
   * @property theme
   * @type {string}
   * @default panda-syntax
   */
  theme: 'panda-syntax',
  /**
   * Allows for passing a starting value that is set in the editor inside
   * `didInsertElement` hook
   * @property value
   * @type {string}
   * @default ''
   */
  value: '',

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

  // Hooks
  // ---------------------------------------------------------------------------

  /**
   * When this element has been inserted into the DOM, use the Codemirror
   * `fromTextArea` to transform this ugly duckling into a beautiful CodeMirror
   * editor.
   * @event didInsertElement
   */
  didInsertElement() {
    let { theme, mode } = this.getProperties('theme', 'mode');

    // LET THE GAMES BEGIN!! Create and store ref to new editor using nifty from text area and passing configs
    this.set('_codeMirrorEditor', CodeMirror.fromTextArea(this.get('element'), { theme, mode }));

    // If a starting value was passed in to this component, set it on the editor
    if (this.get('value')) {
      this.get('_codeMirrorEditor').setValue(this.get('value'));
    }
  }
});
