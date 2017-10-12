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

		//uglify				= require('gulp-uglifyjs'),

		imagemin			= require('gulp-imagemin'),
		pngquant			= require('imagemin-pngquant'),

		del						= require('del'),
		run						= require('run-sequence'),
		cache					= require('gulp-cache');

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'in' 
		},
		notify: false 
	});
});

gulp.task('style', function(){ 
	return gulp.src('in/sass/main.scss') 
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
		.pipe(gulp.dest('in/css')) 
		.pipe(browserSync.reload({stream: true})); 
});

//gulp.task('js', function() {
//	
//}); 

gulp.task('img', function() {
	return gulp.src('in/img/**/*') 
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
		.pipe(gulp.dest('out/img')); 
});

gulp.task('clean', function() {
	return del.sync('out'); 
});

gulp.task('copy', function() {

	var buildHtml = gulp.src('in/*.html') 
	.pipe(gulp.dest('out'));

	var buildCss = gulp.src([ 
		'in/css/main.min.css'
		])
	.pipe(gulp.dest('out/css'));

	var buildFonts = gulp.src('in/fonts/**/*') 
	.pipe(gulp.dest('out/fonts'));

	var buildNormalize = gulp.src('in/css/normalize.min.css') 
	.pipe(gulp.dest('out/css'));

	//var buildJs = gulp.src('in/js/libs.min.js') 
	//.pipe(gulp.dest('out/js'));
});

gulp.task('watch', ['style', 'browser-sync'], function() {
	gulp.watch('in/sass/**/*.scss', ['style']); 
	gulp.watch('in/**/*.html', browserSync.reload);
	//gulp.watch(['in/libs/**/*.js', 'in/js/common.js'], ['js']);
});

gulp.task('build', function(fn) {
	run(
		'clean',
		'style',
		//'js',
		'img',
		'copy',
		fn
	);
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})


