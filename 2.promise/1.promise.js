const Promise2 = require('./promise2')
const Promise3 = require('./promise3')
// pending => resolved(fulfilled) 完成态
// pending => rejected 失败态

// promise.then(onFulfilled, onRejected)


let promise = new Promise2((resolve, reject) => {
  setTimeout(() => {
    // resolve('起床了')
    reject('睡觉了')
  }, 1000)
  // reject('饭都吃完了')
  // resolve('开饭了')
  // throw new Error('报错了')
})

promise.then((res) => {
  console.log('resolve', res)
}, (err) => {
  console.log('reject', err)
})

promise.then((res) => {
  console.log('resolve', res)
}, (err) => {
  console.log('reject', err)
})
