---
id: 'static-properties'
title: Component Static Properties
---
# Component Static Properties

For the case you need some additional static properties or methods that should be available on exported component, we can use component's `static` property.

In case of React output they will be available as React component class properties and methods.
In case of Vue output they will be available as Vue component initialization object properties and methods.

```jsx
export default {
  name: 'my-component',
  ...
  // static props
  static: {
    propA: 'foo',
    propB: [0, 1, 2, 3],
    methodA() {
      return { foo: 'bar' },
    },
  },
}
```
To have more understanding on what will happen, let's see on compiled output:

**Vue compiled output:**
```jsx
export default {
  name: 'my-component',
  ...
  // Static properties will be set directly on component initializaion object
  propA: 'foo',
  propB: [0, 1, 2, 3],
  methodA() {
    return { foo: 'bar' }
  },
}
```

**React compiled output:**

```jsx
class MyComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  ...
}
// Static properties will be set on component class
MyComponent.propA = 'foo';
MyComponent.propB = [0, 1, 2, 3];
MyComponent.methodA = function () {
  return { foo: 'bar' }
}
```
