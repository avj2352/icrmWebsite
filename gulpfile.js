/*npm install -g gulp - Install Gulp globally*/ 
/*npm install --save-dev gulp gulp-util --> This installs the gulp and gulp-util plugins inside your root folder*/
/*npm install --save-dev gulp-concat --> This is useful. It installs the gulp-concat which will merge your javascript files*/
/*npm install --save-dev gulp-uglify --> This will minify your javascript files.*/
/*npm install --save-dev gulp-less --> Plugin for processing less files*/
/*npm install --save-dev gulp-minify-css --> Plugin for minify CSS files*/

/*Create a variable import all the plugins into the gulpfile.js*/
var gulp = require('gulp'),
     gutil = require('gulp-util'),
     uglify = require('gulp-uglify'),
     concat = require('gulp-concat'),
     less = require('gulp-less'),
     minifyCSS = require('gulp-minify-css');


/*Create a variable array holding all the source file paths*/
var jsSources = [
    'components/js/jquery-2.1.3.min.js',
    'components/js/bootstrap.min.js',
    'components/js/jquery.backstretch.min.js'
    ];

var lessSources = [
          'components/less/variable.less',
          'components/less/ebook-style.less'
];

var cssSources = [
'components/css/bootstrap.css',
'components/css/prettyPhoto.css',
'components/css/font-awesome.css',
'components/css/social-icons.css',
'components/css/ebook-style.css'
];


/*Task0 - Process a less file*/
gulp.task('less', function(){
     gulp.src(lessSources)
     .pipe(less())
     .on('error', gutil.log)
     .pipe(gulp.dest('components/css'))
     });/*end of the process task*/


/*Task2 - Create a compile task to compile, concat and minify all the js in the components folder*/
gulp.task('compile', function(){ /*Name of the task is 'compile' */
     gulp.src(jsSources)
     .pipe(uglify()) /*uglify can also take inputs - www.gulpjs.com*/
     .pipe(concat('lib.js')) /*concat takes a parameter - what is the name of the concatinated file*/
     .pipe(gulp.dest('scripts')) /*Store the destination inside the js folder*/
     });/*end of the task compile*/

/*Task2.5 - Create a process task to concat and minify all the css into the css folder*/
gulp.task('process', function(){
     gulp.src(cssSources)
     .pipe(minifyCSS({keepBreaks:true}))
     .pipe(concat('styles.css'))
     .pipe(gulp.dest('css'))
     });/*end of the process task function*/


//Task3 - Gulp task to watch for any changes
gulp.task('watch', function(){
     /*This below function is used for livereload*/
     // var server = livereload();
     gulp.watch(jsSources, ['compile']);
     gulp.watch(lessSources, ['less']);
     gulp.watch(cssSources, ['process']);
});/*end of the task watch*/

//Task0 - Creating a default task - The default task is going to run automatically, you dont need to name it explicitly
gulp.task('default', ['less','compile', 'process', 'watch']); /*end of the task default*/
/*The default task will first run the compile task and then the watch task*/
