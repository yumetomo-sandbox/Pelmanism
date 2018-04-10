const path = require('path');
const webpack = require('webpack');

module.exports = {
  // エントリーポイントの設定
  entry: {
    game: path.join(__dirname, 'webpack/game.js')
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
        // ローダーの対象ファイル
        test: /\.js$/,
        // ローダーの対象から外すディレクトリ
        exclude: /node_modules/,
        // 利用するローダー
        use: 'babel-loader?presets[]=es2015'
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
