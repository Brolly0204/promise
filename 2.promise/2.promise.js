const fs = require('fs')

const read = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

read('./a.txt')
  .then(data => {
    return read(data)
  })
  .then(
    data => {
      console.log(data)
      throw new Error('error')
    },
    err => {
      console.log('err', err)
    }
  )
  .then(
    () => {},
    err => {
      console.log('err2', err)
      return Promise.reject('呵呵呵呵呵')
    }
  )
  .then(
    () => {
      console.log('resolve')
    },
    data => {
      console.log('reject', data)
    }
  )
