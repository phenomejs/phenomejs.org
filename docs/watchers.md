---
id: 'watchers'
title: Component Watchers
---
# Component Watchers

Watchers allow you to watch for component `state` or `props` change. It is not really recommended to use them, usually you can do the same within [life cycle methods](life-cycle.html) or using [computed properties](computed-properties.html).

To assign watchers we need to use components' `watch` property. Each watched property method receives two arguments `newValue` and `oldValue`:

```jsx
export default {
  name: 'my-component',
  props: {
    foo: String,
    bar: String,
  },
  state() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
    };
  },
  render() {
    // ...
  },
  // assign watchers
  watch: {
    // watch for changes of "foo" prop
    'props.foo': function (newValue, oldValue) {
      // do something when it is changed
    },
    // watch for changes of "firstName" state's property
    'state.firstName': function (newValue, oldValue) {
      this.setState({
        fullName: `${newValue} ${this.state.lastName}`
      })
    },
    // watch for changes of "lastName" state's property
    'state.lastName': function (newValue, oldValue) {
      this.setState({
        fullName: `${this.state.firstName} ${newValue}`
      })
    }
  }
}
```

The above code is imperative and repetitive. Compare it with a computed property version, which is much better:

```jsx
export default {
  name: 'my-component',
  props: {
    foo: String,
    bar: String,
  },
  state() {
    return {
      firstName: 'John',
      lastName: 'Doe',
    };
  },
  render() {
    // ...
  },
  computed: {
    fullName() {
      return `${this.state.firstName} ${this.state.lastName}`
    }
  },
}
```