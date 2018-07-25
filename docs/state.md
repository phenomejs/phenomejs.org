---
id: 'state'
title: Component State
---
# Component State

{{index}}

The `state` contains data specific to component that may change over time. The `state` is user-defined, and it should be a plain JavaScript object.

## Specify and Access State

To specify component state we need to return its state as JavaScript object in components's `state()` method. To access component state we need to access component's `this.state` property:

```jsx
export default {
  name: 'user-name',
  props: {
    firstName: String,
    lastName: String,
  },
  // As an argument state method receives component props
  state(props) {
    return {
      fullName: `${props.firstName} ${props.lastName}`
    };
  },
  render() {
    // Component state accessible on this.state property
    return (
      <div>Hello, {this.state.fullName}</div>
    );
  }
}
```

## Set State

To set/update component state we need to use one of the following methods:

```jsx
setState(stateChange)
```

```jsx
setState(updater)
```
where:

* `stateChange` - object that will be merged into the new state.
* `updater` is a `function(prevState, props)` that must return `stateChange` object that will be merged into the new state.


`setState()` enqueues changes to the component state and tells that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.


<div class="important-note">
  <p>Never mutate <code>this.state</code> directly, as calling <code>setState()</code> afterwards may replace the mutation you made. Treat <code>this.state</code> as if it were immutable.</p>
</div>

For example, click counter component:

```jsx
export default {
  name: 'click-counter',
  props: {
    initialCount: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  // initial state
  state(props) {
    return {
      count: props.initialCount,
    };
  },
  componentDidCreate() {
    // bind component method to component context when component created
    this.onButtonClick = this.onButtonClick.bind(this);
  },
  methods: {
    // button click handler
    onButtonClick() {
      // update component state with new count value
      this.setState({
        count: this.state.count + this.props.step
      });

      /* or using updater function:
      this.prevState((state, props) => {
        return {
          count: state.count + props.step
        }
      })
      */
    },
  },
  render() {
    return (
      <div className="click-counter">
        <p>You have clicked me {this.state.count} times</p>
        <button onClick={this.onButtonClick}>Increase Counter</button>
      </div>
    );
  },
}
```

## State & Life Cycle

You may call `setState()` immediately in `componentDidMount()`. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the `render()` will be called twice in this case, the user won’t see the intermediate state. Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the `state()` method instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.

You may call `setState()` immediately in `componentDidUpdate()` but note that it must be wrapped in some condition to check should it be updated or not, or you'll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance.

You should not call `setState()` in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.