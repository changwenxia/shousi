// ajax并发请求限制
// 题1：实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：
// 要求最大并发数 maxNum
// 每当有一个请求返回，就留下一个空位，可以增加新的请求
// 所有请求完成后，结果按照 urls 里面的顺序依次打出
// multiRequest 可以返回一个 promise 或者 直接执行 callback 回调

// 思路：
// 整体采用递归调用来实现：最初发送的请求数量上限为允许的最大值，并且这些请求中的每一个都应该在完成时继续递归发送，通过传入的索引来确定了urls里面具体是那个URL，保证最后输出的顺序不会乱，而是依次输出。

// 参考：https://cloud.tencent.com/developer/article/1784512
let index = 0;
const axios = (url)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(url + `/?username=${++index}&password=${index}`);
        },1000)
    })
}

function multiRequest(urls = [], maxNum, callback) {
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
      if (current > len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        callback && callback(result);
        return;
      }
      const url = urls[current];
      // console.log(url ,'开始');
      axios(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;
          // console.log(url ,'完成');
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          // console.log(url ,'结束');
          result[current] = err;
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        });
    }
  });
}

// const urls = ["/url1","/url2","/url3","/url4","/url5","/url6"];
// multiRequest(urls ,3).then(data=>{
//     console.log(data);
// })
// multiRequest(urls,3, data=>{
//   console.log(data);
// })
// multiRequest(urls, 2, data=>{
//     console.log(data);
// })



// 请求并发数量限制
// 题2：实现一个并发请求控制，你可以创建一个管理请求的队列，并通过设置一个最大并发数来控制同时进行的请求数量。
// 当一个请求完成时，你可以从队列中取出下一个请求并执行它。以下是一个简单的 JavaScript 例子，它展示了如何使用 Promise 来管理并发请求。
// 假设我们有一个 sendRequest 函数，这个函数接收一个 url，并返回一个 Promise。我们的目标是控制这些请求的并发数。
class RequestQueue {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent; // 设置最大并发数
    this.currentRunning = 0; // 当前正在运行的请求数
    this.queue = []; // 等待执行的请求队列
  }

  // 将请求封装成一个函数，推入队列，并尝试执行
  enqueue(url) {
    return new Promise((resolve, reject) => {
      const task = () => {
        // 当请求开始时，currentRunning 加 1
        this.currentRunning++;
        sendRequest(url).then(resolve).catch(reject).finally(() => {
          // 请求结束后，currentRunning 减 1，并尝试执行下一个请求
          this.currentRunning--;
          this.dequeue();
        });
      };
      this.queue.push(task);
      this.dequeue(); // 每次添加请求后尝试执行请求
    });
  }

  dequeue() {
    // 如果当前运行的请求小于最大并发数，并且队列中有待执行的请求
    if (this.currentRunning < this.maxConcurrent && this.queue.length) {
      // 从队列中取出一个请求并执行
      const task = this.queue.shift();
      task();
    }
  }
}

// 这个函数是模拟发送请求的，实际中你可能需要替换成真实的请求操作
function sendRequest(url) {
  console.log(url, '开始');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(url, '响应');
      resolve(`Result from ${url}`);
    }, Math.random() * 2000); // 随机延时以模拟请求处理时间
  });
}

// 使用 RequestQueue
const requestQueue = new RequestQueue(3); // 假设我们限制最大并发数为3

// 模拟批量请求
const urls = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6'];
urls.forEach(url => {
  requestQueue.enqueue(url).then(result => {
    console.log(result);
  });
});