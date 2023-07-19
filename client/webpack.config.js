const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = function () {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'public'),
    },    
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: "Just a text editor"
      }),
      new WebpackPwaManifest({
        name: 'My PWA',
        inject: true,
        short_name: 'JATE',
        description: 'Just a text editor!',
        background_color: '#ffffff',
        start_url:'/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          }          
        ]
      }),
      new GenerateSW(),
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
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        // ... other rules
      ],
    },
  };
};
