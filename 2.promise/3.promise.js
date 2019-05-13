const Promise4 = require('./promise4')


const promise = new Promise4((resolve, reject) => {
  resolve(1)
})

promise.then(data => {
  console.log('resolve1', data)
  return new Promise4((resolve, reject) => {
    setTimeout(() => {
      resolve(new Promise4((resolve, reject) => {
        resolve(20000)
      }))
    }, 1000)
  })
}).then(data => {
  console.log('resolve2', data)
})


// let p = new Promise((resolve) => {
//   resolve(11)
//   console.log(22)
// })

// p.then(data=> {
//   console.log(data)
// })

// let promise2 = promise.then(data => {
//   console.log('resolve1', data)
//   return new Promise4((resolve, reject) => setTimeout(() => {
//     resolve('miss')
//   }, 1000))
// }).then(data => {
//   console.log('resolve2', data)
//   return 3
// }, err => {
//   console.log('reject2', err)
// })

// promise2.then(data => {
//   console.log(data)
// })

// promise.then(data => {
//   console.log(data)
// })
// Chaining cycle detected for promise #<Promise>(检测到Promise的链循环)
// let promise2 = promise.then(data => {
//   console.log('resolve1', data)
//   // throw new Error('异常')
//   // return new Promise4((resolve) => resolve(100))
//   // 引用同一个promise对象 循环引用报错
//   return promise2
// })

// promise2.then(null, err => {
//   // Chaining cycle detected for promise #<Promise>(检测到Promise的链循环)
//   console.log('err', err)
// })

// promise.then(data => {
//   console.log('resolve2', data)
// }, err => {
//   console.log('reject2', err)
// })

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000)
// })

// promise.then(data => {
//   console.log('resolve1', data)
//   return 2
// }, err => {
//   console.log('reject1', err)
//   return 22
// }).then(data => {
//   console.log('resolve2', data)
// }, (err) => {
//   console.log('reject2', err)
// })


// promise.then(data => {
//   console.log('resolve1', data)
//   return 2
// }, err => {
//   console.log('reject1', err)
//   return 22
// }).then(data => {
//   console.log('resolve2', data)
// }, err => {
//   console.log('reject2', err)
// })


// let p = new Promise4((resolve, reject) => {
//   resolve('hello')
// })

// p.then((data) => {
//   console.log('resolve1', data)
//   return 2
// }).then((data) => {
//   console.log('resolve2', data)
// })

// p.then((data) => {
//   console.log('resolve11', data)
//   return 22
// }).then((data) => {
//   console.log('resolve22', data)
// })