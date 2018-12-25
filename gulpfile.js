const
  gulp         = require('gulp'),
  sass         = require('gulp-sass'),
  concat       = require('gulp-concat'),
  nodemon      = require('gulp-nodemon'),
  autoprefixer = require('gulp-autoprefixer'),
  del          = require('del'),
  browserSync  = require('browser-sync').create(),
  config       = require('./config/browser')
;

// CLEAN
gulp.task('clean', function() {
  return del(config.paths.dist_dir);
});

// VIEWS
gulp.task('dev:views', function() {
  return gulp
    .src(config.paths.views.src)
    //Process views
    .pipe(gulp.dest(config.paths.views.dist))
})
gulp.task('watch:views', function(done) {
  gulp.watch(config.paths.views.src, gulp.series('dev:views'));
  done();
})

//STYLES
gulp.task('dev:styles', function() {
  return gulp
    .src(config.paths.styles.src)
    .pipe(sass({ includePaths: './bower_components/foundation-sites/scss' }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9', 'android >= 4.4', 'ios >= 7']
    }))
    //Process styles
    .pipe(gulp.dest(config.paths.styles.dist))
})
gulp.task('watch:styles', function(done) {
  gulp.watch(config.paths.styles.src, gulp.series('dev:styles'));
  done();
})

//SCRIPTS
gulp.task('dev:scripts', function() {
  return gulp
    .src(config.paths.scripts.src)
    .pipe(concat('katalist.min.js'))
    //Process styles
    .pipe(gulp.dest('./dist/public/scripts'))
})
gulp.task('watch:scripts', function(done) {
  gulp.watch('./src/scripts/**/*.js', gulp.series('dev:scripts'));
  done();
})

//SERVER
gulp.task('server', function (cb) {
  var called = false;
  return nodemon(config.plugins.nodemon)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
});

// BROWSER-SYNC

function browserSyncInit(done) {
  browserSync.init(config.plugins.browserSync)
  done();
}
gulp.task('browser-sync', browserSyncInit);

//DEV
gulp.task('dev', gulp.parallel('dev:styles', 'dev:scripts', 'dev:views'));

//WATCH
gulp.task('watch', gulp.parallel('watch:styles', 'watch:scripts', 'watch:views'));

//DEFAULT
gulp.task('default', gulp.series('clean', 'dev', 'server', gulp.parallel('watch','browser-sync')));

