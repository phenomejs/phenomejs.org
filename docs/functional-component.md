---
id: 'functional-component'
title: Functional Component
---
# Functional Component

If need simple stateless components, we can create so called functional component. Such component basically just a function, it doesn't manage any state, doesn't have lifecycle methods and it is instanceless (no `this` context).

To mark component as functional, we need to add `functional: true` property to its declaration.

Functional component declaration can have only `name` *(required)*, `props` *(optional)* properties and `render` *(required)* method. Component methods, state, computed properties, watchers and lifecycle methods are not supported for functional component.

In case of functional component, we don't have component instance (`this`) so `props`, `children` and `slots` will be passed to `render()` method arguments:

```jsx
export default {
  name: 'my-component',
  // make it functional
  functional: true,
  // specify props
  props: {
    propA: Boolean,
    propB: [Number, String],
  },
  // render method receives (props, children, slots) as arguments
  render(props, children, slots) {
    return (
      <div className="my-component" id={props.id}>
        {children}
      </div>
    );
  }
}

