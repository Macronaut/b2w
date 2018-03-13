const browserSync = require('browser-sync').create(),
      cssbeautify = require('gulp-cssbeautify'),
      runSequence = require('run-sequence'),
      inject = require('gulp-inject'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      gulp = require('gulp');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('inject',function(){
  gulp.src('./dist/**/*.html')
  .pipe(inject(gulp.src(['./dist/assets/**/*.{js,css}'], {read: false}), {relative: true, removeTags:true} ))
  .pipe(gulp.dest('./dist'));
})

gulp.task('sass', function() {
  return gulp.src("./assets/sass/**/*.scss")
  .pipe(concat('bundle.scss'))
  .pipe(sass())
  .pipe(cssbeautify())
  .pipe(gulp.dest("./dist/assets/css"))
});


gulp.task('js', function(){
  return gulp.src('./assets/js/**/*.js')
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./dist/assets/js'));
})

gulp.task('html',function(){
  return gulp.src('./index.html')
  .pipe(gulp.dest('./dist'))
})

gulp.task('reload',function(){
  browserSync.reload();
})

gulp.task('watch',function(){
  gulp.watch('./assets/sass/*.scss', function(){ runSequence('sass','inject','reload') });
  gulp.watch('./assets/js/*.js', function(){ runSequence('js','inject','reload') });
  gulp.watch('./index.html', function(){ runSequence('html','inject','reload') });
})

gulp.task('default', function(){
  runSequence('sass','js','html','inject','browser-sync','watch')
});
