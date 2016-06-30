var gulp = require('gulp'),
    del = require('del');

var localConfig = {
  src: ['./src/assets/**/*','./src/static/*.html'],
  base: 'src',
  dest: './build',
  cleanSrc: ['./build/assets','./build/static']
};

gulp.task('clean:assets', function () {
  return del(localConfig.cleanSrc);
});

gulp.task('assets', ['clean:assets'], function() {
  return gulp.src(localConfig.src, { base: localConfig.base })
    .pipe(gulp.dest(localConfig.dest));
});
