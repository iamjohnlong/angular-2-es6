const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
// const uglify = require('gulp-uglify');
// const del = require('del');
const browserSyncApp = require('browser-sync').create();

function compile(i, o, watch) {
  const bundler = watchify(browserify(i, { debug: true })
    .transform(babel,
      { presets: ['es2015'] }
    ));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(o))
      .pipe(buffer())
      // .pipe(uglify())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/javascript'))
      .on('end', browserSyncApp.reload);
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  return rebundle();
}

gulp.task('watch', function() {
  return compile('./app/index.js', 'bundle.js', true);
});

const html = function() {
  return gulp.src('app/index.html').pipe(gulp.dest('./build'));
};

gulp.task('html', html);

gulp.task('server', function() {
  browserSyncApp.init({
    server: {
      baseDir: './build'
    }
  });
  gulp.watch('app/index.html', ['html']);
});

gulp.task('default', ['server', 'watch', 'html']);