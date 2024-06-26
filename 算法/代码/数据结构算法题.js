// 翻书问题或者走台阶问题。
  // 问：共有n个台阶，每次只能上1个台阶或者2个台阶，共有多少种方法爬完台阶？共有n页书，每次只能翻1页或者2页书，共有多少种方法翻完全书？
  // ps：本质上是斐波那契数列问题。假设只有一个台阶，则只有一种跳法，f(1)=1；如果两个台阶，那么有两种跳法：1,一次跳一级，2,一次跳两级，f(2) = 2。如果大于2的n级台阶，那么一次跳一级台阶，剩下还有n-1级台阶，有f(n-1)种跳法。假如一次跳2级台阶，剩下n-2级台阶，有f(n-2)中跳法。这就表示f(n) = f(n-1)+f(n-2)。
  function fibonacci(n) {
    if (n === 1 || n === 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2)
  }
  // 一个记忆化的斐波那契数列
  let tem = [0, 1]

  function fibonacci1(n) {
    let res = tem[n];
    if (typeof res !== "number") {
      res = fibonacci(n - 1) + fibonacci(n - 2)
      tem[n] = res; // 将每次 fibonacci(n) 的值都缓存下来
    }
    return res;
  }
  // 贪心算法--最少硬币找零问题
  // 所谓贪心，就是先选择当前阶段的最优解，不去考虑这次的选择会不会对未来造成影响，想要通过每个阶段的局部最优解，达到全局最优解。
  // 假设你为一家自动售货机厂家编程序，自动售货机要每次找给顾客最少数量硬币，美国有以下面额的硬币：1美分、5美分、10美分、25美分。比如说要找36美分的零钱，我们可以用1个25美分、1个10美分和一个1美分。 (ps：找零问题，先找大额的硬币25分，依次递减)
  function minCoinChange(amount, coins) {
    let change = [], total = 0;
    for(let i = 0; i< coins.length;i++) {
        let coin = coins[i];
        while(total + coin <= amount) {
            change.push(coin);
            total += coin;
        }
    }
    return change;
  }
  let counts = minCoinChange(36, [25, 10, 5, 1])
  console.log(1111, counts)

  // 某公司 1 到 12 月份的销售额存在一个对象里面
  // 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：
  // [222, 123, null, null, 888, null, null, null, null, null, null, null]。
  // let obj = {1:222, 2:123, 5:888};
  // console.log(Array.from({length:12}, (val,key)=>(
  //   obj[key+1]|| null
  // )));
  //实现一个 sleep 函数
  //比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现
  // promise
  const sleep= time=>{
    return new Promise(resolve=> setTimeout(resolve, time));
  }
  // sleep1(3000).then(() => console.log(1));
  // Generator
  function* sleepGenerator (time){
    yield new Promise(resolve=> setTimeout(resolve, time));
  }
  // sleepGenerator(3000).next().value.then(() => console.log(1))
  // async
  const sleep1= time=>{
    return new Promise(resolve=> setTimeout(resolve, time));
  }
  async function output(){
    let out = await sleep1(1000);
    console.log(1);
    return out;
  }
  // output();
  // es5
  function  sleep2(func,time){
    if(typeof func === "function")
    setTimeout(func,time)
  }
  function output(){
    console.log(1);
  }
  // sleep2(output, 1000);