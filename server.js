let express = require('express')

let app = express()
let webpack = require('webpack')

// 中间件  webpack-dev-middleware
let middle = require('webpack-dev-middleware')

let config = require('./webpack.config.js')

let compiler = webpack(config)

app.use(middle(compiler))

app.get('/user', (req,res) => {
  res.json({name: 'zfpx'})
})
app.listen(3001)