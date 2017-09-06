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

    return gulp.src('stylesheets/style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(rename({
            basename: "style",
            extname: extname
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./'));

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

// Development version, run production version when done.
gulp.task('dev', function () {

    var processors = [
        autoprefixer({browsers: ['> 1%', 'last 2 versions']}),
    ];

    return output(processors, '.dev.css');

});



gulp.task('watch', function () {

    // Static server
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

   gulp.watch('stylesheets/*.sass', ['dev', 'production']);
	 gulp.watch('stylesheets/**/*.sass', ['dev', 'production']);

});
