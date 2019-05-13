class Promise2 {
  constructor(executer) {
    this.PromiseStatus = 'pending'
    this._fulfilledFunc = []
    this._rejectedFunc = []

    const resolve = (val) => {
      if (this.PromiseStatus === 'pending') {
        this.PromiseStatus = 'resolved'
        setTimeout(() => {
          this.PromiseValue = val
          this._fulfilledFunc.forEach(func => func(val))
        }, 0)
      }
    }

    const reject = (reason) => {
      if (this.PromiseStatus === 'pending') {
        this.PromiseStatus = 'rejected'
        setTimeout(() => {
          this.PromiseValue = reason
          this._rejectedFunc.forEach(func => func(reason))
        }, 0)
      }
    }

    if (typeof executer === 'function') {
      try {
        executer(resolve, reject)
      } catch(err) {
         reject(err)
      }
    } else {
      throw new TypeError(`Promise resolver ${executer} is not a function`)
    }
  }

  static resolve() {
    return new Promise(resolve => resolve())
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled === 'function') {
      this._fulfilledFunc.push(onFulfilled)
    }

    if (typeof onRejected === 'function') {
      this._rejectedFunc.push(onRejected)
    }
  }

  catch(onRejected) {
    if (typeof onRejected === 'function') {
      this._rejectedFunc.push(onRejected)
    }
  }
 }

module.exports = Promise2
