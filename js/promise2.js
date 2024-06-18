function resolvePromise(promise2,x,resolve,reject){
  //判断x是不是promise
  //规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
  if(promise2 === x){//不能自己等待自己完成
      return reject(new TypeError('循环引用'));
  };
  // x是除了null以外的对象或者函数
  if(x !=null && (typeof x === 'object' || typeof x === 'function')){
      let called;//防止成功后调用失败
      try{//防止取then是出现异常  object.defineProperty
          let then = x.then;//取x的then方法 {then:{}}
          if(typeof then === 'function'){//如果then是函数就认为他是promise
              //call第一个参数是this，后面的是成功的回调和失败的回调
              then.call(x,y => {//如果Y是promise就继续递归promise
                  if(called) return;
                  called = true;
                  resolvePromise(promise2,y,resolve,reject)
              },r => { //只要失败了就失败了
                  if(called) return;
                  called = true;
                  reject(r);  
              });
          }else{//then是一个普通对象，就直接成功即可
              resolve(x);
          }
      }catch (e){
          if(called) return;
          called = true;
          reject(e)
      }
  }else{//x = 123 x就是一个普通值 作为下个then成功的参数
      resolve(x)
  }

}

var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

// Promise 构造函数
function Promise1(execute) {
  var that = this;
  that.state = PENDING; // 状态初始化

  that.value = undefined; // 成功结果 放在this上便于then访问
  that.reason = undefined; // 失败结果 放在this上便于catch访问

  that.onFulfilledFn = []; // 已兑现回调队列
  that.onRejectedFn = []; // 已拒绝回调队列

  // 这里用 setTimeout 是为了模仿异步微任务，真正的微任务只有通过浏览器底层才可以调用
  function resolve(value) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = FULFILLED;
        // 为了后面在 then 的回调中可以得到 resolve 传递的参数,将其保存在构造函数里。
        that.value = value;
        // 此时 onFulfilledFn 还是空的又怎么执行里面的回调呢？
        // 大家注意看这里我们采用的 setTimeout 异步任务，
        // 虽然没有延时时间但在执行时其还是会被放在宏任务队列里，等待同步任务执行完再执行
        that.onFulfilledFn.forEach(function(f) {
          f(that.value);
        });
      }
    });
  }

  function reject(reason) {
    setTimeout(function() {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.reason = reason;
        that.onRejectedFn.forEach(function(f) {
          f(that.reason);
        });
      }
    });
  }

  try {
    // 把内部的 resolve 和 reject 传入 executor，用户可调用 resolve 和 reject
    execute(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 原型属性(方法) then
Promise1.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function(x) {
          return x;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(e) {
          throw e;
        };
  var that = this;
  var promise;
  if (that.state === FULFILLED) {
    promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        // onFulfilled有可能执行失败
        try {
          // 判断x返回的是不是一个promise
          var x = onFulfilled(that.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  if (that.state === REJECTED) {
    promise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = onRejected(that.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  if (that.state === PENDING) {
    promise = new Promise(function(resolve, reject) {
      that.onFulfilledFn.push(function() {
        try {
          var x = onFulfilled(that.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
      that.onRejectedFn.push(function() {
        try {
          var x = onRejected(that.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  return promise;
};
  
  const p = new Promise1((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
  
  p.then(res => {
    console.log('first then', res)
    return res + 1
  }).then(res => {
    console.log('first then', res)
  })
  
  p.then(res => {
    console.log(`second then`, res)
    return res + 1
  }).then(res => {
    console.log(`second then`, res)
  })
  
  /**
   *  输出结果如下：
   *  first then 1
   *  first then 2
   *  second then 1
   *  second then 2
   */
  