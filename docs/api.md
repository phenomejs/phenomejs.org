---
id: 'api'
title: API
---
# API

{{index}}

Phenome is designed to be used in Node.js evironment. Phenome compiler API is a single compilation function that accepts object with parameters and returns Promise:

```js
const phenome = require('phenome');

phenome(params)
  .then(() => {
    // compiled succesfully
  })
  .catch((error) => {
    // error happened
  });
```

## Parameters

<table class="params-table">
  <thead>
    <th>Parameter</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
      <td>paths</td>
      <td>string<br>array</td>
      <td></td>
      <td>
        <p>Files to process. It accepts string with <a href="https://github.com/isaacs/node-glob" target="_blank">Glob pattern</a> or array with such strings where to look for files. For example <code>./src/*.jsx`</code> to compile all <code>.jsx</code> files in <code>src/</code> folder</p>
      </td>
    </tr>
    <tr>
      <td>env</td>
      <td>object</td>
      <td></td>
      <td>
        <p>Object with environment variables that will be replaced during compilation</p>
        <p>For example, if you specify such <code>env</code> variables:</p>
        <pre><code js>
{
  NODE_ENV: 'production'
  FOO: true
}
        </code></pre>
        <p>Then you will be able to use them in code like:</p>
        <pre><code js>
if (process.env.NODE_ENV === 'production') {
  // do something
}
if (process.env.FOO === true) {
  // do something
}
        </code></pre>
        <p>After env variables replacements you may have "constant conditions", check <a href="./environment-variables.html">how they work</a> in Phenome components.</p>
        <div class="important-note">
          <p>In addition to any env variables you pass, there will also be <code>process.env.COMPILER</code> variable passed automatically that will be equal to <code>'vue'</code> or <code>'react'</code> depending on target compiler.</p>
        </div>
      </td>
    </tr>
    <tr>
      <td>replace</td>
      <td>object</td>
      <td></td>
      <td>
        <p>Object with variables that need to be replaced in code. Each key can also be a regular expression, e.g.</p>
        <pre><code js>
{
  // replace foo with bar
  'foo': 'bar',

  // regexp replace
  /[a-z]*/: 'foo'
}
        </code></pre>
        <p>After such replacements you may have "constant conditions", check <a href="./environment-variables.html">how they work</a> in Phenome components.</p>
      </td>
    </tr>
    <tr>
      <td>react</td>
      <td>object</td>
      <td></td>
      <td>Object with React compiler parameters. If not specified, then it will not compile React components.</td>
    </tr>
    <tr>
      <td>react.out</td>
      <td>string</td>
      <td></td>
      <td>Path where to save compiled React components</td>
    </tr>
    <tr>
      <td>react.env</td>
      <td>object</td>
      <td></td>
      <td>Same as global <code>env</code>, but specific for React compiler</td>
    </tr>
    <tr>
      <td>react.env</td>
      <td>object</td>
      <td></td>
      <td>Same as global <code>replace</code>, but specific for React compiler</td>
    </tr>
    <tr>
      <td>react.helpers</td>
      <td>object</td>
      <td></td>
      <td>
        <p>Object with React component helpers/polyfils that needs to be added to compiled components. By default it is object with the following properties. Each property can be <code>true</code> (force helper to be included), <code>false</code> (force helper not to be included) or <code>auto</code> (by default - auto detect):</p>
        <div class="important-note">
          <p>Changing these helpers properties can be harmful if you are not 100% sure what they do. It is highly recommended to leave them in <code>auto</code> mode</p>
        </div>
        <ul>
          <li><code>slots</code> - adds ability to use slots for content distribution
          <li><code>props</code> - adds specified props to compiled component
          <li><code>refs</code> - adds refs support in compiled component. React already support refs, but this helper will automatically convert string refs to callback refs
          <li><code>dispatchEvent</code> - adds component method to trigger custom events
          <li><code>watch</code> - adds watchers support to component
        </ul>
      </td>
    </tr>
    <tr>
      <td>vue</td>
      <td>object</td>
      <td></td>
      <td>Object with Vue compiler parameters. If not specified, then it will not compile Vue components</td>
    </tr>
    <tr>
      <td>vue.env</td>
      <td>object</td>
      <td></td>
      <td>Same as global <code>env</code>, but specific for Vue compiler</td>
    </tr>
    <tr>
      <td>vue.env</td>
      <td>object</td>
      <td></td>
      <td>Same as global <code>replace</code>, but specific for Vue compiler</td>
    </tr>
    <tr>
      <td>vue.out</td>
      <td>string</td>
      <td></td>
      <td>Path where to save compiled Vue components</td>
    </tr>
    <tr>
      <td>vue.helpers</td>
      <td>object</td>
      <td></td>
      <td>
        <p>Object with Vue component helpers/polyfils that needs to be added to compiled components. By default it is object with the following properties. Each property can be <code>true</code> (force helper to be included), <code>false</code> (force helper not to be included) or <code>auto</code> (by default - auto detect):</p>
        <div class="important-note">
          <p>Changing these helpers properties can be harmful if you are not 100% sure what they do. It is highly recommended to leave them in <code>auto</code> mode</p>
        </div>
        <ul>
          <li><code>slots</code> - this helper will automatically convert <code>this.slots</code> to Vue's native <code>this.$slots</code>
          <li><code>props</code> - adds <code>this.props</code> component getter to return component props
          <li><code>refs</code> - this helper will automatically convert <code>this.refs</code> to Vue's native <code>this.$refs</code>
          <li><code>dispatchEvent</code> - adds component method to trigger custom events, basically will reuse Vue's native <code>$emit</code>
          <li><code>state</code> - adds Phenome-like component state support
          <li><code>setState</code> - adds component's method to work with state in Phenome-way
        </ul>
      </td>
    </tr>
  </tbody>
</table>

For example, we have the following project structure:
```
dist/
    react/
    vue/
node_modules
src/
    component-a.jsx
    component-b.jsx
compile.js
package.json
```

We need to compile Phenome components from `src/` folder.

__compile.js__:

```js
const phenome = require('phenome');

phenome({
  // Path to phenome components
  paths: './src/*.jsx',
  react: {
    // where to save compiled React components
    out: './dist/react/',
  },
  vue: {
    // where to save compiled Vue components
    out: './dist/vue/',
  },
}).then(() => {
  console.log('Compiled succesfully');
}).catch(() => {
  console.log('Oops, error occured');
})
```

Run in terminal:
```bash
$ node ./compile.js
```

The resulting output will be:
```
dist/
    react/
        component-a.js
        component-b.js
    vue/
        component-a.js
        component-b.js
node_modules
src/
    component-a.jsx
    component-b.jsx
compile.js
package.json
```

## Configuration File

It is also possible to specify Phenome compiler parameters in configuration file.

We need to create `phenome.config.js` file in the **root** of our project and export parameters from this file.

```
dist/
    react/
    vue/
node_modules
src/
    component-a.jsx
    component-b.jsx
compile.js
phenome.config.js
package.json
```

__phenome.config.js__:

```js
module.exports = {
  paths: './src/*.jsx',
  react: {
    out: './dist/react/',
  },
  vue: {
    out: './dist/vue/',
  },
};
```

__compile.js__:
```js
const phenome = require('phenome');

// it will automaticall read parameters from config file
phenome().then(() => {
  console.log('Compiled succesfully');
}).catch(() => {
  console.log('Oops, error occured');
})
```
## Transpiling And Bundling

Phenome compiler doesn't do any transpilation (ES-next to ES5) and bundling (don't process `imports`) - it leaves everything as is. If you need transpilation or bundling, you can just post process compiled React and Vue components with your favorite tools, e.g. Buble, Babel, Rollup, Webpack, etc.

## Dependencies

Phenome compiler will compile and process only files that match to Phenome component pattern - **default not named object export with at least `name` and `render` properties**.

If you use any custom dependencies in Phenome components, e.g.:

```jsx
/* my-component.jsx */
import Utils from './utils/utils.js';

export default {
  // ...
}
```

make sure your `paths` pattern covers them. Compiler will not process them but it will copy them to output folder with paths respected.
