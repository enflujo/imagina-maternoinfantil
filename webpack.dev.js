const path = require('path');
const base = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    static: path.join(__dirname, 'docs'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env', 'autoprefixer']
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
});
