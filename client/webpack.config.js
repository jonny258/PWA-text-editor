const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = function () {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist').toString(),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: "Webpack-Stuff"
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        // ... other rules
      ],
    },
  };
};
