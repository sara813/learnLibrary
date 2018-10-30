const path = require("path");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js",
        another: "./src/another-module.js"
    },
    plugins: [
        new cleanWebpackPlugin(["dist"]),
        new htmlWebpackPlugin({
            title: "Caching"
        })
    ],
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist")
    }
};