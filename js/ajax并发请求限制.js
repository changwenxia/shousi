// ajax并发请求限制
// 实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：
// 要求最大并发数 maxNum
// 每当有一个请求返回，就留下一个空位，可以增加新的请求
// 所有请求完成后，结果按照 urls 里面的顺序依次打出
// multiRequest 可以返回一个 promise 或者 直接执行 callback 回调

// 思路：
// 返回一个promise 使用resolve接收最后的 数据列表dataList
// 递归调用next 当请求次数大于等于maxNum 停止调用 如果小于时 则继续调用
// 使用请求列表 保存每次的请求url与对应结果 
// 请求时 将请求次数加一 请求成功返回数据后 请求次数减一 用于记录请求次数
// 每次调用成功后 再次调用 添加新的请求 当请求次数为0 并且 urls列表为0时 则表示全部请求完毕
// 将reqList 中保存的数据全部取出 并保存到dataList中 resolve(dataList)返回
// 参考：https://cloud.tencent.com/developer/article/1784512
let index = 0;
const axios = (url)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(url + `/?username=${++index}&password=${index}`);
        },1000)
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
// multiRequest(urls ,3).then(data=>{
//     console.log(data);
// })
// multiRequest(urls,3, data=>{
//   console.log(data);
// })
multiRequest(urls, 2).then(data=>{
    console.log(data);
})