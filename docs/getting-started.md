---
id: 'getting-started'
title: Getting Started
---
# Getting Started

{{index}}

In this getting started guide we will setup project to start working with Phenome components, and compile them to Vue and React components.

__TL;DR__

This getting started project is available on GitHub as <a href="https://github.com/phenomejs/phenome-component-github-repos" target="_blank">Phenome GitHub Repos Component</a>. You can grab directly from there and start playing with it.

## Installation

First of all, we need to create a project's folder, let's name it `/phenome-playground/` and create inside the following structure:

```
phenome-playground/
  dist/
  src/
```

Now we need to install Phenome, we can do it using NPM. We need to create `package.json` file with the following content and put it in the root folder of our project:

```json
{
  "name": "phenome-playground"
}
```
```
phenome-playground/
  dist/
  src/
  package.json
```

Now we can install it by executing the following command in terminal:

```
npm i phenome --save
```

This command will trigger NPM to install Phenome and save it as a dependency of our project by automatically modifying `package.json` to the following:

```json
{
  "name": "phenome-playground",
  "dependencies": {
    "phenome": "0.0.17"
  }
}
```
It will also add `node_modules` folder to project:
```
phenome-playground/
  dist/
  node_modules/
  src/
  package.json
```

## Phenome Component

Now we are ready to write our first [Phenome component](./component-declaration.html). For example, let's write a component that will display most popular GitHub repository for specified user or company account.

Let's create `src/github-repos.jsx` file in our project:
```
phenome-playground/
  dist/
  node_modules/
  src/
    github-repos.jsx
  package.json
```
and add there our Phenome component declaration:
```jsx
export default {
  name: 'github-repos',
  // component props
  props: {
    // github username, required
    username: {
      type: String,
      required: true,
    },
    // amount of repos to show
    amount: {
      type: Number,
      default: 5,
    },
  },
  // initial state
  state() {
    return {
      repos: [],
    };
  },
  // life cycle method when component mounted
  componentDidMount() {
    const self = this;
    // get passed prop values
    const { username, amount } = self.props;
    // fetch GitHub API
    fetch(`https://api.github.com/users/${username}/repos?type=owner`)
      .then(response => response.json())
      .then((repos) => {
        // Update component state with loaded repos
        self.setState({
          repos: repos
            // sort by stargazers count
            .sort((a,b) => b.stargazers_count - a.stargazers_count)
            // get specified amount
            .slice(0, amount || 5)
        });
      });
  },
  // render layout
  render() {
    const self = this;

    return (
      <div className="github-repos">
        {self.state.repos.map((repo) => (
          <div className="repo">
            <div className="repo-avatar">
              <img src={repo.owner.avatar_url} />
            </div>
            <div className="repo-content">
              <div className="repo-name">
                <a href={repo.html_url} target="_blank">{self.props.username}/{repo.name}</a>
              </div>
              <div className="repo-description">{repo.description}</div>
              <ul className="repo-stats">
                <li><b>{repo.stargazers_count}</b> stars</li>
                <li><b>{repo.forks_count}</b> forks</li>
                <li><b>{repo.open_issues_count}</b> issues opened</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    )
  },
};
```

You can learn more about [component declaration](./component-declaration.html), [life cycle methods](./life-cycle.html), [component props](./props.html), [state](./state.html) and [rendring with JSX](./rendering-jsx.html) in __Phenome Component__ documentation section.

## Compilation

After we have specified our github-repos component, we need to compile it to Vue and React components.

Create `/compile.js` file in the root folder of our repo:

```
phenome-playground/
  dist/
  node_modules/
  src/
    github-repos.jsx
  compile.js
  package.json
```

Where we put our compiler logic:

```js
// include Phenome compiler
const phenome = require('phenome');

// run Phenome compiler
phenome({
  // files with phenome components to process
  paths: './src/*.jsx',
  vue: {
    /* destination for compiled Vue components */
    out: './dist/vue/',
  },
  react: {
    /* destination for compiled React components */
    out: './dist/react/',
  },
}).then(() => {
  // do something when compilation finished
  console.log('Done!');
}).catch((error) => {
  // do something when compilation failed
  console.log('Error happened');
})
```

All done with coding, the last thing left is to launch the Phenome compiler that will do its magic ✨.

Run in terminal:

```
node compiler
```

After successfull compilation (in few ms) you will see compiled components in `/dist/` folder:
```
phenome-playground/
  dist/
    react/
      github-repos.js
    vue/
      github-repos.js
  node_modules/
  src/
    github-repos.jsx
  compile.js
  package.json
```

You can learn more about compiler API and all available parameters in [compiler API](./api.html)  documentation.


## Styling

Phenome doesn't support anything related to compiling and generating CSS stylesheets, except inline styles.

So we will assume that our compiled component is used with the following styles (can be included separately):

```css
.github-repos .repo {
  background: #fff;
  border-radius: 6px;
  display: flex;
  box-sizing: border-box;
  padding: 12px;
}
.github-repos .repo + .repo {
  margin-top: 12px;
}
.github-repos .repo-avatar {
  width: 96px;
  height: 96px;
  margin-right: 12px;
  flex-shrink: 0;
}
.github-repos .repo-avatar img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.github-repos .repo-name {
  font-weight: bold;
  font-size: 18px;
}
.github-repos .repo-name a {
  font-weight: bold;
  color: #000;
}
.github-repos .repo-stats {
  list-style: none;
  padding: 0;
}
.github-repos .repo-stats li + li {
  margin-top: 5px;
}
.github-repos .repo-stats b {
  font-size: 16px;
  margin-right: 5px;
}
```

## Result

After successfull compilation we will be able to use compiled GitHub Repos component in React and Vue apps.

For example we have some page component in React, so we can place our GitHub component inside like:

```jsx
// component from our dist/react/github-repos.js
import GithubRepos from './path/to/github-repos.js'

export () => (
  <div className="page">
    <GithubRepos username="framework7" amount={5} />
  </div>
)
```

And in Vue like so:

```html
<template>
  <div class="page">
    <github-repos username="framework7" :amount="5"></github-repos>
  </div>
</template>
<script>
  // component from our dist/vue/github-repos.js
  import GithubRepos from './path/to/github-repos.js'

  export default {
    components: {
      GithubRepos,
    },
  };
</script>
```

As a result we should see something like (screenshot):

<div class="get-started-screenshot">
  <img src="/i/get-started-github-repos.png">
</div>