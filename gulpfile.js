var gulp       = require('gulp'), // Подключаем Gulp
		sass       = require('gulp-sass'), //Подключаем Sass пакет,
		browserSync  = require('browser-sync'); // Подключаем Browser Sync

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: '' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('sass/main.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('css/main.css', browserSync.reload);
});
