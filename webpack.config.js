const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: path.join(__dirname, 'src', 'index.js'),
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css'
      }),
      new WriteFilePlugin({
        // Write only files that have ".css" extension.
        test: /\.css$/,
        useHashIndex: true
      }),
      new HotModuleReplacementPlugin(),
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
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: { 
                hmr: argv.mode === 'development' 
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  }
}