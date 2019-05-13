const fs = require('fs')

// 发布订阅

class EventEmitter {
  constructor() {
    this._fns = []
  }

  on(callback) {
    this._fns.push(callback)
  }

  emit(...rest) {
    this._fns.forEach(fn => fn(...rest))
  }
}

let emit = new EventEmitter()

let school = {}
emit.on(function(data, key) {
  school[key] = data
  if (Object.keys(school).length === 2) {
    console.log(school)
  }
})

fs.readFile('./name.txt', 'utf8', (err, data) => {
  if (err) return console.log(err)
  emit.emit(data, 'name')
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  if (err) return console.log(err)
  emit.emit(data, 'age')
})