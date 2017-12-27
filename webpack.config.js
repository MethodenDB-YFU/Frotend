const path = require("path");
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");
//const lessToJs = require('less-vars-to-js');
//const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/ant-theme-vars.less'), 'utf8'));

module.exports = {
    entry: ["./src/js/app.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
    },
    devServer: {
        contentBase: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
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
                    {loader: "less-loader"}
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};