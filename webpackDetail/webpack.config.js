
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js",
        print: "./src/print.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "Output Management"
        })
    ]
};