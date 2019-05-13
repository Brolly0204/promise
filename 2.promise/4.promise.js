const Promise6 = require('./promise6')

const promise = new Promise6((resolve, reject) => {
  resolve(new Promise6((resolve, reject) => {
    setTimeout(() => {
      resolve(24000)
    }, 1000)
  }))
})

promise.then(val => {
  console.log(val)
})



// promise.then(data => {
//   console.log(data)
//   // throw new Error('halo')
//   return 111  
// }).then(data => {
//   console.log(data)
// }).catch(err => {
//   console.log('err', err)
//   return 2000
// }).finally(function() {
//   console.log('data')
//   return 'finally'
// }).then((data) => {
//   console.log(data)
// })

// 值的穿透
// promise.then().then().then(val => console.log(val))

// const p = Promise6.resolve(100)

// p.then(val => {
//   console.log(val)
//   return 1000
// }).then(val => {
//   console.log(val)
// })

// const p2 = Promise6.reject(200)
// p2.then(null, err => {
//   console.log('reject', err)
//   return 2000
// }).then(console.log)

// const promise = new Promise6((resolve, reject) => {
//   // throw new Error('错错错')
//   // setTimeout(() => {
//   //   resolve(1)
//   // }, 1000)
//   resolve(11)
// })


// promise.then(data => {
//   console.log('resolve1', data)
//   // throw new Error('error')
//   // return new Promise6((resolve, reject) => {
//   //   setTimeout(() => {
//   //     resolve(Promise.reject(24000))
//   //   }, 1000)
//   // })
//   return new Promise6((resolve, reject) => {
//     resolve(new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(24000)
//       }, 1000)
//     }))
//   })
// }, (err) => {
//   console.log('reject', err)
// }).then(data => {
//   console.log('resolve2', data)
// }, err => {
//   console.log('reject2', err)
// })

// promise.then(data => {
//   console.log('resolve11', data)
// })

// console.log('line 15')