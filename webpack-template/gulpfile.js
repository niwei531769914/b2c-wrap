/**
 * Created by sloong on 2016/6/14.
 */
'use strict';

let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let imagemin = require('gulp-imagemin');
let webpack = require('webpack');

let connect = require('gulp-connect');
let proxy = require('http-proxy-middleware');

//用于gulp传递参数
//轻量级的命令行参数解析引擎
let minimist = require('minimist');

let gutil = require('gulp-util');

// Load plugins
let $ = require('gulp-load-plugins')();


let src = process.cwd() + '/src';
let assets = process.cwd() + '/dist';

//根据命令行参数来判断流程
let knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'production'}
};


//获取命令行参数
let options = minimist(process.argv.slice(2), knownOptions);

let webpackConf = require('./webpack.config');
let webpackConfDev = require('./webpack-dev.config');

//check code
gulp.task('hint', function () {
    //是用来检测javascript的语法错误的
    let jshint = require('gulp-jshint');
    let stylish = require('jshint-stylish');

    return gulp.src([
        '!' + src + '/scripts/lib/**/*.js',
        src + '/scripts/**/*.js'
    ])
});

// clean asserts
gulp.task('clean', ['hint'], function () {
    let clean = require('gulp-clean');
    return gulp.src(assets, {read: true}).pipe(clean())
});

//run webpack pack
gulp.task('pack', ['clean'], function (done) {
    let _conf = options.env === 'production' ? webpackConf : webpackConfDev;
    webpack(_conf, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
        done()
    });
});

//css 兼容
// gulp.task('test',['pack'], function() {
//     gulp.src('dist/**/*.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', 'Android >= 4.0'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('dist'))
//     }
// );


//default task
gulp.task('default', ['pack']);
