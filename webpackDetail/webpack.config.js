
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js",
        print: "./src/print.js"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "Output Management"
        }),
        new cleanWebpackPlugin(["dist"])
    ]
};