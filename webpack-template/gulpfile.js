/**
 * Created by sloong on 2016/6/14.
 */
'use strict';

let gulp = require('gulp');

let webpack = require('webpack');

//用于gulp传递参数
//轻量级的命令行参数解析引擎
let minimist = require('minimist');

let gutil = require('gulp-util');
let imagemin = require('gulp-imagemin');


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

//测试环境上传地址
let remoteServer = {
    host: '121.196.208.98',
    remotePath: '/B2C/Tomcat8.0/webapps/dist',
    user: 'root',
    pass: 'root'
};


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

gulp.task('test',['pack'], function () {
    gulp.src('dist/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('dist/images'));
});

//default task
gulp.task('default', ['test']);


//deploy assets to remote server
gulp.task('deploy', function () {
    let sftp = require('gulp-sftp');
    //设置都是传到一样的环境
    let _conf = options.env === 'production' ? remoteServer : remoteServer;
    return gulp.src(assets + '/**')
        .pipe(sftp(_conf))
});
