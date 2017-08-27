var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var scsslint = require('gulp-scss-lint');
var browserSync = require('browser-sync').create();


function output(processors, extname) {

    return gulp.src('wp-content/themes/magenta/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename: "style",
            extname: extname
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('wp-content/themes/magenta/'));

}


gulp.task('default', ['dev', 'production'], function() {

});


// Production version minified with comments
gulp.task('production', function () {

    var processors = [
        autoprefixer({browsers: ['> 1%', 'last 2 versions']}),
        cssnano({discardComments: false}),
    ];

    return output(processors, '.css');

});

gulp.task('scss-lint', function() {
  return gulp.src('wp-content/themes/magenta/styles/**/*.scss')
    .pipe(scsslint({
        'config': 'lint.yml',
        'maxBuffer': 800000
    }));
});

// Development version, run production version when done.
gulp.task('dev', function () {

    var processors = [
        autoprefixer({browsers: ['> 1%', 'last 2 versions']}),
    ];

    return output(processors, '.dev.css');

});



gulp.task('watch', function () {

    // Static server
    browserSync.init({});

	  gulp.watch('stylesheets/sass/*.scss', ['dev', 'production']);

});
