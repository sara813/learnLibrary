
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "Output Management"
        }),
        new cleanWebpackPlugin(["dist"]),
        new webpack.HotModuleReplacementPlugin()
    ]
};