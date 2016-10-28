var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
        files: ["**/*.*"],
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
      gulp.src('*.css')
        .pipe(browserSync.stream());
  });
  gulp.watch("*.js", ['bs-reload']);
  gulp.watch("./views/*.pug", ['bs-reload']);
  gulp.watch("*.html", ['bs-reload']);
});
