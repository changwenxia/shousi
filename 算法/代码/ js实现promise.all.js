// Promise.all 需要等到所有的 promise 的状态都变成 fulfilled 之后才 resolve, 但只要有一个 promise 失败即返回失败的结果。
function PromiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    let index = 0, res = [];
    if (promiseArr.length === 0) {
      resolve(res);
    }
    promiseArr.map((item, i) => {
      Promise.resolve(item).then(data => {
        res[i] = data;
        if (++index === promiseArr.length) {
          resolve(res);
        }
      }, err => {
        reject(err);
      })
    })
  })
}
let p1 = new Promise((resolve) => {
  resolve('成功了')
})
let p2 = new Promise((resolve) => {
  resolve('success')
})
let p3 = new Promise((resolve, reject) => {
  reject('error')
})
PromiseAll([p1, p2, p3]).then((result) => {
  console.log(result) //['成功了', 'success']
}).catch((error) => {
  console.log(error)
});

