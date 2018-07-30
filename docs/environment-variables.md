---
id: 'environment-variables'
title: Environment Variables & Constant Conditions
---
# Environment Variables & Constant Conditions

In addition to [Conditional Comments](conditional-comments.html), environment variables (`process.env[var]`) passed to `env` compiler parameter can also be used to handle different conditions and for conditional rendering. Despite variables you passed, there is one more called `COMPILER` which will be automatically replaced with `vue` or `react` based on output.

Event better, Phenome compiler is __smart enough__ 💪 to parse simple __"constant conditions"__ during compilation and remove the ones that become useless. Such conditions are pretty handy in situations where is not enough functionality of conditional comments .

For example, let's say we use child component compiled also with Phenome, and we need to pass all attributes explicitly as child component props. Also we need some debugging information:

```jsx
import ChildComponent from './child-component/';

export default {
  name: 'my-component',
  render() {
    const props = {
      foo: 'bar',
      john: 'doe',
    };
    if (process.env.COMPILER === 'react') {
      return <ChildComponent {...props} />
    }
    if (process.env.COMPILER === 'vue') {
      return <ChildComponent props={props} />
    }
  },
}
```

For example, in React compiled component, if we just replace this env variables, we will get the following:
```jsx
import React from 'react';
import ChildComponent from './child-component/';

class MyComponent extends React.Component {
  constructor(props, context) {
    this(test)
    super(props, context);
  }
  render() {
    const props = {
      foo: 'bar',
      john: 'doe'
    };
    // constant condition
    if ('react' === 'react') {
      return React.createElement(ChildComponent, { ...props });
    }
    // constant condition
    if ('react' === 'vue') {
      return React.createElement(ChildComponent, { props: props });
    }
  }
}

MyComponent.displayName = 'my-component';

export default MyComponent;
```

Such conditions, called "constant conditions", doesn't make any sense and just take an extra size.

__But Phenome will do its magic, and actual output for both React and Vue will be the following:__

```jsx
import React from 'react';
import ChildComponent from './child-component/';

class MyComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const props = {
      foo: 'bar',
      john: 'doe'
    };
    {
      return React.createElement(ChildComponent, { ...props });
    }
  }
}

MyComponent.displayName = 'my-component';

export default MyComponent;
```

```jsx
import ChildComponent from './child-component/';

export default {
  name: 'my-component',
  render() {
    const _h = this.$createElement;
    const props = {
      foo: 'bar',
      john: 'doe'
    };
    {
      return _h(ChildComponent, { props: props });
    }
  }
};
```

The same happens with all env variables conditions that usually produce constant conditions.