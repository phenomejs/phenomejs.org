---
id: 'rendering-jsx'
title: Component Rendering / JSX
---
# Component Rendering / JSX

{{index}}

Phenome components use JSX for rendering. Each Phenome component must have a `render` method which returns component layout.

JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript.

There are different JSX implementations out there. React and Vue has a bit different ones, for example, in React we need to use `className`, `readOnly` properties for element's "class" and "readonly" attributes, and in Vue they are same (same lowercase)  `class` and `readonly`. And to unify this difference in Phenome we choose a React's approach (`camelCase` convention), because it is easier to post process such JSX to any other frameworks formats.

Most of the things which is relevant for React's JSX are also applicable for Phenome JSX, so we recommend to take a look at React's JSX docs as a good reference about JSX in general:

* <a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank">React: Introducing JSX</a>
* <a href="https://reactjs.org/docs/jsx-in-depth.html" target="_blank">React: JSX In Depth</a>

## `render()`

The `render()` method is __required__ method in a Phenome component.

When called, it should examine `this.props` and `this.state` and return one of the following types:

* __Element__. Typically created via JSX. For example, `<div />` and `<MyComponent />` are elements that instruct vdom engine to render a DOM node, or another user-defined component, respectively.
* __String and numbers__. These are rendered as text nodes in the DOM.
* __null__. Render nothing.

The `render()` function should be pure, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser.

If you need to interact with the browser, perform your work in `componentDidMount()` or the other [lifecycle methods](life-cycle.html) instead. Keeping `render()` pure makes components easier to think about.

## Basic Examples

In the following example we return JSX representation of `div` element:

```jsx
export default {
  // ...
  render() {
    return <div>Hello wordl!</div>
  }
}
```

JSX tags may contain children:

```jsx
export default {
  // ...
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <p>World</p>
      </div>
    )
  }
}
```

You may use quotes to specify string literals as attributes:

```jsx
export default {
  // ...
  render() {
    return (
      <div className="my-component" id="my-element">
        <h1>Hello!</h1>
        <p>World</p>
      </div>
    )
  }
}
```

If a tag is empty, you may close it immediately with `/>`, like XML. Same with self-closing HTML tags (`img`, `br` and others):

```jsx
render() {
  return (
    <div>
      <span id="some-empty-element" />
      <br />
      <img src="path/to/image.jpg" />
    </div>
  )
}
```

## Embedding Expressions in JSX

You can put any valid JavaScript expression inside the curly braces in JSX. For example, `2 + 2`, `user.firstName`, or `formatName(user)` are all valid JavaScript expressions.

```jsx
export default {
  // ...
  render() {
    const name = 'John Doe';
    const age = 10;
    return (
      <div>Hello, {name}! Are you {age*2} years old?</div>
    )
  }
}
```

You may also use curly braces to embed a JavaScript expression in an attribute:

```jsx
export default {
  // ...
  render() {
    const user = {
      name: 'John Doe',
      avatarUrl: 'path/to/image.jpg',
    };
    return (
      <div className="user">
        <div className="user-name">{user.name}</div>
        <img src={user.avatarUrl} />
      </div>
    )
  }
}
```

Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

## Conditional Rendering

Conditional rendering in JSX works the same way conditions work in JavaScript. Use JavaScript operators like `if` or the conditional (ternary) operator to create elements representing the current state:

```jsx
render() {
  if (this.state.user) {
    return <div>Hello {this.state.user.firstName}!</div>
  } else {
    return <div>Please sign in.</div>
  }
}
```

You may embed any expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element:

```jsx
render() {
  const unreadMessages = this.props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```

Another method for conditionally rendering elements inline is to use the JavaScript conditional operator `condition ? true : false`

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

It can also be used for larger expressions although it is less obvious what’s going on:

```jsx
render() {
  const isLoggedIn = this.state.user && this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <p>Hello {this.state.user.firstName}!</p>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  )
}
```

## Lists & Keys

Usually you would render lists inside a component.

To loop over list items in JSX we usually use array's `map()` function to iterate over items. This function is used to loop over each array item and map it to something else, in our case - to JSX:

```jsx
export default {
  state() {
    return {
      items: [1, 2, 3, 4, 5],
    };
  },
  render() {
    return (
      <ul>
        {this.state.items.map((item) => (
          <li>Item {item}</li>
        ))}
      </ul>
    )
  }
}
```

But when we run component compiled from this code, we will likely be given a warning that a `key` should be provided for list items. A "key" is a special string attribute you need to include when creating lists of elements.

Keys help identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys or array item index otherwise.

Now we can fix previous example by adding keys:

```jsx
export default {
  // ...
  state() {
    return {
      items: [1, 2, 3, 4, 5],
    };
  },
  render() {
    return (
      <ul>
        {this.state.items.map((item, index) => (
          <li key={index}>Item {item}</li>
        ))}
      </ul>
    );
  }
}
```

More complex array item structure, with IDs as keys:

```jsx
export default {
  // ...
  state() {
    return {
      items: [
        {
          id: 1,
          title: 'Apple',
          created: '2018-07-25',
          about: 'Lorem ipsum...',
        },
        {
          id: 2,
          title: 'Pear',
          created: '2018-07-30',
          about: 'Lorem ipsum...',
        },
        // ...
      ],
    };
  },
  render() {
    return (
      <div className="items">
        {this.state.items.map((item) => (
          <div className="item" key={item.id}>
            <div className="item-title">{item.title}</div>
            <div className="item-date">{item.created}</div>
            <div className="item-about">{item.about}</div>
          </div>
        ))}
      </div>
    );
  }
}
```

## `className`

To specify a CSS class, use the `className` attribute. This applies to all regular DOM and SVG elements like `<div>`, `<a>`, and others.

If you use it with Web Components (which is uncommon), use the `class` attribute instead.

## `style`

The `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes. For example:

```jsx
export default {
  // ...
  render() {
    const divStyle = {
      color: 'blue',
      backgroundImage: `url(${this.props.image})`,
    }
    return (
      <div style={divStyle}>Hello World!</div>;
    )
  }
}
```

Note that styles are not autoprefixed. To support older browsers, you need to supply corresponding style properties:

```jsx
export default {
  // ...
  render() {
    const divStyle = {
      transform: 'translateX(10px)',
      WebkitTransform: 'translateX(10px)',
    }
    return (
      <div style={divStyle}>Hello World!</div>;
    )
  }
}
```

Style keys are camelCased in order to be consistent with accessing the properties on DOM nodes from JS (e.g. `node.style.backgroundImage`). Vendor prefixes <a href="https://www.andismith.com/blogs/2012/02/modernizr-prefixed/" target="_blank">other than ms</a> should begin with a capital letter. This is why `WebkitTransform` has an uppercase "W".

## `dangerouslySetInnerHTML`

`dangerouslySetInnerHTML` is a replacement for using `innerHTML` in the browser DOM. In general, setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack. So, you can set HTML directly from React, but you have to type out `dangerouslySetInnerHTML` and pass an object with a `__html` key, to remind yourself that it’s dangerous. For example:

```jsx
export default {
  // ...
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: '<p>Hello world!</p>'}} />;
    )
  }
}
```
## Supported HTML Attributes

Any standard or custom DOM attributes are fully supported. Since components often take both custom and DOM-related props, Phenome uses the `camelCase` convention just like the DOM APIs:

```jsx
<div tabIndex="-1" />      // Just like node.tabIndex DOM API
<div className="Button" /> // Just like node.className DOM API
<input readOnly={true} />  // Just like node.readOnly DOM API
```

These props work similarly to the corresponding HTML attributes, with the exception of the special cases documented above.

Some of the DOM attributes include:

```html
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Similarly, all SVG attributes are fully supported:

```html
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

You may also use custom attributes as long as they’re fully lowercase.

## Slots

Very often you need to distribute component all children among its tree (default location in component tree). Phenome provides a way to distribute content with " Web Components"-like __slots__.

<div class="important-note">
  <p>Vue already has such slots distribution API so compiled Phenome -> Vue component will utilize native Vue's API.</p>
  <p>React doesn't have such slots-based content distribution. But you shouldn't worry about it, React component compiled with Phenome will be empowered with such slots API supports 💪🎉.</p>
</div>

### Slot Content

In component render function we need to put `<slot />` tag where we need component children to be inserted. For example, we have such blog post component:

```jsx
export default {
  name: 'blog-post',
  props: {
    title: String,
  },
  render() {
    return (
      <div className="blog-post">
        <h1>{this.props.title}</h1>
        <div className="blog-post-content">
          {/* component children will go here */}
          <slot />
        </div>
      </div>
    )
  }
}
```

Now our blog post component can be used in React like this:

```jsx
import React from 'react';
import BlogPost from './blog-post';

export default () => (
  <div className="page">
    <BlogPost title="Welcome!">
      {/* all component children will go under "blog-post-content" element of our blog post component */}
      <p>Hello World!</p>
      <p>This is a welcome post!</p>
    </BlogPost>
  </div>
);
```

Same in Vue:

```html
<template>
  <div class="page">
    <blog-post title="Welcome!">
      <!-- all component children will go under "blog-post-content" element of our blog post component -->
      <p>Hello world</p>
      <p>This is a welcome post!</p>
    </blog-post>
  </div>
</template>
```

Resulting ouput for both examples will be:
```html
<div class="page">
  <div class="blog-post">
    <h1>Welcome</h1>
    <div class="blog-post-content">
      <p>Hello world</p>
      <p>This is a welcome post!</p>
    </div>
  </div>
</div>
```

### Named Slots

Named slots can be useful if we need more complex content distribution structure. Let's get back to our blog post component:

```jsx
export default {
  name: 'blog-post',
  props: {
    title: String,
  },
  render() {
    return (
      <div className="blog-post">
        <h1>{this.props.title}</h1>
        <div className="blog-post-header">
          {/* component children with slot="header" prop will go here */}
          <slot name="header" />
        </div>

        <div className="blog-post-content">
          {/* component children with no slot prop will go here */}
          <slot />
        </div>

        <div className="blog-post-footer">
          {/* component children with slot="footer" prop will go here */}
          <slot name="footer" />
        </div>
      </div>
    )
  }
}
```

And now it can be used as follows:

```jsx
import React from 'react';
import BlogPost from './blog-post';

export default () => (
  <div className="page">
    <BlogPost title="Welcome!">
      {/* will go under blog-post-header */}
      <img slot="header" src="path/to/post/image.jpg" />
      <div slot="header" className="author">by John Doe</div>

      {/* all component without "slot" prop will go under "div class="blog-post-content" */}
      <p>Hello World!</p>
      <p>This is a welcome post!</p>

      {/* will go under blog-post-footer */}
      <div slot="footer">
        <a href="/posts/">Back to posts</a>
      </div>
    </BlogPost>
  </div>
);
```

Same in Vue:

```html
<template>
  <div class="page">
    <blog-post title="Welcome!">
      <!-- will go under blog-post-header -->
      <img slot="header" src="path/to/post/image.jpg" />
      <div slot="header" class="author">by John Doe</div>

      <!-- all component children will go under "blog-post-content" element of our blog post component -->
      <p>Hello world</p>
      <p>This is a welcome post!</p>

      <!-- will go under blog-post-footer -->
      <div slot="footer">
        <a href="/posts/">Back to posts</a>
      </div>
    </blog-post>
  </div>
</template>
```

### Default Slot Content

There are cases when it’s useful to provide a slot with default content. In this case we just need to put default slot content inside of `<slot>` tag:

```jsx
render() {
  return (
    <button>
      <slot>Submit</slot>
    </button>
  )
}
```

And if no children passed to this component it will be rendered as `<button>Submit</button>`;

### Slots in Expressions

Sometimes we need to manipulate slots in our code, for example to check programmatically if they exist or not, or loop manually over each slot child. To access slots we need to use the `slots` component instance property:

```js
this.slots[name]
```

Where `name` is the name of the named slot, or `this.slots.default` in case of default slots. It contains array of slots.

So basically this is how slot tags can be replaces in expressions:

```jsx
<slot /> /* === */ this.slots.default

<slot name="header" /> /* === */ this.slots.header

<slot>Default Content</slot> /* === */ (this.slots.default || 'Default Content')
```

So we can rewrite our blog post component in different way:
```jsx
export default {
  name: 'blog-post',
  props: {
    title: String,
  },
  render() {
    return (
      <div className="blog-post">
        <h1>{this.props.title}</h1>

        <div className="blog-post-header">
          {this.slots.header}
        </div>

        <div className="blog-post-content">
          {this.slots.default}
        </div>

        <div className="blog-post-footer">
          {this.slots.footer}
        </div>
      </div>
    )
  }
}
```

But issue with such approach is that if we don't pass any "header" or "footer" children then we will have empty `<div class="blog-post-header"></div>` or `<div class="blog-post-footer"></div>` elements. We can avoid it by checking slots:

```jsx
export default {
  name: 'blog-post',
  props: {
    title: String,
  },
  render() {
    return (
      <div className="blog-post">
        <h1>{this.props.title}</h1>

        {this.slots.header && (
          <div className="blog-post-header">
            {this.slots.header}
          </div>
        )}

        <div className="blog-post-content">
          {this.slots.default}
        </div>

        {this.slots.footer && (
          <div className="blog-post-footer">
            {this.slots.footer}
          </div>
        )}
      </div>
    )
  }
}
```

## Refs

`ref` attribute is used to register a reference to an element or a child component. Reference name must be passed to `ref` attribute as a string.

The reference will be registered under the parent component’s `this.refs` object. If used on a plain DOM element, the reference will be that element; if used on a child component, the reference will be component instance:

```jsx
import CustomButton from './custom-button';

export default {
  name: 'my-component',
  render() {
    return (
      {/* this.refs.el will contain reference to main component DOM element */}
      <div className="my-component" ref="el">
        {/* this.refs.input will contain reference to input DOM element */}
        <input ref="input" />

        {/* this.refs.button will contain reference to CustomButton component */}
        <CustomButton ref="button" />
      </div>
    );
  },
  componentDidMount() {
    // this.refs.input - contains reference to input DOM Element
    this.refs.input.focus();
  },
}
```

