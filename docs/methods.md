---
id: 'methods'
title: Component Methods
---
# Component Methods

{{index}}

In addition to component state we can specify our component methods, that we can use as event handlers or for any additional operations we may need.

## Specify Methods

To specify component methods we need to puth them in component's `methods` property:

```jsx
export default {
  name: 'my-component',
  created() {
    // Bind button click method to component instance
    this.onButtonClick = this.onButtonClick.bind(this);
  },
  render() {
    return (
      <button onClick={this.onButtonClick}>Send Data</button>
    );
  },
  // component methods
  methods: {
    // method to send data
    sendData(data) {
      fetch('http://somewebsite.com', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    // button click event handler
    onButtonClick(e) {
      // send data on button click
      this.sendData({
        foo: 'bar'
      });
    },
  },
}
```

## Event Handlers

Noticed that `this.onButtonClick = this.onButtonClick.bind(this);` method binding we used in `created` life cycle hook?

By default all event handlers in DOM are bound to event target element. If we don't bind event handler method to component instance (`this`), then `this` inside of event handler will point to target element, e.g. HTML button element in example above.

And to handle it correctly, it is recommended to **bind all methods that are used as event handlers to component instance** in `created` life cycle method.

```jsx
export default {
  name: 'my-component',
  created() {
    // Bind button click method to component context instance
    this.onButton1Click = this.onButton1Click.bind(this);
    this.onButton2Click = this.onButton2Click.bind(this);
  },
  render() {
    return (
      <div>
        <button onClick={this.onButton1Click}>Button 1</button>
        <button onClick={this.onButton2Click}>Button 2</button>
      </div>
    );
  },
  // component methods
  methods: {
    // button click event handler
    onButton1Click(e) {
      console.log('button 1 clicked');
    },
    onButton2Click(e) {
      console.log('button 2 clicked');
    },
  },
}
```