const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  target: "es5",
  entry: {
    server: "./server.ts",
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname),
  },
};
