// 高阶函数
// 1.一个函数作为另个函数参数 返回值
// 2.AOP面向切面编程

// 装饰器 拦截器 代理模式
Function.prototype.before = function(callback) {
  let that = this
  return function() {
    callback.apply(this, arguments)
    return that.apply(this, arguments)
  }
}

Function.prototype.after = function(callback) {
  let that = this
  return function() {
    let result = that.apply(this, arguments)
    callback.apply(this, arguments)
    return result
  }
}

function fe() {
  console.log('fe', arguments)
  console.log('===fe===', this === global)
}

let fn = fe.before(function() {
  console.log('before', arguments)
  console.log('===before===', this === module.exports)
}).after(function() {
  console.log('after', arguments)

  console.log('===after===', this === module.exports)
})

fn(1, 2)
