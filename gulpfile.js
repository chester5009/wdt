var gulp=require('gulp'),
sass=require('gulp-sass'),
pug=require('gulp-pug'),
browserSync=require('browser-sync'),
concat=require('gulp-concat'),
uglify=require('gulp-uglifyjs'),
cssnano=require('gulp-cssnano'),
rename=require('gulp-rename');
del=require('del');


gulp.task('sass',function() { // препроцессор sass
	return gulp.src('src/styles/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('pug',function() {
	return gulp.src('src/templates/**/*.pug')
	.pipe(pug({pretty:true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}))
})

gulp.task('img',function() {
	return gulp.src('src/img/**/*.*')
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.reload({stream:true}))
})

gulp.task('scripts',function(){
	return gulp.src([
		'src/js/*.js',
		])
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('css-libs',['sass'],function () {
	return gulp.src('src/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('src/css'));
})

gulp.task('clean',function () {
	return del.sync('dist');
});

gulp.task('watch',['browser-sync','img','scripts','build','pug'],function() {//слежение за изменением файлов
	//gulp.watch('src/sass/**/*.scss',['sass'])
	//gulp.watch('src/**/*.pug',['pug'])
	//gulp.watch('src/*.pug',browserSync.reload)
	//gulp.watch('src/js/**/*.js',browserSync.reload)
	gulp.watch('src/**/*.*',['build',browserSync.reload])
})

gulp.task('browser-sync',function() {
	browserSync({
		server:{
			baseDir:'dist'
		},
		notify:false
	});
})

gulp.task('build',['clean','pug', 'sass','scripts'],function () {});

