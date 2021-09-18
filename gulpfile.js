'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

const concat = require('gulp-concat');// для конкатанації всіх файлів js в один
const uglify = require('gulp-uglify');// для мініфікування js в один рядок

const browsersync = require('browser-sync').create();

const paths = {
  styles:{
    src: 'app/styles/**/*.scss',
    dest: 'build/css'  
  },
  scripts :{
    src: 'app/js/**/*.js',
    dest: 'build/scripts'
  },
  html:{
    src: 'app/**/*.html',
    dest: 'build/'
  }
}

function browserSync(done) {
  browsersync.init({
    server:{
      baseDir: './build'
    },
    port: 3000
  })
  done();
}

//наступне для reload, тобто коли ми зробили якісь зміни в нас 
// має заново скомпілюватися і браузер перезагрузитися
function browserSyncReload(done){
  browsersync.reload();
  done();
}


function styles(){//для обробки css
  return gulp.src(paths.styles.src)// **означає шо файли можуть бути як в папці так і в підпапці
    .pipe(sass().on('error',sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream())
}

function scripts(){
  return gulp.src(paths.scripts.src)
    .pipe(concat(('main.min.js')))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}

function html(){
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}


function watch(){
  gulp.watch(paths.styles.src,styles);
  gulp.watch(paths.scripts.src,scripts);
  gulp.watch(paths.html.src,html);
  gulp.watch('./app/*.html', gulp.series(browserSyncReload));
}

const build = gulp.parallel(styles,scripts,html);

gulp.task('build', build);

//зараз ми пишемо шо, якщо ми напишемо gulp, воно буде і build і watch і все на раз
gulp.task('default', gulp.parallel(watch,browserSync,build))










































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