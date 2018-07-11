---
id: 'component-name'
title: Component Name
---
# Component Name

Component `name` is very important field that **must be always specified** for the following reasons:

* in generated Vue/React components, component name will highly improve debugging (error messages)
* it is used in generated React component as React component class name (it will be transformed to CamelCase/PascalCase class name), and will be set as React component `displayName`

<div class="important-note">Component <code>name</code> must be all-lowercase and must contain a hyphen</div>

**Source Phenome component:**

```jsx
// my-component.jsx
export default {
  name: 'my-component',
  render() {
    return (
      <div>Hello world!</div>
    )
  }
}
```

**Vue compiled output:**
```jsx
export default {
  // name kept as it is
  name: 'my-component',
  render() {
    return _h('div', null, 'Hello wordl!')
  }
}
```

**React compiled output:**
```jsx
// Class name based on name prop: my-component -> MyComponent
class MyComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return React.createElement('div', null, 'Hello wordl!')
  }
}
// Component displayName based on name prop
MyComponent.displayName = 'my-component';

export default MyComponent;
```
