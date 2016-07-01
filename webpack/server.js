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
    modulesDirectories: ['./node_modules'],
    extensions: ['', '.js', '.css', '.less']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [{
      test: /\.js/,
      loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0&plugins[]=transform-decorators-legacy',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', loader.css),
      exclude: /node_modules/,
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', `${loader.css}!less-loader?sourceMap`),
      exclude: /node_modules/,
    }]
  },
  // Don't import node binary packages
  externals: /^[a-z\-0-9]+$/ 
}

