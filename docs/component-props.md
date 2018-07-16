---
id: 'component-props'
title: Component Props
---
# Component Props

{{index}}

Props are required to pass data to component. Think about props like about custom attributes that you can register on a component. When a prop is passed to component, it becomes available as property of `this.props` of component instance

Component can have as many props as you may need. And we need to register each of them.

<div class="important-note">
  <p>In React it is not neccessary to specify all component props, but Vue requires all possible component props to be registered on component declaration.</p>
  <p>To leverage such difference, it is required to specify all props on Phenome component as well.</p>
</div>

## Register Props

We need to specify/register props in `props` Phenome component object property, where the properties’ names and values contain the prop names and types:

```jsx
export default {
  name: 'user-profile',
  // Component props
  props: {
    // propName: propType
    firstName: String,
    lastName: String,
    age: Number,
  },
  render() {
    // ...
  }
}
```

## Prop Casing

Props names must be specified in **camelCase** like in example above.

In compiled Vue component such props can be passed as **kebab-case** attributes too:

```html
<template>
  ...
  <user-profile first-name="John" last-name="Doe" :age="32" />
</template>
```

In compiled React component such props must be passed in same **camelCase** as they were specified:

```jsx
import UserProfile from './user-profile';


export default () => (
  <UserProfile firstName="John" lastName="Doe" age={23} />
)
```

## Prop Types

In the example above, we have specified props as object with **name**:**type** pairs. Such declaration not only documents your component, but will also warn users in the browser’s JavaScript console if they pass the wrong type.

It is also possible to specify more complex validation:

```jsx
export default {
  name: 'my-component',
  props: {
    // Basic type check (`null` matches any type)
    propA: Number,
    // Multiple possible types
    propB: [String, Number],
    // Required string
    propC: {
      type: String,
      required: true
    },
    // Number with a default value
    propD: {
      type: Number,
      default: 100
    },
    // Object with a default value
    propE: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function
      default: function () {
        return { message: 'hello' }
      }
    },
  },
  render() {
    // ...
  }
}
```

The prop `type` can be one of the following native constructors:

* `String`
* `Number`
* `Boolean`
* `Array`
* `Object`
* `Date`
* `Function`
* `Symbol`

In addition, `type` can also be a custom constructor function:

```jsx
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
export default {
  name: 'my-component',
  props: {
    // FormData type
    propA: window.FormData,
    // Person Class/Constructor type
    propB: Person,
  },
  render() {
    // ...
  }
}
```

## Merging with Existing Attributes/Props

By default, Vue will merge most of HTML attributes to the component element, but React won't. So the important component element attributes that you expect must be specified as component props. Also, Vue doesn't allow to register `style` prop. And to cover all the cases we can use the following pattern:

```jsx
export default {
  name: 'my-component',
  props: {
    // element ID attribute
    id: String,
    // ...
  },
  render() {
    /*
    We haven't registered "className" and "style" props, so they will be ignored by Vue component and merged automatically to component element.
    For React component "className" and "style" props will be here if they passed.
    */
    const { id, className, style } = this.props;

    return (
      <div id={id} className={className} style={style}>
        {/* ... */}
      </div>
    )
  }
}
```

Now our component can be used correctly in Vue and React:

```html
<!-- vue -->
<template>
  <my-component id="element1" class="custom-class" :style="{color: 'red'}"></my-component>
</template>
```

```jsx
/* react */
import MyComponent from './my-component';

export default () => (
  <MyComponent id="element1" className="custom-class" style={{color: 'red'}}/>
)
```