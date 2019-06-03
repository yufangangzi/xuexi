// import React from 'react'
// import {render} from 'react-dom'

// render(<h1>jsx</h1>, window.root)
// import calc from './test'

// console.log(calc.sum(1,2))
// require('@babel/polyfill')
// let a = require('./a.js')
// a()
// require('./index.css')
// require('./index.less')

// let fn = () => {
//   console.log('log')
// }
// fn()
// console.log('aaaaa'.includes('a'))
// // file-loader  默认会生成一张图片 到 build目录下
// import logo from './logo.JPG';
// let image  = new Image();
// image.src = logo;
// document.body.appendChild(image)
// // console.lo('llll')

// let xhr = new XMLHttpRequest()
// xhr.open('GET', '/user', true)
// xhr.onload = function () {
//   console.log(xhr.response)
// }
// xhr.send()
// console.log(DEV)

// let button = document.createElement('button')

// button.innerHTML = 'hello'

// button.addEventListener('click', function () {
//   console.log('button')
//   import('./source.js').then(data => {
//     console.log(data)
//   })
// });
// document.body.appendChild(button)

import str from './source.js'
console.log(str)
if (module.hot) {
  module.hot.accept('./source.js', () => {
    console.log('文件更新了')
  })
}