'use strict';

let gulp = require('gulp');
let path = require('path');
let concat = require('gulp-concat');


gulp.task('clean', () =>
  require('del')([path.join(__dirname, 'public', 'dist', '*')])
);

gulp.task('compress', ['clean'], () =>
  gulp.src(path.join(__dirname, 'public', 'stylesheets', '*.css'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(path.join(__dirname, 'public', 'dist', 'css')))
);

gulp.task('default', ['compress']);
