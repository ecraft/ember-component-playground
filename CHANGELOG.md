# Changelog

## 1.6.0 (12-11-2016)
Added:
- Better test compatibility with `data-test` attr binding
- Wrote real tests to verify functionality

Fixed:
- Changed subcomponent references in templates to use slash syntax

## 1.5.0 (11-25-2016)
Added:
- Required structural styles are included in vendor file and imported in `index` file for maximum plug and play ease.

Fixed:
- Ensured this addon runs before the `ember-cli-codemirror-shim` by using the `before` config in package. Fixes default configs required by playground not being set.

## 1.4.2 (11-24-2016)
Fixed:
- Branches :sigh:

## 1.4.1 (11-24-2016)
Fixed:
- Attempting to fix `addAddonToProject` installing exact version instead of relative minor version

## 1.4.0 (11-24-2016)
Added:
- CodeMirror library now pulled in from Node modules using `ember-cli-codemirror-shim`
- Validation of default `codemirror` options for consuming application
- Custom `code-mirror` component for rendering a CodeMirror editor. It's rad.

Fixed:
- Documentation cleanup for using and configuring components

Removed:
- `ivy-codemirror` dependency including `bower` CodeMirror dependency
- Internal `panda-syntax` styles, Node version of CodeMirror has them!

## 1.3.0 (11-17-2016)
Added:
- Panda-syntax for editor

Fixed:
- Addon `include` hook `_super` syntax, now handles importing template compiler

## 1.2.0 (10-10-2016)
Added:
- `debounceRate` argument to `component-playground`
- Include of template compiler moved to addon `include` hook in `index.js`

## 1.1.3 (10-06-2016)

Changed:
- Updated README to provide more information about the component's purpose and how to use it

## 1.1.2 (10-06-2016)

Changed:
- Moved `ivy-codemirror` to `devDependencies` because that did NOT work AT ALL.

Removed:
- `ember-template-compiler` removed from package as it is being imported from `ember` in bower components

## 1.1.1 (10-05-2016)

Changed:
- Moved `ivy-codemirror` to `dependencies` so it is pulled down in including apps.

## 1.1.0 (10-05-2016)

Added:
- Documentation for playground components

Changed:
- Debounced re-renders within playground preview

## 1.0.0 (10-05-2016)

Added:
- Component playground with realtime rendering of text input from code mirror editor component
