gulp-gitversion
===============

gulp plugin for appending git-version

#Usage
```
gitVersion = require('gulp-gitversion');

gulp.src('main.js')
.pipe(gitVersion({type:'js'}))


gulp.src('index.htm')
.pipe(gitVersion({type:'html'}))

gulp.src('main.css')
.pipe(gitVersion({type:'css'}))
```
