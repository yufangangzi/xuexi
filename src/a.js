class B {

}
function * gen(parms) {
  yield 1
}
let gens = gen().next()
console.log(gens)
module.exports = function () {
  console.log('kkkkkk')
}

