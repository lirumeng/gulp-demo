const {src, dest, series, watch} = require('gulp');
const plugins = require('gulp-load-plugins')();
const del = require('del');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const htmlmin = require('gulp-htmlmin');


//压缩，混淆 js
function html(cb) {
  // console.log('this is js scripts');
  src('./index.html')
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(dest('./dist'))
      .pipe(reload({stream: true}))
  cb();
}

//对scss/less编译，压缩，输出css
function css(cb) {
  // console.log('this is css scripts');
  src('./src/css/*.scss')
      .pipe(plugins.sass({
        outputStyle: "compressed"
      }))
      .pipe(plugins.autoprefixer({
        cascade: false,
        remove: false,
      }))
      .pipe(dest('./dist/css'))
      .pipe(reload({stream: true}))
  cb();
}

//压缩，混淆 js
function js(cb) {
  // console.log('this is js scripts');
  src('./src/js/*.js')
      .pipe(plugins.uglify())
      .pipe(dest('./dist/js'))
      .pipe(reload({stream: true}))
  cb();
}

function watcher() {
  watch('./src/js/*.js', js)
  watch('./src/css/*.scss', css)
  watch('index.html', html)
}

function clean(cb) {
  del('./dist')
  cb();
}

function serve(cb) {
  browserSync.init({
    server: {
      basedir: './'
    }
  })
  cb();
}

exports.default = series([
  clean,
  js,
  css,
  html,
  serve,
  watcher
])

