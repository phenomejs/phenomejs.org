---
id: 'conditional-comments'
title: Conditional Comments
---
# Conditional Comments

Phenome tries to provide as much compatible API and same usage experience to get the same functionality in compiled Vue and React components. But there could be some situations when you may need to do something only for Vue or React specific output, usually when you need access to some core APIs. And conditional comments can helper here.

There are two conditional comments are supported

```html
// phenome-[compiler]-line
```

and

```html
// phenome-[compiler]-next-line
```

where `[compiler]` is the target framework, e.g. `react` or `vue`.

* If you add `// phenome-vue-next-line` then in the compiled React component next line will be removed
* If you add `// phenome-vue-line` then in the compiled React component current line will be removed
* If you add `// phenome-react-next-line` then in the compiled Vue component next line will be removed
* If you add `// phenome-react-line` then in the compiled Vue component current line will be removed

Let's check the following example. Imagine, that for some reason, we need to loop over component children (`slots`) and check what `id` attribute (prop) was passed to them, and based on that, distribute elements among component tree:

```jsx
export default {
  name: 'my-component',
  render() {
    let headerEl;
    let footerEl;
    let contentEls = [];

    this.slots.forEach((child) => {
      /*
      In Vue to get the child element attributes we need to access child.data.attrs
      */

      const id = child.data.attrs.id; // phenome-vue-line

      /*
      In React we just check child.props
      */

      const id = child.props.id; // phenome-react-line

      // now check ids
      if (id === 'header') headerEl = child;
      else if (id === 'footer') footerEl = child;
      else {
        // push to rest of content
        contentEls.push(child);
      }
    });

    /*
    For some reason we also want to have compiler-related class in output
    */

    // phenome-react-next-line
    const addClass = 'react';

    // phenome-vue-next-line
    const addClass = 'vue';

    return (
      <div className={`my-component my-component-${addClass}`}>
        <div className="my-component-header">
          {headerEl}
        </div>
        <div className="my-component-content">
          {contentEls}
        </div>
        <div className="my-component-footer">
          {footerEl}
        </div>
      </div>
    )
  }
}
```

Conditional comments are good for one-line conditions. To have more control over output for different target framework, then check the [Environment Variables](environment-variables.html) section.