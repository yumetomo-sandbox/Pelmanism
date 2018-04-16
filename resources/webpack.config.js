const path = require('path');
const webpack = require('webpack');

module.exports = {
  // エントリーポイントの設定
  entry: {
    game: path.join(__dirname, 'webpack/game.js'),
    game_vue: path.join(__dirname, 'webpack/game_vue.js')
  },
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: '[name].bundle.js',
    // 出力先のパス
    path: path.join(__dirname, '../app/webroot/js/')
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  // ローダーの設定
  module: {
    rules: [
      {
        test: /\.vue/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      velocity: 'velocity-animate'
    })
  ]
};
