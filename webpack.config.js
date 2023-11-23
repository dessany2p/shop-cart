const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
   mode,
   target,
   devtool,
   devServer: {
      port: 3000,
      open: true,
      hot: true
   },
   entry: {
      index: path.resolve(__dirname, 'src', 'index.js'),
      // cart: path.resolve(__dirname, 'src', 'cart.js'),
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      filename: '[name].[contenthash].js',
      library: '[name]',
      assetModuleFilename: 'assets/[hash][ext]'
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: path.resolve(__dirname, 'src', 'index.html')
      }),
      // new HtmlWebpackPlugin({
      //    filename: 'cart.html',
      //    template: path.resolve(__dirname, 'src', 'cart.html')
      // }),
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      })
   ],
   module: {
      rules: [
         {
            test: /\html$/i,
            loader: 'html-loader'
         },
         {
            test: /\.(c|sc|sa)ss$/i,
            use: [
               devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
               "css-loader",
               "sass-loader"
            ],
         },
         {
            test: /\.ttf$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][ext]'
            }
         },
      ]
   }
}