// 柯力化举例： 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6; 实际是1+2+3=6
// add(1, 2, 3)(4) = 10; 实际是1+2+3+4=10
// add(1)(2)(3)(4)(5) = 15; 实际是1+2+3+4+5=15
function add(...args) {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  let allArgs = [...args];

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  let fn = function(...newArgs) {
    allArgs.push(...newArgs);
    return fn;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  fn.toString = function () {
    if (!allArgs.length) return;
      return allArgs.reduce((a, b) => a+b);
  }
  return fn;
}

// add(1)(2)(3)
console.log(add(1)(2)(3)(4)(5).toString());