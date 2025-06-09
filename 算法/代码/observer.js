// 简版 Observer 实现
class Observer {
	constructor(data) {
	  this.walk(data)
	}

	walk(data) {
	  // 只处理对象
	  if (!data || typeof data !== 'object') return
	  Object.keys(data).forEach(key => {
			this.defineReactive(data, key, data[key])
	  })
	}
  
	defineReactive(obj, key, val) {
		// 每个属性对应一个 Dep（依赖收集器）
		const dep = new Dep() 
		// 递归处理嵌套对象
		this.walk(val)
		const _this = this;
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get() {
				// Watcher 触发 getter 时收集依赖
				if (Dep.target) {  
					dep.depend()
				}
				return val
			},
			set(newVal) {
				if (newVal === val) return
				val = newVal
				_this.walk(newVal) // 新值是对象时继续劫持
				dep.notify()      // 通知所有 Watcher 更新
			}
		})
	}
  }
  
// 依赖收集器
class Dep {
	constructor() {
	  this.subs = []
	}
  
	depend() {
	  if (Dep.target) {
		this.subs.push(Dep.target)
	  }
	}
  
	notify() {
	  this.subs.forEach(watcher => watcher.update())
	}
 }
Dep.target = null // 全局唯一 Watcher 标记
  
// 使用示例
const data = { 
	message: 'Hello', 
	nested: { count: 1 } 
}
new Observer(data)

// 模拟 Watcher
class Watcher {
	constructor(getter) {
		this.getter = getter
		this.get()
	}

	get() {
		Dep.target = this
		this.value = this.getter()
		Dep.target = null
		return this.value
	}

	update() {
		console.log('数据更新了！新值:', this.get())
	}
}

// 测试
new Watcher(() => data.message) // 输出: 数据更新了！新值: Hello
data.message = 'Changed'       // 自动触发更新