/*
 * @Author:niwei
 * @Date: 2017-06-14
 * @根据网上题材改编而来
 */
'use strict';

let webpack = require("webpack");
let path = require("path");
let glob = require('glob');

//路径定义
let srcDir = path.resolve(process.cwd(), 'src');
let distDir = path.resolve(process.cwd(), 'dist');
let nodeModPath = path.resolve(__dirname, './node_modules');
let pathMap = require('./src/pathmap.json');
let publicPath = '/dist/';

//插件定义
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let autoprefixer = require('autoprefixer');

//入口文件定义
let entries = function () {
    let jsDir = path.resolve(srcDir, 'scripts');
    let entryFiles = glob.sync(jsDir + '/*.{js,jsx}');
    let map = {};

    for (let i = 0; i < entryFiles.length; i++) {
        let filePath = entryFiles[i];
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
};

//html_webpack_plugins 定义
let html_plugins = function () {
    let entryHtml = glob.sync(srcDir + '/*.html');
    let r = [];
    let entriesFiles = entries();
    for (let i = 0; i < entryHtml.length; i++) {
        let filePath = entryHtml[i];
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        let conf = {
            template: 'html!' + filePath,
            filename: filename + '.html'
        };
        //如果和入口js文件同名
        if (filename in entriesFiles) {
            conf.inject = 'body';
            conf.chunks = ['common', filename];
        }
        //如果页面中不存在引入js
        else {
            conf.inject = "";
            conf.chunks = [];
        }
        //跨页面引用，如pageA,pageB 共同引用了common-a-b.js，那么可以在这单独处理
        //if(pageA|pageB.test(filename)) conf.chunks.splice(1,0,'common-a-b')
        r.push(new HtmlWebpackPlugin(conf))
    }
    return r
};

module.exports = function(options){

    //css
    options = options || {};
    let debug = options.debug !==undefined ? options.debug :true;

    let plugins = [];

    let extractCSS;
    let cssLoader;
    let lessLoader;


    plugins.push(new CommonsChunkPlugin({
        name: 'common',
        minChunks: Infinity
    }));

    if(debug){
        extractCSS = new ExtractTextPlugin('styles/[name].css');
        cssLoader = extractCSS.extract([ 'css-loader', 'postcss-loader' ]);
        lessLoader = extractCSS.extract([ 'css-loader', 'less-loader' ]);

        plugins.push(extractCSS)
    }else{
        extractCSS = new ExtractTextPlugin('styles/[contenthash:8].[name].min.css', {
            // 当allChunks指定为false时，css loader必须指定怎么处理
            allChunks: false
        });
        cssLoader = extractCSS.extract(['css-loader', 'postcss-loader' ]);
        lessLoader = extractCSS.extract([ 'css-loader', 'less-loader' ]);
        //压缩js
        plugins.push(
            extractCSS,
            //引入的React切换到产品版本
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            }),
            // 清除打包后的文件中的注释, 和copyright信息
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.NoErrorsPlugin()
        )
    }

    //config
    let config = {

        entry: Object.assign(entries(), {
            // 用到什么公共lib（例如zepto.js），就把它加进vendor去，目的是将公用库单独提取打包
            'common': ['zepto','react','react-dom']
        }),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "scripts/[name].[chunkhash:5].js",
            chunkFilename: '/scripts/[name]/[chunkhash:5].min.js',
            publicPath: publicPath
        },
        module: {
            loaders: [
                {
                    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                    loaders: [
                        //小于10KB的图片会自动转成dataUrl，
                        'url?limit=10000&name=images/[hash:8].[name].[ext]',
                        'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                    ]
                },
                {
                    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                    loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
                },
                {test: /\.(tpl|ejs)$/, loader: 'ejs'},
                {test: /\.css$/,exclude: /^node_modules$/,loader: cssLoader,options:{minimize:true}},
                {test: /\.less$/,exclude: /^node_modules$/,loader: lessLoader,options:{minimize:true}},
                {test: /\.js$/, exclude: /^node_modules$/, loader: 'babel'},
                {test: /\.jsx$/, exclude: /node_modules/, loaders: ['jsx', 'babel'],}
            ],
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.css', '.scss', '.tpl', '.png', '.jpg'],
            root: [srcDir, nodeModPath],
            alias: pathMap,
            publicPath: '/'
        },
        //合拼插件组
        plugins: plugins.concat(html_plugins())
    };

    return config;
};


