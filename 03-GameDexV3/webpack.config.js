const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // WYMUSZAMY moduły + presety
            sourceType: "module",
            presets: [
              ["@babel/preset-env", { modules: "commonjs" }],
              "@babel/preset-react",
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
  mode: "development",
};
