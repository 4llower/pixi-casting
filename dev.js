const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack/webpack.dev.js");

const path = require("path");

const serverOptions = {
  static: {
    directory: path.join(__dirname, "public"),
  },
  compress: true,
  port: 9000,
  open: true,
};

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(serverOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
