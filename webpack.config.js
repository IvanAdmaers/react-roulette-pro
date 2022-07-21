const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const mode = isProduction ? 'production' : 'development';

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};
const reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom',
};

module.exports = {
  mode,
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    clean: true,
    globalObject: 'this',
    library: {
      name: 'ReactRoulettePro',
      type: 'umd',
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /nodeModules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       cacheDirectory: true,
      //     },
      //   },
      // },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset/inline',
      },
    ],
  },
  externals: {
    react: reactExternal,
    'react-dom': reactDOMExternal,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
