const fs = require('fs')

// 并发调用接口
function after(time = 0, fn) {
  let c = 0
  let params = []
  return function(...rest) {
    params.push(...rest)
    if (++c === time) {
      fn.apply(this, params)
    }
  }
}

let profile = {}

let read = after(2, function() {
  console.log('res', arguments)
  console.log(profile)
})

fs.readFile('./name.txt', 'utf8', (err, data) => {
  if (err) return console.log(err)
  console.log('name', data)
  profile.name = data
  read(data)
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  if (err) return console.log(err)
  console.log('age', data)
  profile.age = data
  read(data)
})
