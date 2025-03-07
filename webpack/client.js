const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const basePath = (file) => path.resolve(process.cwd(), file);

const cssToDomLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const base = {
  entry: {
    app: basePath('src/index.tsx'),
  },
  target: 'web',
  output: {
    path: basePath('build'),
    filename: '[name].[contenthash:6].js',
    chunkFilename: '[id].[contenthash:6].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    client: {
      overlay: false
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          cssToDomLoader,
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                exportLocalsConvention: 'dashesOnly',
                localIdentName: isProduction ? '[hash:base64:6]' : '[local]_[hash:base64:4]',
                namedExport: true,
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require("sass"),
              sourceMap: true,
              sassOptions: { indentedSyntax: true },
              additionalData: '@use "sass/global" as *',
            },
          },
        ],
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    modules: [basePath('src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Scentbird',
      template: basePath('src/index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
    }),
    isProduction &&
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'ch.[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_OPTIONS': JSON.stringify('--openssl-legacy-provider'),
    }),
  ].filter(Boolean),
};

module.exports = merge(base, {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  stats: 'errors-only',
});
