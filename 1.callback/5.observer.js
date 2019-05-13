// 观察者模式 基于发布订阅模式
// 观察者 和 被观察者

/* 
 * 被观察者供维护观察者的一系列方法
 * 观察者提供更新接口
 * 观察者把自己注册到被观察者里
 * 在被观察者发生变化时候，调用观察者的更新方法
*/

class Subject {
  constructor() {
    this.state = 'happy'
    this._watcher = []
  }

  attach(watcher) {
    // 装载观察者
    this._watcher.push(watcher)
  }

  setState(newState) {
    // 更新被观察者状态
    this.state = newState
    this._watcher.forEach(watcher => watcher.update(newState))
  }
}

class Observer {
  constructor(who) {
    this.who = who
  }

  update(state) {
    console.log(`watcher: ${this.who},`, state)
  }
}

// 被观察者
let sub = new Subject('children')

// 观察者
let father = new Observer('father')
let mother = new Observer('mother')

// 往被观察者中 添加 观察者
sub.attach(father)
sub.attach(mother)

// 被观察者状态改变
sub.setState('angry')
console.log(sub.state)
