function observable(obj){
  if(!obj || typeof obj !== 'object') return;
  Object.keys(obj).forEach(key=> {
    defineReactive(obj, key,obj[key])
  })
  return obj;
}

function defineReactive(obj, key, val){
  let dep = new Dep();
  Object.defineProperty(obj,key, {
    get(){
      dep.depend();
      console.log(`${key}属性被读取了`);
      return val;
    },
    set(newVal){
      console.log(`${key}属性被修改了`);
      val= newVal;
      dep.notify()
    }
  })
}
class Dep {
		constructor(){
			this.subs = []
		}
		//增加订阅者
		addSub(sub){
			this.subs.push(sub);
		}
        //判断是否增加订阅者
		depend () {
		    if (Dep.target) {
		     	this.addSub(Dep.target)
		    }
		}

		//通知订阅者更新
		notify(){
			this.subs.forEach((sub) =>{
				sub.update()
			})
		}
	}
Dep.target = null;