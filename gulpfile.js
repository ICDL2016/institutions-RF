const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require("gulp-notify");
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const server = require('gulp-server-livereload');
const ghPages = require('gulp-gh-pages');

gulp.task('watch', function () {
  gulp.watch('src/app/*.html', ['html']);
  gulp.watch('src/app/stylesheets/*.sass', ['styles']);
  gulp.watch('src/app/stylesheets/*/*.sass', ['styles']);
  gulp.watch('src/app/js/*.js', ['scripts']);
});

gulp.task('styles', function () {
  gulp.src('src/app/stylesheets/*.sass')
    .pipe(sass({
      includePaths: require("bourbon").includePaths
    }).on('error', sass.logError, notify("Error")))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify("Done"))
});


gulp.task('scripts', function() {
  gulp.src('src/app/js/main.js')
    .pipe(gulp.dest('dist/js'))
});

gulp.task('webserver', ['watch'], function() {
  gulp.src('dist/')
    .pipe(server({
      livereload: true,
      fallback: 'index.html'
    }));
});

gulp.task('html', function() {
  gulp.src('src/app/*.html')
    .pipe(gulp.dest('dist/'))
});

gulp.task('deploy', function() {
  return gulp.src('dist/')
    .pipe(ghPages());
});

function onError(err) {
  console.log(err.message);
  this.emit('end');
}

gulp.task('default', ['scripts', 'styles', 'html', 'webserver' ], function() {

});