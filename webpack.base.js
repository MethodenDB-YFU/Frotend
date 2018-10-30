const path = require("path");
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/less/ant-theme-vars.less'), 'utf8'));

module.exports = {
    entry: ["./src/js/app.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    plugins: [
                        ['import', { libraryName: 'antd', style: true}]
                    ]
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                  {loader: "style-loader"},
                  {loader: "css-loader"},
                  {loader: "less-loader",
                    options: {
                      modifyVars: themeVariables,
                      root: path.resolve(__dirname, './'),
                      javascriptEnabled: true
                    }
                  }
                ]
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            title: "Methodendatenbank",
            template: "./src/index.html",
            filename: "./index.html",
            favicon: 'src/images/icons/favicon.ico',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};