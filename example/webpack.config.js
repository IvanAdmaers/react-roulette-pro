const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const mode = isProduction ? 'production' : 'development';
const target = isProduction ? 'browserslist' : 'web';

const plugins = [
  new MiniCssExtractPlugin({
    filename: isProduction ? '[name].[contenthash].css' : '[name].css',
  }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
  }),
];

if (!isProduction) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  target,
  plugins,
  devtool: 'source-map',
  entry: './src/index.js',
  devServer: {
    static: ['./dist'],
    hot: true,
    open: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[fullhash].js' : '[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|mp3)$/i,
        type: isProduction ? 'asset' : 'asset/resource',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
