
  // 裴波那切数列定义：1、1、2、3、5、8、13、21、34....裴波那切定义 f(1) = 1;f(2) = 1; f(n) = f(n-1)+f(n-2);随着数项数增加前一位和后一位数的比例越来越接近黄金比列。0.618
  // 定义：第 0 项为 0,第 1 项为 1,从第 2 项开始，每一项等于前两项之和。
  // 1. 递归实现。
// 递归是最直观的实现方式，但性能较差，时间复杂度为 O(2^n)。
function fibonacciRecursive(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
// console.log(fibonacciRecursive(10)); // 输出: 55
// 缺点：重复计算较多，性能较差。当 n 较大时，可能会导致栈溢出。

// 2. 动态规划实现。
// 通过缓存中间结果，避免重复计算，时间复杂度为 O(n)。
function fibonacciDP(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  const dp = [0, 1]; // 初始化前两项
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // 计算当前项
  }
  return dp[n];
}
// console.log(fibonacciDP(10)); // 输出: 55
// 优点：时间复杂度低，性能较好。适合计算较大的 n。

// 3. 优化空间复杂度的动态规划。
// 通过只保存前两项的值，将空间复杂度优化为 O(1)。
function fibonacciOptimized(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev = 0; // 前两项
  let curr = 1; // 前一项
  for (let i = 2; i <= n; i++) {
    const next = prev + curr; // 计算当前项
    prev = curr; // 更新前两项
    curr = next; // 更新前一项
  }
  return curr;
}
// console.log(fibonacciOptimized(10)); // 输出: 55
// 优点：时间复杂度为 O(n)，空间复杂度为 O(1)。性能最优，适合计算较大的 n。

// 4. 生成斐波那契数列
// 如果需要生成前 n 项的斐波那契数列，可以使用以下方法：
function generateFibonacci(n) {
  const sequence = [0, 1]; // 初始化前两项
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2]; // 计算当前项
  }
  return sequence.slice(0, n); // 返回前 n 项
}
// console.log(generateFibonacci(10)); // 输出: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// 5. 使用闭包缓存结果
// 通过闭包缓存计算结果，避免重复计算。
const fibonacciMemoized = (function () {
  const cache = [0, 1]; // 缓存前两项

  return function (n) {
    if (cache[n] !== undefined) return cache[n]; // 如果已缓存，直接返回
    for (let i = cache.length; i <= n; i++) {
      cache[i] = cache[i - 1] + cache[i - 2]; // 计算并缓存当前项
    }
    return cache[n];
  };
})();

// console.log(fibonacciMemoized(10)); // 输出: 55
// 优点：通过缓存避免重复计算，性能较好。适合多次调用的情况。

// 6. 使用数学公式（通项公式）
// 斐波那契数列的通项公式为：
function fibonacciFormula(n) {
  const phi = (1 + Math.sqrt(5)) / 2; // 黄金分割比
  return Math.round((Math.pow(phi, n) - Math.pow(-phi, -n)) / Math.sqrt(5));
}

// console.log(fibonacciFormula(10)); // 输出: 55
// 优点：时间复杂度为 O(1)。适合计算较大的 n。
// 缺点：由于浮点数精度问题，当 n 较大时，结果可能不准确。