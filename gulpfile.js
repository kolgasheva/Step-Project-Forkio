const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// function cleanDist() {
//   return gulp.src('dist', {
//     allowEmpty: true, read:
//       false
//   })
//     .pipe(clean());
// }
// function compileStyles() {
//   return gulp.src('src/scss/*.scss')
//     .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
//     .pipe(autoprefixer())
//     .pipe(cleanCSS())
//     .pipe(concat('styles.min.css'))
//     .pipe(gulp.dest('dist/css/'));
// }

// function minImages() {
//   return gulp.src('src/img/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('dist/img/'));
// }

// function minScripts() {
//   return gulp.src('src/js/*.js')
//     .pipe(concat('scripts.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js/'));
// }

// gulp.task('build', gulp.series(cleanDist, gulp.parallel(compileStyles, minImages, minScripts)));
// gulp.task('dev', gulp.series('build', function () {

//   browserSync.init({
//     server: {
//       baseDir: './'
//     }
//   });

//   gulp.watch('src/img/*', minImages);
//   gulp.watch('src/scss/*.scss', compileStyles);
//   gulp.watch('src/js/*.js', minScripts);

//   gulp.watch('dist/**/*').on('change', browserSync.reload);
//   gulp.watch('./*.html').on('change', browserSync.reload);
// }));


const cleanDist = () => {
    return gulp.src('.src/*.html')
    .pipe(clean())
    .pipe(gulp.dest('./dist'))
};

const html = () => {
    return gulp.src('./*.html')
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
};

const scss = () => {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'))
}

const js = () => {
    return gulp.src('./src/js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
};

const imgMin = () => {
    return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

const dev = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch("./src/**/*", gulp.series(cleanDist, gulp.parallel(html, scss, js), (next) => {
        browserSync.reload();
        next();
    }))
};

gulp.task('build', gulp.series(cleanDist, gulp.parallel(html, js, scss, imgMin)));
gulp.task('dev', gulp.series('build', dev));