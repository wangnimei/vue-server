var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  output: {
    path: path.resolve(process.cwd(), './public'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {}
      },
      {
        test: /\.css$/,
        use: isProduction ?
          ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: 'css-loader'
          }) : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: isProduction ?
          ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: ['css-loader', 'sass-loader']
          }) : ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  performance: {
    hints: false
  },
  plugins: []
}

if (isProduction) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new ExtractTextPlugin('css/style.bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}