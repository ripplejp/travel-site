var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', () =>{
    browserSync.init({
        notify: false,
        server: "app"
    });
    gulp.watch('./app/index.html', () =>{
        browserSync.reload();
    }),
    gulp.watch('./app/assets/styles/**/*.css',  gulp.series('cssInject'))
});

gulp.task('cssInject', gulp.series('styles' , () =>{
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}));
