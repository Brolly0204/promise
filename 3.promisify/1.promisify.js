
const fs = require('fs')
const mfs = require('mz/fs')

const promisify = (fn) => {
  return function() {
    return new Promise((resolve, reject) => {
      fn(...arguments, function(err, data) {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

// promisify(fs.readFile)('./name.txt', 'utf8').then(data => {
//   console.log(data)
// })

const promisifyAll = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && !key.endsWith('Sync')) {
      if (typeof obj[key] === 'function') {
        obj[key + 'Async'] = promisify(obj[key])
      }
    }
  }
}

promisifyAll(fs)

fs.writeFileAsync('./name.txt', '布罗利').then(() => {
  console.log('write success!')
})


mfs.readFile('./name.txt', 'utf8').then(data => {
  console.log('read', data)
})