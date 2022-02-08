const path = require('path');

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
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    clean: true,
    library: {
      name: 'ReactRoulettePro',
      type: 'umd',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
};