const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PostcssPxToViewport = require('postcss-px-to-viewport')

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development'
  // 读取写好的 loading 态的 html 和 css
  const loading = {
    html: fs.readFileSync(path.join(__dirname, './loading/index.html')),
    css: `<style>${fs.readFileSync(path.join(__dirname, './loading/index.css'))}</style>`,
  }
  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        PostcssPxToViewport({
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['.postcss-ignore'],
          minPixelValue: 2,
          mediaQuery: false,
          replace: true,
          exclude: [],
        }),
      ],
    },
  }
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        loading,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.scss/,
          use: [
            {
              loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            postCssLoader,
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
                name: '[name].[hash:6].[ext]',
                outputPath: 'images/',
                publicPath: '../images',
              },
            },
          ],
          exclude: path.resolve(__dirname, './src/common/icons'),
        },
        {
          test: /\.svg$/,
          use: [{
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          }],
        },
      ],
    },
    devServer: {
      compress: true,
      port: 9000,
      hot: true,
      open: true,
    },
  }
}
