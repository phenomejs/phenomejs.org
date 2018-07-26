---
id: 'rendering-jsx'
title: Component Rendering / JSX
---
# Component Rendering / JSX

{{index}}

Phenome components use JSX for rendering. JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript.

## `render()`

The `render()` method is __required__ method in a Phenome component.

When called, it should examine `this.props` and `this.state` and return one of the following types:

* __Element__. Typically created via JSX. For example, `<div />` and `<MyComponent />` are elements that instruct vdom engine to render a DOM node, or another user-defined component, respectively.
* __String and numbers__. These are rendered as text nodes in the DOM.
* __null__. Render nothing.

The `render()` function should be pure, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser.

If you need to interact with the browser, perform your work in `componentDidMount()` or the other [lifecycle methods](life-cycle.html) instead. Keeping `render()` pure makes components easier to think about.

## Conditional Rendering

## Lists

## Slots

## Refs

## `className`

## `style`

## `dangerouslySetInnerHTML`

## Supported HTML Attributes
