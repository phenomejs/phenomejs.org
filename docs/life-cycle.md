---
id: 'life-cycle'
title: Component Life Cycle
---
# Component Life Cycle

Lifecycle hooks are special component methods that give users the opportunity to add their own code at specific stages, when component "will" and "did" create, mount, update, unmount.

## Mounting

These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

<ul class="index">
  <li><a href="#componentwillcreate"><code>componentWillCreate</code></a></li>
  <li><a href="#componentdidcreate"><code>componentDidCreate</code></a></li>
  <li><a href="#componentwillmount"><code>componentWillMount</code></a></li>
  <li><a href="#componentdidmount"><code>componentDidMount</code></a></li>
</ul>

## Updating

An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

<ul class="index">
  <li><a href="#shouldcomponentupdate"><code>shouldComponentUpdate</code> (React only)</a></li>
  <li><a href="#getsnapshotbeforeupdate"><code>getSnapshotBeforeUpdate</code> (React only)</a></li>
  <li><a href="#componentwillupdate"><code>componentWillUpdate</code></a></li>
  <li><a href="#componentdidUpdate"><code>componentDidUpdate</code></a></li>
</ul>


## Unmounting

This method is called when a component is being removed from the DOM:

<ul class="index">
  <li><a href="#componentwillunmount"><code>componentWillUnmount</code></a></li>
</ul>

## Error Handling

This method is called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component

<ul class="index">
  <li><a href="#componentdidcatch"><code>componentDidCatch</code></a></li>
</ul>

## `componentWillCreate`

`componentWillCreate` invoked immediately after the instance has been initialized, but before component state will set

## `componentDidCreate`

`componentDidCreate` invoked immediately after the instance has been initialized, and after component state will set

## `componentWillMount`

`componentWillMount()` is invoked just before mounting occurs. It is called before `render()`, therefore calling `setState()` synchronously in this method will not trigger an extra rendering. Generally, we recommend using the `state()` method instead for initializing state.

Avoid introducing any side-effects or subscriptions in this method. For those use cases, use `componentDidMount()` instead.

## `componentDidMount`

`componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in `componentWillUnmount()`.

You may call `setState()` immediately in `componentDidMount()`. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the `render()` will be called twice in this case, the user won’t see the intermediate state. Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the `state()` method instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.

## `shouldComponentUpdate`

<div class="important-note">
  <p>This hook will be supported only in compiled React component</p>
</div>

Use `shouldComponentUpdate()` to let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received. Defaults to true. This method is not called for the initial render or when `forceUpdate()` is used.

## `getSnapshotBeforeUpdate`

<div class="important-note">
  <p>This hook will be supported only in compiled React component</p>
</div>

`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to `componentDidUpdate()`.

This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way.

A snapshot value (or `null`) should be returned.

## `componentWillUpdate`

`componentWillUpdate()` is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Typically, this method can be replaced by `componentDidUpdate()`.

## `componentDidUpdate`

`componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

You may call `setState()` immediately in `componentDidUpdate()` but note that it must be wrapped in some condition to check should it be updated or not, or you'll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance.

## `componentWillUnmount`

`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

You should not call `setState()` in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

## `componentDidCatch`

```jsx
componentDidCatch(error, info)
```

This method is called when there is an error during rendering, in a lifecycle method, or in any child component.

Called when an error from any descendent component is captured. It receives the `error` and a `info` string containing information on where the error was captured.

