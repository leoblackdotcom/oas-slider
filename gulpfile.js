const gulp = require('gulp');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

var cssDest = './dist/css/';

gulp.task('stylus', function(){
	return gulp.src('./src/styles/index.styl')
		.pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss([
      require('autoprefixer'), 
      require('postcss-combine-media-query'), 
      require('postcss-combine-duplicated-selectors')
    ]))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream())
});

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/**/*.pug')
    .pipe(pug({
      pretty: true // false = minify
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
});

var jsFiles = 'src/scripts/**/*.js',
    jsDest = 'dist/js/';

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(browserSync.stream())
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('watch', function(){
	gulp.watch('src/styles/**/*.styl', gulp.series('stylus'));
  gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('src/scripts/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('pug','stylus','js','browser-sync','watch'));