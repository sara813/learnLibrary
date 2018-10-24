
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

const config = require("./webpack.config.js");
const option = {
    contentBase: "./dist",
    hot: true,
    host: "localhost"
};

webpackDevServer.addDevServerEntrypoints(config, option);
const compiler = webpack(config);

const server = new webpackDevServer(compiler, option);

server.listen(5000, function(){
    console.log("Example app listening on port 3000!");
});