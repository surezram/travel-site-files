var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

gulp.task('default', function(){
	console.log('Hello');
});
gulp.task('html',function(){
	console.log('perform html taske');
});
gulp.task('styles',function(){
	return gulp.src('./app/assets/styles/style.css')
		.pipe(postcss([cssImport,cssvars,nested,autoprefixer]))
		.pipe(gulp.dest('./app/tmp/styles'));
});
gulp.task('watch', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
	watch('./app/index.html', function(){
		browserSync.reload();
	});
	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});
});

/**
 * @param Task name
 * @param dependancy task, to be executed befor perform the task
 * 
 */ 

gulp.task('cssInject',['styles'], function(){
return gulp.src('./app/tmp/styles/style.css')
	.pipe(browserSync.stream());
});