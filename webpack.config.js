const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    open: true,
    clientLogLevel: 'silent',
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": {
                  "node": "10"
                }
              }],
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }, {
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}