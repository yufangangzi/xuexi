let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSS = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
let Happypack = require('happypack')
module.exports = {
  devServer: { // 开发服务配置
    port: 3000,
    // before(app) {
    //   app.get('/user', (req, res) => {
    //     res.json({name:'你是谁啊'})
    //   })
    // }
    // progress: true,
    // contentBase: './build',
    // compress: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001',
    //     pathRewrite: {'/api': ''}
    //   }
    // }

  },
  resolve: {
    // 解析第三方模块  common
    // modules:[path.resolve('node_modules')],
    // mainFields: ['style', 'nain'], // 执定优先从哪个文件映入  三种方式如下
    // mainFiles: [], // 入口文件
    // alias: {
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // }

    // 添加后缀 一次找这些配置的后缀
    extensions: ['.js','.css','.json','.vue']
  },
  optimization: { // 优化项
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSS()
    ]
  },
  mode: 'development', // 模式 默认两种 development  production
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.[hash].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
  },
  plugins: [ // 数组放着所有的webpack插件
    new webpack.DefinePlugin({
      DEV: JSON.stringify('development')
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname,'dist','mainfest.json')
    }),
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
      filename: 'css/main.css'
    }),
    // new cleanWebpackPlugin(),
    new webpack.BannerPlugin('made by cg'),
    new webpack.NamedModulesPlugin(), // 打印更新的模块路径
    // new webpack.HotModuleReplacementPlugin()  // 更新插件
  ],
  // devtool: 'source-map',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre'
      //     }
      //   },
      // },
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
        test: /\.(png|jpg|JPG|gif)$/,
        // 做个限制  当我们的图片 大于 k 的时候 用 base64 处理
        use: {
          loader: 'url-loader',
          options: {
            limit: 50*1024,
            outputPath: './img/'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { //
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
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