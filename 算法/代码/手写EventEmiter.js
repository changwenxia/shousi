// 父子通信 eventEmitter
class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(name,fn){
    if(!this.events[name]){
      this.events[name]=[]
    }
    this.events[name].push(fn)
  }
  emit(name, ...rest){
    this.events[name] && this.events[name].forEach(fn=>fn.apply(this,rest))
  }
  remove(name,fn){
    if(this.events[name]){
      this.events[name].filter(f=>f !== fn)
    }
  }
  once(name,fn){
    const callbank=()=>{
      fn();
      this.remove(name,callbank)
    }
    this.on(name,callbank)
  }
}
const event = new EventEmitter()

const handle = (...pyload) => console.log(pyload)

event.on('click', handle)

event.emit('click', 100, 200, 300, 100)

event.remove('click', handle)

event.once('dbclick', function () {
  console.log('click')
})

event.emit('dbclick', 100);