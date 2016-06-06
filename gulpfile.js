'use strict';

let gulp = require('gulp');
let path = require('path');
let concat = require('gulp-concat');
let merge = require('merge-stream');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let fs = require('fs');
let rename = require('gulp-rename');


gulp.task('clean', () =>
  require('del')([path.join(__dirname, 'public', 'dist', '*')])
);

gulp.task('compress', ['clean', 'relocate:images'], () => {
  let css = gulp.src(path.join(__dirname, 'public', 'stylesheets', '*.css'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(path.join(__dirname, 'public', 'dist', 'css')));

  let js = fs.readdirSync(path.join(__dirname, 'assets', 'js'))
    .map(file => {
      var f = '';
      if ((f = path.basename(file, '.js')) !== file)
        return gulp.src(path.join(__dirname, 'assets', 'js', file))
          .pipe(babel({
            presets: ['es2015'],
          }))
          .pipe(uglify())
          .pipe(rename(`${f}.min.js`))
          .pipe(gulp.dest(path.join(__dirname, 'public', 'dist', 'js')));
    })

  return merge(css, js);
});

gulp.task('relocate:images', () =>
  gulp.src(path.join(__dirname, 'public', 'img', '*'))
    .pipe(gulp.dest(path.join(__dirname, 'public', 'dist', 'img')))
);

gulp.task('default', ['compress']);
