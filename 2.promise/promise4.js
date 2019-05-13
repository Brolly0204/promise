/**
 * Promises/A+规范 https://promisesaplus.com/
 * @param {Promise} promise 当前then方法中返回的 新promise实例
 * @param {Any} x 当前then方法中 onFulfilled 或 onRejected的返回值(普通值 promise实例 thenable对象)
 * @param {Function} resolve 新promise实例的 resolve
 * @param {Function} reject 新promise实例的 reject
 */
function resolvePromise(promise, x, resolve, reject) {
  // 防止then方法返回的 promise对象和 onFulfilled方法 或者 onRejected方法 里返回的x 是同一个对象引用
  if (promise === x) {
    return reject(new TypeError('循环引用'))
  }

  // x 是一个promise对象
  // console.log('x', x)
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 获取then属性取值时 有可能出现异常
      then = x.then
      if (typeof then === 'function') {
        // 有then方法 说明 x是promise对象
        // 使用之前取出的then方法执行 不需要再次获取x.then 可能导致出现新异常
        then.call(
          x,
          y => {
            // 成功态
            resolvePromise(promise, y, resolve, reject)
          },
          r => {
            // 失败态
            reject(r)
          }
        )
      } else {
        // 直接resolve
        resolve(x)
      }
    } catch (e) {
      reject(e)
    }
  } else {
    // x是普通值 直接resolve
    resolve(x)
  }

}

class Promise4 {
  constructor(executer) {
    this.PromiseStatus = 'pending'
    this._fulfilledFunc = []
    this._rejectedFunc = []

    const resolve = val => {
      if (this.PromiseStatus === 'pending') {
        this.PromiseValue = val
        this.PromiseStatus = 'fulfilled'
        this._fulfilledFunc.forEach(func => func(val))
      }
    }

    const reject = val => {
      if (this.PromiseStatus === 'pending') {
        this.PromiseValue = val
        this.PromiseStatus = 'rejected'
        this._rejectedFunc.forEach(func => func(val))
      }
    }

    if (typeof executer === 'function') {
      try {
        executer(resolve, reject)
      } catch (err) {
        reject(err)
      }
    } else {
      throw new TypeError(`Promise resolver ${executer} is not a function`)
    }
  }

  then2(onFulfilled, onRejected) {
    let that = this
    const promise2 = new Promise4((resolve, reject) => {
      if (typeof onFulfilled === 'function') {
        that._fulfilledFunc.push(function(val) {
          try {
            let result = onFulfilled(val)
            resolvePromise(promise2, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (typeof onRejected === 'function') {
        that._rejectedFunc.push(function(val) {
          try {
            let result = onRejected(val)
            resolvePromise(promise2, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }

  then(onFulfilled, onRejected) {
    let that = this
    const promise2 = new Promise4((resolve, reject) => {
      if (that.PromiseStatus === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(that.PromiseValue)
            resolvePromise(promise2, x, resolve, reject)
           } catch(e) {
             reject(e)
           }
        }, 0)
      }

      if (that.PromiseStatus === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(that.PromiseValue)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }

      if (that.PromiseStatus === 'pending') {
        that._fulfilledFunc.push(function() {
          setTimeout(() => {
             try {
              let x = onFulfilled(that.PromiseValue)
              resolvePromise(promise2, x, resolve, reject)
             } catch(e) {
               reject(e)
             }
          }, 0)
        })
        that._rejectedFunc.push(function() {
          setTimeout(() => {
            try {
              let x = onRejected(that.PromiseValue)
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

  catch(onRejected) {
    if (typeof onRejected === 'function') {
      this._rejectedFunc.push(onRejected)
    }
  }
}

module.exports = Promise4
