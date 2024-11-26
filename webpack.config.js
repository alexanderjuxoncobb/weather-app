// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index.js',
    template2: './src/template2.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/template2.html',
      filename: 'template2.html',
      chunks: ['template2']
    }),
    new webpack.HotModuleReplacementPlugin() // Add HMR plugin
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: { browsers: ['> 0.25%, not dead', 'ie 11'] }, // targets: 'defaults',
            presets: [['@babel/preset-env']]
          }
        }
      }
    ]
  },
  devServer: {
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    ],
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: 8080
      }
    },
    hot: true, // Enable HMR here
    watchFiles: ['src/**/*'] // Watches changes in the src folder
  }
}
