const gulp          = require('gulp');
const sass          = require('gulp-sass');
const browserSync   = require('browser-sync').create();
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const cleancss      = require('gulp-clean-css');
const rename        = require('gulp-rename');
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const clean         = require('gulp-clean');
const runSequence   = require('run-sequence');
const notify        = require("gulp-notify");

const srcDir = '/src'
const distDir = '/dist';

gulp.task('reloadBrowser', function (cb) {
  browserSync.reload();
  cb();
});

gulp.task('styles', () => {
    gulp.src(`${srcDir}**/*.scss`)
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest(`${distDir}/css`))
});

gulp.task('images', () =>
    gulp.src(`${srcDir}/img/**/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${distDir}/img`))
);

gulp.task('fonts', () =>
    gulp.src(`${srcDir}/fonts/**/*`)
        .pipe(gulp.dest(`${distDir}/fonts`))
);

gulp.task('html', () =>
    gulp.src(`${srcDir}/*.html`)
        .pipe(gulp.dest(distDir))
);

gulp.task('cleanDist', () => 
    gulp.src(distDir)
        .pipe(clean({force: true}))
);

gulp.task('js', () => {
    gulp.src(`${srcDir}/**/*.js`)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(`${distDir}/js`))
});

gulp.task('build', function(cb){
    runSequence('cleanDist', ['images', 'js', 'styles', 'fonts', 'html'], cb);
});

gulp.task('watch', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: distDir
        },
        notify: false
    });
    gulp.watch(`${srcDir}/*.html`, ['html', 'reloadBrowser']);
    gulp.watch(`${srcDir}/scss/**/*.scss`, ['styles', 'reloadBrowser']);
    gulp.watch(['libs/**/*.js', `${srcDir}/js/common.js`], ['js', 'reloadBrowser']);
    gulp.watch(`${srcDir}/img/**/*`), ['images', 'reloadBrowser'];
    gulp.watch(`${srcDir}/fonts/**/*`), ['fonts', 'reloadBrowser'];
});

gulp.task('default', ['watch']);