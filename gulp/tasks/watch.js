var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', (done) =>{
    browserSync.init({
        notify: false,
        server: "app"
    });
    gulp.watch('./app/index.html', (done) =>{
        browserSync.reload();
    }),
    gulp.watch('./app/assets/styles/**/*.css',  gulp.series('cssInject'))
});

gulp.task('cssInject', gulp.series('styles' , (done) =>{
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));
