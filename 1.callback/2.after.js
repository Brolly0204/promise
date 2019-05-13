
// 执行三次才执行
function after(timer, callback) {
  return function() {
    if (--timer === 0) {
      callback(timer)
    }
  }
}

// 间隔几次再执行
function interval(timer = 1, callback) {
  timer = timer || 1
  let count = 0
  return function() {
    if (++count % timer === 0) {
      callback()
    }
  }
}

const fe = () => console.log('fe')
const fn = () => console.log('fn')

let newFe = after(3, fe)
newFe()
newFe()
newFe() // 'fe'
newFe()

let newFn = interval(2, fn)

newFn()
newFn()
newFn()
newFn()
