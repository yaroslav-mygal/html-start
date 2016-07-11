'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync').create(),
		sourcemaps = require('gulp-sourcemaps'),
		uglifycss = require('gulp-uglifycss'),
		clean = require('gulp-clean'),
		cssmin = require('gulp-cssmin'),
		imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    zip = require('gulp-zip'),
    fileinclude = require('gulp-file-include'),
    spritesmith = require('gulp.spritesmith');


var paths = {
  scripts: 'js',
  styles: 'css',
  images: 'images'
};

gulp.task("bower", function(){

     gulp.src([
        'src/bower_components/jquery/dist/jquery.min.js',
        'src/bower_components/matchHeight/dist/jquery.matchHeight-min.js',
        'src/bower_components/fancybox/source/jquery.fancybox.pack.js',
        'src/bower_components/paraxify/paraxify.min.js',
        'src/bower_components/owl.carousel/dist/owl.carousel.min.js',
        'src/bower_components/tabs/tabs.js'
        ])
    .pipe(gulp.dest('dist/assets/js/libs'));

});

gulp.task('sass', function(){
	return gulp.src('src/assets/css/*.scss')
				 .pipe(sourcemaps.init())
				 .pipe(sass().on('error', sass.logError))
				 .pipe(sourcemaps.write('../css'))
				 .pipe(gulp.dest('dist/assets/css'))
				 .pipe(browserSync.stream());
})

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/assets/sprite-images/*.png').pipe(spritesmith({
    imgName: '../images/sprite/sprite.png',
    cssName: '_sprite.scss',
    padding: 4
  }));
  spriteData.css.pipe(gulp.dest('src/assets/css/components'));
  spriteData.img.pipe(gulp.dest('src/assets/images'));
});

gulp.task('html', function(){
	return gulp.src('src/*.html')
					.pipe(fileinclude({
			      prefix: '@@',
			      basepath: 'src/includes/'
			    }))
				 .pipe(gulp.dest('dist/'))
				 .pipe(browserSync.stream());
})

gulp.task('js', function(){
	return gulp.src('src/assets/js/*.js')
				 .pipe(gulp.dest('dist/assets/js'))
				 .pipe(browserSync.stream());
})

gulp.task('font', function(){
	return gulp.src('src/assets/fonts/*')
				 .pipe(gulp.dest('dist/assets/fonts'));
})

gulp.task('images', function(){
	return gulp.src('src/assets/images/**/*')
				 .pipe(gulp.dest('dist/assets/images'))
				 .pipe(browserSync.stream());
})

gulp.task('watch', function() {
	browserSync.init({
	    server: {
	        baseDir: "dist"
	    }
	});
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('src/assets/sprite-images/*', ['sprite']);
  gulp.watch('src/assets/fonts/*', ['font']);
  gulp.watch('src/assets/css/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/assets/js/*.js', ['js']);

});

// production 

gulp.task('clean', function(cb) {
  return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('dist-sass', function(){
	return gulp.src('src/assets/css/*.scss')
					.pipe(uglifycss())
				 .pipe(sass().on('error', sass.logError))
				 .pipe(gulp.dest('dist/assets/css'));
})
gulp.task('dist-sass', function(){
	return gulp.src('src/assets/css/*.scss')
				 .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
				 .pipe(gulp.dest('dist/assets/css'));
})

gulp.task('dist-js', function(){
	return gulp.src('src/assets/js/*.js')
				 .pipe(gulp.dest('dist/assets/js'));
})

gulp.task('dist-images', function(){
	return gulp.src('src/assets/images/**/*')
		.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
				.pipe(gulp.dest('dist/assets/images'));
})

gulp.task('dist-zip', () => {
	return gulp.src('dist/**')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['watch'])
gulp.task('dist', ['clean', 'dist-sass','dist-images', 'html', 'bower', 'font','dist-js'])