---
id: 'computed-properties'
title: Computed Properties
---
# Computed Properties

Computed properties are basically your component setters and getters. To specify them we need to use `computed` component's property:

```jsx
export default {
  name: 'welcome-user',
  state() {
    return {
      firstName: 'Vladimir',
      lastName: 'Kharlampidi',
    };
  },
  // computed getters
  computed: {
    // fullName getter
    fullName() {
      return `${this.state.firstName} ${this.state.lastName}`;
    }
  },

  render() {
    return (
      {/* fullName getter will be invoked */}
      <div>Hello {this.fullName}</div>
    );
  }
}
```

Computed properties are by default getter-only, but you can also provide a setter when you need it:

```jsx
export default {
  // ....
  computed: {
    // fullName setter and getter
    fullName: {
      // getter
      get() {
        return `${this.state.firstName} ${this.state.lastName}`;
      },
      // setter
      set(newValue) {
        const names = newValue.split(' ');
        this.setState({
          firstName: names[0],
          lastName: names[1],
        });
      }
    }
  }
};
```

Now when you run `this.fullName = 'John Doe'`, the setter will be invoked and `state.firstName` and `state.lastName` will be updated accordingly.
