
    // js实现promise
    function SimplePromise(excutor) {
      let _this = this;
      this.state = "pending";
      this.value = null;
      this.reason = null;
      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];

      excutor(resolve, reject)

      
      function resolve(value) {
        if (_this.state === "pending") {
          _this.value = value;
          _this.state = "resolved";
          _this.onFulfilledCallbacks.forEach(fn => fn(value))
        }
      }

      function reject(reason) {
        if (_this.state === "pending") {
          _this.reason = reason;
          _this.state = "rejected";
          _this.onRejectedCallbacks.forEach(fn => fn(reason))
        }
      }
    }
    SimplePromise.prototype.then = function (onFulfilled, onRejected) {
      var promise2 = new SimplePromise((resolve, reject) => {
        if (this.state === "resolved") {
          onFulfilled(this.value);
        }
        if (this.state === "rejected") {
          onRejected(this.reason);
        }
        if (this.state === "pending") {
          this.onFulfilledCallbacks.push(onFulfilled);
          this.onRejectedCallbacks.push(onRejected);
        }
      })
      return promise2;

    }

    /**
     * 解析then返回值与新Promise对象
     * @param {Object} promise2 新的Promise对象 
     * @param {*} x 上一个then的返回值
     * @param {Function} resolve promise2的resolve
     * @param {Function} reject promise2的reject
     */
    function resolvePromise(promise2, x, resolve, reject) {
      if (promise2 === x) {
        reject(new TypeError("promise发生率循环引用"))
      };
      if (x !== null && (typeof x === "object" || typeof x === "function")) {
        //可能是个对象或是函数
        setTimeout(() => {
          try {
            let then = x.then;
            if (typeof then === "function") {
              //then是function，那么执行Promise
              let y = then.call(x, (y) => {
                resolvePromise(promise2, y, resolve, reject)
              }, (r) => {
                reject(r)
              })
            } else {
              resolve(x);
            }
          } catch (err) {
            reject(err);
          }
        }, 0)

      } else {
        resolve(x);
      }
    }     

    // 测试promise是否通过
    Promise.defer = Promise.deferred = function () {
      let dfd = {}
      dfd.promise = new SimplePromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
      });
      return dfd;
    }
     // 使用示例
  const myPromise = new SimplePromise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
      // 成功时调用resolve
      resolve('操作成功');
   
      // 失败时调用reject
      // reject('操作失败');
    }, 1000);
  });
   
  myPromise.then(
    (value) => console.log('成功:', value),
    (reason) => console.error('失败:', reason)
  );