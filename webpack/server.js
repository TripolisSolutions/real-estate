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
    publicPath: '/assets/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.css', '.less']
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/
      // }
    ],
    loaders: [{
      test: /\.js/,
      loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0&plugins[]=transform-decorators-legacy',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', loader.css),
      include: /src/,
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', `${loader.css}!less-loader?sourceMap`),
      include: /src/,
    },
    {
      test: /\.css$/,
      exclude: /src/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?sourceMap'
      ),
    },
    { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff2' },
    { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=font/opentype' },
    { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[name].[ext]' },
    { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=image/svg+xml' },
    { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
    ]
  },
  // Don't import node binary packages
  externals: /^[a-z\-0-9]+$/ 
}

