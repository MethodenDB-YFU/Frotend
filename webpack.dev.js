const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    // mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        https: false,
        historyApiFallback: true,
        contentBase: "./dist",
        headers: {
            "X-Frame-Options": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
});