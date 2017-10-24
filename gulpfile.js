'use strict';

var gulp          = require('gulp'),

		browserSync		= require('browser-sync'),

		sass          = require('gulp-sass'),
		rename				= require('gulp-rename'), 
		postcss				= require('gulp-postcss'), 
		autoprefixer	= require('autoprefixer'),
		mqpacker			= require('css-mqpacker'),
		cssnano				= require('gulp-cssnano'), 
		plumber			 = require('gulp-plumber'),

		concat				= require('gulp-concat'),
		uglify				= require('gulp-uglifyjs'),

		imagemin			= require('gulp-imagemin'),
		pngquant			= require('imagemin-pngquant'),

		del						= require('del'),
		run						= require('run-sequence'),
		cache					= require('gulp-cache');

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'src' 
		},
		notify: false 
	});
});

gulp.task('style', function(){ 
	return gulp.src('src/sass/main.scss') 
		.pipe(plumber())
		.pipe(sass()) 
		.pipe(postcss([
			autoprefixer({browsers: [
				'last 15 versions',
				'> 1%',
				'ie 8'
			]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(cssnano()) 
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css')) 
		.pipe(browserSync.reload({stream: true})); 
});

gulp.task('js', function() {
	var commonJsMin = gulp.src('src/js/common.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/js'));

	var scriptBookingFormJsMin = gulp.src('src/js/scriptBookingForm.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/js'));
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') 
		.pipe(cache(imagemin([  
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			/* imageminJpegRecompress({
				loops: 5,
				min: 65,
				max: 70,
				quality:'medium'
			}), */
			imagemin.svgo(),
			imagemin.optipng({optimizationLevel: 3}),
			pngquant({quality: '65-70', speed: 5})
		],{
			verbose: true		
		})))
		.pipe(gulp.dest('build/img')); 
});

gulp.task('clean', function() {
	return del.sync('build'); 
});

gulp.task('copy', function() {

	var buildHtml = gulp.src('src/*.html') 
	.pipe(gulp.dest('build'));

	var buildCss = gulp.src([ 
		'src/css/main.min.css'
		])
	.pipe(gulp.dest('build/css'));

	var buildFonts = gulp.src('src/fonts/**/*') 
	.pipe(gulp.dest('build/fonts'));

	var buildNormalize = gulp.src('src/css/normalize.min.css') 
	.pipe(gulp.dest('build/css'));

	var buildJs = gulp.src('src/js/**/*') 
	.pipe(gulp.dest('build/js'));
});

gulp.task('watch', ['style', 'browser-sync'], function() {
	gulp.watch('src/sass/**/*.scss', ['style']); 
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch(['src/js/**/*.js'], browserSync.reload);
	//gulp.watch(['src/libs/**/*.js', 'src/js/common.js'], ['js']);
});

gulp.task('build', function(fn) {
	run(
		'clean',
		'style',
		'js',
		'img',
		'copy',
		fn
	);
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})


