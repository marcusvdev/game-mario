const gulp          = require('gulp')
const sass          = require('gulp-sass')(require('sass'))
const sassGlob      = require('gulp-sass-glob')
const autoprefixer  = require('gulp-autoprefixer')
const gcmq          = require('gulp-group-css-media-queries')
const cleanCSS      = require('gulp-clean-css')
const minify        = require('gulp-minify')

const css = () => gulp.src('./src/sass/*.scss')
  .pipe(sassGlob())
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(gcmq())
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 3 versions'],
    cascade: false
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/css/'))

const js = () => gulp.src('./src/js/*.js')
  .pipe(minify())
  .pipe(gulp.dest('./dist/js/'))

exports.watch = () => {
  gulp.watch('./src/sass/**/*.scss', css).on('change', function(path, stats) {
    console.log(`File ${path} was removed`);
  });
  gulp.watch('./src/js/*.js', js).on('change', function(path, stats) {
    console.log(`File ${path} was removed`);
  });
}