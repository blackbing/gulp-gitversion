gulp-gitversion [![Build Status](https://travis-ci.org/blackbing/gulp-gitversion.svg?branch=master)](https://travis-ci.org/blackbing/gulp-gitversion)
===============

gulp plugin for appending git-version

# Usage

```
npm install gulp-gitversion --save-dev
```
```
var gitVersion = require('gulp-gitversion');
```

# Append git version

### js

```.pipe(gitVersion({type:'js'})); ```

```js
;
// git version: 5a0b54d81689bfd0afa30698a73e3fd92558feab
//created at: Thu May 29 2014 15:33:18 GMT+0800 (CST)
```
### html

```.pipe(gitVersion({type:'html'})) ```

```html
<!-- git version: 5a0b54d81689bfd0afa30698a73e3fd92558feab -->
<!-- created at: Thu May 29 2014 15:33:18 GMT+0800 (CST) -->
```

### css

```.pipe(gitVersion({type:'css'})) ```

```css
/* git version: 5a0b54d81689bfd0afa30698a73e3fd92558feab */
/* created at: Thu May 29 2014 15:33:18 GMT+0800 (CST)*/
```

