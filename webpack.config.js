/*
* @Author: kwy126
* @Date:   2018-01-14 17:17:12
* @Last Modified by:   kwy126
* @Last Modified time: 2018-02-03 14:57:27
*/
//plugin中有个变量webpack，因此需要引入webpack 
var webpack = require('webpack');
//css样式
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置：dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

var getHtmlConfig = function(name,title){
    return {
            template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            title    : title,
            inject   : true,
            hash     : true,
            chunks   : ['common',name]
    }
}
var config = {
    entry:{
        'common':['./src/page/common/index.js'],
    	'index':['./src/page/index/index.js'],
    	'login':['./src/page/login/login.js'],
        'result':['./src/page/result/index.js']
    },
    output: {
        path:'./dist',//输出根目录
        publicPath : '/dist',//访问路径，比如localhost:8080/dist
        filename:'js/[name].js'
    },
    module: {
        loaders: [
            // 以css结尾的文件，先使用css-loader，再使用style-loader
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:"url?limit=8192&name=resource/[name].[ext]"},
            { test: /\.string$/, loader: 'html-loader'}

        ]
    },
    resolve : {
        alias   : {
            util:__dirname+'/src/util',
            page:__dirname+'/src/page',
            service:__dirname+'/src/service',
            image:__dirname+'/src/image',
            node_modules:__dirname+'/node_modules'

        }
    },
    plugins:[
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8089/');
}

module.exports = config;