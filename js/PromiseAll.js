
function PromiseAll(promiseArr) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let res = [];
        if (promiseArr.length === 0) {
            resolve(res);
        } else {
            for (let [i, p] of promiseArr.entries()) {
                Promise.resolve(p).then(data => {
                    res[i] = data;
                    if (++index === promiseArr.length) {
                        resolve(res);
                    }
                }, err => reject(err));
            }
        };
    });
};
let p1 = new Promise((resolve) => {
    resolve('成功了')
})
let p2 = new Promise((resolve) => {
resolve('success')
})
PromiseAll([p1, p2]).then((result) => {
console.log(result) //['成功了', 'success']
}).catch((error) => {
console.log(error)
})