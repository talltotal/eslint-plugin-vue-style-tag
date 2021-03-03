# eslint-plugin-vue-style-tag

ESLint plugin to require Vue style tags with scoped or module attribute.

This rule was valid when the parser is `vue-eslint-parser@^7.0.0`.


Valid:
```html
<template>
    <div />
</template>
<style scoped>
</style>
```

```html
<template>
    <div />
</template>
<style module>
</style>
```

Invalid:
```html
<template>
    <div />
</template>
<style>
</style>
```


## Installation
```
$ npm i eslint --save-dev
$ npm install eslint-plugin-vue-style-tag --save-dev
```


## Usage

`.eslintrc.js`:

```js
{
    parser: require.resolve('vue-eslint-parser'),
    plugins: [
        'vue-style-tag'
    ],
    rules: {
        'vue-style-tag/use-scoped-or-module': 'warn'
    }
}
```
