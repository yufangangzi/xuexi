let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSS = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  devServer: { // 开发服务配置
    port: 3000,
    progress: true,
    contentBase: './build',
    compress: true
  },
  optimization: { // 优化项
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSS()
    ]
  },
  mode: 'production', // 模式 默认两种 development  production
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.[hash].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
  },
  plugins: [ // 数组放着所有的webpack插件
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 删除模板中的双引号
        collapseWhitespace: true, // 折叠行
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })

  ],
  module: {
    rules: [
      { // css-loader 续接@import这种语法
        // style-loader 是把css 插入到 head 的标签中
        // loader 的特点 希望单一
        // loader的用法 字符串只用一个loader 多个需要数组[]  默认是从右到左执行 ，也可以传对象
        // 处理 less 文件
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      }
    ]
  }
}