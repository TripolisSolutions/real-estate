var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function make(options) {

  var isClient = (options.target === 'web');

  // Init plugins with provide, define and no errors
  var plugins = [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      __CLIENT__: (options.target === 'web'),
    }),
    new webpack.NoErrorsPlugin(),
  ];

  var entry, outputFilename

  // For client
  if (isClient) {
    entry = {
      vendor: [
        'react',
        'react-router'
      ],
      client: [
        'webpack-hot-middleware/client',
        options.entry
      ]
    }

    outputFilename = '[name].js'

    // Add HMRE plugin
    plugins.push(new webpack.HotModuleReplacementPlugin());

  } else {
    entry = ['babel-polyfill', options.entry];

    outputFilename = path.basename(options.entry)

    // Add source maps and extract styles
    plugins.push(
      new ExtractTextPlugin('styles.css')
    );
  }

  // Styles loader
  var loader = {
    css: 'css-loader?modules&importLoaders=1&localIdentName=[path]scope__[name]__[local]&sourceMap',
    babel: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0' + (isClient ? '&presets[]=react-hmre' : ''),
  };

  var config = {
    context: path.join(__dirname, '../'),
    debug: options.debug || true,
    devtool: options.devtool || (isClient ? 'cheap-module-eval-source-map' : 'eval-source-map'),
    target: options.target || 'web',
    entry: entry,
    plugins: plugins,

    output: {
      path: path.join(__dirname, '..', 'build'),
      filename: outputFilename,
      publicPath: '/',
      libraryTarget: (isClient ? 'var' : 'commonjs2'),
    },

    resolve: {
      modulesDirectories: ['./node_modules', './src/components'],
      extensions: ['', '.js', '.ts', '.tsx', '.css', '.less']
    },

    module: {
      preLoaders: [
        {
          test: /\.tsx?$/,
          loader: "tslint",
          exclude: /node_modules/
        }
      ],
      loaders: [{
        test: /\.js/,
        loader: loader.babel,
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: (isClient ? `style-loader!${loader.css}` : ExtractTextPlugin.extract('style-loader', loader.css)),
        exclude: /node_modules/,
      }, {
        test: /\.less$/,
        loader: (isClient ? `style-loader!${loader.css}!less-loader?sourceMap` : ExtractTextPlugin.extract('style-loader', `${loader.css}!less-loader?sourceMap`)),
        exclude: /node_modules/,
      }, {
        test: /\.tsx?$/,
        loader: `${loader.babel}!ts-loader`,
        exclude: /node_modules/,
      }]
    }
  };

  if (!isClient) {
    // Don't import node binary packages
    config.externals = /^[a-z\-0-9]+$/;
  }

  return config;
};
