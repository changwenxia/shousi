// 参考https://juejin.cn/post/6967260930862219272
function runGenerator(gen) {
    return new Promise((resolve, reject) => {
        var g = gen();
        function _next(val) {
            try {
                var res = g.next(val);
            } catch (error) {
                return reject(error);
            }
            if (res.done) {
                return resolve(res.value);
            }
            Promise.resolve(res.value).then(
                value => _next(value),
                err => g.throw(err)
            )
        }
        _next();
    })
}
  function* myGenerator() {
    try {
        const res1 = yield Promise.resolve(1);
        console.log('res1', res1); // 1
        const res2 = yield 2;
        console.log('res2', res2); // 2
        const res3 = yield Promise.reject('error');
        console.log('res3', res3); // 3
      } catch (error) {
        console.log(error)
      }
  }
  
//   const gen = runGenerator(myGenerator); 
//   console.log(gen);
  
let obj = {
    name: 'aa',
    age: 18
}
let p = new Proxy(obj, {
    get(target, prop) {
        return prop in target ? target[prop] : '该对象没有该属性'
    },
    set(target, prop, value) {
        if (prop === 'age') {
            target[prop] = value;
        } else {
            throw '除年龄外，其它属性不可以更改';
        }
    }
})