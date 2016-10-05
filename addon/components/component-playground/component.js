import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { Component, ActionHandler } = Ember;

export default Component.extend(ActionHandler, {

  // Passed Props
  // ---------------------------------------------------------------------------

  contextActions: {},

  // Properties
  // ---------------------------------------------------------------------------

  classNames: ['ember-component-playground'],

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

  actions: {
    codeChange(code) {
      this.set('code', code);
    }
  }
});
