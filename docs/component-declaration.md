---
id: 'component-declaration'
title: Phenome Component Declaration
---
# Phenome Component Declaration

{{index}}

## Declaration

Each Phenome component must be declared in separate `.jsx` (or `.js`) file and declared as a **default not named object export**:

```jsx
// hello-user.jsx
export default {
  name: 'hello-user',
  props: {
    firstName: [String],
    lastName: [String],
  },
  render() {
    return (
      <div className="welcome-user">Hello, {this.props.firstName} {this.props.lastName}!</div>
    )
  }
}
```

```jsx
// visit-counter.jsx
export default {
  name: 'visit-counter',
  state() {
    return {
      seconds: 0
    };
  },
  render() {
    return (
      <div>You see this message {this.state.seconds} seconds</div>
    );
  },
  componentDidMount() {
    const self = this;
    self.interval = setInterval(() => {
      self.setState({
        seconds: self.state.seconds + 1,
      });
    }, 1000);
  },
  componentWillUnmount() {
    const self = this;
    clearInterval(self.interval);
  }
}
```

## Component Properties

Let's look at list of all available phenome component object properties

<table class="params-table">
  <thead>
    <th>Parameter</th>
    <th>Type</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>Component name. <b>Must be all-lowercase, must contain a hyphen</b>. <b>Required</b></td>
    </tr>
    <tr>
      <td>props</td>
      <td>object</td>
      <td>Object with component properties</td>
    </tr>
    <tr>
      <td>state</td>
      <td>function</td>
      <td>Method that should return object with initial component state</td>
    </tr>
    <tr>
      <td>render</td>
      <td>function</td>
      <td>Component render function. <b>Required</b>
    </tr>
    <tr>
      <td>methods</td>
      <td>object</td>
      <td>Object with component methods</td>
    </tr>
    <tr>
      <td>computed</td>
      <td>object</td>
      <td>Object with computed properties (setters/getters), where each property is a method (getter only) or object with <code>get()</code> and <code>set()</code> methods</td>
    </tr>
    <tr>
      <td>watch</td>
      <td>object</td>
      <td>Object with props and state properties to watch</td>
    </tr>
    <tr>
      <td>functional</td>
      <td>boolean</td>
      <td>Enables functional component. Such component must have only <code>name</code> and <code>render</code> properties in addition.</td>
    </tr>
    <tr>
      <td>static</td>
      <td>object</td>
      <td>Object with methods and properties that be set as static method and properties of generated component</td>
    </tr>
    <tr>
      <th colspan="3">Life Cycle</th>
    </tr>
    <tr>
      <td>componentWillCreate</td>
      <td>function</td>
      <td>Called synchronously immediately after the instance has been initialized, but before component state will set</td>
    </tr>
    <tr>
      <td>componentDidCreate</td>
      <td>function</td>
      <td><p>Called synchronously after the instance is created, after component state set.</p></td>
    </tr>
    <tr>
      <td>componentWillMount</td>
      <td>function</td>
      <td>
        <p><code>componentWillMount()</code> is invoked just before mounting occurs. It is called before <code>render()</code>, therefore calling <code>setState()</code> synchronously in this method will not trigger an extra rendering.</p>
        <p class="important-note">It is not recommended to use this method. We recommend to use the <code>state()</code> instead for initializing state</p>
      </td>
    </tr>
    <tr>
      <td>componentDidMount</td>
      <td>function</td>
      <td>
        <p><code>componentDidMount()</code> is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.</p>
        <p>This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in <code>componentWillUnmount()</code></p
      </td>
    </tr>
    <tr>
      <td>componentWillUnmount</td>
      <td>function</td>
      <td><p><code>componentWillUnmount()</code> is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in <code>componentDidMount()</code></p></td>
    </tr>
    <tr>
      <td>componentWillUpdate</td>
      <td>function</td>
      <td>
        <p><code>componentWillUpdate()</code> is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs.</p>
        <p class="important-note">It is not recommended to use this method. Typically, this method can be replaced by <code>componentDidUpdate()</code></p>
      </td>
    </tr>
    <tr>
      <td>componentDidUpdate</td>
      <td>function</td>
      <td><p><code>componentDidUpdate()</code> is invoked immediately after updating occurs.</p></td>
    </tr>
  </tbody>
</table>

Now let's look at each property in more details.
