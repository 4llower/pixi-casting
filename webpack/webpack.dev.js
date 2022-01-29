const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const cwd = (relativePath) => path.resolve(process.cwd(), relativePath);

module.exports = {
  entry: cwd("./src/index.ts"),
  mode: "development",

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: cwd("./public/index.ejs"),
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"],
    modules: ['node_modules'],
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
};
