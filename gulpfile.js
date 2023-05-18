const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();



function cleanDist() {
  return gulp.src('dist', {
    allowEmpty: true, read:
      false
  })
    .pipe(clean());
}
function compileStyles() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css/'));
}

function minImages() {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
}

function minScripts() {
  return gulp.src('src/js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
}

gulp.task('build', gulp.series(cleanDist, gulp.parallel(compileStyles, minImages, minScripts)));

gulp.task('dev', gulp.series('build', function () {

  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./src/scss/**/*.scss', compileStyles).on('change', browserSync.reload);

  gulp.watch('./src/js/*.js', minScripts).on('change', browserSync.reload);

  gulp.watch('./src/img/*.png', minImages).on('change', browserSync.reload);

  gulp.watch('./*.html').on('change', browserSync.reload);
}))