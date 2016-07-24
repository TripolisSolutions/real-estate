const path = require('path')
const webpack = require('webpack')

// Styles loader
const loader = {
  css: 'css-loader?modules&importLoaders=1&localIdentName=[path]scope__[name]__[local]&sourceMap',
}

module.exports = {
  context: path.join(__dirname, '../'),
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  entry: {
    client: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/client.js'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      'global.isClient': true,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[name].js',
    publicPath: '/assets/',
    libraryTarget: 'var',
  },
  resolve: {
    extensions: ['', '.js', '.css', '.less'],
    alias: {
      components: path.resolve('./src/shared/components'),
      shared: path.resolve('./src/shared')
    }
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
      include: /src/,
    }, {
      test: /\.less$/,
      loader: `style-loader!${loader.css}!less-loader?sourceMap`,
      include: /src/,
    },
    {
      test: /\.css$/,
      exclude: /src/,
      loaders: [
        'style',
        'css?sourceMap'
      ]
    },
    { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff2' },
    { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=font/opentype' },
    { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[name].[ext]' },
    { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=image/svg+xml' },
    { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
    ]
  }
}

