// promise-es6写法
// 参考：https://www.bilibili.com/video/BV1jP4y117Hc/?spm_id_from=333.337.search-card.all.click&vd_source=e8999a538a8fb41f0b978c25d61cdea7
class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.result = null;
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(result) {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.result = result;
            this.onFulfilledCallbacks.forEach(cb => cb(result));
        }
    }

    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason;
            this.onRejectedCallbacks.forEach(cb => cb(reason));
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        if (typeof onFulfilled !== 'function') {
                            resolve(this.result);
                        } else {
                            let x = onFulfilled(this.result);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        if (typeof onRejected === 'function') {
                            reject(this.reason);
                        } else {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        reject(error)
                    }
                });
            } else if (this.state === 'pending'){
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onFulfilled !== 'function') {
                                resolve(this.result);
                            } else {
                                let x = onFulfilled(this.result);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onRejected === 'function') {
                                reject(this.reason);
                            } else {
                                let x = onRejected(this.reason);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (error) {
                            reject(error)
                        }
                    });
                })
            }
        })
        return promise2;
    }

    all(promiseArr) {
        return new MyPromise((resolve, reject)=> {
            const length = promiseArr.length;
            let result = [];
            let count = 0;
            if (length === 0) {
                return resolve(result);
            }
            for (let [i, p] of promiseArr.entries()) {
                MyPromise.resolve(p).then(
                    data => {
                        result[i] = data;
                        count++;
                        if (count === length) {
                            resolve(result);
                        }
                    },
                    reason => reject(reason)
                )
            }
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        throw new TypeError('promise error');
    }
    if (x instanceof MyPromise) {
        x.then(y => resolvePromise(promise2, y, resolve, reject), reject);
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
        } catch (error) {
            return reject(error);
        }
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x, 
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            resolve(x)
        }
    } else {
        return resolve(x);
    }
}

let p1 = new MyPromise((resolve, reject) => {
    resolve('成功了')
  })
   
  let p2 = new MyPromise((resolve, reject) => {
    resolve('success')
  })
   
//   let p3 = MyPromise.reject('失败')
   
MyPromise.all([p1, p2]).then((result) => {
    console.log(result)               //['成功了', 'success']
  }).catch((error) => {
    console.log(error)
  })
  

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