const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  devServer: {
    historyApiFallback: true,
    port: 3001,
    hot: true,
  },
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@typings': path.resolve(__dirname, 'src', 'typings'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
