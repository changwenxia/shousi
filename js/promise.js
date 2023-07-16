function MyPromise(executor) {
    let that = this;
    that.status = 'pending';
    that.result = null;
    that.reason = null;
    that.onFulfilledCallbacks = []; //存放成功的回调
    that.onRejectedCallbacks = [];//存放失败的回调

    function resolve(data) {
        setTimeout(function() {
            if (that.status === 'pending') {
                that.status = 'fulfilled';
                that.result = data;
                that.onFulfilledCallbacks.forEach(callback => callback(data));
            }
        })
    }

    function reject(reason) {
        setTimeout(() => {
            if (that.status === 'pending') {
                that.status = 'rejected';
                that.reason = reason;
                that.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        });
    }
    try {
        //执行时可能会发生异常
        executor(resolve, reject);   
    } catch (error) {
        reject(error);//promise失败了
    }
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    //防止值得穿透 
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : y => y;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err;} 
    //作为下一次then方法的promise
    let that = this;
    let promise2;
    if (that.status === 'fulfilled') {
        promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    //成功的逻辑 失败的逻辑
                    let x = onFulfilled(that.result);
                    //看x是不是promise 如果是promise取他的结果 作为promise2成功的的结果
                    //如果返回一个普通值，作为promise2成功的结果
                    //resolvePromise可以解析x和promise2之间的关系
                    //在resolvePromise中传入四个参数，第一个是返回的promise，第二个是返回的结果，第三个和第四个分别是resolve()和reject()的方法。
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    if (that.status === 'rejected') {
        promise2 = new Promise(function(resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
        });
    }
    //当前既没有完成也没有失败
    if (that.status === 'pending') {
        promise2 = new Promise(function(resolve, reject) {
            that.onFulfilledCallbacks.push(() => {
                try {
                    let x = onFulfilled(that.result);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
            that.onRejectedCallbacks.push(function() {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            });
        });
    }
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    // 判断x是不是promise
    // 规范中规定：我们允许别人乱写，这个代码可以实现我们的promise和别人的promise 进行交互
    if (x === promise2) { // 不能自己等待自己完成
        return reject(new TypeError('循环引用'));
    }
    // 符合其他规范的promise，// x是除了null以外的对象或者函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        let called;//防止成功后调用失败
        try {//防止取then是出现异常  object.defineProperty
           let then = x.then;//取x的then方法 {then:{}}
           //如果then是函数就认为他是promise
            if (typeof then === 'function') {
                //call第一个参数是this，后面的是成功的回调和失败的回调
                then.call(
                    x,
                    y => {//如果Y是promise就继续递归promise
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    r => {//只要失败了就失败了
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } else {//then是一个普通对象，就直接成功即可
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error)
        }
    }
    else {//x = 123 x就是一个普通值 作为下个then成功的参数
        resolve(x);
    }
}



const p = new MyPromise((resolve, reject) => {
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
  