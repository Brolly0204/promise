const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


// 针对 onFulfilled onRejected的返回值情况（promise对象 thenable对象 普通值） 做不同处理
const resolvePromise = (promise, x, resolve, reject) => {

  // 循环引用处理
  if (promise === x) {
    return reject(new TypeError('循环引用'))
  }

  // 如果是 promise对象 或 thenable对象（具备then方法的对象或函数对象）
  if ((x !== null) && (typeof x === 'object' || typeof x === 'function')) {
    let called
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this._PromiseStatus = PENDING
    this._PromiseValue = undefined
    this._fulfilledCallbacks = []
    this._rejectedCallbacks = []

    const resolve = val => {

      if (val instanceof Promise) {
        return val.then(resolve, reject)
      }
      if (this._PromiseStatus === PENDING) {
        this._PromiseStatus = FULFILLED
        this._PromiseValue = val
        this._fulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = val => {
      if (this._PromiseStatus === PENDING) {
        this._PromiseStatus = REJECTED
        this._PromiseValue = val
        this._rejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static resolve(val) {
    return new Promise(resolve => resolve(val))
  }

  static reject(val) {
    return new Promise((resolve, reject) => reject(val))
  }

  static all(promises = []) {
    return new Promise((resolve, reject) => {
      let c = 0
      let values = []
      const collect = (key, val) => {
        values[key] = val
        if (promises.length === ++c) {
          resolve(values)
        }
      }
      promises.forEach((item, idx) => {
        let then = item.then
        if (item && typeof then === 'function') {
          then.call(item, data => {
            collect(idx, data)
          }, reject)
        } else {
          collect(idx, data)
        }
      })
    })
  }

  static race(promises = []) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        let p = promises[i]
        let then = p.then
        if (p && typeof then === 'function') {
          then.call(p, resolve, reject)
        } else {
          resolve(p)
        }
      }
    })
  }

  catch(errorCallback) {
    return this.then(null, errorCallback)
  }

  finally(callback) {
    return this.then(callback, callback)
  }

  then(onFulfilled, onRejected) {
    // 值得穿透 promise.then().then().then(val => console.log(val))
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

    const promise2 = new Promise((resolve, reject) => {
      // 完成态
      if (this._PromiseStatus === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this._PromiseValue)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      if (this._PromiseStatus === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this._PromiseValue)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      if (this._PromiseStatus === PENDING) {
        this._fulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this._PromiseValue)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })

        this._rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this._PromiseValue)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}


// Promise测试
// https://github.com/promises-aplus/promises-tests
// 872 passing (16s)
Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
