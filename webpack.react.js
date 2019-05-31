let path = require('path')
let webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    library:'_dll_[name]' // 指定打包出去的变量名字
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname,'dist','mainfest.json')
    })
  ]
}