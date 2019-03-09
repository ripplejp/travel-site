var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {
    browserSync.init({
        notify: false,
        server: "docs",
    });
});

gulp.task('deleteDistFolder', gulp.series('icons',  () => {
    return del('./docs');
}));

gulp.task('copyGeneralFiles', gulp.series('deleteDistFolder', () => {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ]

    return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
}));

gulp.task('optimizeImages', gulp.series('deleteDistFolder', () => {
    return gulp.src(['./app/assets/images/**/*','!./app/assets/images/icons','!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
        progressive: true,
        interlaced : true,
        multipass : true
    }))
    .pipe(gulp.dest('./docs/assets/images'));

}));


gulp.task('usemin', () => {
    return gulp.src("./app/index.html")
    .pipe(usemin({
        css:[function(){return rev()}, function(){return cssnano()}],
        js:[function(){return rev()}, function(){return uglify()}]
    }))
    .pipe(gulp.dest('./docs'))
}, gulp.parallel('styles','scripts')
);

gulp.task('build', gulp.series(
    'deleteDistFolder','copyGeneralFiles','optimizeImages','usemin'));
