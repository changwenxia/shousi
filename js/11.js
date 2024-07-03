// ajax并发请求限制
// 实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：

// 要求最大并发数 maxNum
// 每当有一个请求返回，就留下一个空位，可以增加新的请求
// 所有请求完成后，结果按照 urls 里面的顺序依次打出
// multiRequest 可以返回一个 promise 或者 直接执行 callback 回调

let index = 0;
const axios = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url + `/?username=${++index}&password=${index}`)
        }, 1000)
    })
}

function multiRequest(urls = [], maxNum) {
    // 请求总数量
    const len = urls.length;
    // 根据请求数量创建一个数组来保存请求的结果
    const result = new Array(len).fill(false);
    // 当前完成的数量
    let count = 0;
  
    return new Promise((resolve, reject) => {
      // 请求maxNum个
      while (count < maxNum) {
        next();
      }
      function next() {
        let current = count++;
        // 处理边界条件
        if (current >= len) {
          // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
          !result.includes(false) && resolve(result);
          return;
        }
        const url = urls[current];
        console.log(url ,'开始');
        axios(url)
          .then((res) => {
            // 保存请求结果
            result[current] = res;
            console.log(url ,'完成');
            // 请求没有全部完成, 就递归
            if (current < len) {
              next();
            }
          })
          .catch((err) => {
            console.log(url ,'结束');
            result[current] = err;
            // 请求没有全部完成, 就递归
            if (current < len) {
              next();
            }
          });
      }
    });
  }

  const urls = ["/url1","/url2","/url3","/url4","/url5","/url6"];
  multiRequest(urls,3).then(data=>{
    console.log(data);
  })