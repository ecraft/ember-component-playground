# Ember Component Playground

An Ember component for realtime rendering of your app's components using an instance of the in browser codemirror code editor. This component was created for use within a documentation context, for providing examples of components and tweaking their attributes to see how they are affected in realtime. However, you may find other uses for it beyond this.

***

## Installation && Requirements

**Requirements**

This addon requires Node >= v4.3

**Installation**

```
# From the command line:
ember install ember-component-playground
```

Styles and fonts are not included by default for maximum configurability. They are exported at `ember-component-playground/_styles.scss`. If you're using [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass): you can import them:

`@import 'ember-component-playground/styles'`;

Source Sans Pro is the default font and can be imported:

```
<!-- In your index.html -->
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">

// In your SASS
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
```

***

## Usage

Create a component playground using the addon's primary export:

```handlebars
{{component-playground}}
```

This will create an empty code editor with a render preview. You can supply starting code to the component with the `code` attribute:

```handlebars
{{component-playground code="<h4>This is a totally radical component in my project:</h4> {{radical-component}}"}}
```

This will create a code editor with your code pre-populated with a preview in the render preview.

**Configuring the Editor**
The editor is a Ember DDAU version of [codemirror](https://codemirror.net/) created by [Ivy](https://github.com/IvyApp/ivy-codemirror). The editor is configured to use handlebars syntax with the very beautiful [Panda Theme](https://github.com/PandaTheme) created by [Siamek Mokhtari](https://github.com/siamak) by default. Changing these defaults requires two steps, importing assets during the build and passing configurations to an editor instance.

Import the assets during the build by specifying which modes and themes you'd like to import in you `ember-cli-build` file:

```javascript
var app = new EmberApp(defaults, {
  // Configure assets to import for codemirror
  codemirror: {
    modes: ['javascript'],
    themes: ['monokai']
  },
});
```

Then pass props `mode` and `theme` to an instance of the playground:

```handlebars
{{component-playground mode="javascript" theme="monokai"}}
```

***

## How it Works

This addon provides a `{{component-playground}}` component. An instance of the [Ivy CodeMirror](https://github.com/IvyApp/ivy-codemirror) component drives the text editor inside the component. The component will attempt to compile any text entered and if successful it will render the output using a `{{partial}}`.

***

## Development && Contributing

Contributions are welcome! Project development is documented below:

#### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

***

### TODO:

- [x] Make `panda-syntax` the default theme
- [x] Make `htmlhandlebars` the default mode
- [x] Make codemirror theme configurable
- [x] Document Node >= 4.3 requirements
- [] Document adding `Source Sans Pro` for fonts
- [] Ability to set default themes. Maybe by exporting your own component-playground instance pulled from the addon namespace
- [] Better how it works documentation for a high level overview
- [] Include picture in README of actual usage
- [x] Include `htmlhandlebars`
- [] Create block form instance with yielded partial name for extra context magics
