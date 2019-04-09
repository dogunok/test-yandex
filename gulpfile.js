const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    less = require('gulp-less'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

    const config = {
        server: {
            baseDir: "./build"
        },
        tunnel: true,
        host: 'localhost',
        port: 9010,
        logPrefix: "Frontend_Devil"
    };

    const path = {
        build: {
            js: 'build',
            css: 'build',
            html: 'build/**/*.html'
        },
        src:{
            js: 'src/**/*.js',
            less: 'src/**/*.less',
        }

      }
      gulp.task('html', function () {
        gulp.src(path.build.html) 
            .pipe(reload({stream: true}));
    });

      gulp.task('less', () => {
        return gulp.src(path.src.less)
          .pipe(less())
          .pipe(autoprefixer({ browsers: ['ie 10'] }))
          .pipe(gulp.dest(path.build.css))
          .pipe(reload({stream: true}));
      })
      
      
      gulp.task('script', () => {
        return gulp.src(path.src.js)
          .pipe(babel())
          .pipe(gulp.dest(path.build.js))
          .pipe(reload({stream: true}));
      })
      
      gulp.task('webserver', function () {
        browserSync(config);
        });

      gulp.task('watchAll', () => {
        gulp.watch(path.src.less, gulp.series('less'));
        gulp.watch(path.src.js, gulp.series('script'));
        gulp.watch(path.build.html, gulp.series('html'));
      })
      
      gulp.task('default', gulp.parallel(['watchAll', 'webserver']))
      