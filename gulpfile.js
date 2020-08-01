var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Compile sass into css & auto inject into browsers
gulp.task('sass', function() {
	return gulp.src('app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() {
	browserSync.init({
		server: './app/'
	});

	gulp.watch('app/scss/*.scss', gulp.series('sass'));
	gulp.watch('app/*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
