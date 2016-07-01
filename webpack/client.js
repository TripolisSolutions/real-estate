const path = require('path')
const webpack = require('webpack')

// Styles loader
const loader = {
  css: 'css-loader?modules&importLoaders=1&localIdentName=[path]scope__[name]__[local]&sourceMap',
};

module.exports = {
  context: path.join(__dirname, '../'),
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  entry: {
    client: [
      'webpack-hot-middleware/client',
      './src/client.js'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[name].js',
    publicPath: '/',
    libraryTarget: 'var',
  },
  resolve: {
    modulesDirectories: ['./node_modules'],
    extensions: ['', '.js', '.css', '.less']
  },
  module: {
    preLoaders: [
    ],
    loaders: [{
      test: /\.js/,
      // 'transform-runtime', 'add-module-exports'
      loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0&plugins[]=transform-decorators-legacy&presets[]=react-hmre',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: `style-loader!${loader.css}`,
      exclude: /node_modules/,
    }, {
      test: /\.less$/,
      loader: `style-loader!${loader.css}!less-loader?sourceMap`,
      exclude: /node_modules/,
    }, {
      test: /\.tsx?$/,
      loader: `${loader.babel}!ts-loader`,
      exclude: /node_modules/,
    }]
  }
}

