const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Styles loader
const loader = {
  css: 'css-loader?modules&importLoaders=1&localIdentName=[path]scope__[name]__[local]&sourceMap',
};

module.exports = {
  context: path.join(__dirname, '../'),
  debug: false,
  devtool: 'source-map',
  target: 'node',
  entry: {
    server: [
      'babel-polyfill',
      './src/server.js'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  // Don't import node binary packages
  externals: /^[a-z\-0-9]+$/ 
}

