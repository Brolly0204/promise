const fs = require('fs')
const Promise = require('./promise-v1.1')

function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

// Promise.all([read('./1.txt'), read('./2.txt'), read('./3.txt')]).then(values => { 
//   console.log(values)
//   return values[1]
// }).then(data => {
//   console.log(data)
// })

Promise.race([read('./1.txt'), 1, 2]).then(val => {
  console.log(val)
})

Promise.race([read('./1.txt'), read('./2.txt'), read('./3.txt')]).then(value => { 
  console.log(value)
})