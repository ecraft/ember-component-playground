# Ember Component Playground

An Ember component for realtime rendering of your app's components based on input you provide to an inline code-editor.


This component is generally intended for use within a documentation context, for providing examples of components and tweaking their attributes
to see how they are affected in realtime. However, you may find other uses for it beyond this.

## Installation

**The playground requires `ivy-codemirror` to generate the code editor.**

After installing this addon, in your consuming project, run the following:

```
ember install ember-component-playground
ember install ivy-codemirror
```

Then, update your project's `ember-cli-build` with this `import` statement to enable compilation templates at runtime:

```
app.import('bower_components/ember/ember-template-compiler.js');
```

You're golden!

## Usage

This component provides a `{{component-playground}}` component. An instance of the [Ivy CodeMirror](https://github.com/IvyApp/ivy-codemirror) drives the text editor inside the component. The component will attempt to compile any text entered and if successful it will render the output using a `{{partial}}`.

You can optionally supply starting code to the component with the `code` attribute, like so:

```handlebars
{{component-playground code="<h4>This is a crazy component in my project:</h4> {{crazy-component}}"}}
```

TODO: Options?
TODO: ivy-codemirror configs?

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`
