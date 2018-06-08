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
    spritesmith = require('gulp.spritesmith'),
    mmq = require('gulp-merge-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    htmlhint = require("gulp-htmlhint"),
    csslint = require('gulp-csslint'),
    scsslint = require('gulp-scss-lint'),
    penthouse = require('penthouse'),
    inject = require('gulp-inject-string'),
    cleanCSS = require('gulp-clean-css');


var path = {
	src: {
		root: 'src',
		styles: 'src/assets/css/*.scss',
		html: 'src/*.html',
		htmlPartials: 'src/includes/',
		htmlIncludes: 'src/includes/*.html',
		js: 'src/assets/js/*.js',
		fonts: 'src/assets/fonts/*',
		img: 'src/assets/images/**/*',
		spriteSource: 'src/assets/sprite-images/*.png',
		spriteRetinaSource: 'src/assets/sprite-retina',
		spriteCss: 'src/assets/css/components',
		spriteImg: 'dev/assets/images'
	},
	dev: {
		styles: 'dev/assets/css', 	
  	html: 'dev',
  	js: 'dev/assets/js',
  	jsLibs: 'dev/assets/js/libs',
  	fonts: 'dev/assets/fonts',
  	img: 'dev/assets/images',
  	spriteImg: 'dev/assets/images'
	},
	dist: {
		styles: 'dist/assets/css',
		html: 'dist',
		js: 'dist/assets/js',
		jsLibs: 'dist/assets/js/libs',
		fonts: 'dist/assets/fonts',
		img: 'dist/assets/images',
		spriteImg: 'dist/assets/images'
	}
  
};

gulp.task('sprite', function () {
  var spriteData = gulp.src(path.src.spriteSource).pipe(spritesmith({
    imgName: '../images/sprite/sprite.png',
    cssName: '_sprite.scss',
    padding: 4
  }));
  spriteData.css.pipe(gulp.dest(path.src.spriteCss));
  spriteData.img.pipe(gulp.dest(path.dev.spriteImg));
});

gulp.task('dist-sprite', function () {
  var spriteData = gulp.src(path.src.spriteSource).pipe(spritesmith({
    imgName: '../images/sprite/sprite.png',
    cssName: '_sprite.scss',
    padding: 4
  }));
  spriteData.css.pipe(gulp.dest(path.src.spriteCss));
  spriteData.img.pipe(gulp.dest(path.dist.spriteImg));
});

gulp.task('rsprite', function () {
  var spriteData = gulp.src(path.src.spriteRetinaSource+'/*.png').pipe(spritesmith({
  	retinaSrcFilter: [path.src.spriteRetinaSource+'/*@2x.png'],
    imgName: '../images/sprite/sprite-retina.png',
    retinaImgName: '../images/sprite/sprite-retina@2x.png',
    cssName: '_sprite-retina.scss',
    padding: 4
  }));
  spriteData.css.pipe(gulp.dest(path.src.spriteCss));
  spriteData.img.pipe(gulp.dest(path.dev.spriteImg));
});

gulp.task('dist-rsprite', function () {
  var spriteData = gulp.src(path.src.spriteRetinaSource+'/*.png').pipe(spritesmith({
  	retinaSrcFilter: [path.src.spriteRetinaSource+'/*@2x.png'],
    imgName: '../images/sprite/sprite-retina.png',
    retinaImgName: '../images/sprite/sprite-retina@2x.png',
    cssName: '_sprite-retina.scss',
    padding: 4
  }));
  spriteData.css.pipe(gulp.dest(path.src.spriteCss));
  spriteData.img.pipe(gulp.dest(path.dist.spriteImg));
});

gulp.task('images', function(){
	return gulp.src(path.src.img)
				 .pipe(gulp.dest(path.dev.img))
				 .pipe(browserSync.stream());
})

gulp.task('dist-images', function(){
	return gulp.src(path.src.img)
		.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
				.pipe(gulp.dest(path.dist.img));
})

gulp.task('sass', function() {
	return gulp.src(path.src.styles)
				 .pipe(sourcemaps.init())
				 .pipe(sass().on('error', sass.logError))
				 .pipe(sourcemaps.write('../css'))
				 .pipe(gulp.dest(path.dev.styles))
				 .pipe(browserSync.stream());
})

gulp.task('dist-sass', function() {
	return gulp.src(path.src.styles)					
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(mmq({ log: true }))
	.pipe(cleanCSS({keepSpecialComments:0}))
	.pipe(gulp.dest(path.dist.styles));
})

// example -> src/bower_components/slick-carousel/slick/slick.min.js
var bowerList = []


gulp.task("bower", function(){
  gulp.src(bowerList)
  .pipe(gulp.dest(path.dev.jsLibs));
});

gulp.task("dist-bower", function(){
  gulp.src(bowerList)
  .pipe(gulp.dest(path.dist.jsLibs));
});

gulp.task('html', function(){
  return gulp.src(path.src.html)
          .pipe(fileinclude({
            prefix: '@@',
            basepath: path.src.htmlPartials
          }))
         .pipe(useref({
          noconcat: true
         }))
         .pipe(gulp.dest(path.dev.html))
         .pipe(browserSync.stream());
})

gulp.task('validate-html', function(){
	return gulp.src(path.dev.html+'/*.html')
	.pipe(htmlhint())
	.pipe(htmlhint.reporter())
})

gulp.task('validate-css', function() {
  gulp.src(path.dev.styles+'/*.css')
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task('validate-scss', function() {
  return gulp.src(path.src.root+'/assets/css/**/*.scss')
  .pipe(scsslint());
});

gulp.task('dist-html', function(){
	return gulp.src(path.src.html)
					.pipe(fileinclude({
			      prefix: '@@',
			      basepath: path.src.htmlPartials
			    }))
			    .pipe(useref())
			    .pipe(gulpIf('*.js', uglify()))
				  .pipe(gulp.dest(path.dist.html));
})

var pages = [
  {
    urlSource: 'dist/index.html',
    css: 'dist/assets/css/style.css',
    url: 'dist/index.html'
  }
];
// add <!-- Critical CSS -->
gulp.task('penthouse', function () {

  pages.forEach( function(element, index) {

    penthouse({
      url: element.urlSource, // страница вашего сайта
      css: element.css, // файл со стилями
      width: 1280,
      height: 500
    }, function (err, criticalCss) {
       var cleanCss = new cleanCSS().minify(criticalCss);
       gulp.src(element.url)
      .pipe(inject.after('<!-- Critical CSS -->', '\n<style>\n' + cleanCss.styles + '\n</style>'))
      .pipe(gulp.dest('dist'))
    });

  });

});

gulp.task('js', function(){
	return gulp.src(path.src.js)
				 .pipe(gulp.dest(path.dev.js))
				 .pipe(browserSync.stream());
})

gulp.task('fonts', function(){
	return gulp.src(path.src.fonts)
				 .pipe(gulp.dest(path.dev.fonts));
})

gulp.task('modals', function(){
	return gulp.src(path.src.root+'/modals/*')
				 .pipe(gulp.dest(path.dev.html+'/modals'));
})
gulp.task('dist-modals', function(){
	return gulp.src(path.src.root+'/modals/*')
				 .pipe(gulp.dest(path.dist.html+'/modals'));
})

gulp.task('dist-fonts', function(){
	return gulp.src(path.src.fonts)
				 .pipe(gulp.dest(path.dist.fonts));
})

gulp.task('favicon', function(){
	return gulp.src(path.src.root+'favicon.ico')
				 .pipe(gulp.dest(path.dev.html));
})

gulp.task('dist-favicon', function(){
	return gulp.src(path.src.root+'favicon.ico')
				 .pipe(gulp.dest(path.dist.html));
})

gulp.task('clean', function(cb) {
  return gulp.src(path.dev.html, {read: false})
		.pipe(clean());
});
gulp.task('dist-clean', function(cb) {
  return gulp.src(path.dist.html, {read: false})
		.pipe(clean());
});

gulp.task('dist-zip', () => {
	return gulp.src(path.dist.html+'/**')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
	browserSync.init({
	    server: {
	        baseDir: path.dev.html
	    }
	});
  gulp.watch(path.src.img, ['images']);
  gulp.watch(path.src.spriteSource, ['sprite']);
  gulp.watch(path.src.fonts, ['fonts']);
  gulp.watch(path.src.root+'/assets/css/**/*.scss', ['sass']);
  gulp.watch(path.src.html, ['html']);
  gulp.watch(path.src.htmlIncludes, ['html']);
  gulp.watch(path.src.js, ['js']);

});

// production 

gulp.task('default', ['watch']);
gulp.task('dev', ['sass', 'images', 'sprite', 'html', 'bower', 'fonts', 'js']);
gulp.task('dist', ['dist-sass', 'dist-sprite', 'dist-images', 'dist-html', 'dist-bower', 'dist-fonts']);
