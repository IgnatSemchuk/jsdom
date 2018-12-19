const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('default', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch('*.html', function (done) {
      browserSync.reload();
      done();
    });
});
