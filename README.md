# Ember Component Playground

An Ember component for real time rendering of components.

## Installation

TODO: Publish to NPM/Ember addons

## Usage

This component provides an `{{component-playground}}` component. An instance of the [Ivy CodeMirror](https://github.com/IvyApp/ivy-codemirror) drives the text editor inside the component. The component will attempt to compile any text entered and if successful it will render the output using a `{{partial}}`.

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
