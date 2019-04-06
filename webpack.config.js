const path = require("path");
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/less/ant-theme-vars.less'), 'utf8'));

module.exports = {
    entry: ["./src/js/app.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        publicPath: '/'
    },
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
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [ { loader: "eslint-loader" } ]
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
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: 'src/images/icons/favicon.ico'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};