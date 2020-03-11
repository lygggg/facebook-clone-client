const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve( __dirname, '/dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpeg|png)$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    proxy: [{
      context: ['/session'],
      target: 'http://localhost:3000',
    }],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
};
