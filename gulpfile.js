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

gulp.task('relocate:images', () =>
  gulp.src(path.join(__dirname, 'public', 'img', '*'))
    .pipe(gulp.dest(path.join(__dirname, 'public', 'dist', 'img')))
);

gulp.task('default', ['compress', 'relocate:images']);
