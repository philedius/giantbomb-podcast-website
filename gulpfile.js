var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

// gulp.task('browser-sync', function() {
//   browserSync({
//     server: {
//        baseDir: "./"
//     }
//   });
//
// });

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
        files: ["**/*.*"],
        // browser: "google chrome",
        port: 7000,
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch('*.css', function() {
      // grab css files and send them into browserSync.stream
      // this injects the css into the page
      gulp.src('*.css')
        .pipe(browserSync.stream());
  });
  gulp.watch("*.js", ['bs-reload']);
  gulp.watch("./views/*.pug", ['bs-reload']);
  gulp.watch("*.html", ['bs-reload']);
});
