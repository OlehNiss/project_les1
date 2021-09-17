'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

function styles(){
  return gulp.src('app/styles/**/*.scss')// **означає шо файли можуть бути як в папці так і в підпапці
    .pipe(sass().on('error',sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('build/css'))
}

function watch(){
  gulp.watch('app/styles/**/*.scss',styles);
}

const build = gulp.parallel(styles);

gulp.task('build', build);










































/*
scss
cssnano
autoprefixer
rename 
*/

/*
app/
  fonts/
  images/
  js/
  styles/
    base/
      _base.scss/
      _mixin.scss/
      _variables.scss/
    extensions/
    layouts/
    modules/
    main.scss/
  views/
  index.html

*/









// function defaultTask(cb) {
//     // place code for your default task here
//     console.log('gulp works');
//     cb();
//   }
  
//   exports.default = defaultTask