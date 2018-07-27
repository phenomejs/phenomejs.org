---
id: 'custom-events'
title: Custom Events
---
# Custom Events

{{index}}

Component custom events is a proper way of your component to communicate with parent components and send data to them (lift state up). Even better, React, unlike Vue, doesn't have any convenient event system out of the box, and React components compiled with Phenome will have such 💪.

## Dispatch Events

To dispatch any custom event we need to use `dispatchEvent` component instance method:

```jsx
this.dispatchEvent(eventName[, ...args]);
```

* `eventName` - string event name _(required)_. It may contain numerous events separated by space.

* `args` - any number of arguments that will be passed to event handler _(optional)_.

Let's say, for example, we develop a custom input element, and we need to provide opportunity to listen for its `<input>`'s `change` and `input` events in parent components where it is used:

```jsx
export default {
  name: 'custom-input',
  props: {
    value: [Number, String],
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
  },
  created() {
    // Bind event handlers to component context
    this.onChange = this.onChange.bind(this);
    this.onInput = this.onInput.bind(this);
  },
  render() {
    return (
      <div className="custom-input">
        <input
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.onChange}
          onInput={this.onInput}
        />
      </div>
    )
  },
  methods: {
    onChange(e) {
      // dispatch "change" event with input value
      this.dispatchEvent('change', e.target.value);
    },
    onInput(e) {
      // dispatch "input" event with input value
      this.dispatchEvent('input', e.target.value);
    },
  },
};
```

## Handle Events

Now, let's see how to listen these events on compiled Phenome component in parent native React/Vue components.

### Handle Events In React

Because React doesn't have any event system, compiled React component will actually look for prop with a name <code>on[Event]</code>, so to catch <code>input</code> event, we need to pass event handler to <code>onInput</code> prop, for <code>change</code> event - to <code>onChange</code> prop, etc.

```jsx
import React from 'react';
import CustomInput from './custom-input';

export default class extends React.Component {
  constructor(props) {
    super(props);

    // Bind event handler to component context
    this.onInput = this.onInput.bind(this);

    // Set inital input value
    this.state = {
      inputValue: '',
    };
  }
  render() {
    return (
      <div className="page">
        <h1>Custom Input</h1>
        <CustomInput
          type="text"
          placeholder="Your name"
          value={this.state.inputValue}
          onInput={this.onInput}
        />
      </div>
    )
  }
  onInput(value) {
    // do something with new input value
    this.setState({
      inputValue: value,
    });
  }
}
```

### Handle Events In Vue

Vue already has own event system, so compiled Phenome -> Vue component will use Vue's native event system. And we need to use them as usually:

```html
<template>
  <div class="page">
    <h1>Custom Input</h1>
    <custom-input
      type="text"
      placeholder="Your name"
      :value="inputValue"
      @input="onInput"
    />
  </div>
</template>
<script>
  import CustomInput from './custom-input';

  export default {
    components: {
      CustomInput,
    },
    data() {
      // Set inital input value
      return {
        inputValue: '',
      };
    },
    methods: {
      onInput(value) {
        // do something with new input value
        this.inputValue = value;
      },
    },
  }
</script>
```
