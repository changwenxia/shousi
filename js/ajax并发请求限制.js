// 实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：

// 要求最大并发数 maxNum
// 每当有一个请求返回，就留下一个空位，可以增加新的请求
// 所有请求完成后，结果按照 urls 里面的顺序依次打出
// multiRequest 可以返回一个 promise 或者 直接执行 callback 回调
function multiRequest(urls = [], maxNum, callback) {
    const len = urls.length;
    const result = new Array(len).fill(false);
    let runCount = 0;
    return new Promise((resolve, reject) => {
      // 最多同时发送maxNum个请求
      while (runCount < maxNum) {
        sendRequest();
      }
      function sendRequest() {
        let curCount = runCount; // curCount 从 0 开始是 urls 的下标
        runCount++;
        if (runCount >= len) {
          callback(result); // 可以执行回调
          resolve(result); // 也可以返回一个新 promise
          return
        }
        console.log(`开始发送第 ${curCount} 个请求`);
        let curUrl = urls[curCount];
        fetch(curUrl)
          .then(value => {
            console.log(`第 ${curCount} 个请求：${value} 成功了！`);
            result[curCount] = `${value} 成功`;
          })
          .catch(reason => {
            console.log(`第 ${curCount} 个请求：${reason} 失败了！`);
            result[curCount] = `${reason} 失败`;
          })
          .finally(() => {
            if (runCount < len) {
              sendRequest();
            }
          });
      }
    });
  }

